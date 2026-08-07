/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * File: AnimationManager.ts
 * -------------------------------------------------------------
 */

export enum AnimationType {

  FADE = "FADE",

  SLIDE = "SLIDE",

  SCALE = "SCALE",

  ROTATE = "ROTATE",

  NONE = "NONE"

}

export interface AnimationConfig {

  enabled: boolean;

  type: AnimationType;

  duration: number;

  delay: number;

  repeat: boolean;

}

export class AnimationManager {

  private config:
    AnimationConfig = {

    enabled: true,

    type:
      AnimationType.FADE,

    duration: 300,

    delay: 0,

    repeat: false

  };

  /**
   * Set Animation
   */
  public configure(

    config:
      Partial<AnimationConfig>

  ): AnimationConfig {

    this.config = {

      ...this.config,

      ...config

    };

    return this.getConfig();

  }

  /**
   * Get Config
   */
  public getConfig():
    AnimationConfig {

    return {

      ...this.config

    };

  }

  /**
   * Enable
   */
  public enable():
    void {

    this.config.enabled = true;

  }

  /**
   * Disable
   */
  public disable():
    void {

    this.config.enabled = false;

  }

  /**
   * Toggle
   */
  public toggle():
    boolean {

    this.config.enabled =

      !this.config.enabled;

    return this.config.enabled;

  }

  /**
   * Change Animation
   */
  public setType(

    type: AnimationType

  ): void {

    this.config.type = type;

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.config = {

      enabled: true,

      type:
        AnimationType.FADE,

      duration: 300,

      delay: 0,

      repeat: false

    };

  }

}

const animationManager =
  new AnimationManager();

export default animationManager;
