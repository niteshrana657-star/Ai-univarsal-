/**
 * Universal AI Operating Companion
 * AI Engine Core
 *
 * Public exports for the AI Engine Core module.
 */

// Runtime classes
export { AIEngine } from "./AIEngine";
export { AIEngineState } from "./AIEngineState";
export { AIEngineConfig } from "./AIEngineConfig";

// Type-only exports
export type {
  AIRequest,
  AIResponse
} from "./AIEngineTypes";
