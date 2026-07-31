/**
 * Universal AI Operating Companion
 * Core Error System
 * Version: 1.0.0
 */


/**
 * Error Codes
 */
export enum AIErrorCode {

    UNKNOWN_ERROR = "UNKNOWN_ERROR",

    INITIALIZATION_FAILED = "INITIALIZATION_FAILED",

    CONFIGURATION_ERROR = "CONFIGURATION_ERROR",

    PERMISSION_DENIED = "PERMISSION_DENIED",

    SERVICE_NOT_AVAILABLE = "SERVICE_NOT_AVAILABLE",

    MODULE_NOT_READY = "MODULE_NOT_READY",

    INVALID_REQUEST = "INVALID_REQUEST",

    INVALID_RESPONSE = "INVALID_RESPONSE",

    MEMORY_ERROR = "MEMORY_ERROR",

    SECURITY_ERROR = "SECURITY_ERROR",

    AUTOMATION_FAILED = "AUTOMATION_FAILED",

    PLUGIN_ERROR = "PLUGIN_ERROR",

    NETWORK_ERROR = "NETWORK_ERROR"
}


/**
 * Base AI Error
 */
export class AIError extends Error {

    public readonly code: AIErrorCode;

    public readonly details?: unknown;

    public readonly timestamp: number;


    constructor(
        code: AIErrorCode,
        message: string,
        details?: unknown
    ) {

        super(message);

        this.name = "AIError";

        this.code = code;

        this.details = details;

        this.timestamp = Date.now();


        Object.setPrototypeOf(
            this,
            AIError.prototype
        );
    }
}


/**
 * Initialization Error
 */
export class InitializationError extends AIError {

    constructor(
        message: string,
        details?: unknown
    ) {

        super(
            AIErrorCode.INITIALIZATION_FAILED,
            message,
            details
        );

        this.name = "InitializationError";
    }
}


/**
 * Permission Error
 */
export class PermissionError extends AIError {

    constructor(
        message: string,
        details?: unknown
    ) {

        super(
            AIErrorCode.PERMISSION_DENIED,
            message,
            details
        );

        this.name = "PermissionError";
    }
}


/**
 * Security Error
 */
export class SecurityError extends AIError {

    constructor(
        message: string,
        details?: unknown
    ) {

        super(
            AIErrorCode.SECURITY_ERROR,
            message,
            details
        );

        this.name = "SecurityError";
    }
}


/**
 * Helper Function
 */
export function isAIError(
    error: unknown
): error is AIError {

    return error instanceof AIError;
}


/**
 * Error Formatter
 */
export function formatAIError(
    error: unknown
): string {

    if (isAIError(error)) {

        return `[${error.code}] ${error.message}`;

    }


    if (error instanceof Error) {

        return error.message;

    }


    return "Unknown error occurred";
}
