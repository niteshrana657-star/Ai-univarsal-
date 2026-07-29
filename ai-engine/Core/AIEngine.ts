/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngine.ts
 * -------------------------------------------------------------
 */

import AIEngineManager from "../services/AIEngineManager";
import AIEngineEvents, {
  AIEngineEvent
} from "../services/AIEngineEvents";

import {
  AIRequest,
  AIResponse
} from "../providers/AIProvider";

export interface AIEngineConfiguration {

  autoInitialize: boolean;

  enableEvents: boolean;

  enableLogging: boolean;

  enableMetrics: boolean;

}

export const DEFAULT_AI_ENGINE_CONFIGURATION:
AIEngineConfiguration = {

  autoInitialize: true,

  enableEvents: true,

  enableLogging: false,

  enableMetrics: true

};

export class AIEngine {

  private initialized = false;

  private configuration =
    DEFAULT_AI_ENGINE_CONFIGURATION;

  /**
   * Initialize Engine
   */
  public async initialize(
    configuration?: Partial<
      AIEngineConfiguration
    >
  ): Promise<void> {

    this.configuration = {

      ...this.configuration,

      ...configuration

    };

    AIEngineEvents.emit(
      AIEngineEvent.INITIALIZING
    );

    await AIEngineManager.initialize();

    this.initialized = true;

    AIEngineEvents.emit(
      AIEngineEvent.INITIALIZED
    );

  }

  /**
   * Check Initialization
   */
  public isInitialized():
    boolean {

    return this.initialized;

  }

  /**
   * Generate AI Response
   */
  public async generate(
    request: AIRequest
  ): Promise<AIResponse> {

    if (!this.initialized) {

      if (
        this.configuration
          .autoInitialize
      ) {

        await this.initialize();

      } else {

        return {

          success: false,

          text: "",

          model: "",

          provider: "",

          timestamp:
            Date.now(),

          error:
            "AI Engine not initialized."

        };

      }

    }

    AIEngineEvents.emit(
      AIEngineEvent.REQUEST_STARTED,
      request
    );

    const response =
      await AIEngineManager.generate(
        request
      );

    if (response.success) {

      AIEngineEvents.emit(
        AIEngineEvent.REQUEST_COMPLETED,
        response
      );

    } else {

      AIEngineEvents.emit(
        AIEngineEvent.REQUEST_FAILED,
        response
      );

    }

    return response;

  }

  /**
   * Shutdown Engine
   */
  public shutdown(): void {

    AIEngineManager.shutdown();

    this.initialized = false;

    AIEngineEvents.emit(
      AIEngineEvent.SHUTDOWN
    );

  }

  /**
   * Restart Engine
   */
  public async restart():
    Promise<void> {

    this.shutdown();

    await this.initialize();

    AIEngineEvents.emit(
      AIEngineEvent.RESTART
    );

  }

}

const aiEngine =
  new AIEngine();

export default aiEngine;
