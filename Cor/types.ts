/**
 * Universal AI Operating Companion
 * Core Shared Types
 * Version: 1.0.0
 */

/**
 * Supported Platforms
 */
export enum PlatformType {
    ANDROID = "android",
    WINDOWS = "windows",
    MACOS = "macos",
    LINUX = "linux",
    WEB = "web"
}


/**
 * AI Operating Modes
 */
export enum AIMode {
    ACTIVE = "active",
    LISTENING = "listening",
    THINKING = "thinking",
    EXECUTING = "executing",
    IDLE = "idle",
    PAUSED = "paused",
    ERROR = "error"
}


/**
 * Permission Status
 */
export enum PermissionStatus {
    GRANTED = "granted",
    DENIED = "denied",
    REQUESTED = "requested",
    NOT_AVAILABLE = "not_available"
}


/**
 * Permission Types
 */
export enum PermissionType {
    MICROPHONE = "microphone",
    CAMERA = "camera",
    SCREEN_ACCESS = "screen_access",
    NOTIFICATION = "notification",
    ACCESSIBILITY = "accessibility",
    STORAGE = "storage",
    OVERLAY = "overlay"
}


/**
 * AI Request
 */
export interface AIRequest {
    id: string;
    userInput: string;
    timestamp: number;
    platform: PlatformType;
    context?: AIContext;
}


/**
 * AI Response
 */
export interface AIResponse {
    id: string;
    success: boolean;
    message: string;
    data?: unknown;
    error?: string;
    timestamp: number;
}


/**
 * User Context
 */
export interface AIContext {
    userId?: string;
    sessionId?: string;
    activeApplication?: string;
    screenContext?: ScreenContext;
    memoryContext?: MemoryContext;
}


/**
 * Screen Understanding Data
 */
export interface ScreenContext {
    available: boolean;
    application?: string;
    description?: string;
}


/**
 * Memory Context
 */
export interface MemoryContext {
    shortTerm?: Record<string, unknown>;
    longTerm?: Record<string, unknown>;
}


/**
 * AI Task
 */
export interface AITask {
    id: string;
    name: string;
    description?: string;
    createdAt: number;
    status: TaskStatus;
}


/**
 * Task Status
 */
export enum TaskStatus {
    CREATED = "created",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}


/**
 * Core Module Interface
 */
export interface CoreModule {
    name: string;
    version: string;

    initialize(): Promise<void>;

    start(): Promise<void>;

    stop(): Promise<void>;
}


/**
 * Service Interface
 */
export interface AIService {
    name: string;

    execute(
        input: unknown
    ): Promise<unknown>;
}


/**
 * Event Structure
 */
export interface AIEvent {
    type: string;
    timestamp: number;
    payload?: unknown;
}
