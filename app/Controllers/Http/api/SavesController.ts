import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class SavesController {
  public async store({ response, auth, params }: HttpContextContract) {
    const { post_id: postId } = params
    const savesRelation = auth.user?.related('saves')
    const post = await Post.find(postId)
    if (!post) {
      return response.notFound('Post not found')
    }
    const save = await savesRelation?.query().where('post_id', postId).first()
    if (save) {
      await savesRelation?.detach([postId])
      return { saves_count: post.savesCount - 1, saved: false }
    } else {
      await savesRelation?.attach({
        [postId]: {
          type: 'save',
        },
      })
      return { saves_count: post.savesCount + 1, saved: true }
    }
  }
}
