/**
 * AIEngineManager.ts
 *
 * Central controller of Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Manage AI Engine lifecycle
 * - Register and manage AI Engine modules
 * - Initialize and shutdown modules safely
 * - Process AI requests
 * - Maintain engine state
 * - Handle engine events
 * - Provide health/status information
 * - Manage errors
 * - Support graceful restart/shutdown
 *
 * This file is intentionally self-contained.
 * It does not depend on a specific registry/provider implementation.
 */

// ============================================================
// Core Types
// ============================================================

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


export type AIRequestPriority =
    | "LOW"
    | "NORMAL"
    | "HIGH"
    | "CRITICAL";


// ============================================================
// Engine Configuration
// ============================================================

export interface IAIEngineConfig {

    engineId: string;

    version: string;

    environment:
        | "development"
        | "production"
        | "testing";

    mode: AIEngineMode;

    language: string;

    enabledModules: string[];

    securityLevel: string;

    memoryMode: string;

    performanceMode: string;

    metadata?: Record<string, unknown>;
}


// ============================================================
// Engine Status
// ============================================================

export interface IAIEngineStatus {

    state: AIEngineState;

    uptime: number;

    activeModules: string[];

    loadedModels: string[];

    tasksRunning: number;

    memoryUsage?: number;

    errors: string[];

    lastActivity: number;

    timestamp: number;
}


// ============================================================
// AI Request
// ============================================================

export interface IAIEngineRequest {

    id: string;

    input: unknown;

    type: string;

    source?: string;

    context?: Record<string, unknown>;

    priority?: AIRequestPriority;

    permissions?: string[];

    sessionId?: string;

    timestamp: number;

    metadata?: Record<string, unknown>;
}


// ============================================================
// AI Response
// ============================================================

export interface IAIEngineResponse {

    success: boolean;

    result?: unknown;

    intent?: string;

    executionPath?: string[];

    confidence?: number;

    processingTime?: number;

    error?: string;

    metadata?: Record<string, unknown>;
}


// ============================================================
// AI Engine Module
// ============================================================

export interface IAIEngineModule {

    id: string;

    name: string;

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

    getStatus(): unknown;
}


// ============================================================
// Engine Event
// ============================================================

export interface IAIEngineEvent {

    type: string;

    timestamp: number;

    payload?: unknown;
}


// ============================================================
// Event Handler
// ============================================================

export type AIEngineEventHandler =
    (
        event: IAIEngineEvent
    ) => void;


// ============================================================
// Default Configuration
// ============================================================

const DEFAULT_ENGINE_CONFIG: IAIEngineConfig = {

    engineId:
        "universal-ai-operating-companion",

    version:
        "1.0.0",

    environment:
        "production",

    mode:
        "HYBRID",

    language:
        "en",

    enabledModules:
        [],

    securityLevel:
        "STANDARD",

    memoryMode:
        "ENABLED",

    performanceMode:
        "BALANCED",

    metadata:
        {}
};


// ============================================================
// AIEngineManager
// ============================================================

export class AIEngineManager {

    // ========================================================
    // Private State
    // ========================================================

    private config:
        IAIEngineConfig;

    private state:
        AIEngineState;

    private modules:
        Map<string, IAIEngineModule>;

    private startTime:
        number;

    private lastActivity:
        number;

    private errors:
        string[];

    private requestCount:
        number;

    private activeRequests:
        number;

    private listeners:
        Map<
            string,
            Set<AIEngineEventHandler>
        >;

    private initializationPromise:
        Promise<void> | null;

    private shutdownPromise:
        Promise<void> | null;


    // ========================================================
    // Constructor
    // ========================================================

    constructor(
        config?: Partial<IAIEngineConfig>
    ) {

        this.config = {

            ...DEFAULT_ENGINE_CONFIG,

            ...config,

            enabledModules:
                config?.enabledModules
                    ? [
                        ...config.enabledModules
                    ]
                    : [
                        ...DEFAULT_ENGINE_CONFIG.enabledModules
                    ],

            metadata:
                config?.metadata
                    ? {
                        ...config.metadata
                    }
                    : {
                        ...(DEFAULT_ENGINE_CONFIG.metadata ?? {})
                    }
        };


        this.state =
            "CREATED";


        this.modules =
            new Map<
                string,
                IAIEngineModule
            >();


        this.startTime =
            Date.now();


        this.lastActivity =
            Date.now();


        this.errors =
            [];


        this.requestCount =
            0;


        this.activeRequests =
            0;


        this.listeners =
            new Map<
                string,
                Set<AIEngineEventHandler>
            >();


        this.initializationPromise =
            null;


        this.shutdownPromise =
            null;
    }


