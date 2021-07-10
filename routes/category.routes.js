const express = require('express');

const router = express.Router();
const categoryApi = require('../controllers/categoryController');
const middlewareReponse = require('../middleware/response');

router.use('/product', require('./product.routes'));
router.get('/', categoryApi.getAllCategory, middlewareReponse.getAllResponse);
router.get(
  '/:slug',
  categoryApi.getSubCategory,
  middlewareReponse.getByIdResponse
);
router.post('/', categoryApi.createCategory, middlewareReponse.saveResponse);

module.exports = router;
