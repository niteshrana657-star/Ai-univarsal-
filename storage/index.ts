/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * Exports
 * -------------------------------------------------------------
 */

export {
  default as LocalStorage
} from "./LocalStorage";

export type {
  StorageRecord
} from "./LocalStorage";

export {
  default as SecureStorage
} from "./SecureStorage";

export type {
  SecureStorageOptions
} from "./SecureStorage";

export {
  default as CacheManager
} from "./CacheManager";

export type {
  CacheEntry
} from "./CacheManager";

export {
  default as DatabaseManager
} from "./DatabaseManager";

export type {
  DatabaseRecord
} from "./DatabaseManager";

export {
  default as BackupManager
} from "./BackupManager";

export type {
  BackupData
} from "./BackupManager";
