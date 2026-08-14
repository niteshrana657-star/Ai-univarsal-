/**
 * AIEngineEvents.ts
 *
 * Central event definitions for Universal AI Operating Companion.
 */

// ==============================
// Engine Events
// ==============================

export const AI_ENGINE_EVENTS = {

    STATE_CHANGED:
        "ENGINE.STATE_CHANGED",

    READY:
        "ENGINE.READY",

    STARTED:
        "ENGINE.STARTED",

    PAUSED:
        "ENGINE.PAUSED",

    RESUMED:
        "ENGINE.RESUMED",

    STOPPED:
        "ENGINE.STOPPED",

    SHUTDOWN:
        "ENGINE.SHUTDOWN",

    ERROR:
        "ENGINE.ERROR"

} as const;



// ==============================
// Task Events
// ==============================

export const AI_TASK_EVENTS = {

    CREATED:
        "TASK.CREATED",

    ROUTED:
        "TASK.ROUTED",

    STARTED:
        "TASK.STARTED",

    COMPLETED:
        "TASK.COMPLETED",

    CANCELLED:
        "TASK.CANCELLED",

    RECOVERY_STARTED:
        "TASK.RECOVERY_STARTED"

} as const;



// ==============================
// Module Events
// ==============================

export const AI_MODULE_EVENTS = {

    REGISTERED:
        "MODULE.REGISTERED",

    REMOVED:
        "MODULE.REMOVED",

    MESSAGE_SENT:
        "MODULE.MESSAGE_SENT",

    BROADCAST:
        "MODULE.BROADCAST"

} as const;



// ==============================
// Registry Events
// ==============================

export const AI_REGISTRY_EVENTS = {

    MODULE_REGISTERED:
        "REGISTRY.MODULE_REGISTERED",

    MODULE_UPDATED:
        "REGISTRY.MODULE_UPDATED",

    MODULE_REMOVED:
        "REGISTRY.MODULE_REMOVED",

    SERVICE_REGISTERED:
        "REGISTRY.SERVICE_REGISTERED",

    SERVICE_REMOVED:
        "REGISTRY.SERVICE_REMOVED",

    BRIDGE_REGISTERED:
        "REGISTRY.BRIDGE_REGISTERED",

    BRIDGE_REMOVED:
        "REGISTRY.BRIDGE_REMOVED"

} as const;



// ==============================
// Bridge Events
// ==============================

export const AI_BRIDGE_EVENTS = {

    CONNECTED:
        "BRIDGE.CONNECTED",

    DISCONNECTED:
        "BRIDGE.DISCONNECTED",

    CONNECTION_FAILED:
        "BRIDGE.CONNECTION_FAILED",

    MESSAGE_RECEIVED:
        "BRIDGE.MESSAGE_RECEIVED",

    MESSAGE_SENT:
        "BRIDGE.MESSAGE_SENT"

} as const;



// ==============================
// Plugin Events
// ==============================

export const AI_PLUGIN_EVENTS = {

    LOADED:
        "PLUGIN.LOADED",

    UNLOADED:
        "PLUGIN.UNLOADED",

    ENABLED:
        "PLUGIN.ENABLED",

    DISABLED:
        "PLUGIN.DISABLED",

    FAILED:
        "PLUGIN.FAILED"

} as const;



// ==============================
// Security Events
// ==============================

export const AI_SECURITY_EVENTS = {

    AUTHENTICATION_STARTED:
        "SECURITY.AUTHENTICATION_STARTED",

    AUTHENTICATION_SUCCESS:
        "SECURITY.AUTHENTICATION_SUCCESS",

    AUTHENTICATION_FAILED:
        "SECURITY.AUTHENTICATION_FAILED",

    AUTHORIZATION_STARTED:
        "SECURITY.AUTHORIZATION_STARTED",

    AUTHORIZATION_GRANTED:
        "SECURITY.AUTHORIZATION_GRANTED",

    AUTHORIZATION_DENIED:
        "SECURITY.AUTHORIZATION_DENIED",

    PERMISSION_GRANTED:
        "SECURITY.PERMISSION_GRANTED",

    PERMISSION_DENIED:
        "SECURITY.PERMISSION_DENIED",

    SECURITY_ALERT:
        "SECURITY.SECURITY_ALERT",

    SECURITY_ERROR:
        "SECURITY.SECURITY_ERROR"

} as const;



