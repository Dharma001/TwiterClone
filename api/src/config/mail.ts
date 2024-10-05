<<<<<<< HEAD
=======
// config/mail.ts
>>>>>>> 458983b3b3dc32b11236103f953b6620e9587a0b
export const mailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.EMAIL_PORT) || 2525,
  auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || '',
  },
  from: 'no-reply@example.com',
};
