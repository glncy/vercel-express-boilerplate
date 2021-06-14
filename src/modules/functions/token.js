const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; 

async function create(payload) {
  try {
    let token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d",
    });
    return [token, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
}

async function verify(token) {
  try {
    let result = await jwt.verify(token, JWT_SECRET);
    return [result, null];
  } catch (e) {
    return [null, e];
  }
}

module.exports = {
  create,
  verify,
};
