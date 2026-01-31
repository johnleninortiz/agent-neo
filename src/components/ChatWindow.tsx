import React, { useState, useRef, useEffect } from 'react';
import { Send, X, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AppConfig, Message, User } from '../types';
import { createReport } from '../services/api';

interface ChatWindowProps {
  onClose: () => void;
  config: AppConfig;
  context?: string;
  user?: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, config, context, user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${user?.name || 'there'}! I'm ready to assist you with the ${context || 'current'} task.`,
      sender: 'agent',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    
    // Simulate thinking
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I've received your message. I'm processing it for the MVP demo!",
          sender: 'agent',
          timestamp: Date.now(),
        },
      ]);
    }, 1500);
  };

  const handleCreateReport = async () => {
    try {
      setIsTyping(true);
      await createReport(config);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "✅ Report has been successfully created and sent to the endpoint.",
          sender: 'agent',
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `❌ Failed to create report: ${error instanceof Error ? error.message : 'Unknown error'}`,
          sender: 'agent',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container glass-morphism-dark agent-neo-font">
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
          <span style={{ color: 'white', fontWeight: 600 }}>Neo Agent</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: msg.sender === 'user' ? '#6366f1' : 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', color: '#9ca3af', fontSize: '12px' }}>Neo is thinking...</div>
        )}

        {/* Action Suggestion */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 'auto', padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}
        >
          <span style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Frequent Actions</span>
          <button className="action-button" onClick={handleCreateReport} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FileText size={16} />
            Create Report
            <ChevronRight size={14} />
          </button>
        </motion.div>
      </div>

      <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '10px 16px',
            color: 'white',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#6366f1',
            border: 'none',
            borderRadius: '12px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
