/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  default as AIEngineService
} from "./AIEngineService";

export type {
  AIEngineOptions
} from "./AIEngineService";

export {
  default as AIEngineManager
} from "./AIEngineManager";

export {
  AIEngineEvent,
  AIEngineEventEmitter
} from "./AIEngineEvents";

export type {
  AIEngineEventPayload,
  AIEngineEventListener
} from "./AIEngineEvents";

export {
  default as AIEngineEvents
} from "./AIEngineEvents";
