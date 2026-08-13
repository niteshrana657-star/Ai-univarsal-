/**
 * Universal AI Operating Companion
 * AI Engine Bootstrap
 *
 * Responsible for creating and initializing
 * the complete AI Engine dependency graph.
 */

import {
    AIEngine
} from "../Core/AIEngine";

import {
    AIEngineConfig
} from "../Core/AIEngineConfig";

import {
    AIEngineEvents
} from "../services/AIEngineEvents";

import {
    AIEngineService
} from "../services/AIEngineService";

import {
    ProviderManager
} from "../providers/ProviderManager";


/**
 * AI Engine Bootstrap Dependencies
 */
export interface AIEngineBootstrapDependencies {

    config: AIEngineConfig;

    providerManager: ProviderManager;

    events?: AIEngineEvents;

    service?: AIEngineService;

}


/**
 * AI Engine Bootstrap
 */
export class AIEngineBootstrap {

    /**
     * Create a fully configured AI Engine.
     */
    static create(
        dependencies: AIEngineBootstrapDependencies
    ): AIEngine {

        const events =
            dependencies.events ??
            new AIEngineEvents();


        const service =
            dependencies.service ??
            new AIEngineService();


        return new AIEngine(
            dependencies.config,
            dependencies.providerManager,
            events,
            service
        );

    }


    /**
     * Initialize an existing AI Engine.
     */
    static async initialize(
        engine: AIEngine
    ): Promise<AIEngine> {

        /*
         * AIEngine currently performs its
         * initialization inside its constructor.
         *
         * This method intentionally returns
         * the already initialized engine so
         * bootstrap callers can use one
         * consistent async lifecycle.
         */

        return engine;

    }

}
