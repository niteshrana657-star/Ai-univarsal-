/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: RuntimeManager.ts
 * -------------------------------------------------------------
 */

import RuntimeEngine from "./RuntimeEngine";

export class RuntimeManager {

  /**
   * Start Runtime
   */
  public start(): boolean {

    return RuntimeEngine.start();

  }

  /**
   * Stop Runtime
   */
  public stop(): void {

    RuntimeEngine.stop();

  }

  /**
   * Restart Runtime
   */
  public restart(): boolean {

    RuntimeEngine.stop();

    return RuntimeEngine.start();

  }
    /**
   * Runtime Status
   */
  public isRunning(): boolean {

    return RuntimeEngine.isRunning();

  }

  /**
   * Refresh Runtime
   */
  public refresh(): void {

    RuntimeEngine.refresh();

  }

  /**
   * Reset Runtime
   */
  public reset(): void {

    RuntimeEngine.reset();

  }

  /**
   * Runtime Information
   */
  public getStatus() {

    return RuntimeEngine.getStatus();

  }
    /**
   * Get Runtime Engine
   */
  public getEngine() {

    return RuntimeEngine;

  }

  /**
   * Check Runtime Health
   */
  public healthCheck(): boolean {

    return RuntimeEngine.isRunning();

  }

  /**
   * Dispose Runtime
   */
  public dispose(): void {

    RuntimeEngine.stop();

    RuntimeEngine.reset();

  }
  }

const runtimeManager =
  new RuntimeManager();

export default runtimeManager;
