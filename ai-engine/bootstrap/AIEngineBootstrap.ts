/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Bootstrap
 * File: AIEngineBootstrap.ts
 * -------------------------------------------------------------
 *
 * Responsible for initializing AI Engine runtime.
 * Connects:
 * - AI Engine
 * - Providers
 * - Services
 * - Memory Integration
 * -------------------------------------------------------------
 */


import { AIEngine } from "../core/AIEngine";
import { AIEngineConfig } from "../core/AIEngineConfig";

import { AIEngineEvents } from "../services/AIEngineEvents";
import { AIEngineService } from "../services/AIEngineService";

import { ProviderManager } from "../providers/ProviderManager";

import { MemoryIntegration } from "../integration/MemoryIntegration";



export class AIEngineBootstrap {


    private engine:
        AIEngine | null = null;


    private memory:
        MemoryIntegration | null = null;



    /**
     * Initialize AI Engine
     */
    initialize(
        config: AIEngineConfig,
        providerManager: ProviderManager,
        events: AIEngineEvents,
        service: AIEngineService,
        memoryIntegration?: MemoryIntegration
    ): AIEngine {


        this.memory =
            memoryIntegration ?? null;



        this.engine =
            new AIEngine(
                config,
                providerManager,
                events,
                service
            );


        return this.engine;

    }



    /**
     * Get AI Engine Instance
     */
    getEngine():
        AIEngine | null {

        return this.engine;

    }



    /**
     * Get Memory Integration
     */
    getMemory():
        MemoryIntegration | null {

        return this.memory;

    }



    /**
     * Shutdown Engine
     */
    shutdown(): void {


        if (this.engine) {

            this.engine.shutdown();

        }


        this.engine = null;

        this.memory = null;

    }

}



export default AIEngineBootstrap;
