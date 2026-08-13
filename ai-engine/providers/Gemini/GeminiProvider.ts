/**
 * GeminiProvider.ts
 *
 * Google Gemini Provider
 * Universal AI Operating Companion
 *
 * REST API implementation.
 */

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
    requestCount: number;
    successfulRequests: number;
    failedRequests: number;
    averageProcessingTime: number;
}

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

interface SimpleFetchResponse {
    ok: boolean;
    status: number;
    statusText: string;
    text(): Promise<string>;
}

type SimpleFetch = (
    input: string,
    init?: {
        method?: string;
        headers?: Record<string, string>;
        body?: string;
        signal?: AbortSignal;
    }
) => Promise<SimpleFetchResponse>;

const DEFAULT_MODEL = "gemini-2.5-flash";

const DEFAULT_API_VERSION = "v1beta";

const DEFAULT_BASE_URL =
    "https://generativelanguage.googleapis.com";

const DEFAULT_TEMPERATURE = 0.7;

const DEFAULT_TOP_P = 0.95;

const DEFAULT_TOP_K = 40;

const DEFAULT_MAX_OUTPUT_TOKENS = 2048;

const DEFAULT_TIMEOUT = 60000;

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

    private lastError?: string;

    private requestCount = 0;

    private successfulRequests = 0;

    private failedRequests = 0;

    private totalProcessingTime = 0;

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

    private getEnvironmentApiKey():
        string | undefined {
        try {
            const globalObject =
                globalThis as unknown as {
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

    private getFetchFunction():
        SimpleFetch {
        const globalObject =
            globalThis as unknown as {
                fetch?: SimpleFetch;
            };

        if (
            typeof globalObject.fetch !==
            "function"
        ) {
            throw new Error(
                "Fetch API is not available in this runtime."
            );
        }

        return globalObject.fetch.bind(
            globalThis
        );
    }

    public getConfiguration():
        IGeminiProviderConfig {
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

    public setApiKey(
        apiKey: string
    ): void {
        if (
            typeof apiKey !==
            "string"
        ) {
            throw new Error(
                "Gemini API key must be a string."
            );
        }

        const value =
            apiKey.trim();

        if (!value) {
            throw new Error(
                "Gemini API key cannot be empty."
            );
        }

        this.config.apiKey = value;

        this.lastError = undefined;
    }

    public clearApiKey(): void {
        this.config.apiKey =
            undefined;
    }

    public hasApiKey(): boolean {
        return (
            typeof this.config.apiKey ===
                "string" &&
            this.config.apiKey.trim()
                .length > 0
        );
    }

    public getModel(): string {
        return this.config.model;
    }

    public setModel(
        model: string
    ): void {
        if (
            typeof model !==
                "string" ||
            !model.trim()
        ) {
            throw new Error(
                "Gemini model cannot be empty."
            );
        }

        this.config.model =
            model.trim();
    }

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
                this.config.debug,

            requestCount:
                this.requestCount,

            successfulRequests:
                this.successfulRequests,

            failedRequests:
                this.failedRequests,

            averageProcessingTime:
                this.getAverageProcessingTime()
        };
    }

    public getRequestCount(): number {
        return this.requestCount;
    }

    public getSuccessfulRequests():
        number {
        return this.successfulRequests;
    }

    public getFailedRequests():
        number {
        return this.failedRequests;
    }

    public getAverageProcessingTime():
        number {
        if (
            this.requestCount ===
            0
        ) {
            return 0;
        }

        return (
            this.totalProcessingTime /
            this.requestCount
        );
    }

    public getLastError():
        string | undefined {
        return this.lastError;
    }

    public resetStatistics(): void {
        this.requestCount = 0;
        this.successfulRequests = 0;
        this.failedRequests = 0;
        this.totalProcessingTime = 0;
        this.lastError = undefined;
    }

    private buildGenerateUrl():
        string {
        return (
            this.config.baseUrl +
            "/" +
            this.config.apiVersion +
            "/models/" +
            encodeURIComponent(
                this.config.model
            ) +
            ":generateContent"
        );
    }

    private validateRequest(): void {
        if (!this.hasApiKey()) {
            throw new Error(
                "Gemini API key is not configured."
            );
        }

        if (
            !this.config.model.trim()
        ) {
            throw new Error(
                "Gemini model is not configured."
            );
        }

        if (
            !this.config.baseUrl.trim()
        ) {
            throw new Error(
                "Gemini base URL is not configured."
            );
        }

        if (
            this.config.timeout <= 0
        ) {
            throw new Error(
                "Gemini timeout must be greater than zero."
            );
        }
    }

    public async generate(
        prompt: string,
        options:
            IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        const startedAt =
            Date.now();

        this.requestCount += 1;

        try {
            this.validateRequest();

            if (
                typeof prompt !==
                    "string" ||
                !prompt.trim()
            ) {
                throw new Error(
                    "Gemini prompt cannot be empty."
                );
            }

            const response =
                await this.request(
                    [
                        {
                            role: "user",
                            parts: [
                                {
                                    text:
                                        prompt.trim()
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

            if (result.success) {
                this.successfulRequests += 1;
            } else {
                this.failedRequests += 1;
            }

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            this.lastError =
                result.error;

            return result;
        } catch (error) {
            this.failedRequests += 1;

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
    }

    public async generateText(
        prompt: string,
        options:
            IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        return this.generate(
            prompt,
            options
        );
    }

    public async complete(
        prompt: string,
        options:
            IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        return this.generate(
            prompt,
            options
        );
    }

    public async chat(
        messages: IGeminiMessage[],
        options:
            IGeminiGenerationOptions = {}
    ): Promise<IGeminiResponse> {
        const startedAt =
            Date.now();

        this.requestCount += 1;

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

            const contents:
                GeminiContent[] =
                messages.map(
                    (
                        message
                    ) => {
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
                            message.role !==
                                "user" &&
                            message.role !==
                                "model"
                        ) {
                            throw new Error(
                                "Gemini chat role must be user or model."
                            );
                        }

                        return {
                            role:
                                message.role,

                            parts: [
                                {
                                    text:
                                        message.text.trim()
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

            if (result.success) {
                this.successfulRequests += 1;
            } else {
                this.failedRequests += 1;
            }

            this.totalProcessingTime +=
                result.processingTime ?? 0;

            this.lastError =
                result.error;

            return result;
        } catch (error) {
            this.failedRequests += 1;

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
    }

    public async chatText(
        messages: IGeminiMessage[],
        options:
            IGeminiGenerationOptions = {}
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

    public async healthCheck():
        Promise<IGeminiHealthStatus> {
        const startedAt =
            Date.now();

        const timestamp =
            Date.now();

        if (!this.hasApiKey()) {
            return {
                healthy: false,
                configured: false,
                model:
                    this.config.model,
                error:
                    "Gemini API key is not configured.",
                timestamp
            };
        }

        const response =
            await this.generate(
                "Respond with exactly: OK",
                {
                    temperature: 0,
                    maxOutputTokens: 8
                }
            );

        const latency =
            Date.now() -
            startedAt;

        if (!response.success) {
            return {
                healthy: false,
                configured: true,
                model:
                    this.config.model,
                latency,
                error:
                    response.error ??
                    "Gemini health check failed.",
                timestamp
            };
        }

        return {
            healthy: true,
            configured: true,
            model:
                this.config.model,
            latency,
            timestamp
        };
    }

    private async request(
        contents: GeminiContent[],
        options:
            IGeminiGenerationOptions
    ): Promise<GeminiApiResponse> {
        const controller =
            new AbortController();

        const timeoutMs =
            options.timeout ??
            this.config.timeout;

        const timer =
            setTimeout(
                () => {
                    controller.abort();
                },
                timeoutMs
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

            const fetchFunction =
                this.getFetchFunction();

            const response =
                await fetchFunction(
                    this.buildGenerateUrl(),
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "x-goog-api-key":
                                this.config.apiKey ??
