/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: RuntimeContext.ts
 * -------------------------------------------------------------
 */

import { AIModel } from "../models/AIModel";

export interface RuntimeContextData {

  sessionId: string;

  userId: string | null;

  currentModel: AIModel | null;

  currentScreen: string | null;

  currentApplication: string | null;

  metadata: Record<string, unknown>;

  createdAt: number;

  updatedAt: number;

}

export class RuntimeContext {

  private context: RuntimeContextData = {

    sessionId: "",

    userId: null,

    currentModel: null,

    currentScreen: null,

    currentApplication: null,

    metadata: {},

    createdAt: Date.now(),

    updatedAt: Date.now()

  };

  /**
   * Initialize Context
   */
  public initialize(
    sessionId: string
  ): void {

    this.context.sessionId = sessionId;

    this.context.createdAt = Date.now();

    this.context.updatedAt = Date.now();

  }

  /**
   * Set User
   */
  public setUser(
    userId: string
  ): void {

    this.context.userId = userId;

    this.context.updatedAt = Date.now();

  }

  /**
   * Set Model
   */
  public setModel(
    model: AIModel | null
  ): void {

    this.context.currentModel = model;

    this.context.updatedAt = Date.now();

  }

  /**
   * Set Current Screen
   */
  public setScreen(
    screen: string
  ): void {

    this.context.currentScreen = screen;

    this.context.updatedAt = Date.now();

  }

  /**
   * Set Current Application
   */
  public setApplication(
    app: string
  ): void {

    this.context.currentApplication = app;

    this.context.updatedAt = Date.now();

  }

  /**
   * Add Metadata
   */
  public setMetadata(
    key: string,
    value: unknown
  ): void {

    this.context.metadata[key] = value;

    this.context.updatedAt = Date.now();

  }

  /**
   * Get Context
   */
  public getContext():
    RuntimeContextData {

    return {

      ...this.context

    };

  }

  /**
   * Clear Context
   */
  public clear(): void {

    this.context = {

      sessionId: "",

      userId: null,

      currentModel: null,

      currentScreen: null,

      currentApplication: null,

      metadata: {},

      createdAt: Date.now(),

      updatedAt: Date.now()

    };

  }

}

const runtimeContext =
  new RuntimeContext();

export default runtimeContext;
