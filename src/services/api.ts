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

export const callEndpoint = async (
    endpointName: string,
    config: AppConfig,
    payload: any = {}
): Promise<any> => {
    const endpoint = config.endpoints?.find((e: EndpointMetadata) => e.name === endpointName);

    if (!endpoint) {
        throw new Error(`Endpoint ${endpointName} not found in configuration.`);
    }

    // Merge payload with template
    const finalPayload = deepMerge({ ...endpoint.payloadTemplate }, payload);

    // Interpolate URL params
    let url = endpoint.url;
    for (const key in finalPayload) {
        url = url.replace(`{{${key}}}`, finalPayload[key]);
        url = url.replace(`:${key}`, finalPayload[key]);
    }

    const options: RequestInit = {
        method: endpoint.method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: endpoint.withCredentials ? 'include' : undefined,
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

export const buildSystemPrompt = (userInput: string, config: AppConfig, toolResult: any, history: Message[], extraContext?: string): string => {
    const toolsDescription = (config.endpoints || []).map(e =>
        `- Tool Name: "${e.name}"\n  Description: ${e.description}\n  Payload Template: ${JSON.stringify(e.payloadTemplate)}`
    ).join('\n\n');

    let contextText = '';
    if (extraContext) {
        contextText = `\nDYNAMIC APPLICATION CONTEXT:\n${extraContext}\n`;
    }

    if (config.contextBindings) {
        contextText += "\nApplication Context Bindings:\n" +
            config.contextBindings.map(b => `${b.key}: ${JSON.stringify(b.data)}`).join('\n');
    }

    if (toolResult) {
        contextText += `\n\nPREVIOUS TOOL EXECUTION RESULT:\n${JSON.stringify(toolResult, null, 2)}\n(Use this result to answer the user's question directly. Do not call the same tool again unless requested.)`;
    }

    const historyText = history.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

    return `You are Neo Agent, a sophisticated AI assistant and Chess Grandmaster.
    
AVAILABLE TOOLS (API Endpoints):
${toolsDescription}

CONTEXT DATA:
${contextText}

CONVERSATION HISTORY:
${historyText}

USER INPUT: "${userInput}"

INSTRUCTIONS:
1. Analyze the user's request using the provided Context Data (like FEN, Board state, and moves).
2. If the user asks for chess advice, YOU ARE a Grandmaster. Use the FEN and move history in the context to provide professional strategic recommendations. Do NOT say you cannot analyze the board; you have the data in the context!
3. Determine if you can answer directly or if you need to call a tool.
4. If the user asks for an action that matches a tool, you MUST request that action.
5. You MUST return your response as a valid JSON object. Do not include markdown formatting.
6. JSON Structure:
{
  "message": "Your expert response or chess analysis",
  "action": {
    "name": "The Tool Name to call",
    "payload": { "key": "value" } 
  }
}
7. If no tool is needed, omit the "action" field.
`;
};

export const parseLLMResponse = (raw: string): { message: string, action?: any } => {
    try {
        let clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(clean);
    } catch (e) {
        console.error("Failed to parse LLM JSON:", raw);
        return { message: raw };
    }
};

const callGemini = async (prompt: string, provider: any): Promise<string> => {
    let url = provider.baseUrl
        ? `${provider.baseUrl}/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${provider.apiKey}`
        : `https://generativelanguage.googleapis.com/v1beta/models/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${provider.apiKey}`;

    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);
    const res = await response.json();
    return res.candidates[0]?.content?.parts[0]?.text || "{}";
};

const callClaude = async (prompt: string, provider: any): Promise<string> => {
    const url = provider.baseUrl || 'https://api.anthropic.com/v1/messages';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': provider.apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: provider.model || 'claude-3-5-sonnet-20240620',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) throw new Error(`Claude API error: ${response.statusText}`);
    const res = await response.json();
    return res.content[0]?.text || "{}";
};

export const callLLM = async (
    userInput: string,
    config: AppConfig,
    toolExecutionResult?: any,
    history: Message[] = [],
    extraContext?: string
): Promise<{ message: string, action?: any }> => {
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
