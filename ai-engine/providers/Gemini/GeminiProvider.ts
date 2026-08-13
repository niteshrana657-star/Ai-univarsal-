/**
 * GeminiProvider.ts
 *
 * Google Gemini Provider
 * Universal AI Operating Companion
 *
 * Responsibilities:
 * - Gemini REST API communication
 * - Text generation
 * - Chat generation
 * - Health checking
 * - Configuration management
 * - Request timeout handling
 * - Error handling
 * - Usage metadata extraction
 * - Provider statistics
 *
 * This implementation uses the Gemini REST API directly.
 * No Gemini SDK dependency is required.
 */

// ============================================================
// Types
// ============================================================

export type GeminiRole = "user" | "model";

// ============================================================
// Configuration
// ============================================================

export interface IGeminiProviderConfig {
    apiKey?: string;
    model?: string;
    apiVersion?: string;
    baseUrl?: string;
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    timeout?: number;
    systemInstruction?: string;
    debug?: boolean;
}

// ============================================================
// Generation Options
// ============================================================

export interface IGeminiGenerationOptions {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    systemInstruction?: string;
    timeout?: number;
}

// ============================================================
// Chat Message
// ============================================================

export interface IGeminiMessage {
    role: GeminiRole;
    text: string;
}

// ============================================================
// Usage Metadata
// ============================================================

export interface IGeminiUsageMetadata {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
}

// ============================================================
// Generation Response
// ============================================================

export interface IGeminiResponse {
    success: boolean;
    text: string;
    model: string;
    usage?: IGeminiUsageMetadata;
    finishReason?: string;
    raw?: unknown;
    error?: string;
    processingTime?: number;
}

// ============================================================
// Health Status
// ============================================================

export interface IGeminiHealthStatus {
    healthy: boolean;
    configured: boolean;
    model: string;
    latency?: number;
    error?: string;
    timestamp: number;
}

// ============================================================
// Provider Information
// ============================================================

export interface IGeminiProviderInfo {
    name: string;
    provider: string;
    model: string;
    apiVersion: string;
    configured: boolean;
    debug: boolean;
    requestCount: number;
    successfulRequests: number;
    failedRequests: number;
    averageProcessingTime: number;
    lastError?: string;
}

// ============================================================
// Provider Statistics
// ============================================================

export interface IGeminiProviderStats {
    requestCount: number;
    successfulRequests: number;
    failedRequests: number;
    totalProcessingTime: number;
    averageProcessingTime: number;
    lastError?: string;
}

// ============================================================
// Internal REST API Types
// ============================================================

interface GeminiPart {
    text?: string;
}

interface GeminiContent {
    role?: GeminiRole;
    parts: GeminiPart[];
}

interface GeminiCandidate {
    content?: GeminiContent;
    finishReason?: string;
    index?: number;
}

interface GeminiApiUsage {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
}

interface GeminiApiError {
    code?: number;
    message?: string;
    status?: string;
    details?: unknown[];
}

interface GeminiApiResponse {
    candidates?: GeminiCandidate[];
    usageMetadata?: GeminiApiUsage;
    promptFeedback?: unknown;
    error?: GeminiApiError;
}

// ============================================================
// Defaults
// ============================================================

const DEFAULT_MODEL = "gemini-2.5-flash";

const DEFAULT_API_VERSION = "v1beta";

const DEFAULT_BASE_URL =
    "https://generativelanguage.googleapis.com";

const DEFAULT_TEMPERATURE = 0.7;

const DEFAULT_TOP_P = 0.95;

const DEFAULT_TOP_K = 40;

const DEFAULT_MAX_OUTPUT_TOKENS = 2048;

const DEFAULT_TIMEOUT = 60000;

// ============================================================
// GeminiProvider
// ============================================================

export class GeminiProvider {
    private readonly config: {
        apiKey?: string;
        model: string;
        apiVersion: string;
        baseUrl: string;
        temperature: number;
        topP: number;
        topK: number;
        maxOutputTokens: number;
        timeout: number;
        systemInstruction?: string;
        debug: boolean;
    };

    private lastError: string | undefined;

    private requestCount = 0;

    private successfulRequests = 0;

    private failedRequests = 0;

    private totalProcessingTime = 0;

    // ========================================================
    // Constructor
    // ========================================================