    // ========================================================
    // Basic Information
    // ========================================================

    public getState():
        AIEngineState {

        return this.state;
    }


    public getConfig():
        IAIEngineConfig {

        return {

            ...this.config,

            enabledModules:
                [
                    ...this.config.enabledModules
                ],

            metadata:
                {
                    ...(this.config.metadata ?? {})
                }
        };
    }


    public getModules():
        string[] {

        return Array.from(
            this.modules.keys()
        );
    }


    public getErrors():
        string[] {

        return [
            ...this.errors
        ];
    }


    public getRequestCount():
        number {

        return this.requestCount;
    }


    public getActiveRequestCount():
        number {

        return this.activeRequests;
    }


    // ========================================================
    // Configuration Updates
    // ========================================================

    public updateConfig(
        config: Partial<IAIEngineConfig>
    ):
        void {

        if (!config) {
            return;
        }

        this.config = {

            ...this.config,

            ...config,

            enabledModules:
                config.enabledModules
                    ? [
                        ...config.enabledModules
                    ]
                    : [
                        ...this.config.enabledModules
                    ],

            metadata:
                config.metadata
                    ? {
                        ...(
                            this.config.metadata ?? {}
                        ),
                        ...config.metadata
                    }
                    : {
                        ...(this.config.metadata ?? {})
                    }
        };


        this.updateActivity();


        this.emit({

            type:
                "ENGINE.CONFIG_UPDATED",

            timestamp:
                Date.now(),

            payload:
                this.getConfig()
        });
    }


    // ========================================================
    // Internal State
    // ========================================================

    private setState(
        state: AIEngineState
    ):
        void {

        this.state =
            state;


        this.updateActivity();


        this.emit({

            type:
                "ENGINE.STATE_CHANGED",

            timestamp:
                Date.now(),

            payload:
                state
        });
    }


    private addError(
        error: string
    ):
        void {

        const normalized =
            error.trim();


        if (!normalized) {
            return;
        }


        this.errors.push(
            normalized
        );


        this.updateActivity();


        this.emit({

            type:
                "ENGINE.ERROR",

            timestamp:
                Date.now(),

            payload:
                normalized
        });
    }


    private updateActivity():
        void {

        this.lastActivity =
            Date.now();
    }


    private normalizeError(
        error: unknown,
        fallback: string
    ):
        string {

        if (error instanceof Error) {

            return error.message ||
                fallback;
        }


        if (
            typeof error === "string" &&
            error.trim()
        ) {

            return error.trim();
        }


        return fallback;
    }


    // ========================================================
    // Module Validation
    // ========================================================

    private validateModule(
        module: IAIEngineModule
    ):
        void {

        if (!module) {

            throw new Error(
                "Module is missing"
            );
        }


        if (
            typeof module.id !== "string" ||
            !module.id.trim()
        ) {

            throw new Error(
                "Module id is missing"
            );
        }


        if (
            typeof module.name !== "string" ||
            !module.name.trim()
        ) {

            throw new Error(
                `Module name is missing: ${module.id}`
            );
        }


        if (
            typeof module.initialize !==
            "function"
        ) {

            throw new Error(
                `Module ${module.id} has no initialize method`
            );
        }


        if (
            typeof module.shutdown !==
            "function"
        ) {

            throw new Error(
                `Module ${module.id} has no shutdown method`
            );
        }


        if (
            typeof module.getStatus !==
            "function"
        ) {

            throw new Error(
                `Module ${module.id} has no getStatus method`
            );
        }
    }


    // ========================================================
    // Module Management
    // ========================================================

    public registerModule(
        module: IAIEngineModule
    ):
        boolean {

        try {

            this.validateModule(
                module
            );


            if (
                this.modules.has(
                    module.id
                )
            ) {

                this.addError(
                    `Module already registered: ${module.id}`
                );

                return false;
            }


            this.modules.set(
                module.id,
                module
            );


            this.updateActivity();


            this.emit({

                type:
                    "MODULE.REGISTERED",

                timestamp:
                    Date.now(),

                payload:
                    module.id
            });


            return true;

        } catch (error) {

            this.addError(
                this.normalizeError(
                    error,
                    "Module registration failed"
                )
            );

            return false;
        }
    }


