'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouteSchema extends Schema {
  up () {
    this.create('routes', table => {
      table.string('bulb_id').unique()
      table.boolean('status').default(false).notNullable()
    })
  }

  down () {
    this.drop('routes')
  }
}

module.exports = RouteSchema
