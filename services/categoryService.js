const ReferenceModelService = require('./referencedModelService');

class CategoryService extends ReferenceModelService {
  constructor({ categoryModel, productModel }, reference) {
    super(categoryModel, reference);
    this.Model = categoryModel;
    this.productModel = productModel;
    this.reference = reference;
  }

  async create(data) {
    const parentcategory = await this.Model.findById(data.parent);
    if (parentcategory) {
      delete data.parent;
      parentcategory
        .addChild(data)
        .then((result) => result)
        .catch((err) => err);
    }

    const model = new this.Model(data);
    model
      .save()
      .then((result) => result)
      .catch((err) => err);
  }

  getAllCategory() {
    this.Model.find()
      .sort({ parent: 1 })
      .populate(this.reference)
      .exec()
      .then((result) => result)
      .catch((err) => err);
  }

  getCategoryWithCount() {
    const aggrgagateQuery = [
      {
        $lookup: {
          from: 'categories',
          localField: 'headersections',
          foreignField: '_id',
          as: 'category_docs',
        },
      },
      {
        $unwind: '$category_docs',
      },
      {
        $group: {
          _id: '$headersections',
          name: { $first: '$category_docs.name' },
          slug: { $first: '$category_docs.slug' },
          count: { $sum: 1 },
        },
      },
    ];

    this.productModel
      .aggregate(aggrgagateQuery)
      .then((result) => result)
      .catch((err) => err);
  }

  getSubCategory(slug) {
    this.Model.findOne({
      slug,
    })
      .populate({
        path: 'children',
        select: ['name', 'children', 'slug'],
        populate: {
          path: 'children',
          select: ['name', 'children', 'slug'],
        },
      })
      .exec()
      .then((result) => result)
      .catch((err) => err);
  }
}

module.exports = CategoryService;
