const express = require('express');

const categoryController = require('../controllers/categoryController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const categorySchema = require('../validators/categorySchema');

const router = express.Router();

router
  .route('/')
  .get(handle((req) => categoryController.getAll(req)))
  .post(
    validate(categorySchema),
    handle((req) => categoryController.create(req), 201)
  );

router
  .route('/:id')
  .get(handle((req) => categoryController.getById(req)))
  .patch(
    validate(categorySchema),
    handle((req) => categoryController.update(req))
  )
  .delete(handle((req) => categoryController.delete(req)));

module.exports = router;
