import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class EnsureEmailIsVerified {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (!auth.user?.hasVerifiedEmail) {
      return response.redirect(Route.makeUrl('verification.notice'))
    }
    await next()
  }
}
