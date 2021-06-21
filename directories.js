const path = require("path");

module.exports = {
  templatesDir: path.join(__dirname, "src/views/templates"),
  assetsDir: path.join(__dirname, "src/views/assets"),
  googleServiceAccount: path.join(__dirname, "serviceAccountCredentials.json"),
};
