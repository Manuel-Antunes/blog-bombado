import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  ManyToManyQueryBuilderContract,
  ModelQueryBuilderContract,
  afterCreate,
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

  @manyToMany(() => Post, {
    pivotTable: 'interactions',
    onQuery: (query: ManyToManyQueryBuilderContract<typeof Post, any>) => {
      query.where('type', 'like')
    },
  })
  public likes: ManyToMany<typeof Post>

  @manyToMany(() => Post, {
    pivotTable: 'interactions',
    onQuery: (query: ManyToManyQueryBuilderContract<typeof Post, any>) => {
      query.where('type', 'save')
    },
  })
  public saves: ManyToMany<typeof Post>

  @attachment({ folder: 'posts/images', preComputeUrl: true })
  public image: AttachmentContract

  @computed({
    serializeAs: 'likes_count',
  })
  public get likesCount() {
    return +this.$extras.likes_count || 0
  }

  @computed({
    serializeAs: 'saves_count',
  })
  public get savesCount() {
    return +this.$extras.saves_count || 0
  }

  @computed({
    serializeAs: 'liked',
  })
  public get liked() {
    if (this.$extras.liked !== undefined) {
      return !!+this.$extras.liked
    }
  }

  @computed({
    serializeAs: 'saved',
  })
  public get saved() {
    if (this.$extras.liked !== undefined) {
      return !!+this.$extras.saved
    }
  }

  public static withInteractions = scope((query, user: User) => {
    query.select(
      Database.from('interactions')
        .where('interactions.user_id', user!.id)
        .andWhereColumn('interactions.post_id', 'posts.id')
        .andWhere('interactions.type', 'like')
        .count('*')
        .as('liked')
    )
    query.select(
      Database.from('interactions')
        .where('interactions.user_id', user!.id)
        .andWhereColumn('interactions.post_id', 'posts.id')
        .andWhere('interactions.type', 'save')
        .count('*')
        .as('saved')
    )
  })

  @beforeFetch()
  @beforeFind()
  public static async eagerLoad(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('user')
    query.preload('category')
    query.select('*')
    query.select(
      Database.from('interactions')
        .andWhereColumn('interactions.post_id', 'posts.id')
        .andWhere('interactions.type', 'like')
        .count('id')
        .as('likes_count')
    )
    query.select(
      Database.from('interactions')
        .andWhereColumn('interactions.post_id', 'posts.id')
        .andWhere('interactions.type', 'save')
        .count('id')
        .as('saves_count')
    )
  }

  @afterCreate()
  public static async afterCreateHook(post: Post) {
    Event.emit('new:post', post)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
