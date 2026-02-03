import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedNexus from './AnimatedNexus';

interface AvatarProps {
  onClick: () => void;
  isOpen: boolean;
  userName?: string;
  state?: 'idle' | 'active' | 'thinking';
}

const Avatar: React.FC<AvatarProps> = ({ onClick, isOpen, userName, state }) => {
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
        Hello there, {userName || 'there'}! I'm your assistant. How can I help you today?
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
      borderRadius: '50%',
      width: '50px',  // Adjust size as needed
      height: '50px', // Adjust size as needed
      overflow: 'hidden',
      background: 'transparent', // Optional: remove gradient since Nexus has its own colors
    }}
  >
      <AnimatedNexus state={state} />
  </motion.div>
</div>
  );
};

export default Avatar;
