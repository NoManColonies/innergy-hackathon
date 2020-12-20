'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const { v4: uuidv4 } = require('uuid')

class HouseRoute extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async instance => {
      instance.uuid = uuidv4()
    })
  }

  static get table () {
    return 'house_routes'
  }

  static get incrementing () {
    return false
  }

  static get primaryKey () {
    return 'uuid'
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }
}

module.exports = HouseRoute
