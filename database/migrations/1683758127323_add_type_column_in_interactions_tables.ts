import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'interactions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('type', ['like', 'save']).notNullable().defaultTo('like')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type')
    })
  }
}
