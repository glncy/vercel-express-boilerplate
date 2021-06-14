const createError = require("http-errors");

class BaseView {
  constructor(){
    this.req = null;
    this.res = null;
    this.next = null;
    this.templateOptions = {};
    this.templateView = null;
  }

  init({ req, res, next }){
    this.req = req;
    this.res = res;
    this.next = next;

    if (typeof req.csrfToken === "function") {
      this.templateOptions._csrf = req.csrfToken;
    }
  }

  render(templateView = this.templateView, templateOptions = this.templateOptions) {
    try {
      this.res.render(templateView, templateOptions);
    } catch (e) {
      e.message = "templateView was not set or invalid.";
      this.renderError(createError(e));
    }
  }

  redirect() {
    try {
      this.res.redirect(this.redirectUrl);
    } catch (e) {
      this.renderError(createError(e));
    }
  }

  renderError(error) {
    this.next(createError(error));
  }
}

class BaseAPIView {
  // TODO: For RESTful API
}

module.exports = {
  BaseView,
  BaseAPIView
};
