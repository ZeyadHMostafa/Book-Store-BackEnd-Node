const express = require('express');

const categoryController = require('../controllers/categoryController');
const {authenticate, authorize} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const categorySchema = require('../validators/categorySchema');

const router = express.Router();
router.route('/count').get(
  handle((req) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get total number of categories'
    return categoryController.count(req);
  })
);

router
  .route('/')
  .get(
    handle((req) => {
      // #swagger.tags = ['Categories']
      // #swagger.summary = 'List all categories'
      return categoryController.getAll(req);
    })
  )
  .post(
    authenticate,
    authorize('admin'),
    validate(categorySchema),
    handle((req) => {
      // #swagger.tags = ['Categories']
      // #swagger.summary = 'Create a new category'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/categorySchema" } } }
      } */
      return categoryController.create(req);
    }, 201)
  );

router
  .route('/:id')
  .get(
    handle((req) => {
      // #swagger.tags = ['Categories']
      // #swagger.summary = 'Get category by ID'
      return categoryController.getById(req);
    })
  )
  .patch(
    authenticate,
    authorize('admin'),
    validate(categorySchema),
    handle((req) => {
      // #swagger.tags = ['Categories']
      // #swagger.summary = 'Update category details'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/categorySchema" } } }
      } */
      return categoryController.update(req);
    })
  )
  .delete(
    authenticate,
    authorize('admin'),
    handle((req) => {
      // #swagger.tags = ['Categories']
      // #swagger.summary = 'Delete a category'
      // #swagger.security = [{ "bearerAuth": [] }]
      return categoryController.delete(req);
    })
  );

module.exports = router;
