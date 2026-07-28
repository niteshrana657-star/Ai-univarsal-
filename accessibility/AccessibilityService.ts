/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityService.ts
 * -------------------------------------------------------------
 */

import {
  AccessibilityConfig,
  AccessibilityEvent,
  AccessibilityListener,
  AccessibilityPermissionStatus,
  AccessibilityServiceContract,
  AccessibilityServiceState,
  AccessibilitySnapshot,
  AccessibilityStatistics,
} from "./AccessibilityTypes";

import {
  DEFAULT_ACCESSIBILITY_CONFIG,
} from "./AccessibilityConstants";

import {
  AccessibilityEventHistory,
  shouldProcessAccessibilityEvent,
} from "./AccessibilityEvents";

import {
  AccessibilityPermissionManager,
} from "./AccessibilityPermission";


/**
 * Accessibility Service
 */
export class AccessibilityService
  implements AccessibilityServiceContract {


  private state:
    AccessibilityServiceState =
    AccessibilityServiceState.STOPPED;


  private config:
    AccessibilityConfig =
    DEFAULT_ACCESSIBILITY_CONFIG;


  private listeners:
    AccessibilityListener[] = [];


  private eventHistory:
    AccessibilityEventHistory =
    new AccessibilityEventHistory();


  private permissionManager:
    AccessibilityPermissionManager;


  private startTime:
    number = 0;


  private activePackage:
    string = "";


  private snapshot?:
    AccessibilitySnapshot;


  constructor(
    permissionManager:
      AccessibilityPermissionManager
  ) {

    this.permissionManager =
      permissionManager;
  }


  /**
   * Initialize Service
   */
  async initialize(): Promise<void> {

    this.state =
      AccessibilityServiceState.STARTING;


    await this.permissionManager
      .initialize();


    this.state =
      AccessibilityServiceState.STOPPED;
  }


  /**
   * Start Accessibility Service
   */
  async start(): Promise<void> {

    const permission =
      await this.getPermissionStatus();


    if (
      permission !==
      AccessibilityPermissionStatus.GRANTED
    ) {

      this.state =
        AccessibilityServiceState.ERROR;

      throw new Error(
        "Accessibility permission required"
      );
    }


    this.state =
      AccessibilityServiceState.STARTING;


    this.startTime =
      Date.now();


    this.state =
      AccessibilityServiceState.RUNNING;
  }


  /**
   * Stop Service
   */
  async stop(): Promise<void> {

    this.state =
      AccessibilityServiceState.STOPPED;
  }


  /**
   * Restart Service
   */
  async restart(): Promise<void> {

    await this.stop();

    await this.start();
  }


  /**
   * Destroy Service
   */
  async destroy(): Promise<void> {

    await this.stop();

    this.listeners = [];

    this.eventHistory.clear();

    this.snapshot = undefined;
  }


  /**
   * Service Running Check
   */
  isRunning(): boolean {

    return (
      this.state ===
      AccessibilityServiceState.RUNNING
    );
  }


  /**
   * Receive Accessibility Event
   */
  handleEvent(
    event: AccessibilityEvent
  ): void {


    if (
      !shouldProcessAccessibilityEvent(event)
    ) {
      return;
    }


    this.activePackage =
      event.packageName;


    this.eventHistory.add(event);


    this.notifyListeners(event);
  }


  /**
   * Add Listener
   */
  addListener(
    listener: AccessibilityListener
  ): void {

    this.listeners.push(listener);
  }


  /**
   * Remove Listener
   */
  removeListener(
    listener: AccessibilityListener
  ): void {

    this.listeners =
      this.listeners.filter(
        item =>
          item !== listener
      );
  }


  /**
   * Notify Listeners
   */
  private notifyListeners(
    event: AccessibilityEvent
  ): void {

    for (const listener of this.listeners) {

      try {

        listener.onEvent(event);

      } catch {

        continue;
      }
    }
  }


  /**
   * Get Permission Status
   */
  async getPermissionStatus():
    Promise<AccessibilityPermissionStatus> {

    return await this.permissionManager
      .check();
  }


  /**
   * Get Statistics
   */
  async getStatistics():
    Promise<AccessibilityStatistics> {

    return {

      totalEvents:
        this.eventHistory.size(),

      totalGestures:
        0,

      activePackage:
        this.activePackage,

      serviceState:
        this.state,

      permission:
        await this.getPermissionStatus(),

      uptime:
        this.startTime
          ? Date.now() - this.startTime
          : 0,
    };
  }


  /**
   * Get Current Snapshot
   */
  async getSnapshot():
    Promise<AccessibilitySnapshot> {

    return {

      timestamp:
        Date.now(),

      activePackage:
        this.activePackage,

      rootNode:
        this.snapshot?.rootNode,

      statistics:
        await this.getStatistics(),
    };
  }


  /**
   * Update Configuration
   */
  updateConfig(
    config: Partial<AccessibilityConfig>
  ): void {

    this.config = {

      ...this.config,

      ...config,
    };
  }


  /**
   * Get Configuration
   */
  getConfig():
    AccessibilityConfig {

    return {
      ...this.config,
    };
  }


  /**
   * Get Service State
   */
  getState():
    AccessibilityServiceState {

    return this.state;
  }
    }
