import type { AppConfig, EndpointMetadata, Message, Attachment } from '../types';

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

    // 0. Local Handler or MCP Handler
    if (endpoint.handler) {
        console.log(`Executing handler for ${endpointName}`, finalPayload);
        try {
            let handlerFn = endpoint.handler;
            // Resolve string handler (e.g. "window.myHandler" or just "myHandler")
            if (typeof handlerFn === 'string') {
                // Safe lookup in window
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
            } else {
                // If handler was provided but failed resolution, throw.
                throw new Error(`Handler for ${endpointName} is not a function.`);
            }
        } catch (error: any) {
            throw new Error(`Handler for ${endpointName} failed: ${error.message}`);
        }
    }

    // 1. Virtual Endpoint (No URL)
    if (!endpoint.url) {
        console.log(`Executing virtual endpoint for ${endpointName}`, finalPayload);
        return finalPayload;
    }

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
        contextText += `\n\n[CRITICAL] PREVIOUS TOOL EXECUTION RESULT:\n${JSON.stringify(toolResult, null, 2)}\n
        `;
        //        If the action requested in the last turn HAS ALREADY BEEN COMPLETED. 
        //Your task now is to SUMMARIZE the result for the user. 
    }

    const historyText = history.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

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
4. You MUST return your response as a valid JSON object.
5. JSON Structure:
{
  "message": "Your expert response",
  "action": {
    "name": "The Tool Name to call",
    "payload": { "key": "value" } 
  }
}
6. If no NEW tool is needed, omit the "action" field.
7. Be concise but helpful.`;
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

const callGemini = async (prompt: string, provider: any, attachments?: Attachment[]): Promise<string> => {
    const apiKey = provider.apiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY;

    if (!apiKey && !provider.baseUrl) {
        throw new Error('Gemini API key is missing. Please provide it in the config or set VITE_GEMINI_API_KEY.');
    }

    let url = provider.baseUrl
        ? `${provider.baseUrl}/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`
        : `https://generativelanguage.googleapis.com/v1beta/models/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;

    const parts: any[] = [{ text: prompt }];
    if (attachments) {
        for (const att of attachments) {
            if (att.base64Url && (att.mimeType.startsWith('image/') || att.mimeType === 'application/pdf')) {
                const base64Data = att.base64Url.split(',')[1];
                parts.push({
                    inlineData: {
                        mimeType: att.mimeType,
                        data: base64Data
                    }
                });
            }
        }
    }

    const body = {
        contents: [{ parts }],
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
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
    return res.candidates[0]?.content?.parts[0]?.text || "{}";
};

const callClaude = async (prompt: string, provider: any, attachments?: Attachment[]): Promise<string> => {
    const url = provider.baseUrl || 'https://api.anthropic.com/v1/messages';
    const apiKey = provider.apiKey || (import.meta as any).env?.VITE_CLAUDE_API_KEY;

    if (!apiKey) {
        throw new Error('Claude API key is missing. Please provide it in the config or set VITE_CLAUDE_API_KEY.');
    }

    const content: any[] = [];
    if (attachments) {
        for (const att of attachments) {
            if (att.base64Url) {
                const base64Data = att.base64Url.split(',')[1];
                if (att.mimeType.startsWith('image/')) {
                    content.push({
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: att.mimeType,
                            data: base64Data
                        }
                    });
                } else if (att.mimeType === 'application/pdf') {
                    content.push({
                        type: 'document',
                        source: {
                            type: 'base64',
                            media_type: 'application/pdf',
                            data: base64Data
                        }
                    });
                }
            }
        }
    }
    content.push({ type: 'text', text: prompt });

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
            messages: [{ role: 'user', content }]
        })
    });

    if (!response.ok) {
        const error: any = new Error(`Claude API error: ${response.statusText}`);
        error.status = response.status;
        throw error;
    }
    const res = await response.json();
    return res.content[0]?.text || "{}";
};