// ==============================
// Memory Events
// ==============================

export const AI_MEMORY_EVENTS = {

    MEMORY_LOADED:
        "MEMORY.LOADED",

    MEMORY_UPDATED:
        "MEMORY.UPDATED",

    MEMORY_SAVED:
        "MEMORY.SAVED",

    MEMORY_CLEARED:
        "MEMORY.CLEARED",

    MEMORY_SEARCHED:
        "MEMORY.SEARCHED"

} as const;



// ==============================
// Voice Events
// ==============================

export const AI_VOICE_EVENTS = {

    LISTENING_STARTED:
        "VOICE.LISTENING_STARTED",

    LISTENING_STOPPED:
        "VOICE.LISTENING_STOPPED",

    SPEECH_RECOGNIZED:
        "VOICE.SPEECH_RECOGNIZED",

    RESPONSE_STARTED:
        "VOICE.RESPONSE_STARTED",

    RESPONSE_FINISHED:
        "VOICE.RESPONSE_FINISHED"

} as const;



// ==============================
// Screen Events
// ==============================

export const AI_SCREEN_EVENTS = {

    CAPTURE_STARTED:
        "SCREEN.CAPTURE_STARTED",

    CAPTURE_COMPLETED:
        "SCREEN.CAPTURE_COMPLETED",

    ANALYSIS_STARTED:
        "SCREEN.ANALYSIS_STARTED",

    ANALYSIS_COMPLETED:
        "SCREEN.ANALYSIS_COMPLETED"

} as const;



// ==============================
// Automation Events
// ==============================

export const AI_AUTOMATION_EVENTS = {

    EXECUTION_STARTED:
        "AUTOMATION.EXECUTION_STARTED",

    EXECUTION_COMPLETED:
        "AUTOMATION.EXECUTION_COMPLETED",

    EXECUTION_FAILED:
        "AUTOMATION.EXECUTION_FAILED"

} as const;



// ==============================
// Notification Events
// ==============================

export const AI_NOTIFICATION_EVENTS = {

    RECEIVED:
        "NOTIFICATION.RECEIVED",

    PROCESSED:
        "NOTIFICATION.PROCESSED",

    DISMISSED:
        "NOTIFICATION.DISMISSED"

} as const;



// ==============================
// Common Event Payload
// ==============================

export interface IAIEventPayload {

    source: string;

    timestamp: number;

    data?: unknown;

    metadata?: Record<string, unknown>;

}



// ==============================
// Generic Event
// ==============================

export interface IAIEvent<T = unknown> {

    type: string;

    payload: T;

    timestamp: number;

}



// ==============================
// Event Listener
// ==============================

export type AIEventListener<T = unknown> =
    (event: IAIEvent<T>) => void;



// ==============================
// Event Map
// ==============================

export type AIEventMap =
    Record<
        string,
        AIEventListener[]
    >;



// ==============================
// Event Factory
// ==============================

export function createAIEvent<T>(
    type: string,
    payload: T
): IAIEvent<T> {

    return {

        type,

        payload,

        timestamp:
            Date.now()

    };

}



// ==============================
// Export Collections
// ==============================

export const AI_EVENTS = {

    ENGINE:
        AI_ENGINE_EVENTS,

    TASK:
        AI_TASK_EVENTS,

    MODULE:
        AI_MODULE_EVENTS,

    REGISTRY:
        AI_REGISTRY_EVENTS,

    BRIDGE:
        AI_BRIDGE_EVENTS,

    PLUGIN:
        AI_PLUGIN_EVENTS,

    SECURITY:
        AI_SECURITY_EVENTS,

    MEMORY:
        AI_MEMORY_EVENTS,

    VOICE:
        AI_VOICE_EVENTS,

    SCREEN:
        AI_SCREEN_EVENTS,

    AUTOMATION:
        AI_AUTOMATION_EVENTS,

    NOTIFICATION:
        AI_NOTIFICATION_EVENTS

} as const;
