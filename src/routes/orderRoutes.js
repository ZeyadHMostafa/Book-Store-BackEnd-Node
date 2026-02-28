const express = require('express');
const orderController = require('../controllers/orderController');
const {authenticate, authorize} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  placeOrderSchema,
  updateOrderStatusSchema
} = require('../validators/orderSchema');

const router = express.Router();

router.use(authenticate);

router.route('/count').get(
  authorize('admin'),
  handle((req) => {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Count all orders (Admin)'
    // #swagger.security = [{ "bearerAuth": [] }]
    return orderController.count(req);
  })
);

router
  .route('/')
  .get(
    authorize('admin'),
    handle((req) => {
      // #swagger.tags = ['Orders']
      // #swagger.summary = 'Get all orders (Admin)'
      // #swagger.security = [{ "bearerAuth": [] }]
      return orderController.getAllOrders(req);
    })
  )
  .post(
    validate(placeOrderSchema),
    handle((req) => {
      // #swagger.tags = ['Orders']
      // #swagger.summary = 'Place a new order'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/placeOrderSchema" } } }
        } */
      return orderController.placeOrder(
        req.user.id,
        req.body.shippingAddress,
        req.body.phone,
        req.body.paymentMethod
      );
    }, 201)
  );

router.route('/my-orders').get(
  handle((req) => {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Get logged-in user orders'
    // #swagger.security = [{ "bearerAuth": [] }]
    return orderController.getMyOrders(req);
  })
);

router
  .route('/:id')
  .patch(
    authorize('admin'),
    validate(updateOrderStatusSchema),
    handle((req) => {
      // #swagger.tags = ['Orders']
      // #swagger.summary = 'Update order status (Admin)'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/updateOrderStatusSchema" } } }
      } */
      return orderController.updateStatus(req.params.id, req.body);
    })
  )
  .delete(
    authorize('admin'),
    handle((req) => {
      // #swagger.tags = ['Orders']
      // #swagger.summary = 'Delete an order (Admin)'
      // #swagger.security = [{ "bearerAuth": [] }]
      return orderController.delete(req.params.id);
    })
  );

module.exports = router;
