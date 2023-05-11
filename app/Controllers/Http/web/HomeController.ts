import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class HomeController {
  public async handle({ inertia, auth }: HttpContextContract) {
    const posts = await Post.query()
      .preload('category')
      .withScopes((scopes) => scopes.withInteractions(auth.user!))

    return inertia.render('Home', { posts })
  }
}
