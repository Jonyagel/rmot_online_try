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
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = {
        text: inputMessage,
        sender: username,
        timestamp: Date.now(),
      };
      await channel.publish('chat-message', newMessage);
      setInputMessage('');
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container" dir="rtl">
      <h1 className="chat-title">צ'אט בזמן אמת</h1>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === username ? 'own-message' : ''}`}>
            <strong>{message.sender}: </strong>
            {message.text}
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="הקלד הודעה..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">שלח</button>
      </div>
    </div>
  );
}