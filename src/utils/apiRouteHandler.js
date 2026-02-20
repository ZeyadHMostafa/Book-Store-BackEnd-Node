const logger = require('../config/logger');

const handle = (controllerAction, status = 200) => {
  return async (req, res, next) => {
    const result = await controllerAction(req);

    logger.info({path: req.path, method: req.method}, 'Request Successful');

    res.status(status).json({
      success: true,
      data: result
    });
  };
};

module.exports = handle;
