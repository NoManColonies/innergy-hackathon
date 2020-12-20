'use strict'

const makeHouseUtil = require('../../../utils/houseUtils.func')
const makeRouteUtil = require('../../../utils/routeUtils.func')

const HouseModel = use('App/Models/House')
const RouteModel = use('App/Models/Route')

class HouseController {
  async index ({ request, response }) {
    const { references = '', perPage, onPage } = request.qs

    const houses = await makeHouseUtil(HouseModel).getAll(
      references,
      perPage,
      onPage
    )

    return response.status(200).send({
      status: 'success',
      data: houses
    })
  }

  async show ({ request, response }) {
    const { params, qs } = request

    const { references = '' } = qs

    const { id } = params

    const house = await makeHouseUtil(HouseModel).getById(id, references)

    return response.status(200).send({
      status: 'success',
      data: house
    })
  }

  async store ({ request, response }) {
    const { body } = request

    const { house_id, owner, routes, card_id } = body

    const house = await makeHouseUtil(HouseModel).create({
      house_id,
      owner,
      card_id
    })

    const promises = routes.map(route => makeRouteUtil(RouteModel).getById(route))

    const routeEntities = await Promise.all(promises)

    await house.routes().attach(routeEntities.map(route => route.bulb_id))

    return response.status(201).send({
      status: 'success',
      data: house
    })
  }

  async update ({ request, response }) {
    const { body, params, qs } = request

    const { house_id, owner } = body

    const { references } = qs

    const { id } = params

    const house = await makeHouseUtil(HouseModel).updateByID(
      id,
      { house_id, owner },
      references
    )

    return response.status(200).send({
      status: 'success',
      data: house
    })
  }

  async delete ({ request, response }) {
    const { id } = request.params

    const house = await makeHouseUtil(HouseModel).deleteByID(id)

    return response.status(200).send({
      status: 'success',
      data: house
    })
  }
}

module.exports = HouseController
