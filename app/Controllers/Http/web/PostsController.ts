import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Post/StoreValidator'
import UpdateValidator from 'App/Validators/Post/UpdateValidator'

export default class PostsController {
  public async index({ inertia, bouncer }: HttpContextContract) {
    bouncer.allows('admin')
    return inertia.render('Posts/List')
  }

  public async create({ inertia }: HttpContextContract) {
    const categories = await Category.all()
    return inertia.render('Posts/Create', {
      categories,
    })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { image, ...data } = await request.validate(StoreValidator)
    const post = await Post.create({
      ...data,
      userId: auth.user!.id,
      image: image ? Attachment.fromFile(image) : undefined,
    })
    return response.redirect().toRoute('posts.show', { id: post.id })
  }

  public async show({ inertia, params, auth }: HttpContextContract) {
    const post = await Post.query()
      .withScopes((query) => query.liked(auth.user!))
      .where('id', params.id)
      .firstOrFail()
    const recentPostsQuery = Post.query().where('id', '!=', post.id).orderBy('id', 'desc').limit(4)
    if (auth.user) {
      recentPostsQuery.withScopes((query) => query.liked(auth.user!))
    }
    const recentPosts = await recentPostsQuery.preload('user').preload('category').exec()

    const recentPostsFromAuthor = await Post.query()
      .where('user_id', post.userId)
      .orderBy('id', 'desc')
      .limit(4)
      .exec()

    return inertia.render('Posts/Show', { post, recentPosts, recentPostsFromAuthor })
  }

  public async edit({ inertia, params, bouncer }: HttpContextContract) {
    const categories = await Category.all()
    const post = await Post.findOrFail(params.id)
    await bouncer.allows('adminOrOwner', post)
    return inertia.render('Posts/Edit', { post, categories })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { image, ...data } = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(params.id)
    post.merge({ ...data })
    if (image) {
      post.image = Attachment.fromFile(image)
    }
    await post.save()
    return response.redirect().toRoute('posts.show', { id: post.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.redirect().toRoute('home')
  }
}
