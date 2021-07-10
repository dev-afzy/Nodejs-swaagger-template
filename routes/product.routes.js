const express = require('express');

const router = express.Router();
const productApi = require('../controllers/productController');
const middlewareReponse = require('../middleware/response');

router.get('/', productApi.getAllProducts, middlewareReponse.getAllResponse);
router.get(
  '/:slug',
  productApi.getProductBycategory,
  middlewareReponse.getByIdResponse
);
router.post('/', productApi.createProduct, middlewareReponse.saveResponse);

module.exports = router;
