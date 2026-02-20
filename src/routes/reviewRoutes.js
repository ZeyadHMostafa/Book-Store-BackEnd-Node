const express = require('express');

const reviewController = require('../controllers/reviewController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const reviewSchema = require('../validators/reviewSchema');

const router = express.Router();

router.route('/')
  .get(handle(() => reviewController.getAll()))
  .post(
    validate(reviewSchema),
    handle((req) => reviewController.create(req.body))
  );

router.route('/:id')
  .get(handle((req) => reviewController.getById(req.params.id)))
  .patch(
    validate(reviewSchema),
    handle((req) => reviewController.update(req.params.id, req.body))
  )
  .delete(
    handle((req) => reviewController.delete(req.params.id))
  );

module.exports = router;
