/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ModelFactory.ts
 * -------------------------------------------------------------
 */

import {
  AIModel,
  createAIModel
} from "./AIModel";

import ModelRegistry from "./ModelRegistry";

export class ModelFactory {

  /**
   * Create Model
   */
  public create(
    config: Partial<AIModel>
  ): AIModel {

    const model =
      createAIModel(config);

    ModelRegistry.register(model);

    return model;

  }

  /**
   * Create Multiple Models
   */
  public createMany(
    configs: Partial<AIModel>[]
  ): AIModel[] {

    return configs.map(
      config => this.create(config)
    );

  }

  /**
   * Clone Existing Model
   */
  public clone(
    id: string,
    newId: string
  ): AIModel | null {

    const model =
      ModelRegistry.get(id);

    if (!model) {
      return null;
    }

    return this.create({

      ...model,

      id: newId,

      name: `${model.name} Copy`

    });

  }

  /**
   * Remove Model
   */
  public remove(
    id: string
  ): boolean {

    return ModelRegistry.unregister(
      id
    );

  }

  /**
   * Get Model
   */
  public get(
    id: string
  ): AIModel | undefined {

    return ModelRegistry.get(id);

  }

  /**
   * Get All Models
   */
  public getAll():
    AIModel[] {

    return ModelRegistry.getAll();

  }

  /**
   * Check Model Exists
   */
  public exists(
    id: string
  ): boolean {

    return ModelRegistry.exists(id);

  }

  /**
   * Total Models
   */
  public count(): number {

    return ModelRegistry.count();

  }

  /**
   * Clear Factory
   */
  public clear(): void {

    ModelRegistry.clear();

  }

}

const modelFactory =
  new ModelFactory();

export default modelFactory;
