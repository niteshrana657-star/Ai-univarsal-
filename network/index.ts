/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * Exports
 * -------------------------------------------------------------
 */

export {
  default as NetworkManager,
  NetworkStatus
} from "./NetworkManager";

export type {
  NetworkInfo
} from "./NetworkManager";

export {
  default as ApiClient
} from "./ApiClient";

export type {
  ApiRequest,
  ApiResponse
} from "./ApiClient";

export {
  default as ConnectionMonitor
} from "./ConnectionMonitor";

export type {
  ConnectionListener
} from "./ConnectionMonitor";

export {
  default as RequestQueue
} from "./RequestQueue";

export type {
  QueueRequest
} from "./RequestQueue";

export {
  default as NetworkSecurity,
  DEFAULT_SECURITY_CONFIG
} from "./NetworkSecurity";

export type {
  SecurityConfig
} from "./NetworkSecurity";
