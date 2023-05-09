import Route from '@ioc:Adonis/Core/Route'
import { JobContract } from '@ioc:Rocketseat/Bull'
import PasswordResetEmail from 'App/Mailers/PasswordResetEmail'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class PasswordReset implements JobContract {
  public key = 'PasswordReset'

  public async handle(job) {
    const { data } = job

    const signedUrl = Route.makeSignedUrl(
      'recovery',
      { email: data.user.email },
      { expiresIn: '1h' }
    )

    await new PasswordResetEmail({ user: data.user, signedUrl }).send()

    // Do somethign with you job data
  }
}
