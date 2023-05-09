import Route from '@ioc:Adonis/Core/Route'
import { JobContract } from '@ioc:Rocketseat/Bull'
import VerifyUserEmail from 'App/Mailers/VerifyUserEmail'

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

export default class VerifyUser implements JobContract {
  public key = 'VerifyUser'

  public async handle(job) {
    const { data } = job

    const signedUrl = Route.makeSignedUrl(
      'recovery',
      { email: data.user.email },
      { expiresIn: '1h' }
    )

    await new VerifyUserEmail({ user: data.user, signedUrl }).send()
    // Do somethign with you job data
  }
}
