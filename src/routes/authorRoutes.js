const express = require('express');

const authorController = require('../controllers/authorController');
const {authenticate, authorize} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const authorSchema = require('../validators/authorSchema');

const router = express.Router();
router.route('/count').get(
  handle((req) => {
    // #swagger.tags = ['Authors']
    // #swagger.summary = 'Get total number of authors'
    return authorController.count(req);
  })
);

router
  .route('/')
  .get(
    handle((req) => {
      // #swagger.tags = ['Authors']
      // #swagger.summary = 'List all authors'
      return authorController.getAll(req);
    })
  )
  .post(
    authenticate,
    authorize('admin'),
    validate(authorSchema),
    handle((req) => {
      // #swagger.tags = ['Authors']
      // #swagger.summary = 'Create a new author'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/authorSchema" } } }
      } */
      return authorController.create(req);
    }, 201)
  );

router
  .route('/:id')
  .get(
    handle((req) => {
      // #swagger.tags = ['Authors']
      // #swagger.summary = 'Get author by ID'
      return authorController.getById(req);
    })
  )
  .patch(
    authenticate,
    authorize('admin'),
    validate(authorSchema),
    handle((req) => {
      // #swagger.tags = ['Authors']
      // #swagger.summary = 'Update author details'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/authorSchema" } } }
      } */
      return authorController.update(req);
    })
  )
  .delete(
    authenticate,
    authorize('admin'),
    handle((req) => {
      // #swagger.tags = ['Authors']
      // #swagger.summary = 'Delete an author'
      // #swagger.security = [{ "bearerAuth": [] }]
      return authorController.delete(req);
    })
  );

module.exports = router;
