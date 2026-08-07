/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: PermissionBridge.ts
 * -------------------------------------------------------------
 */

import AndroidManager, {
  AndroidPermission
} from "./AndroidManager";

export interface PermissionStatus {

  permission: AndroidPermission;

  granted: boolean;

  requestedAt: number;

}

export class PermissionBridge {

  private history:
    PermissionStatus[] = [];

  /**
   * Request Permission
   */
  public async request(
    permission: AndroidPermission
  ): Promise<boolean> {

    AndroidManager.grantPermission(
      permission
    );

    this.history.push({

      permission,

      granted: true,

      requestedAt:
        Date.now()

    });

    return true;

  }

  /**
   * Revoke Permission
   */
  public revoke(
    permission: AndroidPermission
  ): void {

    AndroidManager.revokePermission(
      permission
    );

  }

  /**
   * Check Permission
   */
  public check(
    permission: AndroidPermission
  ): boolean {

    return AndroidManager.hasPermission(
      permission
    );

  }

  /**
   * Get Request History
   */
  public getHistory():
    PermissionStatus[] {

    return [

      ...this.history

    ];

  }

  /**
   * Clear History
   */
  public clearHistory():
    void {

    this.history = [];

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.clearHistory();

  }

}

const permissionBridge =
  new PermissionBridge();

export default permissionBridge;