const callXai = async (
    userInput: string,
    config: AppConfig,
    toolExecutionResult: any,
    history: Message[],
    extraContext: string | undefined,
    provider: any,
    attachments?: Attachment[]
): Promise<string> => {
    const url = provider.baseUrl || 'https://api.x.ai/v1/chat/completions';
    const apiKey = provider.apiKey;

    if (!apiKey && !url.includes('local-api') && !url.includes('xai-api')) {
        throw new Error('xAI API key is missing. Please provide it in the App config.');
    }

    const messages = [];

    const agentName = config.agentName || 'Neo Agent';
    const roleDescription = config.systemRole || 'a sophisticated AI assistant';
    let systemPrompt = `You are ${agentName}, ${roleDescription}.`;

    if (extraContext) {
        systemPrompt += `\nDYNAMIC APPLICATION CONTEXT:\n${extraContext}\n`;
    }
    if (config.contextBindings) {
        systemPrompt += "\nApplication Context Bindings:\n" +
            config.contextBindings.map(b => `${b.key}: ${JSON.stringify(b.data)}`).join('\n');
    }
    messages.push({ role: 'system', content: systemPrompt });

    for (const msg of history) {
        const msgContent: any[] = [];
        // Intentionally skipping historical msg.attachments to prevent base64 token bloat
        msgContent.push({ type: 'text', text: msg.text });
        messages.push({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msgContent });
    }

    let currentUserInput = `USER INPUT: "${userInput}"`;
    if (toolExecutionResult) {
        currentUserInput = `[SYSTEM MESSAGE]: The tool action you requested for the user's prompt ("${userInput}") has been completed.\n\n` +
            `TOOL RESULT DATA:\n${JSON.stringify(toolExecutionResult, null, 2)}\n\n` +
            `CRITICAL INSTRUCTION: You MUST now summarize the above result for the user in conversational text. ` +
            `DO NOT call any tools. You are answering the user's prompt by explaining the result of the tool you just ran.`;
    }

    const finalContent: any[] = [];
    if (attachments) {
        for (const att of attachments) {
            if (att.base64Url && att.mimeType.startsWith('image/')) {
                finalContent.push({ type: 'image_url', image_url: { url: att.base64Url } });
            }
        }
    }
    finalContent.push({ type: 'text', text: currentUserInput });
    messages.push({ role: 'user', content: finalContent });

    const tools = (config.endpoints || []).map(e => {
        let parameters = e.inputSchema;
        if (!parameters) {
            parameters = { type: "object", properties: {} };
            if (e.payloadTemplate && typeof e.payloadTemplate === 'object') {
                for (const key of Object.keys(e.payloadTemplate)) {
                    parameters.properties[key] = { type: "string" };
                }
            }
        }
        return {
            type: "function",
            function: {
                name: e.name,
                description: e.description || `Tool for ${e.name}`,
                parameters
            }
        };
    });

    const bodyPayload: any = {
        model: provider.model || "grok-4.20",
        messages,
        temperature: 0,
        stream: false
    };
    if (tools.length > 0) bodyPayload.tools = tools;

    const response = await fetch(url + (url.includes('chat/completions') ? '' : '/chat/completions'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
        },
        body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
        const error: any = new Error(`xAI API error: ${response.statusText}`);
        error.status = response.status;
        throw error;
    }
    const res = await response.json();
    const message = res.choices[0].message;

    if (message.tool_calls && message.tool_calls.length > 0) {
        const toolCall = message.tool_calls[0];
        const action = {
            name: toolCall.function.name,
            payload: typeof toolCall.function.arguments === 'string'
                ? JSON.parse(toolCall.function.arguments) : toolCall.function.arguments
        };
        return JSON.stringify({ message: "Executing tool...", action });
    }
    return JSON.stringify({ message: message.content });
};

const callApiLlm = async (prompt: string, provider: any, attachments?: Attachment[]): Promise<string> => {
    const url = provider.baseUrl || 'http://localhost:3000/reason';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, attachments })
    });

    if (!response.ok) {
        throw new Error(`ApiLlm error: ${response.statusText}`);
    }

    const res = await response.json();
    if (!res.success) {
        throw new Error(`ApiLlm returned failure: ${JSON.stringify(res)}`);
    }

    // The API returns { success: true, data: { answer: "...", ... } }
    return res.data?.answer || "{}";
};

