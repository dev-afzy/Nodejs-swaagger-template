const mongoose = require('mongoose');

class ReferenceModelService  {
  constructor(model, reference) {
    this.reference = reference;
    this.Model = model;
  }

  // List all records along with details
  async getAll(obj) {
    let refResultobject = '';
    const query = obj.query || {};
    const skip = parseInt(obj.pageSize, 10) * (parseInt(obj.pageNo, 10) - 1);
    const resultObject = this.Model.find(query);
    if (this.reference.length > 0) {
      this.reference.forEach((element) => {
        refResultobject = resultObject.populate(element);
      });
    } else {
      refResultobject = resultObject;
    }
    console.log(obj);
    const result = await refResultobject
      .skip(skip)
      .limit(parseInt(obj.pageSize, 10))
      .sort({
        [obj.sortColumn]: parseInt(obj.sortValue, 10),
      });
    return result;
  }

  // Get count of total documents
  async totalCount() {
    const totalCount = await this.Model.countDocuments();
    return totalCount;
  }

  // Save Date
  async save(data) {
    const model = new this.Model(data);
    return model.save();
  }
}
module.exports = ReferenceModelService;
