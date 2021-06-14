// For Controllers and Middlewares Only

module.exports = (LoadedClass) => {
  let classMethods = {};
  Object.getOwnPropertyNames(LoadedClass.prototype).map((method) => {
    classMethods[method] = async (req, res, next) => {
      const importedClass = new LoadedClass(req, res, next);
      if (typeof importedClass[method] === "function") {
        importedClass[method]();
      } else {
        throw notExistError;
      }
    };
  });
  return classMethods;
};
