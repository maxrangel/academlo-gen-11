const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
  constructor(to) {
    this.to = to;
  }

  // Create a connection with an email service
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }

    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  // Send the actual email
  async send(template, subject, emailData) {
    // Get the pug file that needs to be send
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      emailData
    );

    await this.newTransport().sendMail({
      from: 'maximiliano.urbina@academlo.com',
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  // Send an email to newly created account
  async sendWelcome(name) {
    await this.send('welcome', 'New account', { name });
  }

  // Send an email when a post is published
  async sendPostNotice() {
    await this.send('postNotice', '', {});
  }
}

module.exports = { Email };
