"use strict";

const crypto = require("crypto");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const SALT_KEY = process.env.SALT_KEY;
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

function hash(text) {
  let hash = crypto.createHash("md5").update(text).digest("hex");
  return hash;
}

function passwordHash(password) {
  let hash = crypto
    .createHash("md5")
    .update(
      `${SALT_KEY}_${ENCRYPTION_KEY}_${password}_${ENCRYPTION_KEY}_${SALT_KEY}`
    )
    .digest("hex");
  return hash;
}

module.exports = {
  encrypt,
  decrypt,
  hash,
  passwordHash,
};
