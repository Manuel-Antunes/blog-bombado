import FCM from '@ioc:Adonis/Addons/FCM'
import type { EventsList } from '@ioc:Adonis/Core/Event'
import Device from 'App/Models/Device'
import User from 'App/Models/User'

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

    const response = await FCM.send({ notification: { title: subject, body: message } }, recipients)
    console.log(response)
    const badTokens = registrationTokens.filter((_, i) => response[i] && response[i].error !== null)
    await Device.query().whereIn('token', badTokens).delete()
  }
}
