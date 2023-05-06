import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  // list all records from entity
  public async index({}: HttpContextContract) {}

  // show the form for creating a new resource
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('Auth/SignUp')
  }

  // store a newly created resource in storage
  public async store({ request, inertia, session }: HttpContextContract) {
    try {
      const payload = await request.validate(StoreValidator)
      await User.create(payload)
      inertia.location('/')
    } catch (error) {
      session.flash('errors', error.messages)
      inertia.redirectBack()
    }
  }
  // display the specified resource
  public async show({}: HttpContextContract) {}

  // show the form for editing the specified resource
  public async edit({}: HttpContextContract) {}

  // update the specified resource in storage
  public async update({ request, inertia, params, session }: HttpContextContract) {
    try {
      const payload = await request.validate(StoreValidator)
      const user = await User.findOrFail(params.id)
      user.merge(payload)
      await user.save()
      inertia.location('/')
    } catch (error) {
      session.flash('errors', error.messages)
      inertia.redirectBack()
    }
  }

  // remove the specified resource from storage
  public async destroy({ response, params, session }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      response.redirect('/')
    } catch (error) {
      session.flash('errors', error.messages)
      response.redirect().back()
    }
  }
}
