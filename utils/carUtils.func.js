module.exports = CarModel => {
  const withReferences = references => {
    const carInstance = CarModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => carInstance.with(reference))
    }

    return carInstance
  }

  return {
    // eslint-disable-next-line
    getAll: (references, perPage = 10, onPage = 1) => withReferences(references).paginate(onPage, perPage),
    getById: (car_id, references) => withReferences(references).where({ car_id }).first(),
    create: attributes => CarModel.create(attributes),
    updateByID: async (car_id, attributes, references) => {
      const car = await CarModel.find(car_id)

      car.merge(attributes)

      await car.save()

      return withReferences(references).where({ car_id }).first()
    },
    deleteByID: car_id => CarModel.find(car_id).then(query => query.delete())
  }
}
