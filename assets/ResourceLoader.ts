/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Assets Module
 * File: ResourceLoader.ts
 * -------------------------------------------------------------
 */

import AssetManager, {
  Asset
} from "./AssetManager";

export interface ResourceLoadResult {

  success: boolean;

  asset?: Asset;

  message: string;

}

export class ResourceLoader {

  /**
   * Load Resource
   */
  public load(
    id: string
  ): ResourceLoadResult {

    const asset =
      AssetManager.get(id);

    if (!asset) {

      return {

        success: false,

        message:
          "Resource not found"

      };

    }

    return {

      success: true,

      asset,

      message:
        "Resource loaded successfully"

    };

  }

  /**
   * Check Resource
   */
  public exists(
    id: string
  ): boolean {

    return AssetManager.has(
      id
    );

  }

  /**
   * Preload Resources
   */
  public preload(
    ids: string[]
  ): ResourceLoadResult[] {

    return ids.map(

      id => this.load(id)

    );

  }

  /**
   * Load All Resources
   */
  public loadAll():
    Asset[] {

    return AssetManager.getAll();

  }

  /**
   * Total Resources
   */
  public count():
    number {

    return AssetManager.count();

  }

  /**
   * Clear Loader Cache
   */
  public clearCache():
    void {

    /**
     * Reserved
     * Future Cache Engine
     */

  }

}

const resourceLoader =
  new ResourceLoader();

export default resourceLoader;
