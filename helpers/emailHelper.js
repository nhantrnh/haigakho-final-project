const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendActivationEmail = async (user, token) => {
  const activationUrl = `${process.env.BASE_URL}/activate/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Activate Your Account",
    html: `
      <h1>Welcome to HAGAKO</h1>
      <p>Please click the link below to activate your account:</p>
      <a href="${activationUrl}">${activationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
