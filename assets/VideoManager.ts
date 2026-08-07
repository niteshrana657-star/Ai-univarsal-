/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Assets Module
 * File: VideoManager.ts
 * -------------------------------------------------------------
 */

import AssetManager, {
  Asset,
  AssetType
} from "./AssetManager";

export interface VideoAsset extends Asset {

  width: number;

  height: number;

  duration: number;

  frameRate: number;

  bitrate: number;

  format: string;

}

export class VideoManager {

  /**
   * Register Video
   */
  public register(
    video: VideoAsset
  ): void {

    AssetManager.register({

      ...video,

      type: AssetType.VIDEO

    });

  }

  /**
   * Get Video
   */
  public get(
    id: string
  ): VideoAsset | null {

    const asset =
      AssetManager.get(id);

    if (

      !asset ||

      asset.type !==
      AssetType.VIDEO

    ) {

      return null;

    }

    return asset as VideoAsset;

  }

  /**
   * Get All Videos
   */
  public getAll():
    VideoAsset[] {

    return AssetManager
      .getAll()
      .filter(

        asset =>

          asset.type ===
          AssetType.VIDEO

      ) as VideoAsset[];

  }

  /**
   * Remove Video
   */
  public remove(
    id: string
  ): boolean {

    return AssetManager.remove(
      id
    );

  }

  /**
   * Total Videos
   */
  public count():
    number {

    return this.getAll().length;

  }

  /**
   * Clear Videos
   */
  public clear():
    void {

    this.getAll().forEach(

      video =>

        AssetManager.remove(
          video.id
        )

    );

  }

}

const videoManager =
  new VideoManager();

export default videoManager;
