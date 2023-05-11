import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Bull from '@ioc:Rocketseat/Bull'
import VerifyUser from 'App/Jobs/VerifyUser'

export default class VerifyEmailController {
  public async handle({ inertia, auth }: HttpContextContract) {
    if (auth.user?.hasVerifiedEmail) {
      inertia.location('/')
    }
    const signedUrl = Route.makeSignedUrl(
      'recovery',
      { email: auth.user!.email },
      { expiresIn: '1h' }
    )
    Bull.add(new VerifyUser().key, { user: auth.user, signedUrl })
    return inertia.render('Auth/VerifyEmail')
  }
}
