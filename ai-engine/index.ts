/**
 * Universal AI Operating Companion
 *
 * AI Engine Public Entry Point
 *
 * Canonical modular exports:
 * - Core
 * - Providers
 * - Models
 * - Runtime
 * - Services
 * - Prompts
 * - Bootstrap
 * - Integration
 * - Memory Adapter
 */

// Core
export * from "./Core";

// Providers
export * from "./providers";

// Models
export * from "./Models";

// Runtime
export * from "./runtime";

// Services
export * from "./services";

// Prompts
export * from "./prompts";

// Bootstrap
export * from "./bootstrap";

// Integration
export * from "./integration";

// Memory Adapter
export * from "./memory-adapter";

// Existing bridge modules
export * from "./AIMemoryBridge";
export * from "./AIScreenBridge";
export * from "./AIVoiceBridge";
export * from "./AIAutomationBridge";
export * from "./AIPermissionBridge";
export * from "./AIPluginBridge";
export * from "./AIStorageBridge";
export * from "./AINotificationBridge";

// AI Engine metadata
export const AI_ENGINE_VERSION = "1.0.0";

export const AI_ENGINE_NAME =
  "Universal AI Operating Companion Engine";
