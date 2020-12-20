'use strict'

const Drive = use('Drive')

class ImageController {
  async downloadImage ({ request, response }) {
    const { id } = request.params

    const file = await Drive.disk('s3').getSignedUrl(`cars/${id}`)

    return response.status(200).send({
      status: 'success',
      data: file
    })
  }

  async uploadImage ({ request, response }) {
    const { id } = request.params

    try {
      request.multipart.file(
        'credential_image',
        { types: ['image'], size: '2mb', extnames: ['png', 'jpg', 'jpeg'] },
        async file => {
          await Drive.disk('s3').put(`cars/${id}.${file.extname}`, file.stream)
        }
      )

      await request.multipart.process()

      return response.status(201).send({ status: 'success' })
    } catch (e) {
      return response.status(500).send({
        status: 'failed',
        message: e.toString()
      })
    }
  }
}

module.exports = ImageController
