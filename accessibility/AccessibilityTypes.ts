/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityTypes.ts
 * -------------------------------------------------------------
 */

export enum AccessibilityPermissionStatus {
  UNKNOWN = "UNKNOWN",
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  DISABLED = "DISABLED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
}

export enum AccessibilityServiceState {
  STOPPED = "STOPPED",
  STARTING = "STARTING",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  ERROR = "ERROR",
}

export enum AccessibilityEventType {
  WINDOW_CHANGED = "WINDOW_CHANGED",
  WINDOW_STATE_CHANGED = "WINDOW_STATE_CHANGED",
  VIEW_CLICKED = "VIEW_CLICKED",
  VIEW_LONG_CLICKED = "VIEW_LONG_CLICKED",
  VIEW_FOCUSED = "VIEW_FOCUSED",
  VIEW_SCROLLED = "VIEW_SCROLLED",
  VIEW_TEXT_CHANGED = "VIEW_TEXT_CHANGED",
  VIEW_SELECTED = "VIEW_SELECTED",
  NOTIFICATION = "NOTIFICATION",
  GESTURE = "GESTURE",
  UNKNOWN = "UNKNOWN",
}

export interface AccessibilityNodeInfo {
  id: string;
  packageName: string;
  className: string;
  text?: string;
  contentDescription?: string;
  hintText?: string;
  resourceId?: string;

  clickable: boolean;
  checkable: boolean;
  checked: boolean;
  enabled: boolean;
  editable: boolean;
  selected: boolean;
  focused: boolean;
  visible: boolean;

  bounds: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };

  children?: AccessibilityNodeInfo[];
}

export interface AccessibilityEvent {
  id: string;

  timestamp: number;

  type: AccessibilityEventType;

  packageName: string;

  className: string;

  text?: string;

  description?: string;

  node?: AccessibilityNodeInfo;
}

export interface AccessibilityAppInfo {
  packageName: string;
  appName: string;
  version?: string;
  systemApp: boolean;
}

export interface AccessibilityGesture {
  id: string;

  name: string;

  timestamp: number;
}

export interface AccessibilityConfig {
  enabled: boolean;

  collectText: boolean;

  collectViewTree: boolean;

  collectNotifications: boolean;

  collectGestures: boolean;

  collectWindowChanges: boolean;

  maxTreeDepth: number;

  maxChildrenPerNode: number;

  eventHistoryLimit: number;
}

export interface AccessibilityStatistics {
  totalEvents: number;

  totalGestures: number;

  activePackage: string;

  serviceState: AccessibilityServiceState;

  permission: AccessibilityPermissionStatus;

  uptime: number;
}

export interface AccessibilitySnapshot {
  timestamp: number;

  activePackage: string;

  rootNode?: AccessibilityNodeInfo;

  statistics: AccessibilityStatistics;
}

export interface AccessibilityListener {
  onEvent(event: AccessibilityEvent): void;
}

export interface AccessibilityStateListener {
  onPermissionChanged(
    status: AccessibilityPermissionStatus
  ): void;

  onServiceStateChanged(
    state: AccessibilityServiceState
  ): void;
}

export interface AccessibilityServiceContract {
  initialize(): Promise<void>;

  start(): Promise<void>;

  stop(): Promise<void>;

  restart(): Promise<void>;

  destroy(): Promise<void>;

  isRunning(): boolean;

  getPermissionStatus():
    Promise<AccessibilityPermissionStatus>;

  getStatistics():
    Promise<AccessibilityStatistics>;

  getSnapshot():
    Promise<AccessibilitySnapshot>;

  addListener(
    listener: AccessibilityListener
  ): void;

  removeListener(
    listener: AccessibilityListener
  ): void;
}
