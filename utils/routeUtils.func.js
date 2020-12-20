module.exports = RouteModel => {
  const withReferences = references => {
    const RouteInstance = RouteModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => RouteInstance.with(reference))
    }

    return RouteInstance
  }

  return {
    // eslint-disable-next-line
    getAll: (references, perPage = 10, onPage = 1) => withReferences(references).paginate(onPage, perPage),
    getById: (bulb_id, references) => withReferences(references).where({ bulb_id }).first(),
    create: attributes => RouteModel.create(attributes),
    updateByID: async (bulb_id, attributes, references) => {
      const house = await RouteModel.find(bulb_id)

      house.merge(attributes)

      await house.save()

      return withReferences(references).where({ bulb_id }).first()
    },
    deleteByID: bulb_id => RouteModel.find(bulb_id).then(query => query.delete())
  }
}