    constructor(
        config: IGeminiProviderConfig = {}
    ) {
        this.config = {
            apiKey:
                config.apiKey ??
                this.getEnvironmentApiKey(),

            model:
                config.model ??
                DEFAULT_MODEL,

            apiVersion:
                config.apiVersion ??
                DEFAULT_API_VERSION,

            baseUrl:
                (
                    config.baseUrl ??
                    DEFAULT_BASE_URL
                ).replace(/\/+$/, ""),

            temperature:
                config.temperature ??
                DEFAULT_TEMPERATURE,

            topP:
                config.topP ??
                DEFAULT_TOP_P,

            topK:
                config.topK ??
                DEFAULT_TOP_K,

            maxOutputTokens:
                config.maxOutputTokens ??
                DEFAULT_MAX_OUTPUT_TOKENS,

            timeout:
                config.timeout ??
                DEFAULT_TIMEOUT,

            systemInstruction:
                config.systemInstruction,

            debug:
                config.debug ??
                false
        };
    }

    // ========================================================
    // Environment API Key
    // ========================================================

    private getEnvironmentApiKey(): string | undefined {
        try {
            const globalObject =
                globalThis as {
                    process?: {
                        env?: Record<
                            string,
                            string | undefined
                        >;
                    };
                };

            const environment =
                globalObject.process?.env;

            if (!environment) {
                return undefined;
            }

            return (
                environment.GEMINI_API_KEY ??
                environment.GOOGLE_API_KEY ??
                environment.GOOGLE_GEMINI_API_KEY
            );
        } catch {
            return undefined;
        }
    }

    // ========================================================
    // Configuration
    // ========================================================

    public getConfiguration(): IGeminiProviderConfig {
        return {
            apiKey: this.config.apiKey,
            model: this.config.model,
            apiVersion: this.config.apiVersion,
            baseUrl: this.config.baseUrl,
            temperature: this.config.temperature,
            topP: this.config.topP,
            topK: this.config.topK,
            maxOutputTokens:
                this.config.maxOutputTokens,
            timeout: this.config.timeout,
            systemInstruction:
                this.config.systemInstruction,
            debug: this.config.debug
        };
    }

    // ========================================================
    // API Key
    // ========================================================

    public setApiKey(apiKey: string): void {
        if (typeof apiKey !== "string") {
            throw new Error(
                "Gemini API key must be a string."
            );
        }

        const normalized = apiKey.trim();

        if (!normalized) {
            throw new Error(
                "Gemini API key cannot be empty."
            );
        }

        this.config.apiKey = normalized;
        this.lastError = undefined;
    }

    public clearApiKey(): void {
        this.config.apiKey = undefined;
    }

    public hasApiKey(): boolean {
        return (
            typeof this.config.apiKey === "string" &&
            this.config.apiKey.trim().length > 0
        );
    }

    // ========================================================
    // Model
    // ========================================================

    public getModel(): string {
        return this.config.model;
    }

    public setModel(model: string): void {
        if (
            typeof model !== "string" ||
            !model.trim()
        ) {
            throw new Error(
                "Gemini model cannot be empty."
            );
        }

        this.config.model = model.trim();
    }

    // ========================================================
    // Provider Information
    // ========================================================

    public getInfo(): IGeminiProviderInfo {
        return {
            name: "Gemini Provider",
            provider: "Google Gemini",
            model: this.config.model,
            apiVersion: this.config.apiVersion,
            configured: this.hasApiKey(),
            debug: this.config.debug,
            requestCount:
                this.requestCount,
            successfulRequests:
                this.successfulRequests,
            failedRequests:
                this.failedRequests,
            averageProcessingTime:
                this.getAverageProcessingTime(),
            lastError:
                this.lastError
        };
    }

    // ========================================================
    // Statistics
    // ========================================================

    public getStats(): IGeminiProviderStats {
        return {
            requestCount:
                this.requestCount,

            successfulRequests:
                this.successfulRequests,

            failedRequests:
                this.failedRequests,

            totalProcessingTime:
                this.totalProcessingTime,

            averageProcessingTime:
                this.getAverageProcessingTime(),

            lastError:
                this.lastError
        };
    }

    public getAverageProcessingTime(): number {
        if (this.requestCount === 0) {
            return 0;
        }

        return (
            this.totalProcessingTime /
            this.requestCount
        );
    }

    public getLastError(): string | undefined {
        return this.lastError;
    }

    public resetStatistics(): void {
        this.requestCount = 0;
        this.successfulRequests = 0;
        this.failedRequests = 0;
        this.totalProcessingTime = 0;
        this.lastError = undefined;
    }

