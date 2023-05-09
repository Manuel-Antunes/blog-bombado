import { ValidationException } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConfirmablePasswordController {
  public async show({ inertia }: HttpContextContract) {
    return inertia.render('Auth/ConfirmPassword')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    if (!(await auth.use('web').attempt(auth.user?.email || '', request.input('password')))) {
      throw new ValidationException(true, {
        password: ['Invalid credentials'],
      })
    }
    session.put('auth.password_confirmed_at', Date.now())

    response.redirect('/')
  }
}
