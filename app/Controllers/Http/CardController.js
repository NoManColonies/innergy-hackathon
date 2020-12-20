'use strict'

const HouseModel = use('App/Models/House')
// const HistoryModel = use('App/Models/History')
const CarModel = use('App/Models/Car')
const RouteModel = use('App/Models/HouseRoute')
const Route = use('App/Models/Route')

// const makeHouseUtil = require('../../../utils/houseUtils.func')
// const makeHistoryUtil = require('../../../utils/historyUtils.func')
const axios = require('axios')
const makeCarUtil = require('../../../utils/carUtils.func')
const makeRouteUtil = require('../../../utils/routeUtils.func')

const channel = {
  '01A': 1,
  '02A': 2,
  '03A': 3,
  '04A': 4,
  '05A': 5,
  '06A': 6,
  '07A': 7,
  '08A': 8,
  '09A': 9,
  '10A': 10,
  '11A': 11,
  '12A': 12,
  '13A': 13,
  '14A': 14,
  '15A': 15,
  '16A': 16
}

const API_ENDPOINT = 'http://139.59.254.197:1880'

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

    // const car = await CarModel.query()
    //   .with('owner', builder => builder.where({ card_id }))
    //   .fetch()
    const car = await HouseModel.query()
      .where({ card_id })
      .with('cars.owner')
      .first()
      .then(query => query.getRelated('cars'))

    if (car) {
      const timestamp = await car.timestamps().create({})

      console.log(car.toJSON())
      const routes = await RouteModel.query()
        .where({ house_id: car.toJSON().owner.house_id })
        .setHidden(['uuid'])
        .fetch()

      const promises = routes
        .toJSON()
        .map(route => makeRouteUtil(Route).updateByID(route.bulb_id, { status: true }))

      await Promise.all(promises)

      try {
        await axios({
          method: 'get',
          url: `${API_ENDPOINT}/barrier/on?time=10`
        })
      } catch (e) {
        console.log(e)
      }

      const temp = routes.toJSON().map(route => axios({
        method: 'get',
        url: `${API_ENDPOINT}/lamp?ch=${channel[route.bulb_id]}&time=10`
      }))

      await Promise.all(temp)

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
