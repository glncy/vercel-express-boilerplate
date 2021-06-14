const createError = require("http-errors");

module.exports = (roles) => {
  return (req, res, next) => {
    try {
      if (roles.indexOf(req.auth.role) >= 0) {
        next();
      } else {
        throw "unauthorized";
      }
    } catch (e) {
      next(createError(403));
    }
  };
};
