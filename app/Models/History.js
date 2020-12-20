'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')

class History extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', timestampInstance => {
      timestampInstance.uuid = uuidv4()
    })
  }

  static get table () {
    return 'histories'
  }

  static get incrementing () {
    return false
  }

  static get primaryKey () {
    return 'uuid'
  }

  static get createdAtColumn () {
    return 'timestamp'
  }

  static get updatedAtColumn () {
    return null
  }

  car () {
    return this.belongsTo('App/Models/Car', 'car_id', 'car_id')
  }
}

module.exports = History
