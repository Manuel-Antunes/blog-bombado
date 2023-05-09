import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/Category'
import { DateTime } from 'luxon'

export default Factory.define(Category, ({ faker }) => {
  return {
    //
    name: faker.lorem.words(3),
    slug: faker.lorem.slug(3),
    createdAt: DateTime.fromJSDate(faker.date.past()),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
  }
}).build()
