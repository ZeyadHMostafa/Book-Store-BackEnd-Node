const express = require('express');
const cartController = require('../controllers/cartController');
const {authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  cartItemSchema,
  removeFromCartSchema
} = require('../validators/cartSchema');

const router = express.Router();

router.use(authenticate);

router
  .route('/')
  .get(
    handle((req) => {
      // #swagger.tags = ['Cart']
      // #swagger.summary = 'Get current user cart'
      // #swagger.security = [{ "bearerAuth": [] }]
      return cartController.getCart(req.user.id);
    })
  )
  .post(
    validate(cartItemSchema),
    handle((req) => {
      // #swagger.tags = ['Cart']
      // #swagger.summary = 'Add/Update item in cart'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/cartItemSchema" } } }
      } */
      return cartController.upsertToCart(
        req.user.id,
        req.body.book,
        req.body.quantity
      );
    })
  );

router.route('/:bookId').delete(
  validate(null, removeFromCartSchema),
  handle((req) => {
    // #swagger.tags = ['Cart']
    // #swagger.summary = 'Remove item from cart'
    // #swagger.security = [{ "bearerAuth": [] }]
    return cartController.removeFromCart(req.user.id, req.params.bookId);
  })
);

module.exports = router;
