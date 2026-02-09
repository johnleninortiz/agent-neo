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
  onAction?: (name: string, data: any) => void;
}

const Agent: React.FC<AgentProps> = ({ config, preset, context, user, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

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
  const [isMaximized, setIsMaximized] = useState(false);

  // Sync open state with agent state
  useEffect(() => {
    if (isOpen) {
        setAgentState('active');
    } else {
        setAgentState('idle');
    }
  }, [isOpen]);

  const handleAction = (name: string, data: any) => {
    // 1. Call prop (for direct React/r2wc function mapping usage)
    if (onAction) {
        onAction(name, data);
    }

    // 2. Dispatch DOM Event (standard bridge for Angular/Vue/Vanilla)
    if (rootRef.current) {
        const event = new CustomEvent('onAction', {
            detail: { name, data },
            bubbles: true,
            composed: true // Required to cross Shadow DOM/Web Component boundary
        });
        rootRef.current.dispatchEvent(event);
    }
  };

  return (
    <div ref={rootRef} className="agent-neo-root">
      <style>{styles}</style>
      <Avatar 
        onClick={() => setIsOpen(!isOpen)} 
        isOpen={isOpen} 
        userName={user?.name}
        state={agentState} 
        isMaximized={isMaximized}
      />
      {isOpen && (
        <ChatWindow 
          onClose={() => setIsOpen(false)} 
          config={finalConfig} 
          context={context}
          user={user}
          onStateChange={setAgentState}
          onAction={handleAction}
          isMaximized={isMaximized}
          onToggleMaximize={() => setIsMaximized(!isMaximized)}
        />
      )}
    </div>
  );
};

export default Agent;
