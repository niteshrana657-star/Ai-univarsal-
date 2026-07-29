/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Security Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for Security module.
 * -------------------------------------------------------------
 */


// Security Policy

export {
    SecurityPolicy
} from "./SecurityPolicy";


export type {
    SecurityRiskLevel,
    SecurityRule,
    SecurityCheck
} from "./SecurityPolicy";



// Threat Detector

export {
    ThreatDetector
} from "./ThreatDetector";


export type {
    ThreatLevel,
    ThreatReport
} from "./ThreatDetector";



// Audit Logger

export {
    AuditLogger
} from "./AuditLogger";


export type {
    AuditAction,
    AuditRecord
} from "./AuditLogger";



// Access Control

export {
    AccessControl
} from "./AccessControl";


export type {
    AccessRole,
    AccessPermission,
    AccessUser
} from "./AccessControl";



// Data Protection

export {
    DataProtection
} from "./DataProtection";


export type {
    ProtectedData
} from "./DataProtection";



// Encryption Service

export {
    EncryptionService
} from "./EncryptionService";


export type {
    EncryptedData
} from "./EncryptionService";



// Security Manager

export {
    SecurityManager
} from "./SecurityManager";
