/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: RuntimeState.ts
 * -------------------------------------------------------------
 */

import { AIModel } from "../models/AIModel";

export interface RuntimeStatus {

  running: boolean;

  initialized: boolean;

  currentModel: AIModel | null;

  startedAt: number | null;

  lastUpdated: number;

}

export class RuntimeState {

  private status: RuntimeStatus = {

    running: false,

    initialized: false,

    currentModel: null,

    startedAt: null,

    lastUpdated: Date.now()

  };

  /**
   * Initialize Runtime
   */
  public initialize(): void {

    this.status.initialized = true;

    this.status.lastUpdated = Date.now();

  }

  /**
   * Start Runtime
   */
  public start(
    model: AIModel | null
  ): void {

    this.status.running = true;

    this.status.currentModel = model;

    this.status.startedAt = Date.now();

    this.status.lastUpdated = Date.now();

  }

  /**
   * Stop Runtime
   */
  public stop(): void {

    this.status.running = false;

    this.status.lastUpdated = Date.now();

  }

  /**
   * Update Current Model
   */
  public setCurrentModel(
    model: AIModel | null
  ): void {

    this.status.currentModel = model;

    this.status.lastUpdated = Date.now();

  }

  /**
   * Get Current Model
   */
  public getCurrentModel():
    AIModel | null {

    return this.status.currentModel;

  }

  /**
   * Is Running
   */
  public isRunning(): boolean {

    return this.status.running;

  }

  /**
   * Is Initialized
   */
  public isInitialized(): boolean {

    return this.status.initialized;

  }

  /**
   * Runtime Uptime
   */
  public getUptime(): number {

    if (
      !this.status.startedAt
    ) {

      return 0;

    }

    return Date.now() -
      this.status.startedAt;

  }

  /**
   * Get Status
   */
  public getStatus():
    RuntimeStatus {

    return {

      ...this.status

    };

  }

  /**
   * Reset Runtime
   */
  public reset(): void {

    this.status = {

      running: false,

      initialized: false,

      currentModel: null,

      startedAt: null,

      lastUpdated: Date.now()

    };

  }

}

const runtimeState =
  new RuntimeState();

export default runtimeState;
