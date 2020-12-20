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
    return this.hasOne('App/Models/Car', 'house_id', 'house_id')
  }

  routes () {
    return this.belongsToMany(
      'App/Models/Route',
      'house_id',
      'bulb_id',
      'house_id',
      'bulb_id'
    ).pivotModel('App/Models/HouseRoute')
  }
}

module.exports = House
