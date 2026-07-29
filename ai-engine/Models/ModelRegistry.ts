/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ModelRegistry.ts
 * -------------------------------------------------------------
 */

import {
  AIModel,
  createAIModel
} from "./AIModel";

export class ModelRegistry {

  private readonly models =
    new Map<string, AIModel>();

  /**
   * Register Model
   */
  public register(
    model: AIModel
  ): void {

    this.models.set(
      model.id,
      model
    );

  }

  /**
   * Register Multiple Models
   */
  public registerMany(
    models: AIModel[]
  ): void {

    for (const model of models) {

      this.register(model);

    }

  }

  /**
   * Register Default Model
   */
  public registerDefault(): AIModel {

    const model =
      createAIModel({

        id: "default",

        name: "Universal AI",

        provider: "CUSTOM",

        version: "1.0.0",

        description:
          "Default Universal AI model",

        enabled: true,

        priority: 1

      });

    this.register(model);

    return model;

  }

  /**
   * Remove Model
   */
  public unregister(
    id: string
  ): boolean {

    return this.models.delete(id);

  }

  /**
   * Get Model
   */
  public get(
    id: string
  ): AIModel | undefined {

    return this.models.get(id);

  }

  /**
   * Get All Models
   */
  public getAll(): AIModel[] {

    return Array.from(
      this.models.values()
    );

  }

  /**
   * Get Enabled Models
   */
  public getEnabled(): AIModel[] {

    return this.getAll().filter(
      model => model.enabled
    );

  }

  /**
   * Find By Provider
   */
  public getByProvider(
    provider: AIModel["provider"]
  ): AIModel[] {

    return this.getAll().filter(
      model =>
        model.provider === provider
    );

  }

  /**
   * Update Model
   */
  public update(
    id: string,
    updates: Partial<AIModel>
  ): AIModel | null {

    const current =
      this.get(id);

    if (!current) {
      return null;
    }

    const updated = {

      ...current,

      ...updates

    };

    this.models.set(
      id,
      updated
    );

    return updated;

  }

  /**
   * Clear Registry
   */
  public clear(): void {

    this.models.clear();

  }

  /**
   * Total Models
   */
  public count(): number {

    return this.models.size;

  }

  /**
   * Check Model Exists
   */
  public exists(
    id: string
  ): boolean {

    return this.models.has(id);

  }

}

const modelRegistry =
  new ModelRegistry();

export default modelRegistry;
