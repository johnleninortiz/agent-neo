import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import type { EndpointMetadata } from "../types";

class MCPConnectionManager {
    private clients: Map<string, Client> = new Map();
    private connectionLocks: Map<string, Promise<void>> = new Map();
    private mcpEndpoints: EndpointMetadata[] = [];

    /**
     * Connect to an MCP server via SSE
     */
    async connect(url: string, onConnect?: () => void) {
        if (this.connectionLocks.has(url)) {
            // Wait for existing connection attempt to complete
            await this.connectionLocks.get(url);
            if (onConnect) onConnect();
            return;
        }

        console.log(`[MCP Client] Connecting to ${url}...`);

        const connectPromise = (async () => {
            try {
                // Ensure relative URLs are parsed correctly against current window origin
                const parsedUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
                const transport = new SSEClientTransport(parsedUrl);
                const client = new Client(
                    { name: "agent-neo-client", version: "1.0.0" },
                    { capabilities: {} }
                );

                await client.connect(transport);
                this.clients.set(url, client);
                console.log(`[MCP Client] Successfully connected to ${url}`);

                // Fetch tools immediately
                await this.refreshTools(url);
            } catch (error) {
                console.error(`[MCP Client] Failed to connect to ${url}:`, error);
                this.connectionLocks.delete(url); // allow retry
            }
        })();

        this.connectionLocks.set(url, connectPromise);
        await connectPromise;

        if (onConnect) onConnect();
    }

    /**
     * Fetch tools from connected servers and map to Agent-Neo EndpointMetadata format
     */
    async refreshTools(url: string) {
        const client = this.clients.get(url);
        if (!client) return;

        try {
            const result = await client.listTools();
            const mappedEndpoints = result.tools.map((tool) => {
                // MCP tools are natively parsed by the LLM returning pure JSON in action.payload.
                // We deliberately OMIT a payloadTemplate here so api.ts doesn't merge literal undefined or "{{key}}" strings over the valid LLM inputs.
                return {
                    name: tool.name,
                    description: tool.description || "MCP Extracted Tool",
                    inputSchema: tool.inputSchema,
                    mcpBacked: true,
                    handler: async (payload: any) => {
                        console.log(`[MCP Client] Calling tool ${tool.name} with payload:`, payload);
                        const toolResult = await client.callTool({
                            name: tool.name,
                            arguments: payload
                        });
                        return toolResult;
                    }
                } as EndpointMetadata;
            });

            // Avoid duplicates
            this.mcpEndpoints = [
                ...this.mcpEndpoints.filter(e => !mappedEndpoints.find(me => me.name === e.name)),
                ...mappedEndpoints
            ];

            console.log(`[MCP Client] Fetched ${mappedEndpoints.length} tools from ${url}`);
        } catch (error) {
            console.error(`[MCP Client] Failed to list tools from ${url}:`, error);
        }
    }

    /**
     * Returns all discovered tools across connected MCP servers
     */
    getEndpoints(): EndpointMetadata[] {
        return this.mcpEndpoints;
    }
}

export const mcpManager = new MCPConnectionManager();
