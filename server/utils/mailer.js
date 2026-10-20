const nodemailer = require("nodemailer");

function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || user.includes("your.gmail") || pass.includes("your_gmail")) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function sendContactNotification({ name, email, message }) {
  const transporter = createTransporter();
  const notifyTo = process.env.NOTIFY_EMAIL || "sonividushi98@gmail.com";

  if (!transporter) {
    console.warn(
      "[mail] EMAIL_USER / EMAIL_PASS not configured. Skipping email notification."
    );
    return;
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: notifyTo,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}

module.exports = { sendContactNotification };
