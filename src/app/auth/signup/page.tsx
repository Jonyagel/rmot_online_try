// src/app/auth/signup/page.tsx
import SignupForm from './components/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הרשמה | רמות אונליין',
  description: 'צור חשבון חדש ברמות אונליין'
};

export default function SignupPage() {
  return <SignupForm />;
}