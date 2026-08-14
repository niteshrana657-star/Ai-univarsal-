/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: index.ts
 * -------------------------------------------------------------
 */

// -------------------------------------------------------------
// AI Engine Service
// -------------------------------------------------------------

export {
  default as AIEngineService
} from "./AIEngineService";

export type {
  AIEngineOptions
} from "./AIEngineService";


// -------------------------------------------------------------
// AI Engine Manager
// -------------------------------------------------------------

export {
  default as AIEngineManager
} from "./AIEngineManager";


// -------------------------------------------------------------
// AI Engine Events
// -------------------------------------------------------------

export {
  AIEngineEvents,
  AIEngineEventEmitter
} from "./AIEngineEvents";


// -------------------------------------------------------------
// AI Engine Event Types
// -------------------------------------------------------------

export type {
  AIEngineEvent,
  AIEngineEventListener,
  IAIEventPayload,
  AIEngineEventPayload
} from "./AIEngineEvents";


// -------------------------------------------------------------
// Default Event Manager
// -------------------------------------------------------------

export {
  default
} from "./AIEngineEvents";
