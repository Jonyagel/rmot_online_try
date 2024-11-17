// src/components/SimpleChat.tsx
'use client'
import { useState, useRef, useEffect } from 'react';
import styles from './SimpleChat.module.css';

export default function SimpleChat() {
  const [messages, setMessages] = useState([{
    text: "שלום! במה אוכל לעזור?",
    isBot: true
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { 
        text: data.response,
        isBot: true
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        text: `שגיאה: ${error.message}`,
        isBot: true,
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`${styles.message} ${msg.isBot ? styles.bot : styles.user}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className={styles.loading}>
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="הקלד הודעה..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          שלח
        </button>
      </form>
    </div>
  );
}