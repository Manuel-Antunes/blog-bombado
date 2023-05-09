import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { generateAttachmentFromUrl } from '../../helpers/generateAttachmentFromUrl'
import PostFactory from './PostFactory'

export default Factory.define(User, async ({ faker }) => {
  return {
    //
    admin: faker.datatype.boolean(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    bio: faker.lorem.paragraph(),
    hasVerifiedEmail: faker.datatype.boolean(),
    rememberMeToken: faker.datatype.uuid(),
    avatar: await generateAttachmentFromUrl(
      'users/avatars',
      faker.image.avatar(),
      faker.lorem.slug(3)
    ),
    banner: await generateAttachmentFromUrl(
      'users/banners',
      faker.image.imageUrl(),
      faker.lorem.slug(3)
    ),
    createdAt: DateTime.fromJSDate(faker.date.past()),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
  }
})
  .state('admin', (user) => {
    user.admin = true
  })
  .state('notVerified', (user) => {
    user.hasVerifiedEmail = false
  })
  .state('notAdmin', (user) => {
    user.admin = false
  })
  .state('verified', (user) => {
    user.hasVerifiedEmail = true
  })
  .relation('posts', () => PostFactory)
  .build()
