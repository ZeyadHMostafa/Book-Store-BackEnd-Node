const {logger} = require('../config/logger');

const handle = (controllerAction, status = 200) => {
  return async (req, res, next) => {
    const result = await controllerAction(req);

    logger.info({path: req.path, method: req.method}, 'Request Successful');
    const responsePayload = {
      success: true
    };
    if (Array.isArray(result)) {
      responsePayload.results = result.length;
    }
    responsePayload.data = result;

    res.status(status).json(responsePayload);
  };
};

module.exports = handle;
