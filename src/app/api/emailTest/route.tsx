import type { NextApiRequest, NextApiResponse } from 'next'
import emailjs from '@emailjs/nodejs';

emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  privateKey: process.env.EMAILJS_PRIVATE_KEY!, // זה צריך להיות מוגדר ב-.env.local
});

export default async function POST(req: any, route: any) {
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        req.body
      );
      route.status(200).json({ result: result.text });
    } catch (error) {
        route.status(500).json({ error: 'Failed to send email' });
    }
}