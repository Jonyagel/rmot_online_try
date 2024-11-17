"use client"

import React, { useRef, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/appContext';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import './signup.css';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const { data: session } = useSession();
  const router = useRouter();
  const { setIsLogin } = useAppContext();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!nameRef.current?.value || nameRef.current.value.length < 2) {
      newErrors.name = 'שם חייב להכיל לפחות 2 תווים';
      isValid = false;
    }

    if (!emailRef.current?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
      isValid = false;
    }

    if (!passRef.current?.value || passRef.current.value.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const doApi = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.message || 'שגיאה בהרשמה');
      }

      login(data.token, data.user);
      toast.success('נרשמת בהצלחה!');
      router.push('/userArea');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: '/' });
    } catch (error) {
      toast.error('שגיאה בהתחברות עם Google');
    }
  };

  return (
    <div className="signup-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="signup-form max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-center text-3xl font-bold mb-2">הצטרף אלינו היום</h2>
        <p className="text-center text-gray-600 mb-6">אנא הכנס את פרטיך כדי ליצור חשבון</p>
        
        <form onSubmit={doApi} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">שם מלא</label>
            <input
              ref={nameRef}
              className={`form-control ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
              placeholder="הכנס שם מלא..."
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">אימייל</label>
            <input
              ref={emailRef}
              className={`form-control ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
              placeholder="name@example.com"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">סיסמה</label>
            <div className="relative">
              <input
                ref={passRef}
                className={`form-control ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                type={showPassword ? "text" : "password"}
                placeholder="הכנס סיסמה..."
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary py-3 font-bold relative"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="spinner-border spinner-border-sm me-2"></span>
                טוען...
              </span>
            ) : (
              'הרשמה'
            )}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline-dark py-3 flex items-center justify-center gap-2"
          >
            <i className="bi bi-google"></i>
            הירשם עם Google
          </button>
        </form>

        <p className="text-center mt-6">
          כבר יש לך חשבון?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            התחבר כאן
          </Link>
        </p>
      </div>
    </div>
  );
}
