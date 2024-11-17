// src/lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendResetEmail(to: string, resetLink: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'איפוס סיסמה - רמות אונליין',
    html: `
      <div dir="rtl">
        <h2>איפוס סיסמה</h2>
        <p>קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
        <p>לחץ על הקישור הבא כדי לאפס את הסיסמה:</p>
        <a href="${resetLink}">איפוס סיסמה</a>
        <p>הקישור תקף ל-24 שעות.</p>
        <p>אם לא ביקשת לאפס את הסיסמה, אנא התעלם ממייל זה.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}