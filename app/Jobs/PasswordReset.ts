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

    await new PasswordResetEmail({ user: data.user, signedUrl: data.signedUrl }).send()

    // Do somethign with you job data
  }
}
