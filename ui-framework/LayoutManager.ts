/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * File: LayoutManager.ts
 * -------------------------------------------------------------
 */

export enum LayoutType {

  MOBILE = "MOBILE",

  TABLET = "TABLET",

  DESKTOP = "DESKTOP"

}

export interface LayoutConfig {

  type: LayoutType;

  sidebarVisible: boolean;

  navigationRail: boolean;

  compactMode: boolean;

  statusBarVisible: boolean;

  bottomBarVisible: boolean;

}

export class LayoutManager {

  private layout: LayoutConfig = {

    type: LayoutType.MOBILE,

    sidebarVisible: false,

    navigationRail: false,

    compactMode: false,

    statusBarVisible: true,

    bottomBarVisible: true

  };

  /**
   * Set Layout
   */
  public setLayout(
    config: Partial<LayoutConfig>
  ): LayoutConfig {

    this.layout = {

      ...this.layout,

      ...config

    };

    return this.getLayout();

  }

  /**
   * Get Layout
   */
  public getLayout():
    LayoutConfig {

    return {

      ...this.layout

    };

  }

  /**
   * Set Layout Type
   */
  public setType(
    type: LayoutType
  ): void {

    this.layout.type = type;

  }

  /**
   * Get Layout Type
   */
  public getType():
    LayoutType {

    return this.layout.type;

  }

  /**
   * Toggle Sidebar
   */
  public toggleSidebar():
    boolean {

    this.layout.sidebarVisible =

      !this.layout.sidebarVisible;

    return this.layout.sidebarVisible;

  }

  /**
   * Toggle Compact Mode
   */
  public toggleCompact():
    boolean {

    this.layout.compactMode =

      !this.layout.compactMode;

    return this.layout.compactMode;

  }

  /**
   * Reset Layout
   */
  public reset():
    void {

    this.layout = {

      type: LayoutType.MOBILE,

      sidebarVisible: false,

      navigationRail: false,

      compactMode: false,

      statusBarVisible: true,

      bottomBarVisible: true

    };

  }

}

const layoutManager =
  new LayoutManager();

export default layoutManager;
