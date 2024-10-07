'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setIsVerified(true);
          toast.success('האימייל אומת בהצלחה');
          setTimeout(() => router.push('/login'), 3000);
        } else {
          toast.error('אירעה שגיאה באימות האימייל');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        toast.error('אירעה שגיאה. נא לנסות שוב מאוחר יותר');
      }
    };

    if (email) {
      verifyEmail();
    }
  }, [email, router]);

  return (
    <div className="container mt-5">
      <h2>אימות אימייל</h2>
      {isVerified ? (
        <p>האימייל אומת בהצלחה. מעביר אותך לדף ההתחברות...</p>
      ) : (
        <p>מאמת את האימייל שלך...</p>
      )}
    </div>
  );
}