    // ========================================================
    // URL Builder
    // ========================================================

    private buildGenerateUrl(): string {
        const apiKey =
            this.config.apiKey ?? "";

        return (
            `${this.config.baseUrl}` +
            `/${this.config.apiVersion}` +
            `/models/${encodeURIComponent(
                this.config.model
            )}:generateContent` +
            `?key=${encodeURIComponent(apiKey)}`
        );
    }

    // ========================================================
    // Validation
    // ========================================================

    private validateRequest(): void {
        if (!this.hasApiKey()) {
            throw new Error(
                "Gemini API key is not configured."
            );
        }

        if (!this.config.model.trim()) {
            throw new Error(
                "Gemini model is not configured."
            );
        }

        if (!this.config.baseUrl.trim()) {
            throw new Error(
                "Gemini base URL is not configured."
            );
        }

        if (!this.config.apiVersion.trim()) {
            throw new Error(
                "Gemini API version is not configured."
            );
        }
    }

    // ========================================================
    // Text Generation
    // ========================================================

    public async generate(
        prompt: string,
        options: IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        const startedAt = Date.now();

        this.requestCount++;

        try {
            this.validateRequest();

            if (
                typeof prompt !== "string" ||
                !prompt.trim()
            ) {
                throw new Error(
                    "Gemini prompt cannot be empty."
                );
            }

            const contents: GeminiContent[] = [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ];

            const response =
                await this.request(
                    contents,
                    options
                );

            const result =
                this.parseResponse(
                    response,
                    startedAt
                );

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            if (result.success) {
                this.successfulRequests++;
                this.lastError = undefined;
            } else {
                this.failedRequests++;
                this.lastError =
                    result.error;
            }

            return result;
        } catch (error) {
            return this.handleFailure(
                error,
                startedAt,
                "Generation failed"
            );
        }
    }

    // ========================================================
    // Generate Text Alias
    // ========================================================

    public async generateText(
        prompt: string,
        options: IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        return this.generate(
            prompt,
            options
        );
    }

    // ========================================================
    // Complete Alias
    // ========================================================

    public async complete(
        prompt: string,
        options: IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        return this.generate(
            prompt,
            options
        );
    }

    // ========================================================
    // Chat
    // ========================================================

    public async chat(
        messages: IGeminiMessage[],
        options: IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        const startedAt = Date.now();

        this.requestCount++;

        try {
            this.validateRequest();

            if (
                !Array.isArray(messages) ||
                messages.length === 0
            ) {
                throw new Error(
                    "Gemini chat messages cannot be empty."
                );
            }

            const contents: GeminiContent[] =
                messages.map(
                    (
                        message
                    ): GeminiContent => {
                        if (
                            !message ||
                            typeof message.text !==
                                "string" ||
                            !message.text.trim()
                        ) {
                            throw new Error(
                                "Gemini chat message cannot be empty."
                            );
                        }

                        if (
                            message.role !== "user" &&
                            message.role !== "model"
                        ) {
                            throw new Error(
                                "Invalid Gemini chat message role."
                            );
                        }

                        return {
                            role:
                                message.role,
                            parts: [
                                {
                                    text:
                                        message.text
                                }
                            ]
                        };
                    }
                );

            const response =
                await this.request(
                    contents,
                    options
                );

            const result =
                this.parseResponse(
                    response,
                    startedAt
                );

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            if (result.success) {
                this.successfulRequests++;
                this.lastError = undefined;
            } else {
                this.failedRequests++;
                this.lastError =
                    result.error;
            }

            return result;
        } catch (error) {
            return this.handleFailure(
                error,
                startedAt,
                "Chat failed"
            );
        }
    }

    // ========================================================
    // Chat Text Helper
    // ========================================================

    public async chatText(
        messages: IGeminiMessage[],
        options: IGeminiGenerationOptions = {}
    ): Promise<string> {
        const response =
            await this.chat(
                messages,
                options
            );

        if (!response.success) {
            throw new Error(
                response.error ??
                "Gemini chat failed."
            );
        }

        return response.text;
    }

    // ========================================================
    // Raw Gemini Request
    // ========================================================

