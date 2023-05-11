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

    await new VerifyUserEmail({ user: data.user, signedUrl: data.signedUrl }).send()
    // Do somethign with you job data
  }
}
