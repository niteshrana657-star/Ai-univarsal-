/**
 * OllamaProvider.ts
 *
 * Ollama Provider
 * Universal AI Operating Companion
 */

import {
    AIProvider,
    AIProviderConfig,
    AIProviderRequest,
    AIProviderResponse,
    AIProviderState,
    ProviderStatus
} from "../AIProvider";


/**
 * Ollama Provider implementation.
 */
export class OllamaProvider implements AIProvider {

    /**
     * Provider configuration.
     */
    private readonly config: AIProviderConfig;

    /**
     * Current provider state.
     */
    private state: AIProviderState = AIProviderState.IDLE;


    /**
     * Creates an Ollama provider.
     */
    constructor(
        config: AIProviderConfig
    ) {
        this.config = {
            ...config,
            provider: "ollama"
        };
    }


    // =========================================================
    // Provider Identity
    // =========================================================

    public readonly id: string = this.config.id;

    public readonly provider: string = "ollama";

    public readonly name: string = this.config.name;


    // =========================================================
    // Connection
    // =========================================================

    /**
     * Connects to the Ollama provider.
     *
     * Actual REST API connectivity can be added later.
     */
    public async connect(): Promise<boolean> {

        this.state = AIProviderState.INITIALIZING;

        try {

            /*
             * Ollama is normally exposed through a local REST
             * service. Basic connection is intentionally kept
             * dependency-free for the base implementation.
             */

            this.state = AIProviderState.READY;

            return true;

        } catch (error) {

            this.state = AIProviderState.ERROR;

            return false;
        }
    }


    /**
     * Disconnects the provider.
     */
    public async disconnect(): Promise<void> {

        this.state = AIProviderState.OFFLINE;
    }


    /**
     * Returns whether the provider is connected.
     */
    public isConnected(): boolean {

        return (
            this.state === AIProviderState.READY ||
            this.state === AIProviderState.BUSY
        );
    }


    /**
     * Returns provider connection status.
     */
    public getStatus(): ProviderStatus {

        switch (this.state) {

            case AIProviderState.READY:
            case AIProviderState.BUSY:
                return ProviderStatus.CONNECTED;

            case AIProviderState.INITIALIZING:
                return ProviderStatus.CONNECTING;

            case AIProviderState.ERROR:
                return ProviderStatus.ERROR;

            case AIProviderState.IDLE:
            case AIProviderState.OFFLINE:
            default:
                return ProviderStatus.DISCONNECTED;
        }
    }


    // =========================================================
    // Lifecycle
    // =========================================================

    /**
     * Initializes the provider.
     */
    public async initialize(): Promise<void> {

        this.state = AIProviderState.INITIALIZING;

        try {

            /*
             * Real Ollama health/API verification can be added here.
             */

            this.state = AIProviderState.READY;

        } catch (error) {

            this.state = AIProviderState.ERROR;

            throw error;
        }
    }


    /**
     * Shuts down the provider.
     */
    public async shutdown(): Promise<void> {

        await this.disconnect();
    }


    // =========================================================
    // Availability & State
    // =========================================================

    /**
     * Returns whether the provider is available.
     */
    public isAvailable(): boolean {

        return this.state === AIProviderState.READY;
    }


    /**
     * Returns the current provider state.
     */
    public getState(): AIProviderState {

        return this.state;
    }


    /**
     * Returns a defensive copy of the configuration.
     */
    public getConfiguration(): AIProviderConfig {

        return {
            ...this.config,
            metadata: this.config.metadata
                ? { ...this.config.metadata }
                : undefined
        };
    }


    // =========================================================
    // AI Generation
    // =========================================================

    /**
     * Generates an AI response.
     *
     * Actual Ollama REST API integration can be connected later
     * without changing the provider contract.
     */
    public async generate(
        request: AIProviderRequest
    ): Promise<AIProviderResponse> {

        const startTime = Date.now();


        if (!this.isAvailable()) {

            return {

                success: false,

                provider: this.provider,

                model:
                    request.model ??
                    this.config.model ??
                    this.config.name,

                error:
                    "Ollama Provider is not initialized.",

                processingTime:
                    Date.now() - startTime
            };
        }


        this.state = AIProviderState.BUSY;


        try {

            /*
             * TODO:
             *
             * Connect the Ollama REST API here.
             *
             * Keeping the request object intact allows the real
             * implementation to use:
             *
             * - request.prompt
             * - request.systemPrompt
             * - request.context
             * - request.model
             * - request.temperature
             * - request.maxTokens
             * - request.stream
             */

            const response: AIProviderResponse = {

                success: true,

                provider: this.provider,

                model:
                    request.model ??
                    this.config.model ??
                    this.config.name,

                text:
                    "Ollama response placeholder.",

                content:
                    "Ollama response placeholder.",

                processingTime:
                    Date.now() - startTime,

                metadata: {

                    requestReceived: true,

                    providerState:
                        AIProviderState.READY,

                    mode:
                        "local"

                }
            };


            this.state = AIProviderState.READY;


            return response;


        } catch (error) {

            this.state = AIProviderState.ERROR;


            return {

                success: false,

                provider: this.provider,

                model:
                    request.model ??
                    this.config.model ??
                    this.config.name,

                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown Ollama error",

                processingTime:
                    Date.now() - startTime
            };
        }
    }


    // =========================================================
    // Health
    // =========================================================

    /**
     * Performs a basic health check.
     */
    public async healthCheck(): Promise<boolean> {

        return this.isConnected();
    }


    // =========================================================
    // Provider Information
    // =========================================================

    /**
     * Returns the provider identifier.
     */
    public getProviderName(): string {

        return this.provider;
    }


    /**
     * Returns the configured provider version.
     */
    public getProviderVersion(): string {

        return this.config.version;
    }


    // =========================================================
    // Reset
    // =========================================================

    /**
     * Resets the provider to IDLE.
     */
    public reset(): void {

        this.state = AIProviderState.IDLE;
    }
}


/**
 * Default export.
 */
export default OllamaProvider;
