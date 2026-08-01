/**
 * AIProvider.ts
 *
 * Base Provider Contract
 * Universal AI Operating Companion
 */

// ==============================
// Provider Types
// ==============================

export type AIProviderState =
    | "IDLE"
    | "INITIALIZING"
    | "READY"
    | "BUSY"
    | "OFFLINE"
    | "ERROR";



export type AIProviderCapability =
    | "CHAT"
    | "VISION"
    | "EMBEDDING"
    | "STREAMING"
    | "FUNCTION_CALLING"
    | "IMAGE_GENERATION";



// ==============================
// Provider Configuration
// ==============================

export interface IAIProviderConfig {

    id: string;

    name: string;

    version: string;

    enabled: boolean;

    apiKey?: string;

    endpoint?: string;

    timeout: number;

    maxTokens: number;

    metadata?: Record<string, unknown>;

}
// ==============================
// Provider Request
// ==============================

export interface IAIProviderRequest {

    id: string;

    prompt: string;

    systemPrompt?: string;

    context?: Record<string, unknown>;

    model?: string;

    temperature?: number;

    maxTokens?: number;

    stream?: boolean;

    metadata?: Record<string, unknown>;

}



// ==============================
// Provider Response
// ==============================

export interface IAIProviderResponse {

    success: boolean;

    provider: string;

    model: string;

    content?: string;

    finishReason?: string;

    promptTokens?: number;

    completionTokens?: number;

    totalTokens?: number;

    processingTime?: number;

    error?: string;

    metadata?: Record<string, unknown>;

}



// ==============================
// Provider Interface
// ==============================

export interface IAIProvider {

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

    isAvailable(): boolean;

    getState(): AIProviderState;

    getConfiguration(): IAIProviderConfig;

    generate(
        request: IAIProviderRequest
    ): Promise<IAIProviderResponse>;

}
// ==============================
// Provider Health
// ==============================

export interface IAIProviderHealth {

    available: boolean;

    state: AIProviderState;

    latency: number;

    lastCheck: number;

    uptime: number;

    message?: string;

}



// ==============================
// Provider Metrics
// ==============================

export interface IAIProviderMetrics {

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    averageLatency: number;

    totalTokens: number;

    lastRequestTime?: number;

}



// ==============================
// Provider Events
// ==============================

export interface IAIProviderEvent {

    type: string;

    timestamp: number;

    provider: string;

    payload?: Record<string, unknown>;

}



// ==============================
// Extended Provider Contract
// ==============================

export interface IAIProviderLifecycle
    extends IAIProvider {

    getHealth():
        IAIProviderHealth;

    getMetrics():
        IAIProviderMetrics;

    resetMetrics():
        void;

    emit(
        event: IAIProviderEvent
    ): void;

    }
// ==============================
// Provider Factory Contract
// ==============================

export interface IAIProviderFactory {

    create(
        config: IAIProviderConfig
    ): Promise<IAIProvider>;

}



// ==============================
// Provider Registry Entry
// ==============================

export interface IAIProviderRegistryEntry {

    id: string;

    name: string;

    version: string;

    capabilities: AIProviderCapability[];

    enabled: boolean;

    provider: IAIProvider;

}



// ==============================
// Constants
// ==============================

export const DEFAULT_PROVIDER_TIMEOUT =
    30000;

export const DEFAULT_MAX_TOKENS =
    4096;



// ==============================
// Version
// ==============================

export const AI_PROVIDER_VERSION =
    "1.0.0";
