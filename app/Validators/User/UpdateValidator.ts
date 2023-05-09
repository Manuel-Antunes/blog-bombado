import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({ trim: true }),
    avatar: schema.file.optional({
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    bio: schema.string.optional({ trim: true }),
    banner: schema.file.optional({
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'email.email': 'Email is invalid',
    'email.unique': 'Email is already taken',
    'password.minLength': 'Password must be at least 6 characters',
    'password.maxLength': 'Password must be less than 255 characters',
    'avatar.size': 'Avatar must be less than 10mb',
    'avatar.extnames': 'Avatar must be a valid image',
    'banner.size': 'Banner must be less than 10mb',
    'banner.extnames': 'Banner must be a valid image',
  }
}
