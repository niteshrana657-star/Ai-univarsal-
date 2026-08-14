/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Central public export point for release management.
 * -------------------------------------------------------------
 */

// -------------------------------------------------------------
// Release Package Manager
// -------------------------------------------------------------

export {
  ReleasePackageManager,
  PackageStatus
} from "./ReleasePackageManager";

export type {
  ReleasePackage
} from "./ReleasePackageManager";


// -------------------------------------------------------------
// Version Manager
// -------------------------------------------------------------

export {
  VersionManager
} from "./VersionManager";

export type {
  Version
} from "./VersionManager";


// -------------------------------------------------------------
// Changelog Manager
// -------------------------------------------------------------

export {
  ChangelogManager
} from "./ChangelogManager";

export type {
  ChangelogEntry
} from "./ChangelogManager";


// -------------------------------------------------------------
// Package Validator
// -------------------------------------------------------------

export {
  PackageValidator
} from "./PackageValidator";

export type {
  ValidationIssue,
  ValidationResult
} from "./PackageValidator";


// -------------------------------------------------------------
// Release Exporter
// -------------------------------------------------------------

export {
  ReleaseExporter
} from "./ReleaseExporter";

export type {
  ExportResult
} from "./ReleaseExporter";
