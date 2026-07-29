/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIModel.ts
 * -------------------------------------------------------------
 */

export type AIProviderType =
  | "OPENAI"
  | "GEMINI"
  | "OLLAMA"
  | "CLAUDE"
  | "GROQ"
  | "CUSTOM";

export type AIModelStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "LOADING"
  | "ERROR";

export interface AIModelCapabilities {

  chat: boolean;

  vision: boolean;

  voice: boolean;

  imageGeneration: boolean;

  functionCalling: boolean;

  streaming: boolean;

  memory: boolean;

  reasoning: boolean;

}

export interface AIModelConfig {

  temperature: number;

  maxTokens: number;

  topP: number;

  frequencyPenalty: number;

  presencePenalty: number;

  timeout: number;

}

export interface AIModel {

  id: string;

  name: string;

  provider: AIProviderType;

  version: string;

  description: string;

  endpoint?: string;

  apiKeyRequired: boolean;

  localModel: boolean;

  enabled: boolean;

  priority: number;

  status: AIModelStatus;

  capabilities: AIModelCapabilities;

  config: AIModelConfig;

}

export const DEFAULT_MODEL_CONFIG: AIModelConfig = {

  temperature: 0.7,

  maxTokens: 4096,

  topP: 1,

  frequencyPenalty: 0,

  presencePenalty: 0,

  timeout: 60000

};

export const DEFAULT_MODEL_CAPABILITIES:
AIModelCapabilities = {

  chat: true,

  vision: false,

  voice: false,

  imageGeneration: false,

  functionCalling: false,

  streaming: true,

  memory: true,

  reasoning: true

};

export function createAIModel(
  model: Partial<AIModel>
): AIModel {

  return {

    id:
      model.id ??
      "default-model",

    name:
      model.name ??
      "Default AI",

    provider:
      model.provider ??
      "CUSTOM",

    version:
      model.version ??
      "1.0.0",

    description:
      model.description ??
      "",

    endpoint:
      model.endpoint,

    apiKeyRequired:
      model.apiKeyRequired ??
      true,

    localModel:
      model.localModel ??
      false,

    enabled:
      model.enabled ??
      true,

    priority:
      model.priority ??
      0,

    status:
      model.status ??
      "ACTIVE",

    capabilities:
      model.capabilities ??
      DEFAULT_MODEL_CAPABILITIES,

    config:
      model.config ??
      DEFAULT_MODEL_CONFIG

  };

}

export default AIModel;
