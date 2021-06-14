const classExporter = require("./../modules/functions/classExporter");

module.exports = {
  User: classExporter(require("./User")),
};
