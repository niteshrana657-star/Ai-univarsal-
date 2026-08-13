/**
 * providers/index.ts
 *
 * AI Provider Layer Exports
 * Universal AI Operating Companion
 */

// ============================================================
// Core Provider Types
// ============================================================

export * from "./AIProvider";
export * from "./AIProviderFactory";
export * from "./ProviderRegistry";
export * from "./ProviderManager";

// ============================================================
// Provider Implementations
// ============================================================

// OpenAI
export * from "./OpenAI";

// Gemini
export * from "./Gemini";

// Ollama
export * from "./Ollama";

// Local
export * from "./Local";

// ============================================================
// Default Provider
// ============================================================

export const DEFAULT_AI_PROVIDER = "gemini" as const;

// ============================================================
// Supported Providers
// ============================================================

export const SUPPORTED_AI_PROVIDERS = [
    "gemini",
    "openai",
    "ollama",
    "local",
] as const;

// ============================================================
// Provider Name Type
// ============================================================

export type AIProviderName =
    typeof SUPPORTED_AI_PROVIDERS[number];

// ============================================================
// Provider Validation
// ============================================================

export function isSupportedProvider(
    provider: string
): provider is AIProviderName {
    return SUPPORTED_AI_PROVIDERS.includes(
        provider as AIProviderName
    );
}

// ============================================================
// Provider Information
// ============================================================

export interface IAIProviderInfo {
    id: AIProviderName;

    displayName: string;

    supportsOnline: boolean;

    supportsOffline: boolean;

    supportsVision: boolean;

    supportsStreaming: boolean;
}

// ============================================================
// Provider Information Registry
// ============================================================

export const AI_PROVIDER_INFO: Record<
    AIProviderName,
    IAIProviderInfo
> = {
    gemini: {
        id: "gemini",
        displayName: "Google Gemini",
        supportsOnline: true,
        supportsOffline: false,
        supportsVision: true,
        supportsStreaming: true,
    },

    openai: {
        id: "openai",
        displayName: "OpenAI",
        supportsOnline: true,
        supportsOffline: false,
        supportsVision: true,
        supportsStreaming: true,
    },

    ollama: {
        id: "ollama",
        displayName: "Ollama",
        supportsOnline: false,
        supportsOffline: true,
        supportsVision: false,
        supportsStreaming: true,
    },

    local: {
        id: "local",
        displayName: "Local AI",
        supportsOnline: false,
        supportsOffline: true,
        supportsVision: false,
        supportsStreaming: false,
    },
};

// ============================================================
// Provider Helpers
// ============================================================

export function getProviderInfo(
    provider: AIProviderName
): IAIProviderInfo {
    return AI_PROVIDER_INFO[provider];
}

export function getDefaultProvider(): AIProviderName {
    return DEFAULT_AI_PROVIDER;
}

export function getSupportedProviders():
    readonly AIProviderName[] {
    return SUPPORTED_AI_PROVIDERS;
}

export function hasVisionSupport(
    provider: AIProviderName
): boolean {
    return AI_PROVIDER_INFO[provider].supportsVision;
}

export function hasStreamingSupport(
    provider: AIProviderName
): boolean {
    return AI_PROVIDER_INFO[provider].supportsStreaming;
}

export function hasOfflineSupport(
    provider: AIProviderName
): boolean {
    return AI_PROVIDER_INFO[provider].supportsOffline;
}

// ============================================================
// Version
// ============================================================

export const PROVIDERS_VERSION = "1.0.0";

// ============================================================
// Default Export
// ============================================================

export default {
    DEFAULT_AI_PROVIDER,
    SUPPORTED_AI_PROVIDERS,
    AI_PROVIDER_INFO,

    getDefaultProvider,
    getSupportedProviders,
    getProviderInfo,
    isSupportedProvider,

    hasVisionSupport,
    hasStreamingSupport,
    hasOfflineSupport,

    PROVIDERS_VERSION,
};
