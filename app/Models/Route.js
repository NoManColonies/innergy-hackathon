'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Route extends Model {
  static get table () {
    return 'routes'
  }

  static get incrementing () {
    return false
  }

  static get primaryKey () {
    return 'bulb_id'
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }

  houses () {
    return this.belongsToMany(
      'App/Models/House',
      'bulb_id',
      'house_id',
      'bulb_id',
      'house_id'
    ).pivotModel('App/Models/HouseRoute')
  }
}

module.exports = Route
