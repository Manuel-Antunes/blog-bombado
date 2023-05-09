import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import mjml2html from 'mjml'

export default class PasswordResetEmail extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "PasswordResetEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  private signedUrl: string
  private user: User

  constructor({ signedUrl, user }: { user: User; signedUrl: string }) {
    super()
    this.signedUrl = signedUrl
    this.user = user
  }

  public async prepare(message: MessageContract) {
    message
      .subject('Password Reset Email')
      .from(Env.get('MAIL_FROM'))
      .to(this.user.email)
      .html(
        mjml2html(
          await View.render('emails/password-reset-email', {
            name: this.user.name,
            url: `${Env.get('APP_URL')}${this.signedUrl}`,
          })
        ).html
      )
  }
}
