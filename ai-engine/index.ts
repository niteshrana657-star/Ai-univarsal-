/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Main Entry
 * File: index.ts
 * -------------------------------------------------------------
 */


// Core
export * from "./core";


// Prompts
export * from "./prompts/SystemPrompt";
export * from "./prompts/UserPrompt";
export * from "./prompts/ContextPrompt";


// Models
export * from "./models";


// Providers
export * from "./providers";


// Services
export * from "./services";


// AI Engine Metadata

export const AI_ENGINE_VERSION = "1.0.0";


export const AI_ENGINE_NAME =
    "Universal AI Operating Companion Engine";
