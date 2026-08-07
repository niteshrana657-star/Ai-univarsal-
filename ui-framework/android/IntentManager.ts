/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: IntentManager.ts
 * -------------------------------------------------------------
 */

export interface AndroidIntent {

  action: string;

  packageName?: string;

  className?: string;

  data?: string;

  mimeType?: string;

  extras?: Record<
    string,
    unknown
  >;

}

export class IntentManager {

  private lastIntent:
    AndroidIntent | null = null;

  /**
   * Launch Intent
   */
  public launch(
    intent: AndroidIntent
  ): boolean {

    this.lastIntent = {

      ...intent

    };

    // Reserved for
    // Android Native Bridge

    return true;

  }

  /**
   * Open Application
   */
  public openApp(
    packageName: string
  ): boolean {

    return this.launch({

      action:
        "android.intent.action.MAIN",

      packageName

    });

  }

  /**
   * Open URL
   */
  public openUrl(
    url: string
  ): boolean {

    return this.launch({

      action:
        "android.intent.action.VIEW",

      data: url

    });

  }

  /**
   * Share Text
   */
  public shareText(
    text: string
  ): boolean {

    return this.launch({

      action:
        "android.intent.action.SEND",

      mimeType:
        "text/plain",

      extras: {

        text

      }

    });

  }

  /**
   * Get Last Intent
   */
  public getLastIntent():
    AndroidIntent | null {

    return this.lastIntent;

  }

  /**
   * Clear
   */
  public clear():
    void {

    this.lastIntent = null;

  }

}

const intentManager =
  new IntentManager();

export default intentManager;
