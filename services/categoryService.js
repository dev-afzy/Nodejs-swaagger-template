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
      return parentcategory.addChild(data);
    }

    const model = new this.Model(data);
    return model.save();
  }

  getAllCategory() {
    return this.Model.find()
      .sort({ parent: 1 })
      .populate(this.reference)
      .exec();
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

    return this.productModel.aggregate(aggrgagateQuery);
  }

  getSubCategory(slug) {
    return this.Model.findOne({
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
      .exec();
  }
}

module.exports = CategoryService;
