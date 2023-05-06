import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  public sort(value: any): void {
    this.$query.orderBy(value.sortField, value.sortDirection)
  }

  public createdAt(value: any): void {
    this.$query.whereBetween('created_at', [value.start, value.end])
  }

  public search(search: string) {
    this.$query.where('name', 'ilike', `%${search}%`)
    this.$query.orWhere('email', 'ilike', `%${search}%`)
  }

  public email(email: string) {
    this.$query.where('email', 'ilike', `%${email}%`)
  }

  public name(name: string) {
    this.$query.where('name', 'ilike', `%${name}%`)
  }
}
