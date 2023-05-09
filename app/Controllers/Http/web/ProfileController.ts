import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, ValidationException } from '@ioc:Adonis/Core/Validator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class ProfileController {
  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('Profile/Edit')
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const { avatar, banner, ...data } = await request.validate(UpdateValidator)
    const user = auth.user!
    user.merge({ ...data })
    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    if (banner) {
      user.banner = Attachment.fromFile(banner)
    }

    await user.save()
    if (user.$dirty.email) {
      user.hasVerifiedEmail = false
      await user.save()
    }
    return response.redirect().toRoute('profile.edit')
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        password: schema.string({}, []),
      }),
    })
    if (!(await auth.attempt(auth.user!.email, request.input('password')))) {
      throw new ValidationException(true, {
        password: 'Invalid password',
      })
    }
    await auth.logout()
    await auth.user!.delete()
    return response.redirect().toRoute('home')
  }
}
