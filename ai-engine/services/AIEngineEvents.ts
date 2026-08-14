/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineEvents.ts
 * -------------------------------------------------------------
 */

export interface IAIEventPayload {
  [key: string]: unknown;
}

export interface AIEngineEvent {
  type: string;
  payload?: IAIEventPayload;
  timestamp?: number;
}

export type AIEngineEventListener = (
  event: AIEngineEvent
) => void;

export class AIEngineEvents {
  private listeners: Set<AIEngineEventListener> = new Set();

  on(listener: AIEngineEventListener): void {
    this.listeners.add(listener);
  }

  off(listener: AIEngineEventListener): void {
    this.listeners.delete(listener);
  }

  emit(event: AIEngineEvent): void {
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }

  clear(): void {
    this.listeners.clear();
  }
}

export default AIEngineEvents;
