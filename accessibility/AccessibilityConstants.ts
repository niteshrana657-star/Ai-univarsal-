/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityConstants.ts
 * -------------------------------------------------------------
 */

import {
  AccessibilityConfig,
} from "./AccessibilityTypes";


/**
 * Accessibility Service Metadata
 */
export const ACCESSIBILITY_MODULE_NAME =
  "Universal AI Accessibility Engine";

export const ACCESSIBILITY_MODULE_VERSION =
  "1.0.0";


/**
 * Default Accessibility Configuration
 */
export const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  enabled: true,

  collectText: true,

  collectViewTree: true,

  collectNotifications: false,

  collectGestures: false,

  collectWindowChanges: true,

  maxTreeDepth: 8,

  maxChildrenPerNode: 50,

  eventHistoryLimit: 500,
};


/**
 * Accessibility Tree Limits
 */
export const ACCESSIBILITY_TREE_LIMITS = {
  MIN_DEPTH: 1,

  MAX_DEPTH: 20,

  DEFAULT_DEPTH: 8,

  MIN_CHILDREN: 5,

  MAX_CHILDREN: 100,

  DEFAULT_CHILDREN: 50,
};


/**
 * Event Processing Constants
 */
export const ACCESSIBILITY_EVENT_CONSTANTS = {
  MAX_EVENT_HISTORY: 500,

  EVENT_QUEUE_LIMIT: 1000,

  EVENT_PROCESS_INTERVAL_MS: 100,

  EVENT_TIMEOUT_MS: 5000,
};


/**
 * Snapshot Constants
 */
export const ACCESSIBILITY_SNAPSHOT_CONSTANTS = {
  MAX_SNAPSHOT_CACHE: 20,

  SNAPSHOT_EXPIRY_MS: 30000,
};


/**
 * Text Collection Rules
 */
export const ACCESSIBILITY_TEXT_RULES = {
  MAX_TEXT_LENGTH: 500,

  INCLUDE_HINT_TEXT: true,

  INCLUDE_CONTENT_DESCRIPTION: true,
};


/**
 * Security & Privacy Constants
 */
export const ACCESSIBILITY_SECURITY = {
  REQUIRE_USER_PERMISSION: true,

  STORE_SENSITIVE_TEXT: false,

  ENABLE_LOCAL_PROCESSING: true,

  ALLOW_BACKGROUND_CAPTURE: false,
};


/**
 * Supported Accessibility Features
 */
export const ACCESSIBILITY_FEATURES = {
  SCREEN_READING: true,

  UI_ANALYSIS: true,

  ELEMENT_DETECTION: true,

  AUTOMATION_SUPPORT: true,

  AI_CONTEXT_BUILDING: true,

  USER_ASSISTANCE: true,
};


/**
 * Default Error Messages
 */
export const ACCESSIBILITY_ERRORS = {
  SERVICE_NOT_RUNNING:
    "Accessibility service is not running",

  PERMISSION_REQUIRED:
    "Accessibility permission is required",

  SERVICE_NOT_SUPPORTED:
    "Accessibility service is not supported",

  INITIALIZATION_FAILED:
    "Accessibility module initialization failed",

  UNKNOWN_ERROR:
    "Unknown accessibility error",
};


/**
 * Internal Storage Keys
 */
export const ACCESSIBILITY_STORAGE_KEYS = {
  CONFIG:
    "uai_accessibility_config",

  PERMISSION_STATUS:
    "uai_accessibility_permission",

  SERVICE_STATE:
    "uai_accessibility_service_state",

  STATISTICS:
    "uai_accessibility_statistics",

  LAST_SNAPSHOT:
    "uai_accessibility_snapshot",
};


/**
 * Default Timing Values
 */
export const ACCESSIBILITY_TIMING = {
  START_DELAY_MS: 500,

  RESTART_DELAY_MS: 1000,

  CLEANUP_INTERVAL_MS: 60000,
};
