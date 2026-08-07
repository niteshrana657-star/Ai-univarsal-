/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Assets Module
 * File: ImageManager.ts
 * -------------------------------------------------------------
 */

import AssetManager, {
  Asset,
  AssetType
} from "./AssetManager";

export interface ImageAsset extends Asset {

  width: number;

  height: number;

  format: string;

}

export class ImageManager {

  /**
   * Register Image
   */
  public register(
    image: ImageAsset
  ): void {

    AssetManager.register({

      ...image,

      type: AssetType.IMAGE

    });

  }

  /**
   * Get Image
   */
  public get(
    id: string
  ): ImageAsset | null {

    const asset =
      AssetManager.get(id);

    if (
      !asset ||
      asset.type !==
      AssetType.IMAGE
    ) {

      return null;

    }

    return asset as ImageAsset;

  }

  /**
   * Get All Images
   */
  public getAll():
    ImageAsset[] {

    return AssetManager
      .getAll()
      .filter(

        asset =>

          asset.type ===
          AssetType.IMAGE

      ) as ImageAsset[];

  }

  /**
   * Remove Image
   */
  public remove(
    id: string
  ): boolean {

    return AssetManager.remove(
      id
    );

  }

  /**
   * Total Images
   */
  public count():
    number {

    return this.getAll()
      .length;

  }

  /**
   * Clear Images
   */
  public clear():
    void {

    this.getAll().forEach(

      image =>

        AssetManager.remove(
          image.id
        )

    );

  }

}

const imageManager =
  new ImageManager();

export default imageManager;
