import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import { DateTime } from 'luxon'
import { generateAttachmentFromUrl } from '../../helpers/generateAttachmentFromUrl'
import CategoryFactory from './CategoryFactory'

export default Factory.define(Post, async ({ faker }) => {
  return {
    //
    title: faker.lorem.words(3),
    content: faker.lorem.paragraphs(3),
    description: faker.lorem.paragraph().slice(0, 255),
    createdAt: DateTime.fromJSDate(faker.date.past()),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
    image: await generateAttachmentFromUrl(
      'posts/images',
      faker.image.imageUrl(),
      faker.lorem.slug(3)
    ),
  }
})
  .relation('category', () => CategoryFactory)
  .build()
