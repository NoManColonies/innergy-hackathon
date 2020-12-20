'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', table => {
      table.uuid('uuid').unique()
      table.string('car_id').notNullable()
      table.string('type').default('arrive').notNullable()
      table.timestamp('timestamp')

      table
        .foreign('car_id')
        .references('cars.car_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
