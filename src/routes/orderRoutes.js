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
router
  .route('/')
  .get(
    authorize('admin'),
    handle(() => orderController.getAllOrders())
  )
  .post(
    validate(placeOrderSchema),
    handle(
      (req) =>
        orderController.placeOrder(
          req.user.id,
          req.body.shippingAddress,
          req.body.paymentMethod
        ),
      201
    )
  );

router
  .route('/my-orders')
  .get(handle((req) => orderController.getMyOrders(req.user.id)));

router
  .route('/:id')
  .patch(
    authorize('admin'),
    validate(updateOrderStatusSchema),
    handle((req) => orderController.updateStatus(req.params.id, req.body))
  )
  .delete(
    authorize('admin'),
    handle((req) => orderController.delete(req.params.id))
  );

module.exports = router;
