import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Device from 'App/Models/Device'

export default class DevicesController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { token } = await request.validate({
      schema: schema.create({
        token: schema.string({}, [rules.required()]),
      }),
      messages: {
        'token.required': 'Token is required',
      },
    })
    const device = await Device.firstOrCreate(
      {
        token,
      },
      {
        userId: auth.user!.id,
        token: token,
      }
    )
    return response.status(201).json(device)
  }
}
