import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary(),
      table.string('name'),
      table.integer('team_id').references('id').inTable('departments')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