    public unregisterModule(
        moduleId: string
    ):
        boolean {

        if (
            typeof moduleId !== "string" ||
            !moduleId.trim()
        ) {

            return false;
        }


        const removed =
            this.modules.delete(
                moduleId
            );


        if (removed) {

            this.updateActivity();


            this.emit({

                type:
                    "MODULE.REMOVED",

                timestamp:
                    Date.now(),

                payload:
                    moduleId
            });
        }


        return removed;
    }


    public getModule(
        moduleId: string
    ):
        IAIEngineModule | undefined {

        return this.modules.get(
            moduleId
        );
    }


    public hasModule(
        moduleId: string
    ):
        boolean {

        return this.modules.has(
            moduleId
        );
    }


    public clearModules():
        void {

        this.modules.clear();


        this.updateActivity();


        this.emit({

            type:
                "MODULES.CLEARED",

            timestamp:
                Date.now()
        });
    }


    public getModuleCount():
        number {

        return this.modules.size;
    }


    // ========================================================
    // Enabled Module Management
    // ========================================================

    public getEnabledModules():
        string[] {

        return [
            ...this.config.enabledModules
        ];
    }


    public enableModule(
        moduleId: string
    ):
        boolean {

        if (
            !this.modules.has(
                moduleId
            )
        ) {

            this.addError(
                `Cannot enable unknown module: ${moduleId}`
            );

            return false;
        }


        if (
            !this.config.enabledModules.includes(
                moduleId
            )
        ) {

            this.config.enabledModules.push(
                moduleId
            );
        }


        this.updateActivity();


        this.emit({

            type:
                "MODULE.ENABLED",

            timestamp:
                Date.now(),

            payload:
                moduleId
        });


        return true;
    }


    public disableModule(
        moduleId: string
    ):
        boolean {

        const index =
            this.config.enabledModules.indexOf(
                moduleId
            );


        if (index < 0) {
            return false;
        }


        this.config.enabledModules.splice(
            index,
            1
        );


        this.updateActivity();


        this.emit({

            type:
                "MODULE.DISABLED",

            timestamp:
                Date.now(),

            payload:
                moduleId
        });


        return true;
    }


    // ========================================================
    // Engine Lifecycle
    // ========================================================

    public async initialize():
        Promise<void> {

        if (
            this.state === "SHUTDOWN"
        ) {

            throw new Error(
                "Engine has been shut down"
            );
        }


        if (
            this.state === "READY" ||
            this.state === "RUNNING" ||
            this.state === "PAUSED"
        ) {

            return;
        }


        if (
            this.state === "INITIALIZING" &&
            this.initializationPromise
        ) {

            return this.initializationPromise;
        }


        this.initializationPromise =
            this.initializeInternal();


        try {

            await this.initializationPromise;

        } finally {

            this.initializationPromise =
                null;
        }
    }


    private async initializeInternal():
        Promise<void> {

        try {

            this.setState(
                "INITIALIZING"
            );


            const modules =
                this.getModulesForInitialization();


            for (
                const module
                of modules
            ) {

                try {

                    await module.initialize();


                    this.emit({

                        type:
                            "MODULE.INITIALIZED",

                        timestamp:
                            Date.now(),

                        payload:
                            module.id
                    });

                } catch (error) {

                    const message =
                        this.normalizeError(
                            error,
                            "Module initialization failed"
                        );


                    throw new Error(
                        `${module.id}: ${message}`
                    );
                }
            }


            this.setState(
                "READY"
            );


            this.emit({

                type:
                    "ENGINE.READY",

                timestamp:
                    Date.now()
            });

        } catch (error) {

            const message =
                this.normalizeError(
                    error,
                    "Engine initialization failed"
                );


            this.setState(
                "ERROR"
            );


            this.addError(
                message
            );


            throw new Error(
                message
            );
        }
    }


    private getModulesForInitialization():
        IAIEngineModule[] {

        const enabled =
            this.config.enabledModules;


        if (
            enabled.length === 0
        ) {

            return Array.from(
                this.modules.values()
            );
        }


        const result:
            IAIEngineModule[] = [];


        for (
            const moduleId
            of enabled
        ) {

            const module =
                this.modules.get(
                    moduleId
                );


            if (!module) {

                this.addError(
                    `Enabled module not registered: ${moduleId}`
                );

                continue;
            }


            result.push(
                module
            );
        }


        return result;
    }


    // ========================================================
    // Start
    // ========================================================

