/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable max-len */

/**
 * Endpoints.
 * GET         /api/v1/todo              ->  getTodos
 * POST        /api/v1/todo              ->  createTodo
 * GET         /api/v1/todo/:slug        ->  getTodo
 * PUT         /api/v1/todo/:id          ->  updateTodo
 * DELETE      /api/v1/todo/:id          ->  deleteTodo
 */

const debug = require('debug')('todo-api:controllers/todo');
require('express-async-errors');
const modelService = require('../services/modelService');
const todoModel = require('../models/todoModel');
const commonMethods = require('../utilities/common');
const todoService = new modelService(todoModel);

const todoApi = {
  createTodo: async (req, res, next) => {
    res.data = await todoService.create(req.body);
    if (res.data) {
      return next();
    }
    debug('Error occured while saving todo data');
    throw new Error();
  },

  getTodo: async (req, res, next) => {
    res.data = await todoService.getByslug(req.params.slug);
    if (res.data) {
      return next();
    } else {
      debug('Error occured while fetching perticular todo');
    }
  },

  getTodos: async (req, res, next) => {
    const filterResponse = await commonMethods.filterResponse(req.query);
    const todoRes = await todoService.getAll(filterResponse);
    const totalCount = await todoService.totalCount();
    if (todoRes) {
      const response = {
        count: totalCount,
        data: todoRes,
      };
      res.data = response;
      return next();
    } else {
      debug('Error occured while fetching all todos');
      throw new Error();
    }
  },

  updateTodo: async (req, res, next) => {
    const updateData = req.body;
    res.data = await todoService.updateOne(updateData, req.params.id);
    if (res.data) {
      return next();
    } else {
      debug('Error occured while updating Todo');
      throw new Error();
    }
  },

  deleteTodo: async (req, res, next) => {
    res.data = await todoService.deleteOne(req.params.id);
    if (res.data) {
      return next();
    } else {
      debug('Error occured while deleting Todo');
      throw new errors();
    }
  },
};

module.exports = todoApi;
