/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineEvents.ts
 * -------------------------------------------------------------
 *
 * Central event system for the AI Engine.
 *
 * Compatibility:
 * - emit(event)
 * - emit(type, payload)
 * - AIRequest / AIResponse payloads
 * - AIEngineEvents
 * - AIEngineEventEmitter
 * - AIEngineEvent
 * - AIEngineEventListener
 * - IAIEventPayload
 * - AIEngineEventPayload
 * -------------------------------------------------------------
 */

// -------------------------------------------------------------
// Event Payload
// -------------------------------------------------------------

export interface IAIEventPayload {
  [key: string]: unknown;
}

// Backward-compatible payload alias
export type AIEngineEventPayload = IAIEventPayload;


// -------------------------------------------------------------
// Event
// -------------------------------------------------------------

export interface AIEngineEvent {
  type: string;
  payload?: IAIEventPayload;
  timestamp?: number;
}


// -------------------------------------------------------------
// Event Listener
// -------------------------------------------------------------

export type AIEngineEventListener = (
  event: AIEngineEvent
) => void;


// -------------------------------------------------------------
// AI Engine Events
// -------------------------------------------------------------

export class AIEngineEvents {
  private readonly listeners: Set<AIEngineEventListener> =
    new Set<AIEngineEventListener>();

  // -----------------------------------------------------------
  // Subscribe
  // -----------------------------------------------------------

  on(listener: AIEngineEventListener): void {
    this.listeners.add(listener);
  }

  // -----------------------------------------------------------
  // Unsubscribe
  // -----------------------------------------------------------

  off(listener: AIEngineEventListener): void {
    this.listeners.delete(listener);
  }

  // -----------------------------------------------------------
  // Backward-compatible subscribe alias
  // -----------------------------------------------------------

  addListener(listener: AIEngineEventListener): void {
    this.on(listener);
  }

  // -----------------------------------------------------------
  // Backward-compatible unsubscribe alias
  // -----------------------------------------------------------

  removeListener(listener: AIEngineEventListener): void {
    this.off(listener);
  }

  // -----------------------------------------------------------
  // Emit complete event object
  // -----------------------------------------------------------

  emit(event: AIEngineEvent): void;

  // -----------------------------------------------------------
  // Emit event with arbitrary payload
  //
  // Generic payload is intentional.
  // AIRequest, AIResponse and other domain objects do not need
  // to implement an index signature.
  // -----------------------------------------------------------

  emit<T>(
    type: string,
    payload?: T
  ): void;

  // -----------------------------------------------------------
  // Implementation
  // -----------------------------------------------------------

  emit(
    eventOrType: AIEngineEvent | string,
    payload?: unknown
  ): void {
    const event: AIEngineEvent =
      typeof eventOrType === "string"
        ? {
            type: eventOrType,
            payload: payload as IAIEventPayload | undefined,
            timestamp: Date.now(),
          }
        : {
            ...eventOrType,
            timestamp:
              eventOrType.timestamp ?? Date.now(),
          };

    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch {
        // Listener errors must not break the event pipeline.
      }
    });
  }

  // -----------------------------------------------------------
  // Clear all listeners
  // -----------------------------------------------------------

  clear(): void {
    this.listeners.clear();
  }

  // -----------------------------------------------------------
  // Listener count
  // -----------------------------------------------------------

  getListenerCount(): number {
    return this.listeners.size;
  }

  // -----------------------------------------------------------
  // Check listener
  // -----------------------------------------------------------

  hasListener(
    listener: AIEngineEventListener
  ): boolean {
    return this.listeners.has(listener);
  }
}


// -------------------------------------------------------------
// Backward-compatible Event Emitter Alias
// -------------------------------------------------------------

export const AIEngineEventEmitter = AIEngineEvents;


// -------------------------------------------------------------
// Default Export
// -------------------------------------------------------------

export default AIEngineEvents;
