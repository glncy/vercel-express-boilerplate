const ejs = require("ejs");
const directories = require("./../../directories");
const email = require("./email");

/**
 *
 * @param {object} template - Email Template Settings
 * @param template.file - Email Template File. Must be in .ejs format. Must be have file extension. E.g. filename.ejs
 * @param {object} template.options - Email Template Options.
 * @param {object} settings - Email Settings for SMTP
 * @param settings.HOST - Server Host for Email Settings
 * @param settings.PORT - Port Number for Email Settings
 * @param settings.USER - Username or Email for Email Settings
 * @param settings.PASS - Password for Email Settings
 * @param {object} options - Email Message to be sent
 * @param options.from_name - Sender Name Display
 * @param options.from_email - Sender Email Display
 * @param options.to_email - Recepient Email
 * @param options.subject - Email Subject
 * @param options.attachments - Email Attachments
 * @param options.attachments.path - File Path of Attachment
 * @param options.attachments.cid - Content ID for Attachement Media
 *
 * @returns [success, error];
 */

module.exports = async (template, settings, options) => {
  try {
    options.html_content = await ejs.renderFile(
      `${directories.templatesDir}/email/${template.file}`,
      template.options
    );
    let [result, error] = await email(settings, options);
    if (error) throw error;
    return [result, null];
  } catch (e) {
    return [null, e];
  }
};
