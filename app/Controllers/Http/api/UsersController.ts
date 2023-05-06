import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 100, sortDirection, sortField, ...input } = request.qs()

    const filter = {
      ...input,
      sort: {
        sortField,
        sortDirection,
      },
    }
    const users = await User.filter(filter).paginate(page, limit)
    return users
  }
}
