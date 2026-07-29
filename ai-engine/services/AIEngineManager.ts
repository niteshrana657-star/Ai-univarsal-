/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineManager.ts
 * -------------------------------------------------------------
 */

import AIEngineService, {
  AIEngineOptions
} from "./AIEngineService";

import {
  AIRequest,
  AIResponse
} from "../providers/AIProvider";

export class AIEngineManager {

  private initialized = false;

  /**
   * Initialize AI Engine
   */
  public async initialize(
    options?: Partial<AIEngineOptions>
  ): Promise<void> {

    if (options) {
      AIEngineService.configure(options);
    }

    this.initialized = true;
  }

  /**
   * Check Initialization
   */
  public isInitialized(): boolean {

    return this.initialized;

  }

  /**
   * Generate AI Response
   */
  public async generate(
    request: AIRequest
  ): Promise<AIResponse> {

    if (!this.initialized) {

      return {

        success: false,

        text: "",

        model: "",

        provider: "",

        timestamp: Date.now(),

        error:
          "AI Engine is not initialized."

      };

    }

    return AIEngineService.generate(
      request
    );

  }

  /**
   * Update Engine Configuration
   */
  public configure(
    options: Partial<AIEngineOptions>
  ): void {

    AIEngineService.configure(
      options
    );

  }

  /**
   * Check Ready Status
   */
  public isReady(): boolean {

    return AIEngineService.isReady();

  }

  /**
   * Shutdown AI Engine
   */
  public shutdown(): void {

    AIEngineService.reset();

    this.initialized = false;

  }

  /**
   * Restart AI Engine
   */
  public async restart(): Promise<void> {

    this.shutdown();

    await this.initialize();

  }

}

const aiEngineManager =
  new AIEngineManager();

export default aiEngineManager;
