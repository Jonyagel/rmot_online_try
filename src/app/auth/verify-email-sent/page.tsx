// src/app/auth/verify-email-sent/page.tsx
"use client"
import { FiMail } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from './VerifyEmailSent.module.css';

export default function VerifyEmailSent() {
  const router = useRouter();

  return (
    <div className={styles.verifyEmailContainer}>
      <div className={styles.verifyEmailCard}>
        <div className={styles.verifyEmailIconWrapper}>
          <FiMail className={styles.verifyEmailIcon} />
        </div>
        
        <h2 className={styles.verifyEmailTitle}>מייל אימות נשלח</h2>
        
        <div className={styles.verifyEmailContent}>
          <p>נשלח אליך מייל עם הוראות לאימות החשבון.</p>
          <p>אנא בדוק את תיבת הדואר שלך (כולל תיקיית ספאם).</p>
        </div>

        <button 
          onClick={() => router.push('/auth/login')}
          className={styles.verifyEmailButton}
        >
          חזרה לדף ההתחברות
        </button>
      </div>
    </div>
  );
}