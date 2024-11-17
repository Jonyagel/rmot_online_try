// src/app/auth/verify-success/page.tsx
"use client"
import { FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from './VerifySuccess.module.css';

export default function VerifySuccess() {
  const router = useRouter();

  return (
    <div className={styles.verifySuccessContainer}>
      <div className={styles.verifySuccessCard}>
        <div className={styles.verifySuccessIconWrapper}>
          <FiCheckCircle className={styles.verifySuccessIcon} />
        </div>
        
        <h2 className={styles.verifySuccessTitle}>החשבון אומת בהצלחה!</h2>
        
        <div className={styles.verifySuccessContent}>
          <p>כעת תוכל להתחבר למערכת</p>
        </div>

        <button 
          onClick={() => router.push('/auth/login')}
          className={styles.verifySuccessButton}
        >
          להתחברות
        </button>
      </div>
    </div>
  );
}