import type { EndpointMetadata } from "../types";
declare class MCPConnectionManager {
    private clients;
    private connectionLocks;
    private mcpEndpoints;
    /**
     * Connect to an MCP server via SSE
     */
    connect(url: string, onConnect?: () => void): Promise<void>;
    /**
     * Fetch tools from connected servers and map to Agent-Neo EndpointMetadata format
     */
    refreshTools(url: string): Promise<void>;
    /**
     * Returns all discovered tools across connected MCP servers
     */
    getEndpoints(): EndpointMetadata[];
}
export declare const mcpManager: MCPConnectionManager;
export {};
