/**
 * Universal AI Operating Companion
 * Core Constants
 * Version: 1.0.0
 */


/**
 * Application Information
 */
export const APP_INFO = {
    NAME: "Universal AI Operating Companion",
    SHORT_NAME: "Universal AI",
    VERSION: "1.0.0"
} as const;


/**
 * Core Configuration Defaults
 */
export const CORE_CONFIG = {
    DEFAULT_LANGUAGE: "en",
    DEFAULT_MODE: "idle",

    ENABLE_MEMORY: true,
    ENABLE_VOICE: true,
    ENABLE_SCREEN_UNDERSTANDING: true,
    ENABLE_AUTOMATION: true,
    ENABLE_PLUGINS: true,

    REQUIRE_PERMISSION_CONFIRMATION: true
} as const;


/**
 * AI Limits
 */
export const AI_LIMITS = {
    MAX_CONTEXT_LENGTH: 10000,
    MAX_MEMORY_ITEMS: 1000,
    MAX_TASK_QUEUE: 100
} as const;


/**
 * Event Names
 */
export const CORE_EVENTS = {
    CORE_INITIALIZED: "core_initialized",
    CORE_STARTED: "core_started",
    CORE_STOPPED: "core_stopped",

    AI_REQUEST_RECEIVED: "ai_request_received",
    AI_RESPONSE_READY: "ai_response_ready",

    MEMORY_UPDATED: "memory_updated",

    PERMISSION_GRANTED: "permission_granted",
    PERMISSION_DENIED: "permission_denied",

    TASK_STARTED: "task_started",
    TASK_COMPLETED: "task_completed",
    TASK_FAILED: "task_failed",

    PLUGIN_LOADED: "plugin_loaded",
    PLUGIN_UNLOADED: "plugin_unloaded"
} as const;


/**
 * Security Constants
 */
export const SECURITY_CONFIG = {
    ENCRYPT_MEMORY: true,
    LOG_SENSITIVE_DATA: false,
    REQUIRE_USER_CONFIRMATION: true
} as const;


/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
    USER_SETTINGS: "user_settings",
    USER_MEMORY: "user_memory",
    PERMISSIONS: "permissions",
    ACTIVE_SESSION: "active_session"
} as const;


/**
 * Default Messages
 */
export const SYSTEM_MESSAGES = {
    READY: "AI system ready",
    INITIALIZING: "AI system initializing",
    PROCESSING: "Processing request",
    ERROR: "An error occurred"
} as const;
