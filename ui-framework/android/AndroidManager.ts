/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: AndroidManager.ts
 * -------------------------------------------------------------
 */

export enum AndroidPermission {

  CAMERA = "CAMERA",

  MICROPHONE = "MICROPHONE",

  STORAGE = "STORAGE",

  LOCATION = "LOCATION",

  NOTIFICATIONS = "NOTIFICATIONS",

  ACCESSIBILITY = "ACCESSIBILITY",

  OVERLAY = "OVERLAY"

}

export interface AndroidDevice {

  manufacturer: string;

  model: string;

  androidVersion: string;

  sdkVersion: number;

}

export class AndroidManager {

  private initialized = false;

  private permissions =
    new Set<AndroidPermission>();

  /**
   * Initialize
   */
  public initialize(): void {

    this.initialized = true;

  }

  /**
   * Is Initialized
   */
  public isInitialized(): boolean {

    return this.initialized;

  }

  /**
   * Grant Permission
   */
  public grantPermission(
    permission: AndroidPermission
  ): void {

    this.permissions.add(
      permission
    );

  }

  /**
   * Revoke Permission
   */
  public revokePermission(
    permission: AndroidPermission
  ): void {

    this.permissions.delete(
      permission
    );

  }

  /**
   * Check Permission
   */
  public hasPermission(
    permission: AndroidPermission
  ): boolean {

    return this.permissions.has(
      permission
    );

  }

  /**
   * Get All Permissions
   */
  public getPermissions():
    AndroidPermission[] {

    return Array.from(
      this.permissions
    );

  }

  /**
   * Device Info
   */
  public getDevice():
    AndroidDevice {

    return {

      manufacturer: "Unknown",

      model: "Unknown",

      androidVersion: "Unknown",

      sdkVersion: 0

    };

  }

  /**
   * Reset
   */
  public reset(): void {

    this.initialized = false;

    this.permissions.clear();

  }

}

const androidManager =
  new AndroidManager();

export default androidManager;
