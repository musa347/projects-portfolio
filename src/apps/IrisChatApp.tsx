import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { getCreativeResponse } from '../services/iris'; // Assuming you'll create this service

const IrisIcon = ({ size = 24, className = "" }) => (
  <motion.div
    className={`iris-icon ${className}`}
    style={{ width: size, height: size }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
  >
    {/* SVG content from IrisIcon.jsx */}
  </motion.div>
);

const IrisChatApp: React.FC = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { type: 'user', text: input }]);
      const aiResponse = await getCreativeResponse(input);
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setInput('');
    }
  };

  return (
    <div className="window-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container" style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask IRIS anything..."
            style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default IrisChatApp;