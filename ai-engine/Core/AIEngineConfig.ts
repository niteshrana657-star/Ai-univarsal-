/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngineConfig.ts
 * -------------------------------------------------------------
 */

export interface AIEngineConfig {

  provider: string;

  model: string;

  apiKey: string;

  endpoint: string;

  timeout: number;

  maxRetries: number;

  temperature: number;

  maxTokens: number;

  topP: number;

  frequencyPenalty: number;

  presencePenalty: number;

  enableStreaming: boolean;

  enableMemory: boolean;

  enableVision: boolean;

  enableLogging: boolean;

  enableCache: boolean;

}

export const DEFAULT_AI_ENGINE_CONFIG:
AIEngineConfig = {

  provider: "CUSTOM",

  model: "default-model",

  apiKey: "",

  endpoint: "",

  timeout: 60000,

  maxRetries: 3,

  temperature: 0.7,

  maxTokens: 4096,

  topP: 1,

  frequencyPenalty: 0,

  presencePenalty: 0,

  enableStreaming: true,

  enableMemory: true,

  enableVision: true,

  enableLogging: false,

  enableCache: true

};

export class AIEngineConfigManager {

  private config: AIEngineConfig = {

    ...DEFAULT_AI_ENGINE_CONFIG

  };

  /**
   * Get Config
   */
  public getConfig():
    AIEngineConfig {

    return {

      ...this.config

    };

  }

  /**
   * Update Config
   */
  public updateConfig(
    updates: Partial<AIEngineConfig>
  ): void {

    this.config = {

      ...this.config,

      ...updates

    };

  }

  /**
   * Reset Config
   */
  public reset(): void {

    this.config = {

      ...DEFAULT_AI_ENGINE_CONFIG

    };

  }

  /**
   * Get Value
   */
  public getValue<
    K extends keyof AIEngineConfig
  >(
    key: K
  ): AIEngineConfig[K] {

    return this.config[key];

  }

  /**
   * Set Value
   */
  public setValue<
    K extends keyof AIEngineConfig
  >(
    key: K,
    value: AIEngineConfig[K]
  ): void {

    this.config[key] = value;

  }

  /**
   * Check API Key
   */
  public hasApiKey(): boolean {

    return this.config.apiKey.trim().length > 0;

  }

  /**
   * Export Config
   */
  public export():
    AIEngineConfig {

    return {

      ...this.config

    };

  }

  /**
   * Import Config
   */
  public import(
    config: AIEngineConfig
  ): void {

    this.config = {

      ...config

    };

  }

}

const aiEngineConfig =
  new AIEngineConfigManager();

export default aiEngineConfig;
