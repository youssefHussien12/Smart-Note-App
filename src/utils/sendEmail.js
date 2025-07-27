// utils/sendEmail.js
import { createTransport } from "nodemailer";

export const sendEmail = async ({
    to,
    subject,
    message,
    attachments = []
} = {}) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: '"Youssef Foo Koch" <yossefhussienm@gmail.com>',
        to,
        subject,
        html: message,
        attachments,
    });

    return info.accepted.length ? true : false;
};