    private async request(
        contents: GeminiContent[],
        options: IGeminiGenerationOptions
    ): Promise<GeminiApiResponse> {
        const controller =
            new AbortController();

        const timeoutMs =
            this.getPositiveNumber(
                options.timeout ??
                this.config.timeout,
                DEFAULT_TIMEOUT
            );

        const timeoutHandle =
            setTimeout(
                () => {
                    controller.abort();
                },
                timeoutMs
            );

        try {
            const generationConfig = {
                temperature:
                    this.getNumber(
                        options.temperature,
                        this.config.temperature
                    ),

                topP:
                    this.getNumber(
                        options.topP,
                        this.config.topP
                    ),

                topK:
                    this.getNumber(
                        options.topK,
                        this.config.topK
                    ),

                maxOutputTokens:
                    this.getPositiveNumber(
                        options.maxOutputTokens,
                        this.config.maxOutputTokens
                    )
            };

            const body: Record<
                string,
                unknown
            > = {
                contents,
                generationConfig
            };

            const systemInstruction =
                options.systemInstruction ??
                this.config.systemInstruction;

            if (
                typeof systemInstruction ===
                    "string" &&
                systemInstruction.trim()
            ) {
                body.systemInstruction = {
                    parts: [
                        {
                            text:
                                systemInstruction.trim()
                        }
                    ]
                };
            }

            this.log(
                "Sending Gemini request",
                {
                    model:
                        this.config.model
                }
            );

            const response =
                await fetch(
                    this.buildGenerateUrl(),
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                body
                            ),

                        signal:
                            controller.signal
                    }
                );

            const rawText =
                await response.text();

            let data:
                GeminiApiResponse;

