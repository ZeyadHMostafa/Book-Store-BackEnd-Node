const express = require('express');

const authorController = require('../controllers/authorController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const authorSchema = require('../validators/authorSchema');

const router = express.Router();

router
  .route('/')
  .get(handle((req) => authorController.getAll(req)))
  .post(
    validate(authorSchema),
    handle((req) => authorController.create(req), 201)
  );

router
  .route('/:id')
  .get(handle((req) => authorController.getById(req)))
  .patch(
    validate(authorSchema),
    handle((req) => authorController.update(req))
  )
  .delete(handle((req) => authorController.delete(req)));

module.exports = router;
