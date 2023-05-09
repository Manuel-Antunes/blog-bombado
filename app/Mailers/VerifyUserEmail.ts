import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import mjml2html from 'mjml'

export default class VerifyUserEmail extends BaseMailer {
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
   * "VerifyUserEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */

  private user: User
  private signedUrl: string

  constructor({ user, signedUrl }: { user: User; signedUrl: string }) {
    super()
    this.user = user
    this.signedUrl = signedUrl
  }

  public async prepare(message: MessageContract) {
    message
      .subject('Verify User Email')
      .from(Env.get('MAIL_FROM'))
      .to(this.user.email)
      .html(
        mjml2html(
          await View.render('emails/verify-user-email', {
            name: this.user.name,
            url: Env.get('APP_URL') + this.signedUrl,
          })
        ).html
      )
  }
}
