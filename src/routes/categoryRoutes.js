const express = require('express');

const categoryController = require('../controllers/categoryController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const categorySchema = require('../validators/categorySchema');

const router = express.Router();

router
  .route('/')
  .get(handle(() => categoryController.getAll()))
  .post(
    validate(categorySchema),
    handle((req) => categoryController.create(req.body))
  );

router
  .route('/:id')
  .get(handle((req) => categoryController.getById(req.params.id)))
  .patch(
    validate(categorySchema),
    handle((req) => categoryController.update(req.params.id, req.body))
  )
  .delete(handle((req) => categoryController.delete(req.params.id)));

module.exports = router;
