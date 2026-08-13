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

// -------------------------------------------------------------
// Core
// -------------------------------------------------------------
export {
  AIEngine,
  AIEngineState,
  AIEngineConfig
} from "./Core";

export type {
  AIRequest,
  AIResponse
} from "./Core";

// -------------------------------------------------------------
// Providers
// -------------------------------------------------------------
export * from "./providers";

// -------------------------------------------------------------
// Models
// -------------------------------------------------------------
export * from "./Models";

// -------------------------------------------------------------
// Runtime
// -------------------------------------------------------------
export * from "./runtime";

// -------------------------------------------------------------
// Services
// -------------------------------------------------------------
export * from "./services";

// -------------------------------------------------------------
// Prompts
// -------------------------------------------------------------
export {
  SYSTEM_PROMPT,
  SYSTEM_PROMPT_VERSION,
  CONTEXT_PROMPT_VERSION,
  EMPTY_CONTEXT,
  createContextPrompt,
  buildCompleteContext,
  normalizeContext,
  validateContext,
  mergeContext,
  createUserPrompt,
  createUserPromptId,
  sanitizeUserMessage,
  detectBasicIntent,
  validateUserPrompt,
  PromptBuilder,
  PromptManager,
  PromptTemplates,
  getPromptTemplate,
  getTemplatesByCategory,
  getAllTemplates
} from "./prompts";

export type {
  UserPrompt,
  UserPromptInput,
  FinalPrompt,
  PromptHistory,
  PromptTemplate,
  AIContextInput,
  DeviceContext,
  ScreenContext,
  MemoryContext,
  PermissionContext
} from "./prompts";

// -------------------------------------------------------------
// Bootstrap
// -------------------------------------------------------------
export * from "./bootstrap";

// -------------------------------------------------------------
// Integration
// -------------------------------------------------------------
export * from "./integration";

// -------------------------------------------------------------
// Memory Adapter
// -------------------------------------------------------------
export * from "./memory-adapter";

// -------------------------------------------------------------
// AI Engine metadata
// -------------------------------------------------------------
export const AI_ENGINE_VERSION = "1.0.0";

export const AI_ENGINE_NAME =
  "Universal AI Operating Companion Engine";
