import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarProps {
  onClick: () => void;
  isOpen: boolean;
  userName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ onClick, isOpen, userName }) => {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
      }, 2000); // Greet after 2 seconds
      return () => clearTimeout(timer);
    } else {
      setShowGreeting(false);
    }
  }, [isOpen]);

  return (
    <div className="agent-neo-font">
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="greeting-bubble glass-morphism"
          >
            Hello {userName || 'there'}! I'm your assistant. How can I help you today?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="floating-avatar glass-morphism"
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        <Bot size={32} />
      </motion.div>
    </div>
  );
};

export default Avatar;
