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
  handle((req) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Register a new user'
    /* #swagger.requestBody = {
          required: true,
          content: { "application/json": { schema: { $ref: "#/definitions/userSchema" } } }
    } */
    return userController.register(req.body);
  })
);

router.route('/login').post(
  validate(loginSchema),
  handle((req) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Login and receive JWT'
    /* #swagger.requestBody = {
          required: true,
          content: { "application/json": { schema: { $ref: "#/definitions/loginSchema" } } }
    } */
    return userController.acquireToken(req.body);
  })
);

router.use('/me', authenticate);
router
  .route('/me')
  .get(
    handle((req) => {
      // #swagger.tags = ['User']
      // #swagger.summary = 'Get current logged-in user profile'
      // #swagger.security = [{ "bearerAuth": [] }]
      return userController.getById(req.user.id);
    })
  )
  .patch(
    validate(updateUserSchema),
    handle((req) => {
      // #swagger.tags = ['User']
      // #swagger.summary = 'Update current user profile'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/updateUserSchema" } } }
      } */
      return userController.update(req.user.id, req.body);
    })
  );

module.exports = router;
