/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityManager.ts
 * -------------------------------------------------------------
 */

import {
  AccessibilityEvent,
  AccessibilityListener,
  AccessibilityPermissionStatus,
  AccessibilityServiceState,
  AccessibilityStatistics,
  AccessibilitySnapshot,
} from "./AccessibilityTypes";


import {
  AccessibilityService,
} from "./AccessibilityService";


import {
  AccessibilityPermissionManager,
} from "./AccessibilityPermission";


/**
 * Accessibility Manager
 */
export class AccessibilityManager {


  private service:
    AccessibilityService;


  private permissionManager:
    AccessibilityPermissionManager;


  private initialized:
    boolean = false;



  constructor() {

    this.permissionManager =
      new AccessibilityPermissionManager();


    this.service =
      new AccessibilityService(
        this.permissionManager
      );
  }



  /**
   * Initialize Accessibility Module
   */
  async initialize():
    Promise<void> {


    if (this.initialized) {
      return;
    }


    await this.service.initialize();


    this.initialized = true;
  }



  /**
   * Start Accessibility
   */
  async start():
    Promise<void> {


    this.ensureInitialized();


    await this.service.start();
  }



  /**
   * Stop Accessibility
   */
  async stop():
    Promise<void> {


    await this.service.stop();
  }



  /**
   * Restart Accessibility
   */
  async restart():
    Promise<void> {


    await this.service.restart();
  }



  /**
   * Destroy Accessibility
   */
  async destroy():
    Promise<void> {


    await this.service.destroy();


    this.initialized = false;
  }



  /**
   * Check Running State
   */
  isRunning():
    boolean {

    return this.service.isRunning();
  }



  /**
   * Get Service State
   */
  getState():
    AccessibilityServiceState {


    return this.service.getState();
  }



  /**
   * Get Permission Status
   */
  async getPermissionStatus():
    Promise<AccessibilityPermissionStatus> {


    return await this.service
      .getPermissionStatus();
  }



  /**
   * Request Accessibility Permission
   */
  async requestPermission():
    Promise<void> {


    await this.permissionManager
      .request();
  }



  /**
   * Open Permission Settings
   */
  async openPermissionSettings():
    Promise<void> {


    await this.permissionManager
      .openSettings();
  }



  /**
   * Receive Accessibility Event
   */
  dispatchEvent(
    event: AccessibilityEvent
  ): void {


    this.service.handleEvent(event);
  }



  /**
   * Add Event Listener
   */
  addListener(
    listener: AccessibilityListener
  ): void {


    this.service.addListener(
      listener
    );
  }



  /**
   * Remove Event Listener
   */
  removeListener(
    listener: AccessibilityListener
  ): void {


    this.service.removeListener(
      listener
    );
  }



  /**
   * Get Statistics
   */
  async getStatistics():
    Promise<AccessibilityStatistics> {


    return await this.service
      .getStatistics();
  }



  /**
   * Get Current Snapshot
   */
  async getSnapshot():
    Promise<AccessibilitySnapshot> {


    return await this.service
      .getSnapshot();
  }



  /**
   * Verify Initialization
   */
  private ensureInitialized():
    void {


    if (!this.initialized) {

      throw new Error(
        "Accessibility Manager not initialized"
      );
    }
  }
}
