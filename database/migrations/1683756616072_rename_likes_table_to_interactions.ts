import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'likes'
  protected newTableName = 'interactions'

  public async up() {
    await this.db.rawQuery(`ALTER TABLE ${this.tableName} RENAME TO ${this.newTableName};`).exec()
  }

  public async down() {
    await this.db.rawQuery(`ALTER TABLE ${this.newTableName} RENAME TO ${this.tableName};`).exec()
  }
}
