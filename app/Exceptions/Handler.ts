/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  protected disableStatusPagesInDevelopment = false

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    const { response, session } = ctx

    if (['E_INVALID_AUTH_PASSWORD', 'E_INVALID_AUTH_UID'].includes(error.code)) {
      session.flash('errors', { login: error.message })
      return response.redirect('/login')
    }
    super.handle(error, ctx)
  }

  constructor() {
    super(Logger)
  }
}
