/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: RuntimeEngine.ts
 * -------------------------------------------------------------
 */

import {
  AIModel
} from "../models/AIModel";

import ModelManager from "../models/ModelManager";

export class RuntimeEngine {

  private running = false;

  private currentModel:
    AIModel | null = null;

  constructor() {

    this.currentModel =
      ModelManager.getActiveModel();

  }
  /**
   * Start Runtime
   */
  public start(): boolean {

    if (this.running) {
      return false;
    }

    this.currentModel =
      ModelManager.getActiveModel();

    this.running = true;

    return true;

  }

  /**
   * Stop Runtime
   */
  public stop(): void {

    this.running = false;

  }

  /**
   * Check Running State
   */
  public isRunning(): boolean {

    return this.running;

  }

  /**
   * Get Current Model
   */
  public getCurrentModel():
    AIModel | null {

    return this.currentModel;

  }
    /**
   * Switch Active Model
   */
  public switchModel(
    modelId: string
  ): boolean {

    const success =
      ModelManager.setActiveModel(
        modelId
      );

    if (!success) {
      return false;
    }

    this.currentModel =
      ModelManager.getActiveModel();

    return true;

  }

  /**
   * Refresh Runtime
   */
  public refresh(): void {

    this.currentModel =
      ModelManager.getActiveModel();

  }

  /**
   * Reset Runtime
   */
  public reset(): void {

    this.running = false;

    this.currentModel = null;

  }
    /**
   * Runtime Status
   */
  public getStatus(): {

    running: boolean;

    currentModel: AIModel | null;

  } {

    return {

      running: this.running,

      currentModel: this.currentModel

    };

  }

}

const runtimeEngine =
  new RuntimeEngine();

export default runtimeEngine;
