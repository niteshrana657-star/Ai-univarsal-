/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIProvider.ts
 * -------------------------------------------------------------
 *
 * Unified AI Provider Contract
 *
 * All AI providers must follow this contract:
 * - Gemini
 * - OpenAI
 * - Ollama
 * - Local AI
 * -------------------------------------------------------------
 */

// =============================================================
// Provider State
// =============================================================

export enum AIProviderState {
    IDLE = "IDLE",
    INITIALIZING = "INITIALIZING",
    READY = "READY",
    BUSY = "BUSY",
    OFFLINE = "OFFLINE",
    ERROR = "ERROR"
}


// =============================================================
// Provider Status
// =============================================================

export enum ProviderStatus {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    CONNECTING = "CONNECTING",
    ERROR = "ERROR"
}


// =============================================================
// Provider Capabilities
// =============================================================

export type AIProviderCapability =
    | "CHAT"
    | "VISION"
    | "EMBEDDING"
    | "STREAMING"
    | "FUNCTION_CALLING"
    | "IMAGE_GENERATION";


// =============================================================
// Provider Configuration
// =============================================================

export interface AIProviderConfig {

    id: string;

    name: string;

    provider: string;

    version: string;

    enabled: boolean;

    apiKey?: string;

    endpoint?: string;

    model?: string;

    timeout: number;

    maxTokens: number;

    metadata?: Record<string, unknown>;
}


// Backward-compatible configuration name
export type IAIProviderConfig =
    AIProviderConfig;


// =============================================================
// Provider Request
// =============================================================

export interface AIProviderRequest {

    id?: string;

    prompt: string;

    systemPrompt?: string;

    context?: Record<string, unknown>;

    model?: string;

    temperature?: number;

    maxTokens?: number;

    stream?: boolean;

    metadata?: Record<string, unknown>;
}


// Backward-compatible request name
export type IAIProviderRequest =
    AIProviderRequest;


// =============================================================
// Provider Response
// =============================================================

export interface AIProviderResponse {

    success: boolean;

    text: string;

    provider: string;

    model: string;

    timestamp: number;

    content?: string;

    finishReason?: string;

    promptTokens?: number;

    completionTokens?: number;

    totalTokens?: number;

    processingTime?: number;

    error?: string;

    metadata?: Record<string, unknown>;
}


// Backward-compatible response name
export type IAIProviderResponse =
    AIProviderResponse;


// =============================================================
// Provider Contract
// =============================================================

export interface AIProvider {

    /**
     * Unique provider ID
     */
    readonly id: string;

    /**
     * Provider name
     */
    readonly provider: string;

    /**
     * Human-readable name
     */
    readonly name: string;

    /**
     * Connect provider
     */
    connect(): Promise<boolean>;

    /**
     * Disconnect provider
     */
    disconnect(): Promise<void>;

    /**
     * Check connection
     */
    isConnected(): boolean;

    /**
     * Get provider status
     */
    getStatus(): ProviderStatus;

    /**
     * Generate AI response
     */
    generate(
        request: AIProviderRequest
    ): Promise<AIProviderResponse>;

}


// =============================================================
// Extended Provider Lifecycle
// =============================================================

export interface AIProviderLifecycle
    extends AIProvider {

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

    isAvailable(): boolean;

    getState(): AIProviderState;

    getConfiguration(): AIProviderConfig;
}


// =============================================================
// Provider Health
// =============================================================

export interface AIProviderHealth {

    available: boolean;

    state: AIProviderState;

    latency: number;

    lastCheck: number;

    uptime: number;

    message?: string;
}


// Backward-compatible health name
export type IAIProviderHealth =
    AIProviderHealth;


// =============================================================
// Provider Metrics
// =============================================================

export interface AIProviderMetrics {

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    averageLatency: number;

    totalTokens: number;

    lastRequestTime?: number;
}


// Backward-compatible metrics name
export type IAIProviderMetrics =
    AIProviderMetrics;


// =============================================================
// Provider Event
// =============================================================

export interface AIProviderEvent {

    type: string;

    timestamp: number;

    provider: string;

    payload?: Record<string, unknown>;
}


// =============================================================
// Provider Factory Contract
// =============================================================

export interface AIProviderFactory {

    create(
        config: AIProviderConfig
    ): Promise<AIProvider>;
}


// Backward-compatible factory name
export type IAIProviderFactory =
    AIProviderFactory;


// =============================================================
// Provider Registry Entry
// =============================================================

export interface AIProviderRegistryEntry {

    id: string;

    name: string;

    version: string;

    capabilities: AIProviderCapability[];

    enabled: boolean;

    provider: AIProvider;
}


// Backward-compatible registry name
export type IAIProviderRegistryEntry =
    AIProviderRegistryEntry;


// =============================================================
// Defaults
// =============================================================

export const DEFAULT_PROVIDER_TIMEOUT =
    30000;

export const DEFAULT_MAX_TOKENS =
    4096;


// =============================================================
// Version
// =============================================================

export const AI_PROVIDER_VERSION =
    "1.0.0";
