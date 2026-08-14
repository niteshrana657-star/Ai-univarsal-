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

  // Backward-compatible alias
  AIEngineEvents as AIEngineEventEmitter
} from "./AIEngineEvents";


// -------------------------------------------------------------
// AI Engine Event Types
// -------------------------------------------------------------

export type {
  AIEngineEvent,
  AIEngineEventListener
} from "./AIEngineEvents";


// -------------------------------------------------------------
// Backward-compatible Event Payload
// -------------------------------------------------------------

export type {
  IAIEventPayload as AIEngineEventPayload
} from "./AIEngineEvents";


// -------------------------------------------------------------
// Default Event Manager
// -------------------------------------------------------------

export {
  AIEngineEvents as default
} from "./AIEngineEvents";
