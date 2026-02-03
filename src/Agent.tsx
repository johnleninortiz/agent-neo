import React, { useState, useEffect } from 'react';
import Avatar from './components/Avatar';
import ChatWindow from './components/ChatWindow';
import type { AppConfig, User } from './types';
import styles from './index.css?inline';

import { presets } from './presets';

interface AgentProps {
  config: AppConfig;
  preset?: string;
  context?: string;
  user?: User;
}

const Agent: React.FC<AgentProps> = ({ config, preset, context, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Merge preset config with user config
  // User config takes precedence
  const finalConfig: AppConfig = React.useMemo(() => {
    if (preset && presets[preset]) {
      const presetConfig = presets[preset];
      return {
        ...presetConfig,
        ...config,
        // Merge arrays instead of overwriting
        endpoints: [...(presetConfig.endpoints || []), ...(config.endpoints || [])],
        intents: [...(presetConfig.intents || []), ...(config.intents || [])],
        // Workflows are usually custom, so keep overwrite behavior or merge?
        // Let's overwrite workflow for now as it's complex to merge graph steps
      } as AppConfig;
    }
    return config;
  }, [config, preset]);

  const [agentState, setAgentState] = useState<'idle' | 'active' | 'thinking'>('idle');

  // Sync open state with agent state
  useEffect(() => {
    if (isOpen) {
        setAgentState('active');
    } else {
        setAgentState('idle');
    }
  }, [isOpen]);

  return (
    <>
      <style>{styles}</style>
      <Avatar 
        onClick={() => setIsOpen(!isOpen)} 
        isOpen={isOpen} 
        userName={user?.name}
        state={agentState} 
      />
      {isOpen && (
        <ChatWindow 
          onClose={() => setIsOpen(false)} 
          config={finalConfig} 
          context={context}
          user={user}
          onStateChange={setAgentState}
        />
      )}
    </>
  );
};

export default Agent;
