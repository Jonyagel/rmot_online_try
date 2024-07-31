"use client"
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [status, setStatus] = useState<string>('');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const sendMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (form.current) {
      try {
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
        setStatus('הודעה נשלחה בהצלחה!');
        form.current.reset();
      } catch (error) {
        console.error('שגיאה בשליחת האימייל:', error);
        setStatus('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.');
      }
    }
  };

  return (
    <form ref={form} onSubmit={sendMail}>
      <label>שם</label>
      <input className='form-control' type="text" name="from_name" />
      <label>אימייל</label>
      <input className='form-control' type="email" name="email_id" />
      <label>הודעה</label>
      <textarea className='form-control' name="content" />
      <input className='btn btn-info' type="submit" value="שלח" />
      {status && <p>{status}</p>}
    </form>
  );
}