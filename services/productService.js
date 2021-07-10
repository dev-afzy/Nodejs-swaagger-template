var mongoose = require('mongoose');
const ReferenceModelService = require('./referencedModelService');

class ProductService extends ReferenceModelService {
  constructor({ productModel, categoryModel }, reference) {
    super(productModel, reference);
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  async getProductCount() {
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

  async getProductBycategory(slug) {
    const category = await this.categoryModel.findOne({ slug });
    if (category) {
      if (!category.parent) {
        return this.productModel.aggregate([
          {
            $match: { headersections: category._id },
          },
          {
            $group: {
              _id: category._id,
              products: { $push: '$$ROOT' },
              count: { $sum: 1 },
            },
          },
        ]);
      }
      const catogeryList = category.children.map((child) =>
        mongoose.Types.ObjectId(child._id)
      );
      catogeryList.push(mongoose.Types.ObjectId(category._id));
      return this.productModel.aggregate([
        {
          $match: {
            categories: {
              $in: catogeryList,
            },
          },
        },
        {
          $group: {
            _id: category._id,
            products: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
      ]);
      // const { count, products } = product[0];
      // return product;
    } else {
      return {
        status: true,
        total: 0,
        Products: [],
      };
    }
  }
}

module.exports = ProductService;
