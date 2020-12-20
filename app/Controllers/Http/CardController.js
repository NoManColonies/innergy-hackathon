'use strict'

// const HouseModel = use('App/Models/House')
// const HistoryModel = use('App/Models/History')
const CarModel = use('App/Models/Car')
const RouteModel = use('App/Models/HouseRoute')
const Route = use('App/Models/Route')

// const makeHouseUtil = require('../../../utils/houseUtils.func')
// const makeHistoryUtil = require('../../../utils/historyUtils.func')
const makeCarUtil = require('../../../utils/carUtils.func')
const makeRouteUtil = require('../../../utils/routeUtils.func')

class CardController {
  async scan ({ request, response }) {
    const { body } = request
    const { car_id } = body

    const car = await makeCarUtil(CarModel).getById(car_id, 'owner')

    if (car) {
      const timestamp = await car.timestamps().create({})

      return response.status(201).send({
        status: 'success',
        uuid: timestamp.uuid,
        routes: await RouteModel.query()
          .where({ house_id: car.toJSON().owner.house_id })
          .fetch(),
        durations: 30000
      })
    }
    return response.status(404).send({
      status: 'failed',
      message: 'id does not match car in database.'
    })
  }

  async scanCardID ({ request, response }) {
    const { body } = request
    const { card_id } = body

    const car = await CarModel.query()
      .with('owner', builder => builder.where({ card_id }))
      .first()

    if (car) {
      const timestamp = await car.timestamps().create({})

      const routes = await RouteModel.query()
        .where({ house_id: car.toJSON().owner.house_id })
        .setHidden(['uuid'])
        .fetch()

      const promises = routes
        .toJSON()
        .map(route => makeRouteUtil(Route).updateByID(route.bulb_id, { status: true }))

      await Promise.all(promises)

      return response.status(201).send({
        status: 'success',
        uuid: timestamp.uuid,
        routes,
        durations: 30000
      })
    }
    return response.status(404).send({
      status: 'failed',
      message: 'id does not match car in database.'
    })
  }
}

module.exports = CardController
