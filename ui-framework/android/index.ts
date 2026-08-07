/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * Exports
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  default as AndroidManager,
  AndroidPermission
} from "./AndroidManager";

export type {
  AndroidDevice
} from "./AndroidManager";

export {
  default as PermissionBridge
} from "./PermissionBridge";

export type {
  PermissionStatus
} from "./PermissionBridge";

export {
  default as DeviceInfo
} from "./DeviceInfo";

export type {
  DeviceInformation
} from "./DeviceInfo";

export {
  default as NotificationManager
} from "./NotificationManager";

export type {
  NotificationData
} from "./NotificationManager";

export {
  default as ServiceManager,
  ServiceState
} from "./ServiceManager";

export type {
  AndroidService
} from "./ServiceManager";

export {
  default as IntentManager
} from "./IntentManager";

export type {
  AndroidIntent
} from "./IntentManager";
