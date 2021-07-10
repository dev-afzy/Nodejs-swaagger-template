class ModelService {
  constructor(model) {
    this.Model = model;
  }

  /**
   * Save or create new record.
   * @param {Object} data
   * @return {Object}
   * */
  create(data) {
    const dataModel = new this.Model(data);
    return dataModel
      .save()
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * Get record by document ID.
   * @param {String} slug
   * @return {array}
   * */
  getByslug(slug) {
    return this.Model.find({ slug: slug })
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * List all records with filter, sort, skip and limit.
   * @param {Object} obj
   * @return {array}
   * */
  getAll(obj) {
    const query = obj.query || {};
    const skip = parseInt(obj.pageSize, 10) * (parseInt(obj.pageNo, 10) - 1);
    return this.Model.find(query)
      .skip(skip)
      .limit(parseInt(obj.pageSize, 10))
      .sort({
        [obj.sortColumn]: parseInt(obj.sortValue, 10),
      })
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * Update one record by doucment ID.
   * @param {Object} data
   * @param {string} id
   * @return {object}
   * */
  updateOne(data, id) {
    return this.Model.updateOne({ _id: id }, { $set: { data } })
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * Update one record by doucment ID.
   * @param {Object} data
   * @param {string} id
   * @return {object}
   * */
  deleteOne(id) {
    return this.Model.deleteOne({ _id: id })
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * Get count of total documents
   * @return {number}
   * */
  totalCount() {
    return this.Model.countDocuments()
      .then((data) => data)
      .catch((err) => err);
  }
}
module.exports = ModelService;
