const express = require('express');
const cartController = require('../controllers/cartController');
const {authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  addToCartSchema,
  removeFromCartSchema
} = require('../validators/cartSchema');

const router = express.Router();

router.use(authenticate);
router
  .route('/')
  .get(handle((req) => cartController.getCart(req.user.id)))
  .post(
    validate(addToCartSchema),
    handle((req) =>
      cartController.addToCart(req.user.id, req.body.book, req.body.quantity)
    )
  );

router.route('/:bookId').delete(
  validate(null, removeFromCartSchema),
  handle((req) => cartController.removeFromCart(req.user.id, req.params.bookId))
);

module.exports = router;
