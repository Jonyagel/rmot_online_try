'use client'
import { useEffect, useState, useRef } from 'react';
import * as Ably from 'ably';
import { configureAbly, useChannel } from '@ably-labs/react-hooks';
import './ChatPage.css';

const ably = configureAbly({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

interface Message {
  text: string;
  sender: string;
  timestamp: number;
  type: 'text' | 'image';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [channel] = useChannel('chat-channel', (message) => {
    setMessages((prevMessages) => [...prevMessages, message.data as Message]);
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('chatUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const newUsername = `משתמש_${Math.floor(Math.random() * 1000)}`;
      setUsername(newUsername);
      localStorage.setItem('chatUsername', newUsername);
    }

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string, type: 'text' | 'image' = 'text') => {
    if (text.trim() !== '') {
      const newMessage: Message = {
        text,
        sender: username,
        timestamp: Date.now(),
        type,
      };
      await channel.publish('chat-message', newMessage);
      setInputMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        sendMessage(imageData, 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container" dir="rtl">
      <div className="chat-header">
        <h1>צ'אט קבוצתי</h1>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === username ? 'own-message' : ''}`}>
            {message.type === 'text' && <p>{message.text}</p>}
            {message.type === 'image' && <img src={message.text} alt="תמונה שהועלתה" className="uploaded-image" />}
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <button className="emoji-button">😀</button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
          placeholder="הקלד הודעה"
          className="message-input"
        />
        <button className="attach-button" onClick={() => fileInputRef.current?.click()}>📎</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {inputMessage ? (
          <button onClick={() => sendMessage(inputMessage)} className="send-button">➤</button>
        ) : (
          <button className="voice-button">🎤</button>
        )}
      </div>
    </div>
  );
}