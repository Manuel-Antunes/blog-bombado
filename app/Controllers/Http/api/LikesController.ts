import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class LikesController {
  public async store({ response, auth, params }: HttpContextContract) {
    const { post_id: postId } = params
    const likesRelation = auth.user?.related('likes')
    const post = await Post.find(postId)
    if (!post) {
      return response.notFound('Post not found')
    }
    const like = await likesRelation?.query().where('post_id', postId).first()
    if (like) {
      await likesRelation?.detach([postId])
      return { likes_count: post.likesCount - 1, liked: false }
    } else {
      await likesRelation?.attach([postId])
      return { likes_count: post.likesCount + 1, liked: true }
    }
  }
}
