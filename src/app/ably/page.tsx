'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as Ably from 'ably';
import { configureAbly, useChannel, usePresence } from '@ably-labs/react-hooks';
import { FaSmile, FaPaperclip, FaPaperPlane, FaReply, FaUsers } from 'react-icons/fa';
import './ChatPage.css';

const getOrCreateClientId = () => {
  let clientId = localStorage.getItem('chatClientId');
  if (!clientId) {
    clientId = `client-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chatClientId', clientId);
  }
  return clientId;
};

const clientId = getOrCreateClientId();

const ably = configureAbly({ 
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  clientId: clientId
});

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  type: 'text' | 'image' | 'emoji' | 'file';
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
}

const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉'];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [channel] = useChannel('chat-channel', (message) => {
    const newMessage = message.data as Message;
    setMessages((prevMessages) => {
      if (!prevMessages.some(msg => msg.id === newMessage.id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
    updateMessageStatus(newMessage.id, 'delivered');
  });

  const [presenceData, updateStatus] = usePresence('chat-channel');

  useEffect(() => {
    const storedUsername = localStorage.getItem('chatUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const newUsername = prompt('הכנס את שמך:') || `משתמש_${Math.floor(Math.random() * 1000)}`;
      setUsername(newUsername);
      localStorage.setItem('chatUsername', newUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      updateStatus({ username });
    }
  }, [username, updateStatus]);

  useEffect(() => {
    setConnectedUsers(presenceData.map(data => data.data.username));
  }, [presenceData]);

  const sendMessage = useCallback(async (text: string, type: 'text' | 'image' | 'emoji' | 'file' = 'text') => {
    if (text.trim() !== '' || type !== 'text') {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: username,
        timestamp: Date.now(),
        type,
        status: 'sent',
        replyTo: replyingTo
      };
      try {
        await channel.publish('chat-message', newMessage);
        setInputMessage('');
        setShowEmojiPicker(false);
        setShowAttachMenu(false);
        setReplyingTo(undefined);
      } catch (error) {
        console.error('שגיאה בשליחת ההודעה:', error);
        alert('שגיאה בשליחת ההודעה. נסה שוב.');
      }
    }
  }, [channel, username, replyingTo]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target?.result as string;
        if (file.type.startsWith('image/')) {
          sendMessage(fileData, 'image');
        } else {
          sendMessage(file.name, 'file');
        }
      };
      reader.readAsDataURL(file);
    }
  }, [sendMessage]);

  const handleEmojiClick = useCallback((emoji: string) => {
    setInputMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  }, []);

  const updateMessageStatus = useCallback((messageId: string, status: 'sent' | 'delivered' | 'read') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status } : msg
      )
    );
  }, []);

  const formatTime = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  }, []);

  const handleReply = useCallback((messageId: string) => {
    setReplyingTo(messageId);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="chat-container" dir="rtl">
      <div className="chat-header">
        <div className="chat-header-info">
          <h1>צ'אט קבוצתי</h1>
          <p>{connectedUsers.length} משתתפים מחוברים</p>
        </div>
        <button className="user-list-button" onClick={() => setShowUserList(!showUserList)}>
          <FaUsers />
        </button>
        {showUserList && (
          <div className="user-list">
            <h3>משתמשים מחוברים:</h3>
            <ul>
              {connectedUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === username ? 'own-message' : ''}`}>
            {message.sender !== username && <div className="message-sender">{message.sender}</div>}
            {message.replyTo && (
              <div className="reply-to">
                {messages.find(msg => msg.id === message.replyTo)?.text}
              </div>
            )}
            <div className="message-content">
              {message.type === 'text' && <p>{message.text}</p>}
              {message.type === 'image' && <img src={message.text} alt="תמונה שהועלתה" className="uploaded-image" />}
              {message.type === 'emoji' && <span className="large-emoji">{message.text}</span>}
              {message.type === 'file' && <div className="file-message">📎 {message.text}</div>}
            </div>
            <span className="message-time">
              {formatTime(message.timestamp)}
              {message.sender === username && (
                <span className="message-status">
                  {message.status === 'sent' && '✓'}
                  {message.status === 'delivered' && '✓✓'}
                  {message.status === 'read' && '✓✓'}
                </span>
              )}
            </span>
            <button className="reply-button" onClick={() => handleReply(message.id)}><FaReply /></button>
          </div>
        ))}
      </div>
      {replyingTo && (
        <div className="replying-to">
          מגיב ל: {messages.find(msg => msg.id === replyingTo)?.text}
          <button onClick={() => setReplyingTo(undefined)}>X</button>
        </div>
      )}
      <div className="input-container">
        <div className="emoji-container">
          <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}><FaSmile /></button>
          {showEmojiPicker && (
            <div className="emoji-picker" ref={emojiPickerRef}>
              {emojis.map((emoji) => (
                <button key={emoji} onClick={() => handleEmojiClick(emoji)}>{emoji}</button>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
          placeholder="הקלד הודעה"
          className="message-input"
        />
        <button className="attach-button" onClick={() => fileInputRef.current?.click()}><FaPaperclip /></button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,application/*"
          style={{ display: 'none' }}
        />
        <button onClick={() => sendMessage(inputMessage)} className="send-button"><FaPaperPlane /></button>
      </div>
    </div>
  );
}