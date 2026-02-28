const express = require('express');

const reviewController = require('../controllers/reviewController');
const {authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  reviewSchema,
  updateReviewSchema
} = require('../validators/reviewSchema');

const router = express.Router();

router
  .route('/')
  .get(
    handle(() => {
      // #swagger.tags = ['Reviews']
      // #swagger.summary = 'Get all reviews'
      return reviewController.getAll();
    })
  )
  .post(
    authenticate,
    validate(reviewSchema),
    handle((req) => {
      // #swagger.tags = ['Reviews']
      // #swagger.summary = 'Create a review'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/reviewSchema" } } }
      } */
      req.body.user = req.user.id;
      return reviewController.create(req);
    })
  );

router
  .route('/:id')
  .get(
    handle((req) => {
      // #swagger.tags = ['Reviews']
      // #swagger.summary = 'Get review by ID'
      return reviewController.getById(req.params.id);
    })
  )
  .patch(
    authenticate,
    validate(updateReviewSchema),
    handle((req) => {
      // #swagger.tags = ['Reviews']
      // #swagger.summary = 'Update a review'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/updateReviewSchema" } } }
      } */
      return reviewController.update(req);
    })
  )
  .delete(
    authenticate,
    handle((req) => {
      // #swagger.tags = ['Reviews']
      // #swagger.summary = 'Delete a review'
      // #swagger.security = [{ "bearerAuth": [] }]
      return reviewController.delete(req);
    })
  );

module.exports = router;
