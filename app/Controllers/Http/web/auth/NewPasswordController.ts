import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { ValidationException, rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class NewPasswordController {
  public async create({ request, inertia, response, session, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('errors', {
        invalidToken: ['Invalid Token'],
      })
      return response.redirect().toRoute('forgot-password')
    }
    return inertia.render('Auth/ResetPassword', {
      email: params.email,
      signedUrl: Route.makeSignedUrl('password.store', { expiresIn: '5m' }),
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const { password, email } = await request.validate({
      schema: schema.create({
        password: schema.string({ trim: true }, [rules.confirmed()]),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.exists({ table: 'users', column: 'email' }),
        ]),
      }),
    })
    if (!request.hasValidSignature()) {
      throw new ValidationException(true, {
        token: ['Invalid token'],
      })
    }
    session.flash('success', {
      message: ['Password changed successfully'],
    })
    const user = await User.findBy('email', email)
    user!.password = password
    await user!.save()
    return response.redirect().toRoute('login')
  }
}
