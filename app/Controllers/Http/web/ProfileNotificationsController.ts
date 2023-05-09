import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileNotificationsController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Profile/Notification')
  }
}
