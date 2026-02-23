const express = require('express');
const orderController = require('../controllers/orderController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  placeOrderSchema,
  updateOrderStatusSchema
} = require('../validators/orderSchema');

const router = express.Router();

router
  .route('/')
  // TODO: add admin validation for this get route
  .get(handle(() => orderController.getAllOrders()))
  .post(
    validate(placeOrderSchema),
    handle(
      (req) =>
        orderController.placeOrder(
          req.user._id,
          req.body.shippingAddress,
          req.body.paymentMethod
        ),
      201
    )
  );

router
  .route('/my-orders')
  .get(handle((req) => orderController.getMyOrders(req.user._id)));

router
  .route('/:id')
  // TODO add admin validation for this route
  .patch(
    validate(updateOrderStatusSchema),
    handle((req) => orderController.updateStatus(req.params.id, req.body))
  );

module.exports = router;
