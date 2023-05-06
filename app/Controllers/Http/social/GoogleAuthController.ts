import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class GoogleAuthController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async callback({ ally, response, session, auth }: HttpContextContract) {
    const google = ally.use('google')
    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      session.flash('errors', {
        email: ['Access was denied'],
      })
      return response.redirect().back()
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      session.flash('errors', {
        email: ['Request expired. Retry again'],
      })
      return response.redirect().back()
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      session.flash('errors', {
        email: [google.getError()],
      })
      return response.redirect().back()
    }

    const googleUser = await google.user()
    if (!googleUser.email) {
      session.flash('errors', {
        email: ['Unable to retrieve your email address'],
      })
      return response.redirect().back()
    }

    const user = await User.firstOrCreate(
      {
        email: googleUser.email,
      },
      {
        name: googleUser.name,
        email: googleUser.email,
      }
    )

    await auth.use('web').login(user)
    response.redirect('/')
  }
}
