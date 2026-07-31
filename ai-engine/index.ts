/**
 * ai-engine/index.ts
 *
 * Public entry point for AI Engine module.
 *
 * Exports:
 * - Core Engine
 * - Manager
 * - Initializer
 * - Registry
 * - Coordinator
 */


// ==============================
// Core Exports
// ==============================


export * from "./core/AIEngine";

export * from "./core/AIEngineState";

export * from "./core/AIEngineConfig";



// ==============================
// Manager
// ==============================


export * from "./AIEngineManager";



// ==============================
// Initialization
// ==============================


export * from "./AIEngineInitializer";



// ==============================
// Registry
// ==============================


export * from "./AIEngineRegistry";



// ==============================
// Coordinator
// ==============================


export * from "./AIEngineCoordinator";
// ==============================
// Bridge Exports
// ==============================


export * from "./bridges/AIMemoryBridge";

export * from "./bridges/AIScreenBridge";

export * from "./bridges/AIVoiceBridge";

export * from "./bridges/AIAutomationBridge";

export * from "./bridges/AIPermissionBridge";

export * from "./bridges/AIPluginBridge";

export * from "./bridges/AIStorageBridge";

export * from "./bridges/AINotificationBridge";

export * from "./bridges/AISecurityBridge";



// ==============================
// Prompt Exports
// ==============================


export * from "./prompts/SystemPrompt";

export * from "./prompts/UserPrompt";

export * from "./prompts/ContextPrompt";



// ==============================
// Future Extension
// ==============================


/*
 Future exports:

 - Models
 - Providers
 - Agents
 - Memory adapters
 - Plugin runtime
*/
// ==============================
// Type Exports
// ==============================


export type {
    AIEngineState,
    AIEngineMode,
    AIRequestPriority
} from "./AIEngineManager";



export type {
    IAIEngineConfig,
    IAIEngineStatus,
    IAIEngineRequest,
    IAIEngineResponse,
    IAIEngineModule,
    IAIEngineEvent
} from "./AIEngineManager";



export type {
    IInitializationConfig,
    IInitializationResult,
    IStartupContext
} from "./AIEngineInitializer";



export type {
    IRegistryEntry,
    IModuleInfo,
    IServiceInfo,
    IBridgeInfo
} from "./AIEngineRegistry";



export type {
    ICoordinationRequest,
    ICoordinationResponse,
    ITaskContext,
    IModuleCommunication,
    IEngineEvent
} from "./AIEngineCoordinator";





// ==============================
// Factory Exports
// ==============================


export function createAIEngineInstance() {

    return {

        manager:
            "AIEngineManager",

        initializer:
            "AIEngineInitializer",

        registry:
            "AIEngineRegistry",

        coordinator:
            "AIEngineCoordinator"

    };
}





// ==============================
// Module Metadata
// ==============================


export const AI_ENGINE_VERSION =
    "1.0.0";



export const AI_ENGINE_NAME =
    "Universal AI Operating Companion Engine";
