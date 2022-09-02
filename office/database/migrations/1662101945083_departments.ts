import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary(),
      table.string('name'),
      table.string('shift')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
