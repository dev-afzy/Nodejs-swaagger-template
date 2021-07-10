/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable max-len */

/**
 * Endpoints.
 * GET     /api/category              ->  index
 * POST    /api/category              ->  saveCategory
 * GET     /api/category/:id          ->  show
 */

const httpContext = require('express-http-context');
const debug = require('debug')('product-api:controllers/main-category');
require('express-async-errors');
const CategoryService = require('../services/categoryService');
const categoryModel = require('../models/categoryModel');
const { reference } = require('../utilities/constant');
const productModel = require('../models/productModel');
const categoryService = new CategoryService(
  { categoryModel, productModel },
  reference.category
);

const categoryApi = {
  createCategory: async (req, res, next) => {
    res.data = await categoryService.create(req.body);
    if (res.data) {
      return next();
    }
    debug(
      'Error occured while saving category data',
      httpContext.get('requestId')
    );
    throw new Error();
  },

  getSubCategory: async (req, res, next) => {
    const categoryRes = await categoryService.getSubCategory(req.params.slug);
    if (categoryRes) {
      res.data = categoryRes;
      return next();
    } else {
      debug(
        'Error occured while fetching perticular category',
        httpContext.get('requestId')
      );
    }
  },

  getAllCategory: async (req, res, next) => {
    const categoryRes = await categoryService.getCategoryWithCount();
    if (categoryRes) {
      const response = {
        status: true,
        category: categoryRes,
      };
      res.data = response;
      return next();
    } else {
      debug(
        'Error occured while fetching all category',
        httpContext.get('requestId')
      );
      throw new Error();
    }
  }
};

module.exports = categoryApi;
