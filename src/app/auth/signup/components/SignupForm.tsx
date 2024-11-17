// src/app/auth/signup/SignupForm.tsx
"use client"
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import '../../components/AuthForm.css';
import emailjs from '@emailjs/browser';
import { saveAuthToken } from '../../../../utils/auth';

export default function SignupForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    if (!nameRef.current?.value || nameRef.current.value.length < 2) {
      toast.error('שם חייב להכיל לפחות 2 תווים');
      return false;
    }

    if (!emailRef.current?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
      toast.error('אימייל לא תקין');
      return false;
    }

    if (!passwordRef.current?.value || passwordRef.current.value.length < 6) {
      toast.error('סיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }

    return true;
  };

  // Update sendVerificationEmail function to accept token
  const sendVerificationEmail = async (email: string, name: string, token: string) => {
    try {
      const templateParams = {
        to_email: email,
        to_name: name,
        verification_link: `${window.location.origin}/api/auth/verify?token=${token}`,
      };

      await emailjs.send(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2}`,
        templateParams,
        `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`
      );

      toast.success('נשלח מייל אימות לכתובת שהזנת');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('שגיאה בשליחת מייל האימות');
    }
  };

  // Update handleSubmit to get token from API response
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // שמירת הטוקן בשני המקומות
        saveAuthToken(data.token, data.user);
        
        await sendVerificationEmail(
          emailRef.current?.value || '',
          nameRef.current?.value || '',
          data.token // Pass token from API response
        );
        router.push('/auth/verify-email-sent');
      } else {
        toast.error(data.message || 'שגיאה בהרשמה');
      }
    } catch (error) {
      toast.error('שגיאה בהרשמה, נסה שוב');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn('google', {
        callbackUrl: '/profile',
        redirect: true // שינוי ל-true
      });
    } catch (error) {
      toast.error('שגיאה בהתחברות עם Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>הרשמה</h2>
        
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="google-auth-button"
        >
          <FcGoogle className="google-icon" />
          {isGoogleLoading ? 'מתחבר...' : 'המשך עם Google'}
        </button>

        <div className="divider">
          <span>או</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>שם מלא</label>
            <input
              ref={nameRef}
              type="text"
              required
              placeholder="הכנס שם מלא"
            />
          </div>

          <div className="form-group">
            <label>אימייל</label>
            <input
              ref={emailRef}
              type="email"
              required
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group">
            <label>סיסמה</label>
            <input
              ref={passwordRef}
              type="password"
              required
              placeholder="לפחות 6 תווים"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'נרשם...' : 'הרשמה'}
          </button>
        </form>

        <p className="auth-links">
          יש לך כבר חשבון?{' '}
          <Link href="/auth/login">התחבר כאן</Link>
        </p>
      </div>
    </div>
  );
}
