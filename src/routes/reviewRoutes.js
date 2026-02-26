const express = require('express');

const reviewController = require('../controllers/reviewController');
const {authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {reviewSchema, updateReviewSchema} = require('../validators/reviewSchema');

const router = express.Router();

router
  .route('/')
  .get(handle(() => reviewController.getAll()))
  .post(
    authenticate,
    validate(reviewSchema),
    handle((req) => {
      req.body.user = req.user.id;
      return reviewController.create(req);
    })
  );

router
  .route('/:id')
  .get(handle((req) => reviewController.getById(req.params.id)))
  .patch(
    authenticate,
    validate(updateReviewSchema),
    handle((req) => reviewController.update(req))
  )
  .delete(
    authenticate,
    handle((req) => reviewController.delete(req))
  );

module.exports = router;
