/**
 * AIEngineTypes.ts
 *
 * Shared types for Universal AI Operating Companion.
 *
 * These types are shared across all AI Engine modules.
 */

// ==============================
// Engine
// ==============================

export type AIEngineState =
    | "CREATED"
    | "INITIALIZING"
    | "READY"
    | "RUNNING"
    | "PAUSED"
    | "ERROR"
    | "STOPPED"
    | "SHUTDOWN";

export type AIEngineMode =
    | "ONLINE"
    | "OFFLINE"
    | "HYBRID";

// ==============================
// Requests
// ==============================

export type AIRequestPriority =
    | "LOW"
    | "NORMAL"
    | "HIGH"
    | "CRITICAL";

// ==============================
// Common Metadata
// ==============================

export interface IBaseMetadata {
    createdAt: number;
    updatedAt?: number;
    tags?: string[];
    metadata?: Record<string, unknown>;
}

// ==============================
// Common Result
// ==============================

export interface IOperationResult {
    success: boolean;
    message?: string;
    error?: string;
}
// ==============================
// Shared AI Request
// ==============================

export interface IAIRequest {

    id: string;

    type: string;

    input: unknown;

    priority: AIRequestPriority;

    source?: string;

    sessionId?: string;

    permissions?: string[];

    context?: Record<string, unknown>;

    timestamp: number;
}



// ==============================
// Shared AI Response
// ==============================

export interface IAIResponse {

    success: boolean;

    result?: unknown;

    error?: string;

    confidence?: number;

    processingTime?: number;

    executionPath?: string[];

    metadata?: Record<string, unknown>;
}



// ==============================
// Engine Configuration
// ==============================

export interface IAIEngineConfiguration {

    engineId: string;

    version: string;

    mode: AIEngineMode;

    language: string;

    environment:
        | "development"
        | "production"
        | "testing";

    enabledModules: string[];

    debugMode: boolean;
}



// ==============================
// Engine Status
// ==============================

export interface IAIEngineStatus {

    state: AIEngineState;

    uptime: number;

    activeModules: string[];

    requestCount: number;

    lastActivity: number;

    errors: string[];

    timestamp: number;
}
// ==============================
// AI Module
// ==============================

export interface IAIEngineModule {

    id: string;

    name: string;

    version: string;

    enabled: boolean;

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

    getStatus(): unknown;
}



// ==============================
// Plugin
// ==============================

export interface IAIPlugin {

    id: string;

    name: string;

    version: string;

    author?: string;

    enabled: boolean;

    capabilities: string[];

    initialize(): Promise<void>;

    shutdown(): Promise<void>;
}



// ==============================
// Event
// ==============================

export interface IAIEvent {

    type: string;

    source?: string;

    payload?: unknown;

    timestamp: number;
}



// ==============================
// Capability
// ==============================

export interface IAICapability {

    id: string;

    name: string;

    description?: string;

    category: string;

    enabled: boolean;
}



// ==============================
// Health Report
// ==============================

export interface IAIHealthReport {

    healthy: boolean;

    uptime: number;

    memoryUsage?: number;

    activeModules: number;

    activeTasks: number;

    lastCheck: number;
}
// ==============================
// Registry
// ==============================

export interface IRegistryRecord {

    id: string;

    name: string;

    type: "MODULE" | "SERVICE" | "BRIDGE" | "PLUGIN";

    version: string;

    status: "ACTIVE" | "INACTIVE" | "FAILED";

    capabilities: string[];
}



// ==============================
// Coordinator
// ==============================

export interface ITaskExecution {

    taskId: string;

    status:
        | "QUEUED"
        | "RUNNING"
        | "COMPLETED"
        | "FAILED";

    assignedModules: string[];

    startedAt: number;

    completedAt?: number;
}



// ==============================
// Initializer
// ==============================

export interface IInitializationSummary {

    success: boolean;

    initializedModules: string[];

    connectedBridges: string[];

    startupTime: number;

    warnings: string[];

    errors: string[];
}



// ==============================
// Logger
// ==============================

export interface IAILogEntry {

    level:
        | "DEBUG"
        | "INFO"
        | "WARN"
        | "ERROR";

    message: string;

    source: string;

    timestamp: number;

    metadata?: Record<string, unknown>;
}



// ==============================
// Utility Types
// ==============================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Dictionary<T> = Record<string, T>;
