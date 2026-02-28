import React, { useState, useEffect } from 'react';
import Avatar from './components/Avatar';
import ChatWindow from './components/ChatWindow';
import type { AppConfig, User } from './types';
import styles from './index.css?inline';

import { presets } from './presets';
import { mcpManager } from './services/mcp';

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
  const [mcpReadyCount, setMcpReadyCount] = useState(0);

  // Auto-connect to MCP Servers if configured
  useEffect(() => {
    console.log('Conversion software version 7.0');
    if (config.mcpServers && config.mcpServers.length > 0) {
      Promise.all(config.mcpServers.map(serverUrl => 
        mcpManager.connect(serverUrl, () => setMcpReadyCount(prev => prev + 1))
      ));
    } else {
      setMcpReadyCount(1);
    }
  }, [config.mcpServers]);

  // Merge preset config with user config and mapped MCP endpoints
  const finalConfig: AppConfig = React.useMemo(() => {
    let baseConfig = { ...config, endpoints: [...(config.endpoints || [])] };
    if (preset && presets[preset]) {
      const presetConfig = presets[preset];
      baseConfig = {
        ...presetConfig,
        ...config,
        endpoints: [...(presetConfig.endpoints || []), ...(config.endpoints || [])],
        intents: [...(presetConfig.intents || []), ...(config.intents || [])],
      } as AppConfig;
    }

    // Mix in MCP Endpoints so LLM / UI can use them
    if (mcpReadyCount > 0) {
      const mcpEndpoints = mcpManager.getEndpoints();
      if (mcpEndpoints.length > 0) {
        baseConfig.endpoints = [...baseConfig.endpoints, ...mcpEndpoints];
      }
    }
    
    return baseConfig;
  }, [config, preset, mcpReadyCount]);

  const [agentState, setAgentState] = useState<'idle' | 'active' | 'thinking'>('idle');
  const [isMaximized, setIsMaximized] = useState(false);

  // Sync open state with agent state
  useEffect(() => {
    if (isOpen) {
        setAgentState(prev => prev === 'thinking' ? 'thinking' : 'active');
    } else if (agentState !== 'thinking') {
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

  // Determine if ChatWindow should be rendered/visible
  const shouldRenderChat = finalConfig.keepAlive || isOpen;

  return (
    <div ref={rootRef} className="agent-neo-root">
      <style>{styles}</style>
      <Avatar 
        onClick={() => setIsOpen(!isOpen)} 
        isOpen={isOpen} 
        userName={user?.name}
        state={agentState} 
        isMaximized={isMaximized}
        config={finalConfig}
      />
      {shouldRenderChat && (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
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
        </div>
      )}
    </div>
  );
};

export default Agent;
