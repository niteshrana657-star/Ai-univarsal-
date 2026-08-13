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

import {
    AIRequest,
    AIResponse
} from "./AIEngineTypes";

import { AIEngineEvents } from "../services/AIEngineEvents";
import { AIEngineService } from "../services/AIEngineService";

import { ProviderManager } from "../providers/ProviderManager";

import { SystemPrompt } from "../prompts/SystemPrompt";
import { UserPrompt } from "../prompts/UserPrompt";
import { ContextPrompt } from "../prompts/ContextPrompt";


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

        try {

            this.state.setProcessing(true);
            this.state.setError(null);
            this.state.setLastRequest(request);

            this.events.emit(
                "AI_REQUEST_STARTED",
                request
            );


            const prompt =
                this.buildPrompt(request);


            const provider =
                this.providerManager.getActiveProvider();


            if (!provider) {

                throw new Error(
                    "No AI provider available"
                );
            }


            const result =
                await provider.generate(
                    prompt
                );


            const response: AIResponse = {

                success: true,

                message: result,

                provider:
                    provider.name,

                timestamp:
                    Date.now()

            };


            this.state.setLastResponse(
                response
            );


            this.events.emit(
                "AI_REQUEST_COMPLETED",
                response
            );


            return response;


        } catch (error: unknown) {

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown AI Engine error";


            const response: AIResponse = {

                success: false,

                message: "",

                error:
                    errorMessage,

                timestamp:
                    Date.now()

            };


            this.state.setError(
                errorMessage
            );

            this.state.setLastResponse(
                response
            );


            this.events.emit(
                "AI_REQUEST_FAILED",
                response
            );


            return response;


        } finally {

            const hasError =
                this.state.hasError();

            this.state.setProcessing(false);

            this.service.recordExecution({

                duration:
                    Date.now() - startTime,

                success:
                    !hasError

            });

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
        .filter(Boolean)
        .join("\n\n");

    }


    /**
     * Get current engine state
     */
    getState(): AIEngineState {

        return this.state;

    }


    /**
     * Shutdown AI Engine
     */
    shutdown(): void {

        this.state.setProcessing(false);

        this.events.emit(
            "AI_ENGINE_SHUTDOWN",
            {
                timestamp: Date.now()
            }
        );

    }

}
