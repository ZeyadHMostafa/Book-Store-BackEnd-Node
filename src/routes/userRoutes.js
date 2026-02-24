const express = require('express');

const userController = require('../controllers/userController');
const {authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  userSchema,
  loginSchema,
  updateUserSchema
} = require('../validators/userSchema');

const router = express.Router();

router.route('/register').post(
  validate(userSchema),
  handle((req) => userController.register(req.body))
);

router.route('/login').post(
  validate(loginSchema),
  handle((req) => userController.acquireToken(req.body))
);

router.use('/me', authenticate);
router
  .route('/me')
  .get(handle((req) => userController.getById(req.user.id)))
  .patch(
    validate(updateUserSchema),
    handle((req) => userController.update(req.user.id, req.body))
  );

module.exports = router;
