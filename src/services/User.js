const ResourceService = require("../modules/classes/ResourceService.class");
const { User } = require("./../../models");

class UserService extends ResourceService {
  constructor() {
    super();
    this.model = User;
  }
}

module.exports = UserService;
