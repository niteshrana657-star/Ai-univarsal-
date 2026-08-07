/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Assets Module
 * File: AudioManager.ts
 * -------------------------------------------------------------
 */

import AssetManager, {
  Asset,
  AssetType
} from "./AssetManager";

export interface AudioAsset extends Asset {

  duration: number;

  bitrate: number;

  sampleRate: number;

  channels: number;

  format: string;

}

export class AudioManager {

  /**
   * Register Audio
   */
  public register(
    audio: AudioAsset
  ): void {

    AssetManager.register({

      ...audio,

      type: AssetType.AUDIO

    });

  }

  /**
   * Get Audio
   */
  public get(
    id: string
  ): AudioAsset | null {

    const asset =
      AssetManager.get(id);

    if (

      !asset ||

      asset.type !==
      AssetType.AUDIO

    ) {

      return null;

    }

    return asset as AudioAsset;

  }

  /**
   * Get All Audio Files
   */
  public getAll():
    AudioAsset[] {

    return AssetManager
      .getAll()
      .filter(

        asset =>

          asset.type ===
          AssetType.AUDIO

      ) as AudioAsset[];

  }

  /**
   * Remove Audio
   */
  public remove(
    id: string
  ): boolean {

    return AssetManager.remove(
      id
    );

  }

  /**
   * Count Audio Files
   */
  public count():
    number {

    return this.getAll().length;

  }

  /**
   * Clear Audio Files
   */
  public clear():
    void {

    this.getAll().forEach(

      audio =>

        AssetManager.remove(
          audio.id
        )

    );

  }

}

const audioManager =
  new AudioManager();

export default audioManager;
