/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  createAIModel,
  DEFAULT_MODEL_CONFIG,
  DEFAULT_MODEL_CAPABILITIES
} from "./AIModel";

export type {
  AIModel,
  AIModelConfig,
  AIModelCapabilities,
  AIProviderType,
  AIModelStatus
} from "./AIModel";

export {
  default as ModelRegistry
} from "./ModelRegistry";

export {
  default as ModelManager
} from "./ModelManager";
export {
  default as ModelFactory
} from "./ModelFactory";
