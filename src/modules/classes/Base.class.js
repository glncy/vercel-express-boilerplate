const createError = require("http-errors");
const { templatesDir } = require("./../../../directories");

class BaseView {
  constructor() {
    this.req = null;
    this.res = null;
    this.next = null;
    this._csrf = null;
  }

  init({ req, res, next }) {
    this.req = req;
    this.res = res;
    this.next = next;

    if (typeof req.csrfToken === "function") {
      this.templateOptions._csrf = req.csrfToken;
    }
  }

  render(templateView, templateOptions = {}) {
    try {
      templateOptions.dir = templatesDir;
      templateOptions._csrf = this._csrf ? this._csrf() : null;
      this.res.render(templateView, templateOptions);
    } catch (e) {
      e.message = "templateView was not set or invalid.";
      this.renderError(createError(e));
    }
  }

  redirect(url) {
    try {
      this.res.redirect(url);
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
  BaseAPIView,
};
