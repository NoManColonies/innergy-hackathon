'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', table => {
      table.string('car_id').unique()
      table.string('house_id')
      table.timestamps()

      table
        .foreign('house_id')
        .references('houses.house_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('cars')
  }
}

module.exports = CarSchema
