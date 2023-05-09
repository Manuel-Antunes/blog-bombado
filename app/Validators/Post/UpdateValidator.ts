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
    title: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.minLength(3)]),
    content: schema.string.optional({ trim: true }, [rules.maxLength(2000), rules.minLength(3)]),
    category_id: schema.number.optional([rules.exists({ table: 'categories', column: 'id' })]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.minLength(3)]),
    image: schema.file.optional({
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
    'title.maxLength': 'Title must be less than 255 characters',
    'title.minLength': 'Title must be more than 3 characters',
    'content.maxLength': 'Content must be less than 2000 characters',
    'content.minLength': 'Content must be more than 3 characters',
    'category_id.exists': 'Category does not exist',
    'description.maxLength': 'Description must be less than 255 characters',
    'description.minLength': 'Description must be more than 3 characters',
    'image.size': 'Image must be less than 10mb',
    'image.extnames': 'Image must be a jpg, png, or jpeg',
  }
}
