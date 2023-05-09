import { ValidationException } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticatedSessionController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const { email, password, rememberMe } = request.only(['email', 'password', 'rememberMe']) as {
        email: string
        password: string
        rememberMe: boolean
      }
      await auth.use('web').attempt(email, password, rememberMe)
      response.redirect('/')
    } catch (error) {
      throw new ValidationException(true, {
        email: ['Invalid credentials'],
      })
    }
  }

  public async destroy({ auth, inertia }: HttpContextContract) {
    await auth.use('web').logout()
    return inertia.location('/')
  }
}