const callApiLlmAgent = async (
    userInput: string,
    config: AppConfig,
    toolExecutionResult: any,
    history: Message[],
    extraContext: string | undefined,
    provider: any,
    attachments?: Attachment[]
): Promise<string> => {
    const url = provider.baseUrl || 'http://localhost:3000/agent';
    const messages = [];

    const agentName = config.agentName || 'Neo Agent';
    const roleDescription = config.systemRole || 'a sophisticated AI assistant';
    let systemPrompt = `You are ${agentName}, ${roleDescription}.`;

    if (extraContext) {
        systemPrompt += `\nDYNAMIC APPLICATION CONTEXT:\n${extraContext}\n`;
    }
    if (config.contextBindings) {
        systemPrompt += "\nApplication Context Bindings:\n" +
            config.contextBindings.map(b => `${b.key}: ${JSON.stringify(b.data)}`).join('\n');
    }
    messages.push({ role: 'system', content: systemPrompt });

    for (const msg of history) {
        const msgContent: any[] = [];
        // Intentionally skipping historical msg.attachments to prevent base64 token bloat
        msgContent.push({ type: 'text', text: msg.text });
        messages.push({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msgContent });
    }

    let currentUserInput = `USER INPUT: "${userInput}"`;
    if (toolExecutionResult) {
        currentUserInput = `[SYSTEM MESSAGE]: The tool action you requested for the user's prompt ("${userInput}") has been completed.\n\n` +
            `TOOL RESULT DATA:\n${JSON.stringify(toolExecutionResult, null, 2)}\n\n` +
            `CRITICAL INSTRUCTION: You MUST now summarize the above result for the user in conversational text. ` +
            `DO NOT call any tools. You are answering the user's prompt by explaining the result of the tool you just ran.`;
    }

    const finalContent: any[] = [];
    if (attachments) {
        for (const att of attachments) {
            if (att.isPdf && att.file) {
                try {
                    const formData = new FormData();
                    formData.append('file', att.file);

                    const uploadUrl = config.endpoints?.[0]?.url
                        ? (config.endpoints[0].url as string).replace(/\/[^/]+$/, '/upload')
                        : 'http://localhost:3000/upload';

                    const uploadRes = await fetch(uploadUrl, {
                        method: 'POST',
                        body: formData
                    });

                    if (uploadRes.ok) {
                        const json = await uploadRes.json();
                        if (json.success && json.data && json.data.length > 0) {
                            const pdfData = json.data[0];
                            finalContent.push({ type: 'text', text: `\n[ATTACHED PDF DOCUMENT: ${att.name}]\n${pdfData.extractedText}\n[END PDF DOCUMENT]\n` });

                            if (pdfData.images) {
                                for (const img of pdfData.images) {
                                    finalContent.push({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${img}` } });
                                }
                            }
                        }
                    } else {
                        console.error('Failed to upload PDF:', uploadRes.statusText);
                        finalContent.push({ type: 'text', text: `\n[FAILED TO READ ATTACHED PDF: ${att.name}]\n` });
                    }
                } catch (e) {
                    console.error('Error uploading PDF:', e);
                    finalContent.push({ type: 'text', text: `\n[ERROR READING ATTACHED PDF: ${att.name}]\n` });
                }
            } else if (att.base64Url && att.mimeType.startsWith('image/')) {
                finalContent.push({ type: 'image_url', image_url: { url: att.base64Url } });
            }
        }
    }
    finalContent.push({ type: 'text', text: currentUserInput });

    messages.push({ role: 'user', content: finalContent });

    // Convert AgentEndpoints/MCP into Open-AI compatible tools schema
    const tools = (config.endpoints || []).map(e => {
        let parameters = e.inputSchema;
        if (!parameters) {
            parameters = { type: "object", properties: {} };
            if (e.payloadTemplate && typeof e.payloadTemplate === 'object') {
                for (const key of Object.keys(e.payloadTemplate)) {
                    parameters.properties[key] = { type: "string" };
                }
            }
        }
        return {
            type: "function",
            function: {
                name: e.name,
                description: e.description || `Tool for ${e.name}`,
                parameters
            }
        };
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, tools, prompt: userInput })
    });

    if (!response.ok) { throw new Error(`ApiLlm error: ${response.statusText}`); }

    const res = await response.json();
    if (!res.success) { throw new Error(`ApiLlm returned failure: ${JSON.stringify(res)}`); }
    return res.data?.answer || "{}";
};

export const callLLM = async (
    userInput: string,
    config: AppConfig,
    toolExecutionResult?: any,
    history: Message[] = [],
    extraContext?: string,
    attachments?: Attachment[],
    selectedLlmIndex: number = 0
): Promise<{ message: string, action?: any }> => {
    // Default to api-llm if no providers configured
    if (!config.llms || config.llms.length === 0) {
        console.warn('No LLM providers configured. Defaulting to local api-llm.');
        config.llms = [{
            name: 'Local API Agent',
            provider: 'api-llm',
            apiKey: '', // Not needed for local
            baseUrl: 'http://localhost:3000/ask'
        }];
    }

    const systemPrompt = buildSystemPrompt(userInput, config, toolExecutionResult, history, extraContext);
    let lastError: any;

    const providersToTry = (selectedLlmIndex >= 0 && selectedLlmIndex < config.llms.length)
        ? [config.llms[selectedLlmIndex]]
        : config.llms;

    for (const provider of providersToTry) {
        try {
            let rawResponse = '';
            if (provider.provider === 'gemini') {
                rawResponse = await callGemini(systemPrompt, provider, attachments);
            } else if (provider.provider === 'claude') {
                rawResponse = await callClaude(systemPrompt, provider, attachments);
            } else if (provider.provider === 'xai') {
                rawResponse = await callXai(userInput, config, toolExecutionResult, history, extraContext, provider, attachments);
            } else if (provider.provider === 'api-llm') {
                // If it is routing to the new structured agent endpoint:
                if (provider.baseUrl && provider.baseUrl.match(/\/agent(-neo)?$/)) {
                    rawResponse = await callApiLlmAgent(userInput, config, toolExecutionResult, history, extraContext, provider, attachments);
                } else {
                    rawResponse = await callApiLlm(systemPrompt, provider, attachments);
                }
            } else {
                continue;
            }
            return parseLLMResponse(rawResponse);
        } catch (error: any) {
            console.error(`Provider ${provider.provider} failed:`, error);
            console.warn(`Provider ${provider.provider} failed:`, error);
            lastError = error;
            continue;
        }
    }

    throw new Error(`All LLM providers failed. Last error: ${lastError?.message || 'Unknown'}`);
};
