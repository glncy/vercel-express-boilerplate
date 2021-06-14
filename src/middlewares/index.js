const classExporter = require("./../modules/functions/classExporter");

// Classes
const middlewares = {
  Auth: classExporter(require("./Auth"))
};

// Functions
middlewares.Auth.haveRole = require("./Auth.haveRole");

// Export
module.exports = middlewares;
