import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, ValidationException } from '@ioc:Adonis/Core/Validator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class ProfileController {
  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('Profile/Edit')
  }

  public async update({ request, auth, response, session }: HttpContextContract) {
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
    session.flash('success', {
      message: ['Profile updated successfully'],
    })

    return response.redirect().toRoute('profile.edit')
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        password: schema.string({}, []),
      }),
      messages: {
        'password.required': 'Password is required',
      },
    })
    try {
      await auth.use('web').verifyCredentials(auth.user?.email || '', request.input('password'))
    } catch (error) {
      throw new ValidationException(true, {
        current_password: ['Invalid credentials'],
      })
    }
    const user = auth.user!
    await auth.logout()
    await user!.delete()
    return response.redirect().toRoute('home')
  }
}
