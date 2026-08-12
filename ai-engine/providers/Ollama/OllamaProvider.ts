/**
 * OllamaProvider.ts
 *
 * Ollama Provider
 * Universal AI Operating Companion
 *
 * Responsibilities:
 * - Manage Ollama provider lifecycle
 * - Handle Ollama AI generation requests
 * - Provide provider health/state information
 * - Expose provider configuration
 */

import {
    IAIProvider,
    IAIProviderConfig,
    IAIProviderRequest,
    IAIProviderResponse,
    AIProviderState
} from "../AIProvider";


/**
 * OllamaProvider
 *
 * Base implementation for an Ollama-backed AI provider.
 */
export class OllamaProvider implements IAIProvider {

    /**
     * Provider configuration.
     */
    private readonly config: IAIProviderConfig;


    /**
     * Current provider state.
     */
    private state: AIProviderState = "IDLE";


    /**
     * Creates an OllamaProvider instance.
     */
    constructor(
        config: IAIProviderConfig
    ) {

        this.config = config;

    }


    // ==============================
    // Lifecycle
    // ==============================

    /**
     * Initializes the Ollama provider.
     */
    public async initialize(): Promise<void> {

        this.state = "INITIALIZING";

        try {

            /*
             * Ollama REST API initialization can be connected here.
             *
             * The provider does not make a network request during basic
             * initialization. This keeps initialization safe in
             * environments where Ollama is not currently running.
             */

            this.state = "READY";

        } catch (error) {

            this.state = "ERROR";

            throw error;

        }

    }


    /**
     * Shuts down the Ollama provider.
     */
    public async shutdown(): Promise<void> {

        try {

            /*
             * Ollama runs as an external service, so there is no local
             * process to terminate from this provider.
             */

            this.state = "OFFLINE";

        } catch (error) {

            this.state = "ERROR";

            throw error;

        }

    }


    // ==============================
    // Availability & State
    // ==============================

    /**
     * Returns whether the Ollama provider is ready.
     */
    public isAvailable(): boolean {

        return this.state === "READY";

    }


    /**
     * Returns the current provider state.
     */
    public getState(): AIProviderState {

        return this.state;

    }


    /**
     * Returns the provider configuration.
     */
    public getConfiguration(): IAIProviderConfig {

        return {
            ...this.config
        };

    }


    // ==============================
    // AI Generation
    // ==============================

    /**
     * Generates a response through the Ollama provider.
     *
     * The actual Ollama REST API integration can be connected here
     * without changing the provider contract.
     */
    public async generate(
        request: IAIProviderRequest
    ): Promise<IAIProviderResponse> {

        const startTime =
            Date.now();


        if (!this.isAvailable()) {

            return {

                success: false,

                provider: "ollama",

                model: this.config.name,

                error:
                    "Ollama Provider is not initialized.",

                processingTime:
                    Date.now() - startTime

            };

        }


        this.state = "BUSY";


        try {

            /*
             * TODO:
             *
             * Integrate the Ollama REST API here.
             *
             * The request parameter is intentionally retained so the
             * implementation can later pass the request to Ollama
             * without changing the IAIProvider interface.
             */

            const response:
                IAIProviderResponse = {

                success: true,

                provider: "ollama",

                model: this.config.name,

                content:
                    "Ollama response placeholder.",

                processingTime:
                    Date.now() - startTime,

                metadata: {

                    requestReceived:
                        request !== undefined,

                    providerState:
                        "READY"

                }

            };


            this.state = "READY";


            return response;


        } catch (error) {

            this.state = "ERROR";


            return {

                success: false,

                provider: "ollama",

                model: this.config.name,

                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown Ollama error",

                processingTime:
                    Date.now() - startTime

            };

        }

    }


    // ==============================
    // Health
    // ==============================

    /**
     * Performs a basic provider health check.
     */
    public async healthCheck(): Promise<boolean> {

        return this.isAvailable();

    }


    // ==============================
    // Provider Information
    // ==============================

    /**
     * Returns the provider identifier.
     */
    public getProviderName(): string {

        return "ollama";

    }


    /**
     * Returns the configured provider version.
     */
    public getProviderVersion(): string {

        return this.config.version;

    }


    // ==============================
    // Reset
    // ==============================

    /**
     * Resets the provider to its initial idle state.
     */
    public reset(): void {

        this.state = "IDLE";

    }

}
