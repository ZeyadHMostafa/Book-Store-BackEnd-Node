const express = require('express');
const cartController = require('../controllers/cartController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  addToCartSchema,
  removeFromCartSchema
} = require('../validators/cartSchema');

const router = express.Router();

router
  .route('/')
  .get(handle((req) => cartController.getCart(req.user._id)))
  .post(
    validate(addToCartSchema),
    handle((req) =>
      cartController.addToCart(req.user._id, req.body.book, req.body.quantity)
    )
  );

router.route('/:bookId').delete(
  validate(null, removeFromCartSchema),
  handle((req) =>
    cartController.removeFromCart(req.user._id, req.params.bookId)
  )
);

module.exports = router;
