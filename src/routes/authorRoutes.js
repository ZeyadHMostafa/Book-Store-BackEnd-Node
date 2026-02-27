const express = require('express');

const authorController = require('../controllers/authorController');
const {authenticate, authorize} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const authorSchema = require('../validators/authorSchema');

const router = express.Router();

router
  .route('/')
  .get(handle((req) => authorController.getAll(req)))
  .post(
    authenticate,
    authorize('admin'),
    validate(authorSchema),
    handle((req) => authorController.create(req), 201)
  );

router
  .route('/:id')
  .get(handle((req) => authorController.getById(req)))
  .patch(
    authenticate,
    authorize('admin'),
    validate(authorSchema),
    handle((req) => authorController.update(req))
  )
  .delete(handle((req) => authorController.delete(req)));

module.exports = router;
