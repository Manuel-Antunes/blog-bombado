import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
  computed,
  manyToMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public description: string

  @column()
  public categoryId: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @manyToMany(() => User, {
    pivotTable: 'likes',
  })
  public likes: ManyToMany<typeof User>

  @attachment({ folder: 'posts/images', preComputeUrl: true })
  public image: AttachmentContract

  @computed({
    serializeAs: 'likes_count',
  })
  public get likesCount() {
    return +this.$extras.likes_count || 0
  }

  @computed({
    serializeAs: 'liked',
  })
  public get liked() {
    if (this.$extras.liked !== undefined) {
      return !!+this.$extras.liked
    }
  }

  public static liked = scope((query, user: User) => {
    query.select(
      Database.from('likes')
        .where('likes.user_id', user!.id)
        .andWhereColumn('likes.post_id', 'posts.id')
        .count('*')
        .as('liked')
    )
  })

  @beforeFetch()
  @beforeFind()
  public static async eagerLoad(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('user')
    query.preload('category')
    query.select('*')
    query.select(
      Database.from('likes')
        .andWhereColumn('likes.post_id', 'posts.id')
        .count('id')
        .as('likes_count')
    )
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
