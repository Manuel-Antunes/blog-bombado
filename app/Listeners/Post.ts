import FCM from '@ioc:Adonis/Addons/FCM'
import type { EventsList } from '@ioc:Adonis/Core/Event'
import Notification from '@ioc:Verful/Notification'
import Device from 'App/Models/Device'
import User from 'App/Models/User'
import PostNotification from 'App/Notifications/PostNotification'

export default class Post {
  public async onNewPost(post: EventsList['new:post']) {
    const users = await User.query()
      .whereHas('devices', (device) => {
        device.whereNotNull('token')
      })
      .preload('devices')
    const registrationTokens = users.flatMap((device) =>
      device.devices.map((device) => device.token)
    )
    const recipients = { registrationTokens }
    const user = await User.findOrFail(post.userId)
    const subject = 'New post'
    const message = `New post from ${user.name}: ${post.title}`
    await Notification.send(
      users,
      new PostNotification('New post', `New post from ${user.name}: ${post.title}`, post)
    )
    const response = await FCM.send({ notification: { title: subject, body: message } }, recipients)
    const badTokens = registrationTokens.filter((_, i) => response[i] && response[i].error !== null)
    await Device.query().whereIn('token', badTokens).delete()
  }
}
