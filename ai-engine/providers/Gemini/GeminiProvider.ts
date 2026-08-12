/**
 * GeminiProvider.ts
 *
 * Google Gemini provider for Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Gemini API communication
 * - Text generation
 * - Chat generation
 * - Health checking
 * - Configuration management
 * - Error handling
 * - Request timeout handling
 * - Usage metadata extraction
 *
 * This implementation uses the Gemini REST API directly.
 * It intentionally avoids dependency on a specific Gemini SDK version.
 */

// ============================================================
// Types
// ============================================================

export type GeminiRole =
    | "user"
    | "model";

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

export interface IGeminiGenerationOptions {

    temperature?: number;

    topP?: number;

    topK?: number;

    maxOutputTokens?: number;

    systemInstruction?: string;

    timeout?: number;
}

export interface IGeminiMessage {

    role: GeminiRole;

    text: string;
}

export interface IGeminiUsageMetadata {

    promptTokenCount?: number;

    candidatesTokenCount?: number;

    totalTokenCount?: number;
}

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

export interface IGeminiHealthStatus {

    healthy: boolean;

    configured: boolean;

    model: string;

    latency?: number;

    error?: string;

    timestamp: number;
}

export interface IGeminiProviderInfo {

    name: string;

    provider: string;

    model: string;

    apiVersion: string;

    configured: boolean;

    debug: boolean;
}

// ============================================================
// Internal REST Types
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

interface GeminiApiResponse {

    candidates?: GeminiCandidate[];

    usageMetadata?: GeminiApiUsage;

    promptFeedback?: unknown;

    error?: {

        code?: number;

        message?: string;

        status?: string;

        details?: unknown[];
    };
}

// ============================================================
// Default Configuration
// ============================================================

const DEFAULT_MODEL =
    "gemini-2.5-flash";

const DEFAULT_API_VERSION =
    "v1beta";

const DEFAULT_BASE_URL =
    "https://generativelanguage.googleapis.com";

const DEFAULT_TEMPERATURE =
    0.7;

const DEFAULT_TOP_P =
    0.95;

const DEFAULT_TOP_K =
    40;

const DEFAULT_MAX_OUTPUT_TOKENS =
    2048;

const DEFAULT_TIMEOUT =
    60000;

// ============================================================
// GeminiProvider
// ============================================================

export class GeminiProvider {

    private readonly config:
        Required<
            Pick<
                IGeminiProviderConfig,
                | "model"
                | "apiVersion"
                | "baseUrl"
                | "temperature"
                | "topP"
                | "topK"
                | "maxOutputTokens"
                | "timeout"
                | "debug"
            >
        >
        & {
            apiKey?: string;
            systemInstruction?: string;
        };

    private lastError:
        string | undefined;

    private requestCount:
        number;

    private successfulRequests:
        number;

    private failedRequests:
        number;