    public async start():
        Promise<void> {

        if (
            this.state === "SHUTDOWN"
        ) {

            throw new Error(
                "Engine has been shut down"
            );
        }


        if (
            this.state === "RUNNING"
        ) {

            return;
        }


        if (
            this.state === "CREATED" ||
            this.state === "STOPPED" ||
            this.state === "ERROR"
        ) {

            await this.initialize();
        }


        if (
            this.state !== "READY" &&
            this.state !== "PAUSED"
        ) {

            throw new Error(
                `Engine cannot start from state: ${this.state}`
            );
        }


        this.startTime =
            Date.now();


        this.updateActivity();


        this.setState(
            "RUNNING"
        );


        this.emit({

            type:
                "ENGINE.STARTED",

            timestamp:
                Date.now()
        });
    }


    // ========================================================
    // Pause
    // ========================================================

    public async pause():
        Promise<void> {

        if (
            this.state !== "RUNNING"
        ) {

            throw new Error(
                "Engine is not running"
            );
        }


        this.setState(
            "PAUSED"
        );


        this.emit({

            type:
                "ENGINE.PAUSED",

            timestamp:
                Date.now()
        });
    }


    // ========================================================
    // Resume
    // ========================================================

    public async resume():
        Promise<void> {

        if (
            this.state !== "PAUSED"
        ) {

            throw new Error(
                "Engine is not paused"
            );
        }


        this.setState(
            "RUNNING"
        );


        this.emit({

            type:
                "ENGINE.RESUMED",

            timestamp:
                Date.now()
        });
    }


    // ========================================================
    // Stop
    // ========================================================

    public async stop():
        Promise<void> {

        if (
            this.state === "SHUTDOWN"
        ) {

            return;
        }


        if (
            this.state === "STOPPED"
        ) {

            return;
        }


        this.setState(
            "STOPPED"
        );


        this.emit({

            type:
                "ENGINE.STOPPED",

            timestamp:
                Date.now()
        });
    }


    // ========================================================
    // Shutdown
    // ========================================================

    public async shutdown():
        Promise<void> {

        if (
            this.state === "SHUTDOWN"
        ) {

            return;
        }


        if (
            this.shutdownPromise
        ) {

            return this.shutdownPromise;
        }


        this.shutdownPromise =
            this.shutdownInternal();


        try {

            await this.shutdownPromise;

        } finally {

            this.shutdownPromise =
                null;
        }
    }


    private async shutdownInternal():
        Promise<void> {

        const previousState =
            this.state;


        try {

            if (
                previousState !==
                "STOPPED"
            ) {

                this.setState(
                    "STOPPED"
                );
            }


            const modules =
                Array.from(
                    this.modules.values()
                ).reverse();


            const shutdownErrors:
                string[] = [];


            for (
                const module
                of modules
            ) {

                try {

                    await module.shutdown();


                    this.emit({

                        type:
                            "MODULE.SHUTDOWN",

                        timestamp:
                            Date.now(),

                        payload:
                            module.id
                    });

                } catch (error) {

                    const message =
                        this.normalizeError(
                            error,
                            "Module shutdown failed"
                        );


                    shutdownErrors.push(
                        `${module.id}: ${message}`
                    );
                }
            }


            for (
                const error
                of shutdownErrors
            ) {

                this.addError(
                    error
                );
            }


            this.setState(
                "SHUTDOWN"
            );


            this.emit({

                type:
                    "ENGINE.SHUTDOWN",

                timestamp:
                    Date.now(),

                payload:
                    {
                        shutdownErrors
                    }
            });

        } catch (error) {

            const message =
                this.normalizeError(
                    error,
                    "Engine shutdown failed"
                );


            this.addError(
                message
            );


            this.setState(
                "SHUTDOWN"
            );


            throw new Error(
                message
            );
        }
    }


    // ========================================================
    // Restart
    // ========================================================

    public async restart():
        Promise<void> {

        if (
            this.state === "SHUTDOWN"
        ) {

            throw new Error(
                "Cannot restart a shut down engine"
            );
        }


        if (
            this.state === "RUNNING" ||
            this.state === "PAUSED" ||
            this.state === "READY"
        ) {

            await this.stop();
        }


        await this.initialize();


        await this.start();
    }


    // ========================================================
    // Request Validation
    // ========================================================

