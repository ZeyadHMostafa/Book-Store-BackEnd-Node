const express = require('express');

const bookController = require('../controllers/bookController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const bookSchema = require('../validators/bookSchema');

const router = express.Router();

router
  .route('/')
  .get(handle(() => bookController.getAll()))
  .post(
    validate(bookSchema),
    handle((req) => bookController.create(req.body))
  );

router
  .route('/:id')
  .get(handle((req) => bookController.getById(req.params.id)))
  .patch(
    validate(bookSchema),
    handle((req) => bookController.update(req.params.id, req.body))
  )
  .delete(handle((req) => bookController.delete(req.params.id)));

module.exports = router;
