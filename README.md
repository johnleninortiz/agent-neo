# Agent Neo

Agent Neo is a framework-agnostic, AI-driven conversational assistant library. It provides a seamless way to integrate both guided "deterministic" workflows and advanced LLM-powered multi-turn interactions (supporting Gemini and Claude) into your web applications (React, Angular, Vanilla JS).

## 🔐 Security & API Keys

To avoid hardcoding private keys in your source code, Agent Neo supports environment-variable-based configuration.

### Development (Local)

1. Create a `.env.local` file in the root of your project (this file is ignored by git).
2. Add your keys using the `VITE_` prefix:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   VITE_CLAUDE_API_KEY=your_key_here
   ```
3. The agent will automatically use these fallbacks if no `apiKey` is provided in the `config` object.

### Production (Recommended)

**NEVER expose your private API keys in a production client-side bundle.** Even with environment variables, Vite embeds these values in the JavaScript sent to the browser.

For production, we recommend using a **Backend Proxy**:
1. Create a server-side endpoint in your host application (e.g., `/api/llm/gemini`).
2. Set the `baseUrl` in your `llms` configuration to point to your proxy.
3. Your server then attaches the private key and forwards the request to the LLM provider.

```json
{
  "provider": "gemini",
  "baseUrl": "https://your-app.com/api/llm/gemini",
  "apiKey": "" // Leave empty, handled by server
}
```

---

## Features
- **Deterministic Workflows**: Multi-step guides with custom branching logic, `skipIf` conditions, and auto-execution.
- **Dynamic Personas**: Configurable `agentName` and `systemRole` to adapt the agent's personality (e.g., Chess Grandmaster vs. Financial Expert).
- **Tool Calling**: Allow the LLM to trigger backend API actions, **open reports**, and summarize results.
- **Smart Merging**: User configurations intelligently merge with built-in presets (intents and endpoints are additive).
- **Vanilla & Angular Support**: Built as a Web Component for universal compatibility.

## Installation

```bash
npm install agent-neo framer-motion lucide-react
```

## Usage

### 1. React Integration

```tsx
import Agent from 'agent-neo';
import 'agent-neo/dist/style.css'; // If styles are separate

const config = {
  agentName: 'Support Bot',
  systemRole: 'a helpful customer support agent.',
  llms: [
    { provider: 'gemini', apiKey: '...', model: 'gemini-1.5-flash' }
  ],
  workflow: [
    { 
      id: 'welcome', 
      message: 'Hello {{ userName }}! How can I help?',
      options: [
        { label: 'Order Status', nextStepId: 'check_status' }
      ]
    },
    {
      id: 'check_status',
      triggerAction: 'getOrderStatus', // Auto-executes if logic permits
      actionType: 'api',
      nextStepId: 'show_status'
    }
  ],
  endpoints: [
    { name: 'getOrderStatus', url: '/api/orders', method: 'GET', description: 'Fetch orders' }
  ]
};

function App() {
  return (
    <Agent 
      config={config} 
      user={{ id: 'u1', name: 'John Doe' }} 
      context="User is on the dashboard."
    />
  );
}
```

### 2. Angular Integration

In your `main.ts` or `app.component.ts`:

```typescript
import { registerAgentNeo } from 'agent-neo';

// Register the custom element <agent-neo>
registerAgentNeo();
```

In your module (`app.module.ts`), add `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule { }
```

In your template (`app.component.html`):

```html
<agent-neo 
  [config]="agentConfig" 
  [user]="user" 
  preset="reporting">
</agent-neo>
```

*(Note: Pass objects as JSON strings if not using Angular bindings, or rely on property binding `[prop]` which Angular handles for custom elements).*

### 3. Vanilla JS Integration

Agent Neo works as a standalone Web Component. The `agent-neo.js` bundle includes React and all necessary dependencies for a zero-config experience. 

#### Recommended: Dev Server with Proxy
To avoid CORS issues when calling LLM APIs (like Gemini or Claude) from your local environment, we recommend using a dev server with a proxy (e.g., [Vite](https://vitejs.dev/)).

**vite.config.ts**
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/gemini-api': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gemini-api/, ''),
      }
    }
  }
});
```

**index.html**
```html
<agent-neo id="my-agent"></agent-neo>

<script type="module">
  import { registerAgentNeo } from './dist/agent-neo.js';
  registerAgentNeo();
  
  const agent = document.getElementById('my-agent');

  // Define global handlers (JSON cannot serialize functions)
  window.myHandler = (payload) => console.log("Action triggered:", payload);
  
  // Use property assignment to pass the configuration object
  agent.config = {
      agentName: "Agent Neo",
      llms: [
        { 
          provider: 'gemini', 
          model: 'gemini-1.5-flash', 
          apiKey: 'YOUR_KEY',
          baseUrl: '/gemini-api/v1/models' // Uses the local proxy defined above
        }
      ],
      endpoints: [
          { name: 'notify', handler: 'window.myHandler', description: 'Triggers a handler' }
      ]
  }; 
  
  agent.user = { id: 'v1', name: 'Visitor' };
</script>
```

## Configuration (`AppConfig`)

| Property | Type | Description |
|----------|------|-------------|
| `agentName` | `string` | The display name of the agent (e.g., "Boris", "Nexus"). |
| `systemRole` | `string` | The system prompt description defining the agent's persona. |
| `preset` | `'chess' \| 'reporting' \| 'health'` | Loads pre-configured intents/workflows. User config merges on top. |
| `endpoints` | `Endpoint[]` | Array of tools the LLM can call. Merged with preset endpoints. |
| `workflow` | `Step[]` | Deterministic conversation graph. |
| `llms` | `LLMProvider[]` | Array of keys for Gemini/Claude. |
| `showStopButton` | `boolean` | (Optional) Set to `true` to show the stop button during active states. Default: `false`. |

### Workflow Steps & `skipIf`
Steps can define `skipIf` logic to bypass screens if data is already present in `workflowState`.

```typescript
{
  id: 'ask_name',
  message: 'What is your name?',
  inputTarget: 'userName',
  skipIf: 'workflowState.userName', // Skips if userName is already known
  nextStepId: 'next'
}
```

## Presets

- **Reporting**: Financial expert persona. Includes `ACFR`, `Budget Book` workflows, and `openReport` tool.
- **Chess**: Grandmaster persona. Analyzing board contexts.
- **Health**: Vitals tracking assistant.

## Building & Publishing

```bash
# Build for all targets (React/ESM/Angular)
bash scripts/publish-all.sh
```
