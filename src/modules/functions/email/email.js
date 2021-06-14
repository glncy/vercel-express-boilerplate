const nodemailer = require("nodemailer");

module.exports = async (settings, email) => {
  let transporter = nodemailer.createTransport({
    host: settings.HOST,
    port: settings.PORT,
    auth: {
      user: settings.USER,
      pass: settings.PASSW,
    },
  });

  let mailOptions = {
    from: `"${email.from_name}" <${email.from_email}>`,
    to: `${email.to_email}`,
    subject: `${email.subject}`,
    text: email.text !== undefined ? email.text : undefined, // Send Text Format
    html: email.html_content !== undefined ? email.html_content : undefined, // Send HTML Format
    attachments:
      email.attachments !== undefined ? [email.attachments] : undefined,
  };

  return transporter
    .sendMail(mailOptions)
    .then((data) => {
      return [data, null];
    })
    .catch((error) => {
      return [null, error];
    });
};
