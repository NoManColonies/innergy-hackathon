'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HouseRouteSchema extends Schema {
  up () {
    this.create('house_routes', table => {
      table.uuid('uuid').unique()
      table.string('house_id').notNullable()
      table.string('bulb_id').notNullable()

      table
        .foreign('house_id')
        .references('houses.house_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .foreign('bulb_id')
        .references('routes.bulb_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('house_routes')
  }
}

module.exports = HouseRouteSchema
