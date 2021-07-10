const express = require('express');

const router = express.Router();
const todoApi = require('../controllers/todoController');
const middlewareReponse = require('../middleware/response');

router.get('/', todoApi.getTodos, middlewareReponse.getAllResponse);
router.get('/:slug', todoApi.getTodo, middlewareReponse.getByIdResponse);
router.post('/', todoApi.createTodo, middlewareReponse.saveResponse);
router.put('/:id', todoApi.updateTodo, middlewareReponse.updateResponse);
router.delete('/:id', todoApi.deleteTodo, middlewareReponse.deleteResponse);

module.exports = router;
