# Agent Neo (React)

Neo Agent is a powerful, configurable AI-driven conversational assistant library for React applications. It provides a seamless way to integrate both guided "deterministic" workflows and advanced LLM-powered multi-turn interactions (supporting Gemini and Claude) into your web projects.

## Features
- **Deterministic Workflows**: Multi-step guides with custom branching logic and `skipIf` conditions.
- **Variable Extraction**: Automatically extract data from user input using regex-based `extractors`.
- **LLM Integration**: Built-in support for Gemini (Google) and Claude (Anthropic).
- **Tool Calling**: Allow the LLM to trigger backend API actions and summarize results.
- **Context Awareness**: Pass application state and data to the AI for smarter responses.
- **Resilient Fallbacks**: Automatic retry logic and model fallback chain.

## Installation

```bash
# Add peer dependencies
npm install framer-motion lucide-react

# Install the agent library
npm install agent-neo@file:path/to/agent-neo
```

## Usage

### 1. Import the Component

```tsx
import Agent from 'agent-neo';

const agentConfig = {
  llms: [
    { provider: 'gemini', model: 'gemini-1.5-flash', apiKey: '...' }
  ],
  workflow: [
    { 
      id: 'welcome', 
      message: 'Hello! How can I help?',
      options: [
        { label: 'Option A', nextStepId: 'step_a' }
      ]
    }
  ]
};

function App() {
  return (
    <Agent 
      config={agentConfig} 
      user={{ id: 'u1', name: 'John Doe' }}
      context="Current application state information..."
    />
  );
}
```

### 2. Styling
The agent uses modern glassmorphism styles and requires `framer-motion` for animations. Ensure your global styles allow for proper positioning (it usually sits in the bottom right).
