/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineState.ts
 * -------------------------------------------------------------
 */

import { AIProvider } from "../providers/AIProvider";
import { AIModel } from "../models/AIModel";

export interface AIEngineMetrics {

  totalRequests: number;

  successfulRequests: number;

  failedRequests: number;

  averageResponseTime: number;

  lastResponseTime: number;

  totalTokens: number;

}

export interface AIEngineState {

  initialized: boolean;

  ready: boolean;

  activeProvider: AIProvider | null;

  activeModel: AIModel | null;

  startedAt: number | null;

  lastRequestAt: number | null;

  lastResponseAt: number | null;

  metrics: AIEngineMetrics;

}

export const DEFAULT_ENGINE_METRICS:
AIEngineMetrics = {

  totalRequests: 0,

  successfulRequests: 0,

  failedRequests: 0,

  averageResponseTime: 0,

  lastResponseTime: 0,

  totalTokens: 0

};

export const DEFAULT_ENGINE_STATE:
AIEngineState = {

  initialized: false,

  ready: false,

  activeProvider: null,

  activeModel: null,

  startedAt: null,

  lastRequestAt: null,

  lastResponseAt: null,

  metrics: {

    ...DEFAULT_ENGINE_METRICS

  }

};

export class AIEngineStateManager {

  private state: AIEngineState = {

    ...DEFAULT_ENGINE_STATE

  };

  /**
   * Get State
   */
  public getState():
    AIEngineState {

    return {

      ...this.state

    };

  }

  /**
   * Update State
   */
  public update(
    updates: Partial<AIEngineState>
  ): void {

    this.state = {

      ...this.state,

      ...updates

    };

  }

  /**
   * Update Metrics
   */
  public updateMetrics(
    metrics: Partial<AIEngineMetrics>
  ): void {

    this.state.metrics = {

      ...this.state.metrics,

      ...metrics

    };

  }

  /**
   * Reset State
   */
  public reset(): void {

    this.state = {

      ...DEFAULT_ENGINE_STATE,

      metrics: {

        ...DEFAULT_ENGINE_METRICS

      }

    };

  }

  /**
   * Mark Request Started
   */
  public requestStarted(): void {

    this.state.lastRequestAt =
      Date.now();

    this.state.metrics.totalRequests++;

  }

  /**
   * Mark Request Completed
   */
  public requestCompleted(
    responseTime: number,
    tokens: number = 0
  ): void {

    this.state.lastResponseAt =
      Date.now();

    this.state.metrics.successfulRequests++;

    this.state.metrics.lastResponseTime =
      responseTime;

    this.state.metrics.totalTokens +=
      tokens;

    const total =
      this.state.metrics.successfulRequests;

    this.state.metrics.averageResponseTime =

      (
        (
          this.state.metrics.averageResponseTime *
          (total - 1)
        ) +
        responseTime
      ) / total;

  }

  /**
   * Mark Failed Request
   */
  public requestFailed(): void {

    this.state.metrics.failedRequests++;

  }

}

const aiEngineState =
  new AIEngineStateManager();

export default aiEngineState;
