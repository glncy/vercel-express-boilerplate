const { User } = require("./../services");
const { BaseView } = require("../modules/classes/Base.class");

class UserController extends BaseView {
  constructor(req, res, next) {
    super();
    super.init({ req, res, next });
    this.service = new User();
    this.templateView = "index";
  }

  async findAllView() {
    try {
      let [results, error] = await this.service.findAll();
      if (error) throw error;
      this.templateOptions.queryResult = results;
      super.render();
    } catch (e) {
      super.renderError(e);
    }
  }
}

module.exports = UserController;
