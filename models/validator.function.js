const requiredString = (name, message = undefined) => {
  let defaultMsg = {
    notNull: `Required ${name} field`,
    notEmpty: `Field ${name} should not be empty.`,
  };
  return {
    notNull: {
      msg:
        message !== undefined
          ? message.notNull !== undefined
            ? message.notNull
            : defaultMsg.notNull
          : defaultMsg.notNull,
    },
    notEmpty: {
      msg:
        message !== undefined
          ? message.notEmpty !== undefined
            ? message.notEmpty
            : defaultMsg.notEmpty
          : defaultMsg.notEmpty,
    },
  };
};

const requiredInteger = (name) => {
  return {
    notNull: {
      msg: `Required ${name} field`,
    },
    isInt: {
      msg: `Field ${name} should be integer.`,
    },
  };
};

const requiredFloat = (name) => {
  return {
    notNull: {
      msg: `Required ${name} field`,
    },
    isFloat: {
      msg: `Field ${name} should be float.`,
    },
  };
};

const requiredDecimal = (name) => {
  return {
    notNull: {
      msg: `Required ${name} field`,
    },
    isDecimal: {
      msg: `Field ${name} should be decimal.`,
    },
  };
};

const requiredEmail = (name) => {
  return {
    notNull: {
      msg: `Required ${name} field`,
    },
    isEmail: {
      msg: `Field ${name} should be email.`,
    },
  };
};

const requiredIP = (name) => {
  return {
    notNull: {
      msg: `Required ${name} field`,
    },
    isIP: {
      msg: `Field ${name} should be IPv4 Format.`,
    },
  };
};

module.exports = {
  requiredString,
  requiredInteger,
  requiredFloat,
  requiredDecimal,
  requiredEmail,
  requiredIP,
};
