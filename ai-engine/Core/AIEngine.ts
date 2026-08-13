/**
 * Universal AI Operating Companion
 * AI Engine Core
 *
 * Responsible for:
 * - AI request orchestration
 * - Prompt preparation
 * - Provider execution
 * - Context handling
 * - Lifecycle management
 */

import { AIEngineState } from "./AIEngineState";
import { AIEngineConfig } from "./AIEngineConfig";

import { AIEngineEvents } from "../services/AIEngineEvents";
import { AIEngineService } from "../services/AIEngineService";

import { ProviderManager } from "../providers/ProviderManager";

import { SystemPrompt } from "../prompts/SystemPrompt";
import { UserPrompt } from "../prompts/UserPrompt";
import { ContextPrompt } from "../prompts/ContextPrompt";


/**
 * AI Request
 */
export interface AIRequest {
    message: string;
    context?: Record<string, unknown>;
    systemInstruction?: string;
    metadata?: Record<string, unknown>;
}


/**
 * AI Response
 */
export interface AIResponse {
    success: boolean;
    message: string;
    provider?: string;
    error?: string;
    timestamp: number;
}


/**
 * Main AI Engine
 */
export class AIEngine {

    private readonly config: AIEngineConfig;
    private readonly state: AIEngineState;

    private readonly providerManager: ProviderManager;
    private readonly events: AIEngineEvents;
    private readonly service: AIEngineService;


    constructor(
        config: AIEngineConfig,
        providerManager: ProviderManager,
        events: AIEngineEvents,
        service: AIEngineService
    ) {

        this.config = config;
        this.state = new AIEngineState();

        this.providerManager = providerManager;
        this.events = events;
        this.service = service;

        this.initialize();
    }


    /**
     * Initialize AI Engine
     */
    private initialize(): void {

        this.state.reset();

        this.state.setInitialized(true);

        this.events.emit(
            "AI_ENGINE_INITIALIZED",
            {
                timestamp: Date.now()
            }
        );
    }


    /**
     * Execute AI request
     */
    async execute(
        request: AIRequest
    ): Promise<AIResponse> {

        const startTime = Date.now();

        let executionSuccess = false;


        try {

            /**
             * Validate request
             */
            this.validateRequest(request);


            /**
             * Clear previous request error.
             *
             * Important:
             * A previous failed request must not
             * affect the current request.
             */
            this.state.setError(null);


            this.state.setProcessing(true);
            this.state.setLastRequest(request);


            this.events.emit(
                "AI_REQUEST_STARTED",
                request
            );


            /**
             * Build final prompt
             */
            const prompt =
                this.buildPrompt(request);


            /**
             * Resolve active provider
             */
            const provider =
                this.providerManager.getActiveProvider();


            if (!provider) {

                throw new Error(
                    "No AI provider available"
                );
            }


            /**
             * Execute request through provider
             */
            const result =
                await provider.generate(
                    prompt
                );


            /**
             * Validate provider response
             */
            if (
                typeof result !== "string"
            ) {

                throw new Error(
                    "AI provider returned an invalid response"
                );
            }


            /**
             * Successful response
             */
            const response: AIResponse = {

                success: true,

                message: result,

                provider:
                    provider.name,

                timestamp:
                    Date.now()

            };


            executionSuccess = true;


            this.state.setLastResponse(
                response
            );


            this.state.setError(null);


            this.events.emit(
                "AI_REQUEST_COMPLETED",
                response
            );


            return response;


        } catch (error: unknown) {

            /**
             * Normalize unknown errors safely
             */
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : String(error);


            const response: AIResponse = {

                success: false,

                message: "",

                error:
                    errorMessage ||
                    "Unknown AI Engine error",

                timestamp:
                    Date.now()

            };


            executionSuccess = false;


            this.state.setLastResponse(
                response
            );


            this.state.setError(
                response.error ?? null
            );


            this.events.emit(
                "AI_REQUEST_FAILED",
                response
            );


            return response;


        } finally {

            /**
             * Always release processing state
             */
            this.state.setProcessing(false);


            /**
             * Record the actual result of
             * this specific execution.
             *
             * Do NOT use state.hasError() here,
             * because that represents persistent
             * engine state rather than this request.
             */
            this.service.recordExecution({

                duration:
                    Date.now() - startTime,

                success:
                    executionSuccess

            });

        }

    }


    /**
     * Validate incoming AI request
     */
    private validateRequest(
        request: AIRequest
    ): void {

        if (!request) {

            throw new Error(
                "AI request is required"
            );
        }


        if (
            typeof request.message !== "string"
        ) {

            throw new Error(
                "AI request message must be a string"
            );
        }


        if (
            request.message.trim().length === 0
        ) {

            throw new Error(
                "AI request message cannot be empty"
            );
        }

    }


    /**
     * Build final AI prompt
     */
    private buildPrompt(
        request: AIRequest
    ): string {

        const system =
            request.systemInstruction ??
            SystemPrompt.get();


        const user =
            UserPrompt.create(
                request.message
            );


        const context =
            ContextPrompt.create(
                request.context ?? {}
            );


        return [

            system,

            context,

            user

        ]
            .filter(
                (part): part is string =>
                    typeof part === "string" &&
                    part.trim().length > 0
            )
            .join("\n\n");

    }


    /**
     * Get current engine state
     */
    getState(): AIEngineState {

        return this.state;

    }


    /**
     * Get engine configuration
     */
    getConfig(): AIEngineConfig {

        return this.config;

    }


    /**
     * Shutdown AI Engine
     */
    shutdown(): void {

        this.state.setProcessing(false);

        this.state.setInitialized(false);

        this.events.emit(
            "AI_ENGINE_SHUTDOWN",
            {
                timestamp: Date.now()
            }
        );

    }

}
