/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * File: UIManager.ts
 * -------------------------------------------------------------
 */

export type ThemeMode =

  | "LIGHT"
  | "DARK"
  | "SYSTEM";

export interface UITheme {

  mode: ThemeMode;

  primaryColor: string;

  accentColor: string;

  fontFamily: string;

}

export interface UILayout {

  sidebarVisible: boolean;

  animationsEnabled: boolean;

  compactMode: boolean;

}

export class UIManager {

  private theme: UITheme = {

    mode: "SYSTEM",

    primaryColor: "#6750A4",

    accentColor: "#03DAC6",

    fontFamily: "Inter"

  };

  private layout: UILayout = {

    sidebarVisible: true,

    animationsEnabled: true,

    compactMode: false

  };

  /**
   * Set Theme
   */
  public setTheme(
    theme: Partial<UITheme>
  ): void {

    this.theme = {

      ...this.theme,

      ...theme

    };

  }

  /**
   * Get Theme
   */
  public getTheme():
    UITheme {

    return {

      ...this.theme

    };

  }

  /**
   * Set Layout
   */
  public setLayout(
    layout: Partial<UILayout>
  ): void {

    this.layout = {

      ...this.layout,

      ...layout

    };

  }

  /**
   * Get Layout
   */
  public getLayout():
    UILayout {

    return {

      ...this.layout

    };

  }

  /**
   * Toggle Theme
   */
  public toggleTheme():
    void {

    this.theme.mode =

      this.theme.mode ===
      "DARK"

        ? "LIGHT"

        : "DARK";

  }

  /**
   * Reset UI
   */
  public reset():
    void {

    this.theme = {

      mode: "SYSTEM",

      primaryColor:
        "#6750A4",

      accentColor:
        "#03DAC6",

      fontFamily:
        "Inter"

    };

    this.layout = {

      sidebarVisible: true,

      animationsEnabled: true,

      compactMode: false

    };

  }

}

const uiManager =
  new UIManager();

export default uiManager;
