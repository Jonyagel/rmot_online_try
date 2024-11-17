// src/app/auth/components/AuthLayout.tsx
"use client"
import { motion } from 'framer-motion';
import './auth.css';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      <motion.div 
        className="auth-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}