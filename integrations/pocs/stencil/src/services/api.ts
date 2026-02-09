import type { AppConfig, EndpointMetadata, Message } from '../types';

export const deepMerge = (target: any, source: any): any => {
  if (!source) return target;
  for (const key in source) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object && !Array.isArray(target[key])) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

export const callEndpoint = async (endpointName: string, config: AppConfig, payload: any = {}): Promise<any> => {
  const endpoint = config.endpoints?.find((e: EndpointMetadata) => e.name === endpointName);

  if (!endpoint) {
    throw new Error(`Endpoint ${endpointName} not found in configuration.`);
  }

  const finalPayload = deepMerge({ ...endpoint.payloadTemplate }, payload);

  if (endpoint.handler) {
    console.log(`Executing local handler for ${endpointName}`, finalPayload);
    try {
      let handlerFn = endpoint.handler;
      if (typeof handlerFn === 'string') {
        if (typeof window !== 'undefined') {
          const path = (handlerFn as string).split('.');
          let current: any = window;
          for (const part of path) {
            current = current?.[part];
          }
          if (typeof current === 'function') {
            handlerFn = current;
          } else {
            throw new Error(`Handler string "${endpoint.handler}" did not resolve to a function.`);
          }
        }
      }

      if (typeof handlerFn === 'function') {
        return await handlerFn(finalPayload);
      }
      throw new Error(`Handler for ${endpointName} is not a function.`);
    } catch (error: any) {
      throw new Error(`Local handler for ${endpointName} failed: ${error.message}`);
    }
  }

  if (!endpoint.url) {
    console.log(`Executing virtual endpoint for ${endpointName}`, finalPayload);
    return finalPayload;
  }

  let url = endpoint.url;
  for (const key in finalPayload) {
    url = url.replace(`{{${key}}}`, finalPayload[key]);
    url = url.replace(`:${key}`, finalPayload[key]);
  }

  const options: RequestInit = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: endpoint.withCredentials ? 'include' : undefined
  };

  if (endpoint.method !== 'GET' && endpoint.method !== 'DELETE') {
    options.body = JSON.stringify(finalPayload);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API call to ${endpoint.name} failed: ${response.statusText}`);
  }

  return response.json();
};

export const buildSystemPrompt = (
  userInput: string,
  config: AppConfig,
  toolResult: any,
  history: Message[],
  extraContext?: string
): string => {
  const toolsDescription = (config.endpoints || [])
    .map(
      (e) =>
        `- Tool Name: "${e.name}"\n  Description: ${e.description}\n  Payload Template: ${JSON.stringify(e.payloadTemplate)}`
    )
    .join('\n\n');

  let contextText = '';
  if (extraContext) {
    contextText = `\nDYNAMIC APPLICATION CONTEXT:\n${extraContext}\n`;
  }

  if (config.contextBindings) {
    contextText +=
      '\nApplication Context Bindings:\n' +
      config.contextBindings.map((b) => `${b.key}: ${JSON.stringify(b.data)}`).join('\n');
  }

  if (toolResult) {
    contextText += `\n\n[CRITICAL] PREVIOUS TOOL EXECUTION RESULT:\n${JSON.stringify(toolResult, null, 2)}\n
        The action requested in the last turn HAS ALREADY BEEN COMPLETED. 
        Your task now is to SUMMARIZE the result for the user. 
        DO NOT call the same tool again in the "action" field unless the user explicitly asked for a secondary operation.`;
  }

  const historyText = history.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

  const agentName = config.agentName || 'Neo Agent';
  const roleDescription = config.systemRole || 'a sophisticated AI assistant';

  return `You are ${agentName}, ${roleDescription}.
    
AVAILABLE TOOLS (API Endpoints):
${toolsDescription}

CONTEXT DATA:
${contextText}

CONVERSATION HISTORY:
${historyText}

USER INPUT: "${userInput}"

INSTRUCTIONS:
1. Analyze the user's request using the provided Context Data and tool results.
2. If toolResult is present above, the action is ALREADY DONE. Summarize it naturally.
3. If no toolResult is present and the user asks for an action that matches a tool, you MUST request that action.
4. You MUST return your response as a valid JSON object. Do not include markdown formatting.
5. JSON Structure:
{
  "message": "Your expert response",
  "action": {
    "name": "The Tool Name to call",
    "payload": { "key": "value" } 
  }
}
6. If no NEW tool is needed, omit the "action" field.
7. Be concise but helpful.
8. IMPORTANT: If the "PREVIOUS TOOL EXECUTION RESULT" indicates success, do not blindly repeat the same action unless progressive logic (like "twice") requires another step.`;
};

export const parseLLMResponse = (raw: string): { message: string; action?: any } => {
  try {
    const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error('Failed to parse LLM JSON:', raw);
    return { message: raw };
  }
};

const callGemini = async (prompt: string, provider: any): Promise<string> => {
  const apiKey = provider.apiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey && !provider.baseUrl) {
    throw new Error('Gemini API key is missing. Please provide it in the config or set VITE_GEMINI_API_KEY.');
  }

  const url = provider.baseUrl
    ? `${provider.baseUrl}/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`
    : `https://generativelanguage.googleapis.com/v1beta/models/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error: any = new Error(`Gemini API error: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  const res = await response.json();
  return res.candidates[0]?.content?.parts[0]?.text || '{}';
};

const callClaude = async (prompt: string, provider: any): Promise<string> => {
  const url = provider.baseUrl || 'https://api.anthropic.com/v1/messages';
  const apiKey = provider.apiKey || (import.meta as any).env?.VITE_CLAUDE_API_KEY;

  if (!apiKey) {
    throw new Error('Claude API key is missing. Please provide it in the config or set VITE_CLAUDE_API_KEY.');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: provider.model || (import.meta as any).env?.VITE_CLAUDE_MODEL || 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error: any = new Error(`Claude API error: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  const res = await response.json();
  return res.content[0]?.text || '{}';
};

export const callLLM = async (
  userInput: string,
  config: AppConfig,
  toolExecutionResult?: any,
  history: Message[] = [],
  extraContext?: string
): Promise<{ message: string; action?: any }> => {
  if (!config.llms || config.llms.length === 0) {
    throw new Error('No LLM providers configured.');
  }

  const systemPrompt = buildSystemPrompt(userInput, config, toolExecutionResult, history, extraContext);
  let lastError: any;

  for (const provider of config.llms) {
    try {
      let rawResponse = '';
      if (provider.provider === 'gemini') {
        rawResponse = await callGemini(systemPrompt, provider);
      } else if (provider.provider === 'claude') {
        rawResponse = await callClaude(systemPrompt, provider);
      } else {
        continue;
      }
      return parseLLMResponse(rawResponse);
    } catch (error: any) {
      console.error(`Provider ${provider.provider} failed:`, error);
      if (error.status === 429 || error.status >= 500) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw new Error(`All LLM providers failed. Last error: ${lastError?.message || 'Unknown'}`);
};