            try {
                data =
                    rawText.trim()
                        ? (
                            JSON.parse(
                                rawText
                            ) as GeminiApiResponse
                        )
                        : {};
            } catch {
                throw new Error(
                    `Gemini returned invalid JSON (HTTP ${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    this.extractApiError(
                        data,
                        response.status
                    )
                );
            }

            if (data.error) {
                throw new Error(
                    this.extractApiError(
                        data,
                        response.status
                    )
                );
            }

            return data;
        } catch (error) {
            if (
                error instanceof Error &&
                error.name === "AbortError"
            ) {
                throw new Error(
                    `Gemini request timed out after ${timeoutMs} ms.`
                );
            }

            throw error;
        } finally {
            clearTimeout(
                timeoutHandle
            );
        }
    }

    // ========================================================
    // Response Parser
    // ========================================================

    private parseResponse(
        response: GeminiApiResponse,
        startedAt: number
    ): IGeminiResponse {
        const processingTime =
            Date.now() - startedAt;

        if (response.error) {
            return {
                success: false,
                text: "",
                model:
                    this.config.model,
                error:
                    this.extractApiError(
                        response,
                        0
                    ),
                raw: response,
                processingTime
            };
        }

        const candidates =
            Array.isArray(
                response.candidates
            )
                ? response.candidates
                : [];

        if (candidates.length === 0) {
            return {
                success: false,
                text: "",
                model:
                    this.config.model,
                error:
                    "Gemini returned no candidates.",
                raw: response,
                processingTime
            };
        }

        const candidate =
            candidates[0];

        const parts =
            candidate.content?.parts ??
            [];

        const textParts =
            parts
                .map(
                    part =>
                        typeof part.text ===
                        "string"
                            ? part.text
                            : ""
                )
                .filter(
                    text =>
                        text.length > 0
                );

        const text =
            textParts.join("");

        if (!text && !candidate.finishReason) {
            return {
                success: false,
                text: "",
                model:
                    this.config.model,
                error:
                    "Gemini returned an empty response.",
                raw: response,
                processingTime
            };
        }

        const usage =
            response.usageMetadata
                ? {
                    promptTokenCount:
                        response
                            .usageMetadata
                            .promptTokenCount,

                    candidatesTokenCount:
                        response
                            .usageMetadata
                            .candidatesTokenCount,

                    totalTokenCount:
                        response
                            .usageMetadata
                            .totalTokenCount
                }
                : undefined;

        return {
            success: true,
            text,
            model:
                this.config.model,
            usage,
            finishReason:
                candidate.finishReason,
            raw: response,
            processingTime
        };
    }

    // ========================================================
    // API Error Extraction
    // ========================================================

    private extractApiError(
        data: GeminiApiResponse,
        statusCode: number
    ): string {
        const apiError =
            data.error;

        if (apiError) {
            const message =
                apiError.message?.trim();

            const status =
                apiError.status?.trim();

            const code =
                apiError.code;

            if (
                message &&
                status &&
                code
            ) {
                return (
                    `Gemini API error ${code} ` +
                    `(${status}): ${message}`
                );
            }

            if (message) {
                return message;
            }
        }

        if (statusCode > 0) {
            return (
                `Gemini API request failed ` +
                `with HTTP ${statusCode}.`
            );
        }

        return "Gemini API request failed.";
    }

    // ========================================================
    // Error Handler
    // ========================================================

    private handleFailure(
        error: unknown,
        startedAt: number,
        logMessage: string
    ): IGeminiResponse {
        this.failedRequests++;

        const processingTime =
            Date.now() - startedAt;

        this.totalProcessingTime +=
            processingTime;

        const message =
            this.normalizeError(
                error
            );

        this.lastError =
            message;

        this.log(
            logMessage,
            message
        );

        return {
            success: false,
            text: "",
            model:
                this.config.model,
            error:
                message,
            processingTime
        };
    }

    // ========================================================
    // Error Normalization
    // ========================================================

    private normalizeError(
        error: unknown
    ): string {
        if (
            error instanceof Error
        ) {
            return (
                error.message ||
                "Unknown Gemini error."
            );
        }

        if (
            typeof error === "string"
        ) {
            return (
                error ||
                "Unknown Gemini error."
            );
        }

        try {
            const serialized =
                JSON.stringify(
                    error
                );

            if (
                serialized &&
                serialized !== "{}"
            ) {
                return serialized;
            }
        } catch {
            // Ignore serialization errors.
        }

        return "Unknown Gemini error.";
    }

    // ========================================================
    // Health Check
    // ========================================================

    public async healthCheck(
        timeout?: number
    ): Promise<IGeminiHealthStatus> {
        const startedAt =
            Date.now();

        const configured =
            this.hasApiKey() &&
            Boolean(
                this.config.model.trim()
            );

        if (!configured) {
            return {
                healthy: false,
                configured: false,
                model:
                    this.config.model,
                latency:
                    Date.now() -
                    startedAt,
                error:
                    "Gemini provider is not configured.",
                timestamp:
                    Date.now()
            };
        }

        try {
            const result =
                await this.generate(
                    "Reply with the word OK.",
                    {
                        maxOutputTokens: 8,
                        temperature: 0,
                        timeout:
                            timeout ??
                            this.config.timeout
                    }
                );

            const latency =
                Date.now() -
                startedAt;

            if (!result.success) {
                return {
                    healthy: false,
                    configured: true,
                    model:
                        this.config.model,
                    latency,
                    error:
                        result.error,
                    timestamp:
                        Date.now()
                };
            }

            return {
                healthy: true,
                configured: true,
                model:
                    this.config.model,
                latency,
                timestamp:
                    Date.now()
            };
        } catch (error) {
            return {
                healthy: false,
                configured: true,
                model:
                    this.config.model,
                latency:
                    Date.now() -
                    startedAt,
                error:
                    this.normalizeError(
                        error
                    ),
                timestamp:
                    Date.now()
            };
        }
    }

    // ========================================================
    // Availability
    // ========================================================

    public isAvailable(): boolean {
        return this.hasApiKey();
    }

    // ========================================================
    // Provider Name
    // ========================================================

    public getProviderName(): string {
        return "gemini";
    }

    // ========================================================
    // Provider Version
    // ========================================================

    public getProviderVersion(): string {
        return this.config.apiVersion;
    }

    // ========================================================
    // Reset
    // ========================================================

    public reset(): void {
        this.lastError =
            undefined;
    }

    // ========================================================
    // Logging
    // ========================================================

    private log(
        message: string,
        data?: unknown
    ): void {
        if (!this.config.debug) {
            return;
        }

        try {
            if (
                typeof console !==
                "undefined"
            ) {
                if (
                    typeof data ===
                    "undefined"
                ) {
                    console.debug(
                        `[GeminiProvider] ${message}`
                    );
                } else {
                    console.debug(
                        `[GeminiProvider] ${message}`,
                        data
                    );
                }
            }
        } catch {
            // Logging must never break provider execution.
        }
    }

    // ========================================================
    // Number Helpers
    // ========================================================

    private getNumber(
        value: number | undefined,
        fallback: number
    ): number {
        if (
            typeof value === "number" &&
            Number.isFinite(value)
        ) {
            return value;
        }

        return fallback;
    }

    private getPositiveNumber(
        value: number | undefined,
        fallback: number
    ): number {
        if (
            typeof value === "number" &&
            Number.isFinite(value) &&
            value > 0
        ) {
            return value;
        }

        return fallback;
    }
}
