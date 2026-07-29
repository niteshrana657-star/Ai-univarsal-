/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIProvider.ts
 * -------------------------------------------------------------
 */

import { AIModel } from "../models/AIModel";

export type ProviderStatus =
  | "CONNECTED"
  | "DISCONNECTED"
  | "CONNECTING"
  | "ERROR";

export interface AIRequest {

  prompt: string;

  systemPrompt?: string;

  context?: string;

  temperature?: number;

  maxTokens?: number;

  stream?: boolean;

}

export interface AIResponse {

  success: boolean;

  text: string;

  model: string;

  provider: string;

  timestamp: number;

  usage?: {

    promptTokens: number;

    completionTokens: number;

    totalTokens: number;

  };

  error?: string;

}

export interface AIProvider {

  readonly id: string;

  readonly name: string;

  readonly provider: string;

  readonly version: string;

  readonly model: AIModel;

  connect(): Promise<boolean>;

  disconnect(): Promise<void>;

  isConnected(): boolean;

  getStatus(): ProviderStatus;

  generate(
    request: AIRequest
  ): Promise<AIResponse>;

}

export abstract class BaseAIProvider
  implements AIProvider {

  public abstract readonly id: string;

  public abstract readonly name: string;

  public abstract readonly provider: string;

  public abstract readonly version: string;

  public abstract readonly model: AIModel;

  protected status: ProviderStatus =
    "DISCONNECTED";

  public abstract connect():
    Promise<boolean>;

  public abstract disconnect():
    Promise<void>;

  public abstract generate(
    request: AIRequest
  ): Promise<AIResponse>;

  public isConnected(): boolean {

    return this.status === "CONNECTED";

  }

  public getStatus():
    ProviderStatus {

    return this.status;

  }

  protected setStatus(
    status: ProviderStatus
  ): void {

    this.status = status;

  }

  }