    private totalProcessingTime:
        number;


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
                ).replace(
                    /\/+$/,
                    ""
                ),

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

        this.lastError =
            undefined;

        this.requestCount =
            0;

        this.successfulRequests =
            0;

        this.failedRequests =
            0;

        this.totalProcessingTime =
            0;
    }


    // ========================================================
    // Environment API Key
    // ========================================================

    private getEnvironmentApiKey():
        string | undefined {

        try {

            const environment =
                (
                    globalThis as {
                        process?: {
                            env?: Record<
                                string,
                                string | undefined
                            >;
                        };
                    }
                ).process?.env;

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

    public getConfiguration():
        IGeminiProviderConfig {

        return {

            apiKey:
                this.config.apiKey,

            model:
                this.config.model,

            apiVersion:
                this.config.apiVersion,

            baseUrl:
                this.config.baseUrl,

            temperature:
                this.config.temperature,

            topP:
                this.config.topP,

            topK:
                this.config.topK,

            maxOutputTokens:
                this.config.maxOutputTokens,

            timeout:
                this.config.timeout,

            systemInstruction:
                this.config.systemInstruction,

            debug:
                this.config.debug
        };
    }


    // ========================================================
    // API Key
    // ========================================================

    public setApiKey(
        apiKey: string
    ):
        void {

        this.config.apiKey =
            apiKey.trim();

    }


    public hasApiKey():
        boolean {

        return (
            typeof this.config.apiKey === "string" &&
            this.config.apiKey.trim().length > 0
        );
    }


    // ========================================================
    // Model
    // ========================================================

    public getModel():
        string {

        return this.config.model;
    }


    public setModel(
        model: string
    ):
        void {

        if (!model.trim()) {

            throw new Error(
                "Gemini model cannot be empty"
            );
        }

        this.config.model =
            model.trim();
    }


    // ========================================================
    // Provider Information
    // ========================================================

    public getInfo():
        IGeminiProviderInfo {

        return {

            name:
                "Gemini Provider",

            provider:
                "Google Gemini",

            model:
                this.config.model,

            apiVersion:
                this.config.apiVersion,

            configured:
                this.hasApiKey(),

            debug:
                this.config.debug
        };
    }


    // ========================================================
    // URL Builder
    // ========================================================

    private buildGenerateUrl():
        string {

        return (
            `${this.config.baseUrl}` +
            `/${this.config.apiVersion}` +
            `/models/${encodeURIComponent(
                this.config.model
            )}:generateContent` +
            `?key=${encodeURIComponent(
                this.config.apiKey ?? ""
            )}`
        );
    }


    // ========================================================
    // Validation
    // ========================================================

    private validateRequest():
        void {

        if (!this.hasApiKey()) {

            throw new Error(
                "Gemini API key is not configured"
            );
        }

        if (!this.config.model) {

            throw new Error(
                "Gemini model is not configured"
            );
        }
    }


    // ========================================================
    // Text Generation
    // ========================================================

    public async generate(
        prompt: string,
        options: IGeminiGenerationOptions = {}
    ):
        Promise<IGeminiResponse> {

        const startedAt =
            Date.now();

        this.requestCount++;

        try {

            this.validateRequest();

            if (!prompt.trim()) {

                throw new Error(
                    "Gemini prompt cannot be empty"
                );
            }

            const response =
                await this.request(
                    [
                        {
                            role:
                                "user",

                            parts: [
                                {
                                    text:
                                        prompt
                                }
                            ]
                        }
                    ],
                    options
                );

            const result =
                this.parseResponse(
                    response,
                    startedAt
                );

            this.successfulRequests++;

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            this.lastError =
                undefined;

            return result;

        } catch (error) {

            this.failedRequests++;

            const message =
                this.normalizeError(
                    error
                );

            this.lastError =
                message;

            const processingTime =
                Date.now() -
                startedAt;

            this.totalProcessingTime +=
                processingTime;

            this.log(
                "Generation failed",
                message
            );

            return {

                success:
                    false,

                text:
                    "",

                model:
                    this.config.model,

                error:
                    message,

                processingTime
            };
        }
    }


    // ========================================================
    // Generate Text Alias
    // ========================================================

    public async generateText(
        prompt: string,
        options: IGeminiGenerationOptions = {}
    ):
        Promise<IGeminiResponse> {

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
    ):
        Promise<IGeminiResponse> {

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
    ):
        Promise<IGeminiResponse> {

        const startedAt =
            Date.now();

        this.requestCount++;

        try {

            this.validateRequest();

            if (
                !Array.isArray(messages) ||
                messages.length === 0
            ) {

                throw new Error(
                    "Gemini chat messages cannot be empty"
                );
            }

            const contents:
                GeminiContent[] =
                messages.map(
                    message => ({

                        role:
                            message.role,

                        parts: [
                            {
                                text:
                                    message.text
                            }
                        ]
                    })
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

            this.successfulRequests++;

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            this.lastError =
                undefined;

            return result;

        } catch (error) {

            this.failedRequests++;

            const message =
                this.normalizeError(
                    error
                );

            this.lastError =
                message;

            const processingTime =
                Date.now() -
                startedAt;

            this.totalProcessingTime +=
                processingTime;

            this.log(
                "Chat failed",
                message
            );

            return {

                success:
                    false,

                text:
                    "",

                model:
                    this.config.model,

                error:
                    message,

                processingTime
            };
        }
    }


    // ========================================================
    // Chat Text Helper
    // ========================================================

    public async chatText(
        messages: IGeminiMessage[],
        options: IGeminiGenerationOptions = {}
    ):
        Promise<string> {

        const response =
            await this.chat(
                messages,
                options
            );

        if (!response.success) {

            throw new Error(
                response.error ??
                "Gemini chat failed"
            );
        }

        return response.text;
    }


    // ========================================================
    // Request
    // ========================================================

    private async request(
        contents: GeminiContent[],
        options: IGeminiGenerationOptions
    ):
        Promise<GeminiApiResponse> {

        const controller =
            new AbortController();

        const timeout =
            setTimeout(
                () => {
                    controller.abort();
                },
                options.timeout ??
                this.config.timeout
            );

        try {

            const generationConfig = {

                temperature:
                    options.temperature ??
                    this.config.temperature,

                topP:
                    options.topP ??
                    this.config.topP,

                topK:
                    options.topK ??
                    this.config.topK,

                maxOutputTokens:
                    options.maxOutputTokens ??
                    this.config.maxOutputTokens
            };

            const body:
                Record<string, unknown> = {

                contents,

                generationConfig
            };

            const systemInstruction =
                options.systemInstruction ??
                this.config.systemInstruction;

            if (systemInstruction) {

                body.systemInstruction = {

                    parts: [
                        {
                            text:
                                systemInstruction
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

            const fetchFunction =
                this.getFetchFunction();

            const response =
                await fetchFunction(
                    this.buildGenerateUrl(),
                    {
                        method:
                            "POST",

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
                    rawText
                        ? JSON.parse(
                            rawText
                        ) as GeminiApiResponse
                        : {};

            } catch {

                throw new Error(
                    `Gemini returned invalid JSON (HTTP ${response.status})`
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
                    data.error.message ??
                    "Gemini API returned an error"
                );
            }

            return data;

        } finally {

            clearTimeout(
                timeout
            );
        }
    }


    // ========================================================
    // Fetch
    // ========================================================

    private getFetchFunction():
        (
            input:
