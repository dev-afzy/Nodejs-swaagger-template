const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const todoApi = require('../controllers/todoController');
const middlewareReponse = require('../middleware/response');

// Create Todo request limit to 120 Todos per hour
const createTodoLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 120, // start blocking after 120 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

router.get('/', todoApi.getTodos, middlewareReponse.getAllResponse);
router.get('/:slug', todoApi.getTodo, middlewareReponse.getByIdResponse);
router.post(
  '/',
  createTodoLimiter,
  todoApi.createTodo,
  middlewareReponse.saveResponse
);
router.put('/:id', todoApi.updateTodo, middlewareReponse.updateResponse);
router.delete('/:id', todoApi.deleteTodo, middlewareReponse.deleteResponse);

module.exports = router;
