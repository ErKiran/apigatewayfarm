const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");

async function initNodemailer() {
  const { EMAIL, PASSWORD } = process.env;
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  return transporter;
}

async function compileTemplate(email, code) {
  try {
    const readFileAsync = promisify(fs.readFile);
    const html = await readFileAsync("./templates/mail.html", {
      encoding: "utf-8",
    });
    const template = handlebars.compile(html);
    const replacements = {
      username: email.split("@")[0],
      code,
    };
    return template(replacements);
  } catch (err) {
    throw new Error(`Can't compile Template ${err}`);
  }
}

async function verifyAccount(email, code) {
  try {
    const transporter = await initNodemailer();
    const html = await compileTemplate(email, code);
    await transporter.sendMail({
      from: `Krishi Kranti <krishi@gmail.com>`,
      to: email,
      subject: "Verify Account",
      text: "Verify Email",
      html,
    });
  } catch (err) {
    throw new Error(`Can't Send Mail to verify Account ${err}`);
  }
}

module.exports = {
  verifyAccount,
};
