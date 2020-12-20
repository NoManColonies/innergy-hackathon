'use strict'

const { v4: uuidv4 } = require('uuid')
const makeHistoryUtil = require('../../../utils/historyUtils.func')

const HistoryModel = use('App/Models/History')

class HistoryController {
  async index ({ request, response }) {
    const { references = '', perPage, onPage } = request.qs

    const histories = await makeHistoryUtil(HistoryModel).getAll(
      references,
      perPage,
      onPage
    )

    return response.status(200).send({
      status: 'success',
      data: histories
    })
  }

  async show ({ request, response }) {
    const { params, qs } = request

    const { references = '' } = qs

    const { id } = params

    const history = await makeHistoryUtil(HistoryModel).getById(id, references)

    return response.status(200).send({
      status: 'success',
      data: history
    })
  }

  async store ({ request, response }) {
    const { body } = request

    const { uuid = uuidv4(), car_id, type } = body

    const history = await makeHistoryUtil(HistoryModel).create({
      uuid,
      car_id,
      type
    })

    return response.status(201).send({
      status: 'success',
      data: history
    })
  }

  async update ({ request, response }) {
    const { body, params, qs } = request

    const { car_id, type } = body

    const { references } = qs

    const { id } = params

    const history = await makeHistoryUtil(HistoryModel).updateByID(
      id,
      { car_id, type },
      references
    )

    return response.status(200).send({
      status: 'success',
      data: history
    })
  }

  async delete ({ request, response }) {
    const { id } = request.params

    const history = await makeHistoryUtil(HistoryModel).deleteByID(id)

    return response.status(200).send({
      status: 'success',
      data: history
    })
  }
}

module.exports = HistoryController
