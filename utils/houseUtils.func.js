module.exports = HouseModel => {
  const withReferences = references => {
    const houseInstance = HouseModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => houseInstance.with(reference))
    }

    return houseInstance
  }

  return {
    // eslint-disable-next-line
    getAll: (references, perPage = 10, onPage = 1) => withReferences(references).paginate(onPage, perPage),
    getById: (house_id, references) => withReferences(references).where({ house_id }).first(),
    create: attributes => HouseModel.create(attributes),
    updateByID: async (house_id, attributes, references) => {
      const house = await HouseModel.find(house_id)

      house.merge(attributes)

      await house.save()

      return withReferences(references).where({ house_id }).first()
    },
    deleteByID: house_id => HouseModel.find(house_id).then(query => query.delete())
  }
}
