/**
 * AIEngineFactory.ts
 *
 * Factory for Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Create AI Engine
 * - Configure components
 * - Initialize services
 * - Register modules
 */

import { AIEngineManager } from "./AIEngineManager";
import {
    AIEngineInitializer,
    IInitializationConfig
} from "./AIEngineInitializer";
import { AIEngineRegistry } from "./AIEngineRegistry";
import { AIEngineCoordinator } from "./AIEngineCoordinator";


// ==============================
// Factory Configuration
// ==============================

export interface IAIEngineFactoryConfig {

    autoInitialize: boolean;

    enableRegistry: boolean;

    enableCoordinator: boolean;

    debug: boolean;

    environment:
        | "development"
        | "production"
        | "testing";
}


// ==============================
// Factory Result
// ==============================

export interface IAIEngineFactoryResult {

    manager: AIEngineManager;

    initializer: AIEngineInitializer;

    registry: AIEngineRegistry;

    coordinator: AIEngineCoordinator;

    createdAt: number;
}


// ==============================
// AIEngineFactory
// ==============================

export class AIEngineFactory {

    private readonly config:
        IAIEngineFactoryConfig;


    constructor(
        config?:
        Partial<IAIEngineFactoryConfig>
    ) {

        this.config = {

            autoInitialize: true,

            enableRegistry: true,

            enableCoordinator: true,

            debug: false,

            environment:
                "production",

            ...config

        };

    }


    // ==============================
    // Create Initializer Configuration
    // ==============================

    private createInitializationConfig():
        IInitializationConfig {

        return {

            environment:
                this.config.environment,

            engineMode:
                "NORMAL",

            enabledModules:
                this.config.enableRegistry
                    ? ["ai-engine", "registry"]
                    : ["ai-engine"],

            enabledBridges:
                [],

            securityLevel:
                "standard",

            language:
                "en",

            memoryMode:
                "standard",

            performanceMode:
                "balanced",

            debugMode:
                this.config.debug,

            metadata: {

                source:
                    "AIEngineFactory",

                autoInitialize:
                    this.config.autoInitialize,

                enableRegistry:
                    this.config.enableRegistry,

                enableCoordinator:
                    this.config.enableCoordinator

            }

        };

    }


    // ==============================
    // Create Engine
    // ==============================

    public create():
        IAIEngineFactoryResult {

        const manager =
            new AIEngineManager();


        const initializer =
            new AIEngineInitializer(
                this.createInitializationConfig()
            );


        const registry =
            new AIEngineRegistry();


        const coordinator =
            new AIEngineCoordinator();


        return {

            manager,

            initializer,

            registry,

            coordinator,

            createdAt:
                Date.now()

        };

    }


    // ==============================
    // Configuration
    // ==============================

    public getConfiguration():
        IAIEngineFactoryConfig {

        return {

            ...this.config

        };

    }


    public isDebugEnabled():
        boolean {

        return this.config.debug;

    }


    // ==============================
    // Module Registration
    // ==============================

    public registerModules(
        result:
        IAIEngineFactoryResult
    ): void {

        if (!this.config.enableRegistry) {

            return;

        }


        result.registry.registerModule({

            moduleId:
                "ai-engine",

            moduleName:
                "AI Engine",

            version:
                "1.0.0",

            category:
                "CORE",

            state:
                "ACTIVE",

            capabilities: [

                "AI_PROCESSING",

                "TASK_ROUTING",

                "ENGINE_CONTROL"

            ],

            dependencies: [],

            health:
                true

        });

    }


    // ==============================
    // Component Wiring
    // ==============================

    public wireComponents(
        result:
        IAIEngineFactoryResult
    ): void {

        if (this.config.debug) {

            console.log(
                "[AIFactory] Wiring components..."
            );

        }

    }


    // ==============================
    // Bootstrap
    // ==============================

    public bootstrap():
        IAIEngineFactoryResult {

        const result =
            this.create();


        this.registerModules(
            result
        );


        this.wireComponents(
            result
        );


        return result;

    }


    // ==============================
    // Auto Initialization
    // ==============================

    public async initialize(
        result:
        IAIEngineFactoryResult
    ): Promise<void> {

        if (!this.config.autoInitialize) {

            return;

        }


        await result.initializer.initialize();

    }


    // ==============================
    // Health Check
    // ==============================

    public healthCheck(
        result:
        IAIEngineFactoryResult
    ): boolean {

        return (

            result.manager !== undefined &&

            result.initializer !== undefined &&

            result.registry !== undefined &&

            result.coordinator !== undefined

        );

    }


    // ==============================
    // Validation
    // ==============================

    public validate():
        boolean {

        return (

            this.config.environment ===
                "development"

            ||

            this.config.environment ===
                "production"

            ||

            this.config.environment ===
                "testing"

        );

    }


    // ==============================
    // Lifecycle
    // ==============================

    public async start():
        Promise<IAIEngineFactoryResult> {

        const engine =
            this.bootstrap();


        if (
            this.config.autoInitialize
        ) {

            await this.initialize(
                engine
            );

        }


        return engine;

    }


    // ==============================
    // Shutdown
    // ==============================

    public async shutdown(
        result:
        IAIEngineFactoryResult
    ): Promise<void> {

        await result.initializer.shutdown();

    }


    // ==============================
    // Destroy
    // ==============================

    public destroy(
        result:
        IAIEngineFactoryResult
    ): void {

        result.registry.clear();

        result.coordinator.clear();

    }


    // ==============================
    // Reset
    // ==============================

    public async reset():
        Promise<IAIEngineFactoryResult> {

        const engine =
            this.bootstrap();


        if (
            this.config.autoInitialize
        ) {

            await this.initialize(
                engine
            );

        }


        return engine;

    }

}


// ==============================
// Default Factory
// ==============================

export const DefaultAIEngineFactory =
    new AIEngineFactory();


// ==============================
// Helper
// ==============================

export async function createDefaultAIEngine():
    Promise<IAIEngineFactoryResult> {

    return DefaultAIEngineFactory.start();

            }
