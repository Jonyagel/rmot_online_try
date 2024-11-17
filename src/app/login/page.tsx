"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoginForm from './components/loginForm';
import Link from 'next/link';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="login-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="login-form max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-center text-3xl font-bold mb-2">ברוכים הבאים!</h2>
        <p className="text-center text-gray-600 mb-6">התחבר לחשבונך</p>
        
        <LoginForm />

        <p className="text-center mt-6">
          עדיין אין לך חשבון?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            הירשם כאן
          </Link>
        </p>
      </div>
    </div>
  );
}
