const { verify } = require("./../modules/functions/token");
const { BaseView } = require("./../modules/classes/Base.class");

class Auth extends BaseView {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async isAuthenticated() {
    try {
      if (this.req.cookies.token !== undefined) {
        let [result, error] = await verify(this.req.cookies.token);
        if (error) throw error;
        this.req["auth"] = {};
        this.req.auth.id = result.id;
        this.req.auth.role = result.role;
        this.req.auth.firstName = result.firstName;
        this.req.auth.lastName = result.lastName;
        this.next();
      } else {
        this.res.redirect("/admin/staff-login");
      }
    } catch (e) {
      this.res.clearCookie("token");
      super.renderError(403);
    }
  }

  async isUnauthenticated() {
    if (this.req.cookies.token !== undefined) {
      this.res.redirect("/admin/dashboard");
    } else {
      this.next();
    }
  }
}

module.exports = Auth;
