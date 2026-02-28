const express = require('express');
const authController = require('../controllers/authController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const {
  verifyResetCodeSchema,
  updatePasswordSchema,
  forgotPasswordSchema
} = require('../validators/userSchema');

const router = express.Router();

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  handle((req) => authController.forgotPassword(req.body))
);

router.post(
  '/verify-reset-code',
  validate(verifyResetCodeSchema),
  handle((req) => authController.verifyResetCode(req.body))
);

router.post(
  '/update-password',
  validate(updatePasswordSchema),
  handle((req) => authController.updatePassword(req.body))
);

module.exports = router;
