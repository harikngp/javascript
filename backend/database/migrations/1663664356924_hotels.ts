import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('manager')
      table.integer('building_no')
      table.string('street')
      table.string('area')
      table.string('district')
      table.integer('pincode')
      table.string('email')
      table.integer('customer_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}