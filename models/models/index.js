const Sequelize = require("sequelize");
const modules = require("./modules");

module.exports = (config, force = false) => {
  let models = {};

  if (Object.keys(models).length && !force) {
    return models;
  }

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );

  modules.forEach((module) => {
    const model = module(sequelize, Sequelize);
    models[model.name] = model;
  });

  Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  return models;
};
