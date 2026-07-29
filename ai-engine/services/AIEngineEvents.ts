/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineEvents.ts
 * -------------------------------------------------------------
 */

export enum AIEngineEvent {

  INITIALIZING =
    "ai_engine.initializing",

  INITIALIZED =
    "ai_engine.initialized",

  SHUTDOWN =
    "ai_engine.shutdown",

  RESTART =
    "ai_engine.restart",

  READY =
    "ai_engine.ready",

  NOT_READY =
    "ai_engine.not_ready",

  REQUEST_STARTED =
    "ai_engine.request.started",

  REQUEST_COMPLETED =
    "ai_engine.request.completed",

  REQUEST_FAILED =
    "ai_engine.request.failed",

  PROVIDER_CONNECTED =
    "provider.connected",

  PROVIDER_DISCONNECTED =
    "provider.disconnected",

  PROVIDER_CHANGED =
    "provider.changed",

  MODEL_CHANGED =
    "model.changed",

  RESPONSE_RECEIVED =
    "response.received",

  RESPONSE_STREAM =
    "response.stream",

  ERROR =
    "ai_engine.error"

}

export interface AIEngineEventPayload<T = unknown> {

  event: AIEngineEvent;

  timestamp: number;

  data?: T;

}

export type AIEngineEventListener<T = unknown> = (
  payload: AIEngineEventPayload<T>
) => void;

export class AIEngineEventEmitter {

  private listeners = new Map<
    AIEngineEvent,
    Set<AIEngineEventListener>
  >();

  /**
   * Subscribe
   */
  public on(
    event: AIEngineEvent,
    listener: AIEngineEventListener
  ): void {

    if (!this.listeners.has(event)) {

      this.listeners.set(
        event,
        new Set()
      );

    }

    this.listeners
      .get(event)!
      .add(listener);

  }

  /**
   * Unsubscribe
   */
  public off(
    event: AIEngineEvent,
    listener: AIEngineEventListener
  ): void {

    this.listeners
      .get(event)
      ?.delete(listener);

  }

  /**
   * Emit Event
   */
  public emit<T>(
    event: AIEngineEvent,
    data?: T
  ): void {

    const payload: AIEngineEventPayload<T> = {

      event,

      timestamp: Date.now(),

      data

    };

    this.listeners
      .get(event)
      ?.forEach(listener =>
        listener(payload)
      );

  }

  /**
   * Remove All Listeners
   */
  public clear(): void {

    this.listeners.clear();

  }

}

const aiEngineEvents =
  new AIEngineEventEmitter();

export default aiEngineEvents;
