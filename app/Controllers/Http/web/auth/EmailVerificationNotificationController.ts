import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull'
import VerifyUser from 'App/Jobs/VerifyUser'

export default class EmailVerificationNotificationController {
  public async store({ auth, inertia }: HttpContextContract) {
    if (auth.user?.hasVerifiedEmail) {
      inertia.location('/')
    }
    Bull.add(new VerifyUser().key, { user: auth.user })
    inertia.redirectBack()
  }
}
