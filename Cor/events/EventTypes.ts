/**
 * Universal AI Operating Companion
 * Core Event Types
 * Version: 1.0.0
 */


/**
 * Core Events
 */
export enum CoreEventType {

    // Core Lifecycle
    CORE_INITIALIZING = "core_initializing",
    CORE_INITIALIZED = "core_initialized",
    CORE_STARTED = "core_started",
    CORE_STOPPED = "core_stopped",
    CORE_ERROR = "core_error",


    // AI Events
    AI_REQUEST_RECEIVED = "ai_request_received",
    AI_PROCESSING_STARTED = "ai_processing_started",
    AI_PROCESSING_COMPLETED = "ai_processing_completed",
    AI_RESPONSE_CREATED = "ai_response_created",


    // Memory Events
    MEMORY_CREATED = "memory_created",
    MEMORY_UPDATED = "memory_updated",
    MEMORY_DELETED = "memory_deleted",


    // Permission Events
    PERMISSION_REQUESTED = "permission_requested",
    PERMISSION_GRANTED = "permission_granted",
    PERMISSION_DENIED = "permission_denied",
    PERMISSION_CHANGED = "permission_changed",


    // Automation Events
    AUTOMATION_STARTED = "automation_started",
    AUTOMATION_COMPLETED = "automation_completed",
    AUTOMATION_FAILED = "automation_failed",


    // Plugin Events
    PLUGIN_REGISTERED = "plugin_registered",
    PLUGIN_LOADED = "plugin_loaded",
    PLUGIN_UNLOADED = "plugin_unloaded",
    PLUGIN_ERROR = "plugin_error",


    // Service Events
    SERVICE_STARTED = "service_started",
    SERVICE_STOPPED = "service_stopped",
    SERVICE_ERROR = "service_error",


    // Security Events
    SECURITY_WARNING = "security_warning",
    SECURITY_BLOCKED = "security_blocked"
}


/**
 * Event Priority
 */
export enum EventPriority {

    LOW = "low",

    NORMAL = "normal",

    HIGH = "high",

    CRITICAL = "critical"

}


/**
 * Generic Event Payload
 */
export interface EventPayload {

    source: string;

    data?: unknown;

    priority?: EventPriority;

}


/**
 * Typed Core Event
 */
export interface CoreEvent {

    type: CoreEventType;

    timestamp: number;

    payload?: EventPayload;

}
