import type { AppConfig, EndpointMetadata } from '../types';

export const callEndpoint = async (
    endpointName: string,
    config: AppConfig,
    payload: any = {}
) => {
    const endpoint = config.endpoints.find((e: EndpointMetadata) => e.name === endpointName);

    if (!endpoint) {
        throw new Error(`Endpoint ${endpointName} not found in configuration.`);
    }

    const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: endpoint.method !== 'GET' ? JSON.stringify({ ...endpoint.payloadTemplate, ...payload }) : undefined,
        credentials: endpoint.withCredentials ? 'include' : undefined,
    });

    if (!response.ok) {
        throw new Error(`API call to ${endpoint.name} failed: ${response.statusText}`);
    }

    return response.json();
};

export const createReport = async (config: AppConfig) => {
    // Hardcoded payload as requested for MVP
    return callEndpoint('createReport', config, {
        reportType: 'General',
        generatedAt: new Date().toISOString(),
    });
};
