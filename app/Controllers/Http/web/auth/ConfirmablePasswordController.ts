import { ValidationException } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConfirmablePasswordController {
  public async show({ inertia }: HttpContextContract) {
    return inertia.render('Auth/ConfirmPassword')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    try {
      await auth.use('web').verifyCredentials(auth.user?.email || '', request.input('password'))
    } catch (error) {
      throw new ValidationException(true, {
        current_password: ['Invalid credentials'],
      })
    }
    session.put('auth.password_confirmed_at', Date.now())

    response.redirect('/')
  }
}
