import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedNexus from './AnimatedNexus';

import type { AppConfig } from '../types';

interface AvatarProps {
  onClick: () => void;
  isOpen: boolean;
  userName?: string;
  state?: 'idle' | 'active' | 'thinking';
  isMaximized?: boolean;
  config?: AppConfig;
}

const Avatar: React.FC<AvatarProps> = ({ onClick, isOpen, userName, state, isMaximized, config }) => {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (!isOpen && state === 'idle') {
      const timer = setTimeout(() => {
        setShowGreeting(true);
      }, 2000); // Greet after 2 seconds
      return () => clearTimeout(timer);
    } else {
      setShowGreeting(false);
    }
  }, [isOpen, state]);

  return (
    <div className="agent-neo-font">
      <AnimatePresence>
        {showGreeting && !isOpen && !isMaximized && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="greeting-bubble glass-morphism"
          >
            {config?.greeting || `Hello there, ${userName || 'there'}! I'm your assistant. How can I help you today?`}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`floating-avatar glass-morphism ${isMaximized ? 'maximized' : ''}`}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: isMaximized ? '90px' : '70px',
          height: isMaximized ? '90px' : '70px',
          overflow: 'hidden',
          background: config?.avatar?.type === 'video' ? 'black' : 'transparent', // Black bg for video to blend better if mask fails
          ...config?.avatar?.styles
        }}
      >
        {config?.avatar?.type === 'video' && config.avatar.source ? (
          <video
            src={config.avatar.source}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // Seamless gradient mask
              maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
            }}
          />
        ) : config?.avatar?.type === 'image' && config.avatar.source ? (
          <img 
            src={config.avatar.source} 
            alt={userName || "Agent"} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <AnimatedNexus state={state} />
        )}
      </motion.div>
    </div>
  );
};

export default Avatar;
