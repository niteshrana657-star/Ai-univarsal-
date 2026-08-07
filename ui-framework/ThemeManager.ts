/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * File: ThemeManager.ts
 * -------------------------------------------------------------
 */

export enum ThemeType {

  LIGHT = "LIGHT",

  DARK = "DARK",

  SYSTEM = "SYSTEM"

}

export interface ThemeConfig {

  type: ThemeType;

  primary: string;

  secondary: string;

  background: string;

  surface: string;

  text: string;

}

export class ThemeManager {

  private theme: ThemeConfig = {

    type: ThemeType.SYSTEM,

    primary: "#6750A4",

    secondary: "#03DAC6",

    background: "#0B0B0F",

    surface: "#18181C",

    text: "#FFFFFF"

  };

  /**
   * Apply Theme
   */
  public apply(
    config: Partial<ThemeConfig>
  ): ThemeConfig {

    this.theme = {

      ...this.theme,

      ...config

    };

    return this.theme;

  }

  /**
   * Get Theme
   */
  public get():
    ThemeConfig {

    return {

      ...this.theme

    };

  }

  /**
   * Change Theme Type
   */
  public setType(
    type: ThemeType
  ): void {

    this.theme.type = type;

  }

  /**
   * Current Theme Type
   */
  public getType():
    ThemeType {

    return this.theme.type;

  }

  /**
   * Reset Theme
   */
  public reset():
    void {

    this.theme = {

      type: ThemeType.SYSTEM,

      primary: "#6750A4",

      secondary: "#03DAC6",

      background: "#0B0B0F",

      surface: "#18181C",

      text: "#FFFFFF"

    };

  }

}

const themeManager =
  new ThemeManager();

export default themeManager;
