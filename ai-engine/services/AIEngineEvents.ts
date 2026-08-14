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
 * - Supports emit(event)
 * - Supports emit(type, payload)
 * - Exports AIEngineEvents
 * - Exports AIEngineEventEmitter
 * - Exports AIEngineEvent
 * - Exports AIEngineEventListener
 * - Exports IAIEventPayload
 * - Exports AIEngineEventPayload
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
  // Alias for unsubscribe
  // -----------------------------------------------------------

  removeListener(listener: AIEngineEventListener): void {
    this.off(listener);
  }

  // -----------------------------------------------------------
  // Alias for subscribe
  // -----------------------------------------------------------

  addListener(listener: AIEngineEventListener): void {
    this.on(listener);
  }

  // -----------------------------------------------------------
  // Emit complete event object
  // -----------------------------------------------------------

  emit(event: AIEngineEvent): void;

  // -----------------------------------------------------------
  // Emit event using type + payload
  // -----------------------------------------------------------

  emit(
    type: string,
    payload?: IAIEventPayload
  ): void;

  // -----------------------------------------------------------
  // Implementation
  // -----------------------------------------------------------

  emit(
    eventOrType: AIEngineEvent | string,
    payload?: IAIEventPayload
  ): void {
    const event: AIEngineEvent =
      typeof eventOrType === "string"
        ? {
            type: eventOrType,
            payload,
            timestamp: Date.now(),
          }
        : {
            ...eventOrType,
            timestamp: eventOrType.timestamp ?? Date.now(),
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

  hasListener(listener: AIEngineEventListener): boolean {
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
