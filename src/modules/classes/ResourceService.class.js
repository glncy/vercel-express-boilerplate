const { getPagination, getPagingData } = require("../functions/pagination");

class ResourceService {
  constructor() {
    this.model = undefined;
    this.paginate = false;
    this.pageNumber = 1;
    this.pageSize = 10;
    this.strict = true;
  }

  async findAll(options = undefined) {
    try {
      this.checkModel();
      let result;
      if (this.paginate) {
        if (isNaN(this.pageNumber)) throw new Error("PaginationPageNotANumber");
        const { limit, offset } = getPagination(this.pageNumber, this.pageSize);
        if (typeof options === "object") {
          options.limit = limit;
          options.offset = offset;
          let data = await this.model.findAndCountAll(options);
          result = getPagingData(data, this.pageNumber, limit);
        } else {
          let data = await this.model.findAndCountAll({
            limit,
            offset,
          });
          result = getPagingData(data, this.pageNumber, limit);
        }
      } else {
        if (typeof options === "object") {
          result = await this.model.findAll(options);
        } else {
          result = await this.model.findAll();
        }
      }
      return [result, null];
    } catch (e) {
      return [null, e];
    }
  }

  async findOne(options = undefined) {
    try {
      this.checkModel();
      let result;
      if (typeof options === "object") {
        result = await this.model.findOne(options);
      } else {
        result = await this.model.findOne();
      }
      if (result) {
        return [result, null];
      } else {
        return [{}, null];
      }
    } catch (e) {
      return [null, e];
    }
  }

  async findByPk(pk, options = undefined) {
    try {
      this.checkModel();
      if (!isNaN(pk)) {
        let result;
        if (typeof options === "object") {
          result = await this.model.findByPk(pk, options);
        } else {
          result = await this.model.findByPk(pk);
        }
        if (result) {
          return [result, null];
        } else {
          return [{}, null];
        }
      } else {
        throw new Error("InvalidPkParameter");
      }
    } catch (e) {
      return [null, e];
    }
  }

  async create(body = {}, options = undefined) {
    try {
      this.checkModel();
      let result;
      if (typeof options === "object") {
        result = await this.model.create(body, options);
      } else {
        result = await this.model.create(body);
      }
      return [result, null];
    } catch (e) {
      return [null, e];
    }
  }

  async update(body = {}, options = undefined) {
    try {
      this.checkModel();
      let result;
      if (typeof options === "object") {
        if (!options.where) {
          if (this.strict) throw new StrictMode("StrictUpdateAllData");
          result = await this.model.update(body, options);
        } else result = await this.model.update(body, options);
      } else {
        if (this.strict) throw new StrictMode("StrictUpdateAllData");
        result = await this.model.update(body);
      }
      return [result, null];
    } catch (e) {
      return [null, e];
    }
  }

  async updateByPk(body = {}, pk, options = undefined) {
    try {
      this.checkModel();
      if (!isNaN(pk)) {
        let result;
        if (typeof options === "object") {
          if (!options.where) {
            options.where = {
              id: pk,
            };
          } else {
            options.where.id = pk;
          }
          result = await this.model.update(body, options);
        } else {
          options = {
            where: {
              id: pk,
            },
          };
          result = await this.model.update(body, options);
        }
        return [result, null];
      } else {
        throw new Error("InvalidPkParameter");
      }
    } catch (e) {
      return [null, e];
    }
  }

  async destroy(options = undefined) {
    try {
      this.checkModel();
      let result;
      if (typeof options === "object") {
        if (!options.where) {
          if (this.strict) throw new StrictMode("StrictDestroyAllData");
          result = await this.model.destroy(options);
        } else result = await this.model.destroy(options);
      } else {
        if (this.strict) throw new StrictMode("StrictDestroyAllData");
        result = await this.model.destroy();
      }
      return [result, null];
    } catch (e) {
      return [null, e];
    }
  }

  async deleteByPk(pk, options = undefined) {
    try {
      this.checkModel();
      if (!isNaN(pk)) {
        let result;
        if (typeof options === "object") {
          if (!options.where) {
            options.where = {
              id: pk,
            };
          } else {
            options.where.id = pk;
          }
          result = await this.model.destroy(body, options);
        } else {
          options = {
            where: {
              id: pk,
            },
          };
          result = await this.model.destroy(body, options);
        }
        return [result, null];
      } else {
        throw new Error("InvalidPkParameter");
      }
    } catch (e) {
      return [null, {}];
    }
  }

  checkModel() {
    if (this.model) {
      if (
        typeof this.model.findAll !== "function" &&
        typeof this.model.findAndCountAll !== "function" &&
        typeof this.model.findOne !== "function" &&
        typeof this.model.findByPk !== "function" &&
        typeof this.model.create !== "function" &&
        typeof this.model.update !== "function" &&
        typeof this.model.destroy !== "function"
      ) {
        throw new Error("NotAValidModel");
      }
    } else {
      throw new Error("NoModelAssigned");
    }
  }
}

function StrictMode(message) {
  this.message = message;
  this.name = "StrictMode";
}

module.exports = ResourceService;
