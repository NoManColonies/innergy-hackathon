module.exports = HistoryModel => {
  const withReferences = references => {
    const historyInstance = HistoryModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => historyInstance.with(reference))
    }

    return historyInstance
  }

  return {
    // eslint-disable-next-line
    getAll: (references, perPage = 10, onPage = 1) => withReferences(references).paginate(onPage, perPage),
    getById: (uuid, references) => withReferences(references).where({ uuid }).first(),
    create: attributes => HistoryModel.create(attributes),
    updateByID: async (uuid, attributes, references) => {
      const history = await HistoryModel.find(uuid)

      history.merge(attributes)

      await history.save()

      return withReferences(references).where({ uuid }).first()
    },
    deleteByID: uuid => HistoryModel.find(uuid).then(query => query.delete())
  }
}
