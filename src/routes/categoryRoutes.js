const express = require('express');

const categoryController = require('../controllers/categoryController');
const {authenticate, authorize} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const categorySchema = require('../validators/categorySchema');

const router = express.Router();

router.route('/count').get(handle((req) => categoryController.count(req)));

router
  .route('/')
  .get(handle((req) => categoryController.getAll(req)))
  .post(
    authenticate,
    authorize('admin'),
    validate(categorySchema),
    handle((req) => categoryController.create(req), 201)
  );

router
  .route('/:id')
  .get(handle((req) => categoryController.getById(req)))
  .patch(
    authenticate,
    authorize('admin'),
    validate(categorySchema),
    handle((req) => categoryController.update(req))
  )
  .delete(handle((req) => categoryController.delete(req)));

module.exports = router;
