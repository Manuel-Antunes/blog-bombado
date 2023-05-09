import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login')
  }

  public async store({ request, auth, response, session }: HttpContextContract) {
    try {
      const { email, password, rememberMe } = request.only(['email', 'password', 'rememberMe']) as {
        email: string
        password: string
        rememberMe: boolean
      }
      await auth.use('web').attempt(email, password, rememberMe)
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
