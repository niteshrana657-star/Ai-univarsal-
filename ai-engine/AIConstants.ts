/**
 * Universal AI Operating Companion
 * AI Constants
 * Version: 1.0.0
 */


/**
 * AI Engine States
 */
export enum AIEngineState {

    IDLE = "idle",

    INITIALIZING = "initializing",

    THINKING = "thinking",

    PROCESSING = "processing",

    EXECUTING = "executing",

    COMPLETED = "completed",

    ERROR = "error",

    STOPPED = "stopped"

}



/**
 * AI Task Priority
 */
export enum AITaskPriority {

    LOW = "low",

    NORMAL = "normal",

    HIGH = "high",

    CRITICAL = "critical"

}



/**
 * AI Response Modes
 */
export enum AIResponseMode {

    TEXT = "text",

    VOICE = "voice",

    ACTION = "action",

    NOTIFICATION = "notification"

}



/**
 * AI Limits
 */
export const AI_LIMITS = {

    MAX_CONTEXT_SIZE:
        100000,


    MAX_MEMORY_ITEMS:
        10000,


    MAX_TASK_QUEUE:
        500,


    MAX_RESPONSE_HISTORY:
        1000,


    MAX_RETRY_COUNT:
        3

};



/**
 * AI Time Settings
 */
export const AI_TIMEOUTS = {

    REQUEST_TIMEOUT:
        30000,


    TASK_TIMEOUT:
        120000,


    MEMORY_SYNC_INTERVAL:
        60000,


    HEALTH_CHECK_INTERVAL:
        30000

};



/**
 * AI Event Names
 */
export const AI_EVENTS = {

    INITIALIZED:
        "ai.initialized",


    STARTED:
        "ai.started",


    STOPPED:
        "ai.stopped",


    THINKING:
        "ai.thinking",


    RESPONSE_CREATED:
        "ai.response.created",


    ERROR:
        "ai.error",


    TASK_STARTED:
        "ai.task.started",


    TASK_COMPLETED:
        "ai.task.completed"

};



/**
 * Default Messages
 */
export const AI_MESSAGES = {

    INITIALIZING:
        "AI system initializing",


    READY:
        "AI system ready",


    PROCESSING:
        "AI is processing your request",


    PERMISSION_REQUIRED:
        "Permission required for this action",


    ERROR:
        "Something went wrong"

};
