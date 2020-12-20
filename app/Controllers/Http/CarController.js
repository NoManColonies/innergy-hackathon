'use strict'

const makeCarUtil = require('../../../utils/carUtils.func')

const CarModel = use('App/Models/Car')

class CarController {
  async index ({ request, response }) {
    const { references = '', perPage, onPage } = request.qs

    const cars = await makeCarUtil(CarModel).getAll(references, perPage, onPage)

    return response.status(200).send({
      status: 'success',
      data: cars
    })
  }

  async show ({ request, response }) {
    const { params, qs } = request

    const { references = '' } = qs

    const { id } = params

    const car = await makeCarUtil(CarModel).getById(id, references)

    return response.status(200).send({
      status: 'success',
      data: car
    })
  }

  async store ({ request, response }) {
    const { body } = request

    const { car_id, house_id } = body

    const car = await makeCarUtil(CarModel).create({ car_id, house_id })

    return response.status(201).send({
      status: 'success',
      data: car
    })
  }

  async update ({ request, response }) {
    const { body, params, qs } = request

    const { car_id, house_id } = body

    const { references } = qs

    const { id } = params

    const car = await makeCarUtil(CarModel).updateByID(
      id,
      { car_id, house_id },
      references
    )

    return response.status(200).send({
      status: 'success',
      data: car
    })
  }

  async delete ({ request, response }) {
    const { id } = request.params

    const car = await makeCarUtil(CarModel).deleteByID(id)

    return response.status(200).send({
      status: 'success',
      data: car
    })
  }
}

module.exports = CarController
