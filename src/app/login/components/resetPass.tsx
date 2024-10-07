'use client'

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('הסיסמאות אינן תואמות');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        toast.success('הסיסמה שונתה בהצלחה');
        router.push('/login');
      } else {
        toast.error('אירעה שגיאה בעת שינוי הסיסמה');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('אירעה שגיאה. נא לנסות שוב מאוחר יותר');
    }
  };

  return (
    <div className="container mt-5">
      <h2>איפוס סיסמה</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">סיסמה חדשה</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">אימות סיסמה</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">שנה סיסמה</button>
      </form>
    </div>
  );
}