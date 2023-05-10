import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import Hash from '@ioc:Adonis/Core/Hash'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  BaseModel,
  HasMany,
  ManyToMany,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  beforeSave,
  column,
  computed,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { Notifiable } from '@ioc:Verful/Notification/Mixins'
import crypto from 'crypto'
import { DateTime } from 'luxon'
import Device from './Device'
import UserFilter from './Filters/UserFilter'
import Post from './Post'

export default class User extends compose(BaseModel, Filterable, Notifiable('notifications')) {
  public static $filter = () => UserFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public bio: string

  @attachment({ folder: 'users/avatars', preComputeUrl: true })
  public avatar: AttachmentContract

  @attachment({ folder: 'users/banners', preComputeUrl: true })
  public banner: AttachmentContract

  @column({ serializeAs: null })
  public password?: string

  @column()
  public hasVerifiedEmail: boolean

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public admin: boolean

  @computed({
    serializeAs: 'photo_url',
  })
  public get photoUrl() {
    if (this.avatar) {
      return this.avatar.url
    } else {
      const mailHash = crypto.createHash('md5').update(this.email).digest('hex')
      return `https://www.gravatar.com/avatar/${mailHash}?s=80&d=robohash`
    }
  }

  @computed({
    serializeAs: 'followers_count',
  })
  public get followersCount() {
    return +this.$extras.followers_count || 0
  }

  @computed({
    serializeAs: 'likes_count',
  })
  public get likesCount() {
    return +this.$extras.likes_count || 0
  }

  @computed({
    serializeAs: 'following_count',
  })
  public get followingCount() {
    return +this.$extras.following_count || 0
  }

  @manyToMany(() => Post, {
    pivotTable: 'likes',
  })
  public likes: ManyToMany<typeof Post>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'follower_id',
    pivotRelatedForeignKey: 'following_id',
  })
  public followers: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'following_id',
    pivotRelatedForeignKey: 'follower_id',
  })
  public following: ManyToMany<typeof User>

  @hasMany(() => Device)
  public devices: HasMany<typeof Device>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  @beforeFetch()
  public static async eagerLoad(query: ModelQueryBuilderContract<typeof User>) {
    query.select('*')
    query.select(
      query.client.raw('(SELECT COUNT(*) FROM likes WHERE likes.user_id = users.id) AS likes_count')
    )
    query.select(
      query.client.raw(
        '(SELECT COUNT(*) FROM follows WHERE follows.follower_id = users.id) AS followers_count'
      )
    )
    query.select(
      query.client.raw(
        '(SELECT COUNT(*) FROM follows WHERE follows.following_id = users.id) AS following_count'
      )
    )
  }
}
