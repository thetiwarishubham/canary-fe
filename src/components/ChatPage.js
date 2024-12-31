import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatBoxRef = useRef(null);

  const authToken = localStorage.getItem('authToken');
  const queryParams = new URLSearchParams(window.location.search);
  const context = queryParams.get('context');
  const role = queryParams.get('role');
  const language = queryParams.get('lang');
  const name = queryParams.get('name');

  useEffect(() => {
    if (!authToken) {
      window.location.href = '/login';
    } else {
      fetchWelcomeMessage();
    }
  }, [authToken]);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchWelcomeMessage = async () => {
    
    appendMessage('Chatbot', `Hello ${name}! Welcome to the chatbot. How can I assist you today? You can ask question about query, response, fields info, service & api dependency.`);
    // try {
    //   const response = await fetch('http://localhost:3000/api/welcome-message', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //     body: JSON.stringify({ name, language }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     appendMessage('Chatbot', data.reply || 'Welcome!');
    //   } else {
    //     appendMessage('Error', 'Failed to fetch welcome message.');
    //   }
    // } catch {
    //   appendMessage('Error', 'Failed to connect to server.');
    // }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    appendMessage('User', inputMessage);
    setInputMessage('');
    setIsLoading(true);

    appendMessage('Chatbot', 'Analyzing...');

    try {
      const response = await fetch('https://canary-be.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ message: inputMessage, context, role, language }),
      });

      if (response.ok) {
        const body = await response.json();
        // Replace the "Analyzing..." message with the actual response
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 && msg.text === 'Analyzing...'
              ? { ...msg, text: body.data.reply || 'No response.' }
              : msg
          )
        );
      } else {
        appendMessage('Error', 'Failed to get response from server.');
      }
    } catch {
      appendMessage('Error', 'Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const appendMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text, timestamp: new Date().toLocaleTimeString() }]);
  };

  return (
    <div id="chat-container">
      <div id="header">Canary Bot</div>
      <div id="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender}`}>
            <span className="timestamp">{msg.timestamp}</span>
            <p className={msg.sender}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div id="chat-input-container">
        <input
          type="text"
          id="chat-input"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button id="send-btn" onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? <div id="spinner"></div> : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
