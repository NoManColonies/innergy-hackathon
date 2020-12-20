'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class House extends Model {
  static get table () {
    return 'houses'
  }

  static get incrementing () {
    return false
  }

  static get primaryKey () {
    return 'house_id'
  }

  static get updatedAtColumn () {
    return null
  }

  cars () {
    return this.hasMany('App/Models/Car', 'house_id', 'house_id')
  }
}

module.exports = House
