// src/components/ChatBot/ChatBot.tsx
'use client'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatBot.module.css';
import { SearchResultCard } from './SearchResults';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    text: string,
    isBot: boolean,
    source?: 'AI' | 'search',
    noResults?: boolean,
    results?: {
      businesses?: any[],
      realEstate?: any[],
      forums?: any[]
    }
  }[]>([
    {
      text: "שלום! אני כאן כדי לעזור. במה אוכל לסייע לך?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const userId = useRef(Math.random().toString(36).substr(2, 9));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI
    setMessages(prev => [...prev, { 
      text: input, 
      isBot: false 
    }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: userId.current // For conversation tracking
        })
      });

      if (!res.ok) {
        throw new Error(`שגיאת שרת: ${res.status}`);
      }

      const data = await res.json();
      
      // Add bot response to UI
      setMessages(prev => [...prev, {
        text: data.response,
        isBot: true
      }]);

    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        text: 'מצטער, אירעה שגיאה. אנא נסה שוב.',
        isBot: true,
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bi bi-chat-dots"></i>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <div className={styles.chatHeader}>
              <h3>איך אוכל לעזור?</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`${styles.message} ${msg.isBot ? styles.botMessage : styles.userMessage}`}
                >
                  <div className={styles.messageContent}>
                    {msg.isBot && (
                      <>
                        <div className={styles.messageText}>{msg.text}</div>
                        {msg.results && 
                          (!msg.results.businesses?.length && 
                           !msg.results.realEstate?.length && 
                           !msg.results.forums?.length) ? (
                          <div className={styles.noResultsMessage}>
                            <i className="bi bi-search"></i>
                            <p>לא נמצאו תוצאות לחיפוש שלך</p>
                            <p className={styles.noResultsSubtext}>אנא נסה לחפש במילים אחרות</p>
                          </div>
                        ) : (
                          <>
                            {msg.results?.businesses?.map(business => (
                              <SearchResultCard 
                                key={business._id}
                                result={{ type: 'shops', data: business, source: msg.source, text: business.name || 'Business Details' }}
                              />
                            ))}
                            {msg.results?.realEstate?.map(property => (
                              <SearchResultCard
                                key={property._id} 
                                result={{ type: 'nadlan', data: property, source: msg.source, text: property.title || 'Property Details' }}
                              />
                            ))}
                            {msg.results?.forums?.map(forum => (
                              <SearchResultCard
                                key={forum._id}
                                result={{ type: 'forum', data: forum, source: msg.source, text: forum.title || forum.content || 'Forum Post' }}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                    {!msg.isBot && msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
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
                <i className="bi bi-send"></i>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}