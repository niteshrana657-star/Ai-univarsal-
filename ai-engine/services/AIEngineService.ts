/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineService.ts
 * -------------------------------------------------------------
 */

import {
  AIRequest,
  AIResponse,
  AIProvider
} from "../providers/AIProvider";

import ProviderManager
  from "../providers/ProviderManager";


export interface AIEngineOptions {

  autoReconnect: boolean;

  fallbackProvider: boolean;

  enableLogging: boolean;

}


export const DEFAULT_ENGINE_OPTIONS:
AIEngineOptions = {

  autoReconnect: true,

  fallbackProvider: true,

  enableLogging: false

};


export interface AIExecutionRecord {

  duration: number;

  success: boolean;

  timestamp: number;

}


export class AIEngineService {

  private options =
    DEFAULT_ENGINE_OPTIONS;


  private executionHistory:
    AIExecutionRecord[] = [];


  /**
   * Configure Engine
   */
  public configure(
    options: Partial<AIEngineOptions>
  ): void {

    this.options = {

      ...this.options,

      ...options

    };

  }


  /**
   * Get Active Provider
   */
  public getProvider():
    AIProvider | null {

    return ProviderManager.getActive();

  }


  /**
   * Check Engine Ready
   */
  public isReady():
    boolean {

    const provider =
      this.getProvider();

    return (
      provider !== null &&
      provider.isConnected()
    );

  }


  /**
   * Generate AI Response
   */
  public async generate(
    request: AIRequest
  ): Promise<AIResponse> {

    const provider =
      this.getProvider();


    if (!provider) {

      return {

        success: false,

        text: "",

        model: "",

        provider: "",

        timestamp:
          Date.now(),

        error:
          "No active AI provider."

      };

    }


    if (
      !provider.isConnected()
    ) {

      if (
        this.options.autoReconnect
      ) {

        const connected =
          await provider.connect();


        if (!connected) {

          return {

            success: false,

            text: "",

            model: "",

            provider:
              provider.provider,

            timestamp:
              Date.now(),

            error:
              "Unable to connect provider."

          };

        }

      } else {

        return {

          success: false,

          text: "",

          model: "",

          provider:
            provider.provider,

          timestamp:
            Date.now(),

          error:
            "Provider is disconnected."

        };

      }

    }


    return provider.generate(
      request
    );

  }


  /**
   * Record AI Engine execution
   */
  public recordExecution(
    record: {
      duration: number;
      success: boolean;
    }
  ): void {

    this.executionHistory.push({

      duration:
        record.duration,

      success:
        record.success,

      timestamp:
        Date.now()

    });

  }


  /**
   * Get Execution History
   */
  public getExecutionHistory():
    AIExecutionRecord[] {

    return [
      ...this.executionHistory
    ];

  }


  /**
   * Get Last Execution
   */
  public getLastExecution():
    AIExecutionRecord | null {

    if (
      this.executionHistory.length === 0
    ) {

      return null;

    }

    return (
      this.executionHistory[
        this.executionHistory.length - 1
      ] ?? null
    );

  }


  /**
   * Clear Execution History
   */
  public clearExecutionHistory():
    void {

    this.executionHistory = [];

  }


  /**
   * Reset Engine
   */
  public reset(): void {

    this.options =
      DEFAULT_ENGINE_OPTIONS;

    this.executionHistory = [];

  }

}


const aiEngineService =
  new AIEngineService();


export default aiEngineService;
