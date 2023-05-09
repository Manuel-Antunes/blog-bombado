import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerificationPromptController {
  public async handle({ auth, inertia }: HttpContextContract) {
    return auth.user?.hasVerifiedEmail ? inertia.location('/') : inertia.render('Auth/VerifyEmail')
  }
}
