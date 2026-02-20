const express = require('express');

const cartController = require('../controllers/cartController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const cartSchema = require('../validators/cartSchema');

const router = express.Router();

router.route('/')
  .get(handle(() => cartController.getAll()))
  .post(
    validate(cartSchema),
    handle((req) => cartController.create(req.body))
  );

router.route('/:id')
  .get(handle((req) => cartController.getById(req.params.id)))
  .patch(
    validate(cartSchema),
    handle((req) => cartController.update(req.params.id, req.body))
  )
  .delete(
    handle((req) => cartController.delete(req.params.id))
  );

module.exports = router;
