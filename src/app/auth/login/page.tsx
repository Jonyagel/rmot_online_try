// src/app/auth/login/page.tsx
import LoginForm from './components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'התחברות | רמות אונליין',
  description: 'התחבר לחשבון שלך ברמות אונליין'
};

export default function LoginPage() {
  return <LoginForm />;
}