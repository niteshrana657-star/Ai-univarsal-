/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ModelManager.ts
 * -------------------------------------------------------------
 */

import {
  AIModel,
  AIProviderType
} from "./AIModel";

import ModelRegistry from "./ModelRegistry";

export class ModelManager {

  private activeModelId: string | null = null;

  /**
   * Register Model
   */
  public register(
    model: AIModel
  ): void {

    ModelRegistry.register(model);

    if (
      this.activeModelId === null &&
      model.enabled
    ) {
      this.activeModelId = model.id;
    }

  }

  /**
   * Register Multiple Models
   */
  public registerMany(
    models: AIModel[]
  ): void {

    models.forEach(model =>
      this.register(model)
    );

  }

  /**
   * Get Active Model
   */
  public getActiveModel():
    AIModel | null {

    if (!this.activeModelId) {
      return null;
    }

    return (
      ModelRegistry.get(
        this.activeModelId
      ) ?? null
    );

  }

  /**
   * Set Active Model
   */
  public setActiveModel(
    id: string
  ): boolean {

    const model =
      ModelRegistry.get(id);

    if (!model) {
      return false;
    }

    if (!model.enabled) {
      return false;
    }

    this.activeModelId = id;

    return true;

  }

  /**
   * Get Model By Id
   */
  public getModel(
    id: string
  ): AIModel | undefined {

    return ModelRegistry.get(id);

  }

  /**
   * Get All Models
   */
  public getModels():
    AIModel[] {

    return ModelRegistry.getAll();

  }

  /**
   * Get Enabled Models
   */
  public getEnabledModels():
    AIModel[] {

    return ModelRegistry.getEnabled();

  }

  /**
   * Get Models By Provider
   */
  public getModelsByProvider(
    provider: AIProviderType
  ): AIModel[] {

    return ModelRegistry.getByProvider(
      provider
    );

  }

  /**
   * Enable Model
   */
  public enableModel(
    id: string
  ): boolean {

    return (
      ModelRegistry.update(
        id,
        {
          enabled: true,
          status: "ACTIVE"
        }
      ) !== null
    );

  }

  /**
   * Disable Model
   */
  public disableModel(
    id: string
  ): boolean {

    const updated =
      ModelRegistry.update(
        id,
        {
          enabled: false,
          status: "INACTIVE"
        }
      );

    if (
      this.activeModelId === id
    ) {
      this.activeModelId = null;
    }

    return updated !== null;

  }

  /**
   * Remove Model
   */
  public removeModel(
    id: string
  ): boolean {

    if (
      this.activeModelId === id
    ) {
      this.activeModelId = null;
    }

    return ModelRegistry.unregister(
      id
    );

  }

  /**
   * Get Active Provider
   */
  public getActiveProvider():
    AIProviderType | null {

    const model =
      this.getActiveModel();

    return model
      ? model.provider
      : null;

  }

  /**
   * Check Active Model
   */
  public hasActiveModel():
    boolean {

    return (
      this.getActiveModel() !== null
    );

  }

  /**
   * Reset Manager
   */
  public reset(): void {

    this.activeModelId = null;

    ModelRegistry.clear();

  }

}

const modelManager =
  new ModelManager();

export default modelManager;