    private validateRequest(
        request: IAIEngineRequest
    ):
        void {

        if (!request) {

            throw new Error(
                "Request is missing"
            );
        }


        if (
            typeof request.id !== "string" ||
            !request.id.trim()
        ) {

            throw new Error(
                "Request id is missing"
            );
        }


        if (
            typeof request.type !== "string" ||
            !request.type.trim()
        ) {

            throw new Error(
                "Request type is missing"
            );
        }


        if (
            typeof request.timestamp !== "number" ||
            !Number.isFinite(
                request.timestamp
            )
        ) {

            throw new Error(
                "Request timestamp is invalid"
            );
        }
    }


    // ========================================================
    // Request Processing
    // ========================================================

    public async process(
        request: IAIEngineRequest
    ):
        Promise<IAIEngineResponse> {

        const processingStart =
            Date.now();


        try {

            if (
                this.state !== "RUNNING"
            ) {

                throw new Error(
                    "AI Engine is not running"
                );
            }


            this.validateRequest(
                request
            );


            this.requestCount++;
            this.activeRequests++;


            this.updateActivity();


            this.emit({

                type:
                    "ENGINE.REQUEST_RECEIVED",

                timestamp:
                    Date.now(),

                payload:
                    request
            });


            /*
             * This manager is intentionally responsible for
             * orchestration, not provider-specific generation.
             *
             * Provider/AI routing modules should consume the
             * request and return the actual AI result.
             *
             * The default fallback below keeps the manager
             * functional even when no routing module has been
             * attached yet.
             */

            const response:
                IAIEngineResponse = {

                success:
                    true,

                result: {

                    message:
                        "Request processed by AIEngineManager",

                    requestId:
                        request.id,

                    type:
                        request.type,

                    input:
                        request.input
                },

                executionPath: [

                    "AIEngineManager"

                ],

                confidence:
                    1,

                processingTime:
                    Date.now() -
                    processingStart,

                metadata: {

                    engineId:
                        this.config.engineId,

                    engineVersion:
                        this.config.version,

                    mode:
                        this.config.mode
                }
            };


            this.emit({

                type:
                    "ENGINE.RESPONSE_CREATED",

                timestamp:
                    Date.now(),

                payload:
                    response
            });


            return response;

        } catch (error) {

            const message =
                this.normalizeError(
                    error,
                    "Request processing failed"
                );


            this.addError(
                message
            );


            const response:
                IAIEngineResponse = {

                success:
                    false,

                error:
                    message,

                executionPath: [

                    "AIEngineManager"

                ],

                processingTime:
                    Date.now() -
                    processingStart,

                metadata: {

                    engineId:
                        this.config.engineId,

                    engineVersion:
                        this.config.version
                }
            };


            this.emit({

                type:
                    "ENGINE.REQUEST_FAILED",

                timestamp:
                    Date.now(),

                payload:
                    response
            });


            return response;

        } finally {

            if (
                this.activeRequests > 0
            ) {

                this.activeRequests--;
            }


            this.updateActivity();
        }
    }


    // ========================================================
    // Request Alias
    // ========================================================

    public async processRequest(
        request: IAIEngineRequest
    ):
        Promise<IAIEngineResponse> {

        return this.process(
            request
        );
    }


    // ========================================================
    // Engine Status
    // ========================================================

    public getStatus():
        IAIEngineStatus {

        const uptime =
            this.state === "CREATED"
                ? 0
                : Date.now() -
                  this.startTime;


        return {

            state:
                this.state,

            uptime:
                Math.max(
                    0,
                    uptime
                ),

            activeModules:
                this.getModules(),

            loadedModels:
                [],

            tasksRunning:
                this.activeRequests,

            errors:
                [
                    ...this.errors
                ],

            lastActivity:
                this.lastActivity,

            timestamp:
                Date.now()
        };
    }


    // ========================================================
    // Module Status
    // ========================================================

    public getModuleStatuses():
        Record<string, unknown> {

        const statuses:
            Record<string, unknown> = {};


        for (
            const [
                id,
                module
            ]
            of this.modules
        ) {

            try {

                statuses[id] =
                    module.getStatus();

            } catch (error) {

                statuses[id] = {

                    error:
                        this.normalizeError(
                            error,
                            "Unable to read module status"
                        )
                };
            }
        }


        return statuses;
    }


    // ========================================================
    // Health Check
    // ========================================================

    public healthCheck():
        boolean {

        if (
            this.state === "ERROR" ||
            this.state === "STOPPED" ||
            this.state === "SHUTDOWN"
        ) {

            return false;
        }


        if (
            this.state !== "READY" &&
            this.state !== "RUNNING" &&
            this.state !== "PAUSED"
        ) {

            return false;
        }


        return true;
    }


