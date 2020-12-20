'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {
  static get incrementing () {
    return false
  }

  static get table () {
    return 'cars'
  }

  static get primaryKey () {
    return 'car_id'
  }

  static get updatedAtColumn () {
    return null
  }

  timestamps () {
    return this.hasMany('App/Models/Car', 'car_id', 'car_id')
  }

  owner () {
    return this.belongsTo('App/Models/House', 'house_id', 'house_id')
  }
}

module.exports = Car
