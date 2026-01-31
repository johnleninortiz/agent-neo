import React, { useState } from 'react';
import Avatar from './components/Avatar';
import ChatWindow from './components/ChatWindow';
import type { AppConfig, User } from './types';
import './index.css';

interface AgentProps {
  config: AppConfig;
  context?: string;
  user?: User;
}

const Agent: React.FC<AgentProps> = ({ config, context, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Avatar 
        onClick={() => setIsOpen(!isOpen)} 
        isOpen={isOpen} 
        userName={user?.name}
      />
      {isOpen && (
        <ChatWindow 
          onClose={() => setIsOpen(false)} 
          config={config} 
          context={context}
          user={user}
        />
      )}
    </>
  );
};

export default Agent;
