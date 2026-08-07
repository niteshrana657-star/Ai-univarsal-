/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Assets Module
 * File: AssetManager.ts
 * -------------------------------------------------------------
 */

export enum AssetType {

  IMAGE = "IMAGE",

  VIDEO = "VIDEO",

  AUDIO = "AUDIO",

  DOCUMENT = "DOCUMENT",

  MODEL = "MODEL",

  FONT = "FONT",

  OTHER = "OTHER"

}

export interface Asset {

  id: string;

  name: string;

  type: AssetType;

  path: string;

  size: number;

  createdAt: number;

  updatedAt: number;

}

export class AssetManager {

  private assets =
    new Map<string, Asset>();

  /**
   * Register Asset
   */
  public register(
    asset: Asset
  ): void {

    this.assets.set(
      asset.id,
      asset
    );

  }

  /**
   * Remove Asset
   */
  public remove(
    id: string
  ): boolean {

    return this.assets.delete(
      id
    );

  }

  /**
   * Get Asset
   */
  public get(
    id: string
  ): Asset | undefined {

    return this.assets.get(id);

  }

  /**
   * Get All Assets
   */
  public getAll():
    Asset[] {

    return Array.from(
      this.assets.values()
    );

  }

  /**
   * Check Asset Exists
   */
  public has(
    id: string
  ): boolean {

    return this.assets.has(id);

  }

  /**
   * Count Assets
   */
  public count():
    number {

    return this.assets.size;

  }

  /**
   * Clear Assets
   */
  public clear():
    void {

    this.assets.clear();

  }

}

const assetManager =
  new AssetManager();

export default assetManager;
