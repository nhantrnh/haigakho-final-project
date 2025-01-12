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

exports.sendResetPasswordEmail = async (user, token) => {
  const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password",
    html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
  };

  return transporter.sendMail(mailOptions);
};
