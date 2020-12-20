'use strict'

const RouteModel = use('App/Models/Route')

const makeRouteUtil = require('../../../utils/routeUtils.func')

class RouteController {
  async index ({ request, response }) {
    const { references = '', onPage, perPage } = request.qs

    const bulbs = await makeRouteUtil(RouteModel).getAll(
      references,
      perPage,
      onPage
    )

    return response.status(200).send({
      status: 'success',
      data: bulbs
    })
  }

  async show ({ request, response }) {
    const { qs, params } = request

    const { references } = qs

    const { id } = params

    const bulb = await makeRouteUtil(RouteModel).getById(id, references)

    return response.status(200).send({
      status: 'success',
      data: bulb
    })
  }

  async store ({ request, response }) {
    const { id } = request.body

    const bulb = await makeRouteUtil(RouteModel).create({ bulb_id: id })

    return response.status(201).send({
      status: 'success',
      data: bulb
    })
  }
}

module.exports = RouteController
