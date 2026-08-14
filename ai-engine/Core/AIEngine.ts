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

import type {
    AIRequest,
    AIResponse
} from "./AIEngineTypes";

import type {
    AIProviderRequest
} from "../providers/AIProvider";

import { AIEngineEvents } from "../services/AIEngineEvents";
import { AIEngineService } from "../services/AIEngineService";

import { ProviderManager } from "../providers/ProviderManager";

import {
    SYSTEM_PROMPT
} from "../prompts/SystemPrompt";

import {
    createUserPrompt
} from "../prompts/UserPrompt";

import {
    createContextPrompt
} from "../prompts/ContextPrompt";


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

        let success = false;

        try {

            this.state.setProcessing(true);

            this.state.setError(null);

            this.state.setLastRequest(request);


            this.events.emit(
                "AI_REQUEST_STARTED",
                request
            );


            const providerRequest =
                this.buildProviderRequest(
                    request
                );


            const provider =
                this.providerManager.getActiveProvider();


            if (!provider) {

                throw new Error(
                    "No AI provider available"
                );
            }


            const result =
                await provider.generate(
                    providerRequest
                );


            const response: AIResponse = {

                success: true,

                message:
                    result.text ??
                    result.content ??
                    "",

                provider:
                    result.provider ??
                    provider.name,

                timestamp:
                    result.timestamp ??
                    Date.now()

            };


            success = true;


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

                error: errorMessage,

                timestamp: Date.now()

            };


            this.state.setError(
                errorMessage
            );


            this.events.emit(
                "AI_REQUEST_FAILED",
                response
            );


            return response;


        } finally {

            this.state.setProcessing(false);


            this.service.recordExecution({

                duration:
                    Date.now() - startTime,

                success

            });

        }

    }


    /**
     * Build provider request
     *
     * Converts the internal AI request into the
     * unified AIProviderRequest contract.
     */
    private buildProviderRequest(
        request: AIRequest
    ): AIProviderRequest {

        const userPrompt =
            createUserPrompt({
                message:
                    request.message,

                language:
                    this.getRequestLanguage(request),

                context:
                    request.context ?? {},

                userIntent:
                    this.getRequestIntent(request),

                priority:
                    this.getRequestPriority(request),

                requiresAction:
                    this.getRequiresAction(request)
            });


        const contextPrompt =
            createContextPrompt(
                request.context ?? {}
            );


        const systemPrompt =
            request.systemInstruction ??
            SYSTEM_PROMPT;


        const promptParts: string[] = [

            userPrompt.message,

            contextPrompt

        ];


        const prompt =
            promptParts
                .filter(
                    (
                        value
                    ): value is string =>
                        Boolean(value)
                )
                .join("\n\n");


        return {

            prompt,

            systemPrompt,

            context:
                request.context ?? {},

            model:
                this.getRequestModel(request),

            temperature:
                this.getRequestTemperature(request),

            maxTokens:
                this.getRequestMaxTokens(request),

            stream:
                this.getRequestStream(request)

        };

    }


    /**
     * Get request language safely.
     */
    private getRequestLanguage(
        request: AIRequest
    ): string | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                language?: string;
            };


        return requestWithOptionalFields.language;

    }


    /**
     * Get request intent safely.
     */
    private getRequestIntent(
        request: AIRequest
    ): string | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                userIntent?: string;
            };


        return requestWithOptionalFields.userIntent;

    }


    /**
     * Get request priority safely.
     */
    private getRequestPriority(
        request: AIRequest
    ):
        | "LOW"
        | "NORMAL"
        | "HIGH"
        | "CRITICAL"
        | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                priority?:
                    | "LOW"
                    | "NORMAL"
                    | "HIGH"
                    | "CRITICAL";
            };


        return requestWithOptionalFields.priority;

    }


    /**
     * Get whether the request requires an action.
     */
    private getRequiresAction(
        request: AIRequest
    ): boolean | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                requiresAction?: boolean;
            };


        return requestWithOptionalFields.requiresAction;

    }


    /**
     * Get model override.
     */
    private getRequestModel(
        request: AIRequest
    ): string | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                model?: string;
            };


        return requestWithOptionalFields.model;

    }


    /**
     * Get temperature override.
     */
    private getRequestTemperature(
        request: AIRequest
    ): number | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                temperature?: number;
            };


        return requestWithOptionalFields.temperature;

    }


    /**
     * Get max token override.
     */
    private getRequestMaxTokens(
        request: AIRequest
    ): number | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                maxTokens?: number;
            };


        return requestWithOptionalFields.maxTokens;

    }


    /**
     * Get streaming preference.
     */
    private getRequestStream(
        request: AIRequest
    ): boolean | undefined {

        const requestWithOptionalFields =
            request as AIRequest & {
                stream?: boolean;
            };


        return requestWithOptionalFields.stream;

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

        this.events.emit(
            "AI_ENGINE_SHUTDOWN",
            {
                timestamp: Date.now()
            }
        );

    }

                }
