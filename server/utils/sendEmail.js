// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // MUST BE `true` for port 465
    auth: {
        user: process.env.EMAIL_USER, // e.g., "no-reply@igxl.ink"
        pass: process.env.EMAIL_PASS, // Use App Password if 2FA is ON
    },
    logger: true, // Helps debug
    debug: true,
});

async function sendEmail(to, subject, text) {
    console.log("Using email:", process.env.EMAIL_USER);
    try {
        const info = await transporter.sendMail({
            from: `"IGxLinks" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
}

module.exports = sendEmail;
