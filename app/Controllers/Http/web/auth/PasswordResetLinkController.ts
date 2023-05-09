import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Bull from '@ioc:Rocketseat/Bull'
import PasswordReset from 'App/Jobs/PasswordReset'
import User from 'App/Models/User'

export default class PasswordResetLinkController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/ForgotPassword')
  }

  public async store({ request, inertia, session }: HttpContextContract) {
    const { email } = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.exists({ table: 'users', column: 'email' }),
        ]),
      }),
    })

    const user = await User.findByOrFail('email', email)
    Bull.add(new PasswordReset().key, { user })
    session.flash(
      'status',
      'If your email exists in our database, you will receive a password recovery link shortly.'
    )
    return inertia.redirectBack()
  }
}
