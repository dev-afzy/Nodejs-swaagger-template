/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable max-len */

/**
 * Endpoints.
 * GET     /api/product              ->  index
 * POST    /api/product              ->  saveProduct
 * GET     /api/product/:slug        ->  show
 */

const httpContext = require('express-http-context');
const debug = require('debug')('product-api:controllers/main-product');
require('express-async-errors');
const ProductService = require('../services/productService');
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const common = require('../utilities/common');
const productService = new ProductService({ productModel, categoryModel }, []);

const productApi = {
  createProduct: async (req, res, next) => {
    res.data = await productService.save(req.body);
    if (res.data) {
      return next();
    }
    debug(
      'Error occured while saving product data',
      httpContext.get('requestId')
    );
    throw new Error();
  },

  getProductBycategory: async (req, res, next) => {
    const productRes = await productService.getProductBycategory(
      req.params.slug
    );
    if (productRes) {
      if (productRes.length > 0) {
        const { products, count } = productRes[0];
        res.data = { products, count };
      } else {
        res.data = productRes;
      }
      return next();
    } else {
      debug(
        'Error occured while fetching perticular product',
        httpContext.get('requestId')
      );
    }
  },

  getAllProducts: async (req, res, next) => {
    const obj = await common.filterResponse(req.query);
    const totalCountRes = await productService.totalCount();
    const productRes = await productService.getAll(obj);
    if (productRes) {
      const response = {
        status: true,
        totalCount: totalCountRes,
        products: productRes,
      };
      res.data = response;
      return next();
    } else {
      debug(
        'Error occured while fetching all product',
        httpContext.get('requestId')
      );
      throw new Error();
    }
  },
};

module.exports = productApi;