    // ========================================================
    // Detailed Health
    // ========================================================

    public getHealth():
        {
            healthy: boolean;
            state: AIEngineState;
            moduleCount: number;
            activeRequests: number;
            errors: string[];
            timestamp: number;
        } {

        return {

            healthy:
                this.healthCheck(),

            state:
                this.state,

            moduleCount:
                this.modules.size,

            activeRequests:
                this.activeRequests,

            errors:
                [
                    ...this.errors
                ],

            timestamp:
                Date.now()
        };
    }


    // ========================================================
    // Error Management
    // ========================================================

    public clearErrors():
        void {

        this.errors.length =
            0;


        this.updateActivity();


        this.emit({

            type:
                "ENGINE.ERRORS_CLEARED",

            timestamp:
                Date.now()
        });
    }


    public hasErrors():
        boolean {

        return this.errors.length > 0;
    }


    // ========================================================
    // Event System
    // ========================================================

    public on(
        eventType: string,
        callback: AIEngineEventHandler
    ):
        void {

        if (
            typeof eventType !== "string" ||
            !eventType.trim()
        ) {

            throw new Error(
                "Event type is required"
            );
        }


        if (
            typeof callback !== "function"
        ) {

            throw new Error(
                "Event callback must be a function"
            );
        }


        let handlers =
            this.listeners.get(
                eventType
            );


        if (!handlers) {

            handlers =
                new Set<
                    AIEngineEventHandler
                >();


            this.listeners.set(
                eventType,
                handlers
            );
        }


        handlers.add(
            callback
        );
    }


    public off(
        eventType: string,
        callback: AIEngineEventHandler
    ):
        void {

        const handlers =
            this.listeners.get(
                eventType
            );


        if (!handlers) {
            return;
        }


        handlers.delete(
            callback
        );


        if (
            handlers.size === 0
        ) {

            this.listeners.delete(
                eventType
            );
        }
    }


    public once(
        eventType: string,
        callback: AIEngineEventHandler
    ):
        () => void {

        const wrapper:
            AIEngineEventHandler =
            event => {

                this.off(
                    eventType,
                    wrapper
                );


                callback(
                    event
                );
            };


        this.on(
            eventType,
            wrapper
        );


        return () => {

            this.off(
                eventType,
                wrapper
            );
        };
    }


    private emit(
        event: IAIEngineEvent
    ):
        void {

        const handlers =
            this.listeners.get(
                event.type
            );


        if (!handlers) {
            return;
        }


        const listeners =
            Array.from(
                handlers
            );


        for (
            const handler
            of listeners
        ) {

            try {

                handler(
                    event
                );

            } catch (error) {

                const message =
                    this.normalizeError(
                        error,
                        "Engine event handler failed"
                    );


                this.errors.push(
                    message
                );
            }
        }
    }


    // ========================================================
    // Event Cleanup
    // ========================================================

    public removeAllListeners(
        eventType?: string
    ):
        void {

        if (
            typeof eventType === "string" &&
            eventType.trim()
        ) {

            this.listeners.delete(
                eventType
            );

            return;
        }


        this.listeners.clear();
    }


    // ========================================================
    // Registry-Friendly Information
    // ========================================================

    public getEngineInfo():
        Record<string, unknown> {

        return {

            engineId:
                this.config.engineId,

            version:
                this.config.version,

            environment:
                this.config.environment,

            mode:
                this.config.mode,

            language:
                this.config.language,

            state:
                this.state,

            moduleCount:
                this.modules.size,

            requestCount:
                this.requestCount,

            activeRequests:
                this.activeRequests,

            healthy:
                this.healthCheck(),

            createdAt:
                this.startTime,

            lastActivity:
                this.lastActivity
        };
    }


    // ========================================================
    // Reset
    // ========================================================

    public reset():
        void {

        if (
            this.state === "SHUTDOWN"
        ) {

            throw new Error(
                "Cannot reset a shut down engine"
            );
        }


        this.errors.length =
            0;


        this.requestCount =
            0;


        this.activeRequests =
            0;


        this.startTime =
            Date.now();


        this.lastActivity =
            Date.now();


        this.setState(
            "CREATED"
        );


        this.emit({

            type:
                "ENGINE.RESET",

            timestamp:
                Date.now()
        });
    }
}


// ============================================================
// Default Export
// ============================================================

export default AIEngineManager;
