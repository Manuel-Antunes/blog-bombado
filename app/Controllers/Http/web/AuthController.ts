import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login')
  }

  public async store({ request, auth, response, session }: HttpContextContract) {
    try {
      const { email, password } = request.only(['email', 'password']) as {
        email: string
        password: string
      }
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch (error) {
      session.flash('errors', {
        email: ['Invalid credentials'],
      })
      response.redirect().back()
    }
  }

  public async destroy({ auth, inertia }: HttpContextContract) {
    await auth.use('web').logout()
    inertia.location('/')
  }
}
