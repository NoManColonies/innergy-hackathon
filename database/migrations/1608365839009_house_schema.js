'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HouseSchema extends Schema {
  up () {
    this.create('houses', table => {
      table.string('house_id').unique()
      table.string('card_id').notNullable().unique()
      table.string('owner').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('houses')
  }
}

module.exports = HouseSchema
