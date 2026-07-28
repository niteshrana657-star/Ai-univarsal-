/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityPermission.ts
 * -------------------------------------------------------------
 */

import {
  AccessibilityPermissionStatus,
} from "./AccessibilityTypes";


/**
 * Accessibility Permission Interface
 */
export interface AccessibilityPermissionProvider {

  checkPermission():
    Promise<AccessibilityPermissionStatus>;

  requestPermission():
    Promise<void>;

  openPermissionSettings():
    Promise<void>;
}


/**
 * Accessibility Permission Manager
 */
export class AccessibilityPermissionManager {

  private status:
    AccessibilityPermissionStatus =
    AccessibilityPermissionStatus.UNKNOWN;


  private provider?:
    AccessibilityPermissionProvider;


  constructor(
    provider?: AccessibilityPermissionProvider
  ) {

    this.provider = provider;
  }


  /**
   * Initialize Permission Manager
   */
  async initialize(): Promise<void> {

    await this.refreshStatus();
  }


  /**
   * Set Permission Provider
   */
  setProvider(
    provider: AccessibilityPermissionProvider
  ): void {

    this.provider = provider;
  }


  /**
   * Check Current Permission
   */
  async check():
    Promise<AccessibilityPermissionStatus> {

    return await this.refreshStatus();
  }


  /**
   * Refresh Permission Status
   */
  private async refreshStatus():
    Promise<AccessibilityPermissionStatus> {

    if (!this.provider) {

      this.status =
        AccessibilityPermissionStatus.NOT_SUPPORTED;

      return this.status;
    }


    try {

      this.status =
        await this.provider.checkPermission();

    } catch {

      this.status =
        AccessibilityPermissionStatus.UNKNOWN;
    }


    return this.status;
  }


  /**
   * Request Permission
   * 
   * Note:
   * This only opens user permission flow.
   * It never grants permission automatically.
   */
  async request():
    Promise<void> {

    if (!this.provider) {

      throw new Error(
        "Accessibility permission provider unavailable"
      );
    }


    await this.provider.requestPermission();
  }


  /**
   * Open System Permission Settings
   */
  async openSettings():
    Promise<void> {

    if (!this.provider) {

      throw new
