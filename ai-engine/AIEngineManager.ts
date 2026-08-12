/**
 * AIEngineManager.ts
 *
 * Central controller of Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Manage AI Engine lifecycle
 * - Coordinate modules
 * - Handle AI requests
 * - Maintain engine state
 * - Connect AI ecosystem
 * - Provide engine events
 * - Provide health and status information
 */

// ==============================
// Core Types
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

export type AIRequestPriority =
    | "LOW"
    | "NORMAL"
    | "HIGH"
    | "CRITICAL";


// ==============================
// Interfaces
// ==============================

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


export interface IAIEngineModule {

    id: string;

    name: string;

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

    getStatus(): unknown;
}


export interface IAIEngineEvent {

    type: string;

    timestamp: number;

    payload?: unknown;
}


// ==============================
// Event Handler
// ==============================

export type AIEngineEventHandler =
    (event: IAIEngineEvent) => void;


// ==============================
// AIEngineManager
// ==============================

export class AIEngineManager {

    private config: IAIEngineConfig;

    private state: AIEngineState;

    private modules:
        Map<string, IAIEngineModule>;

    private startTime: number;

    private createdAt: number;

    private errors: string[];

    private requestCount: number;

    private runningTasks: number;

    private lastActivity: number;

    private listeners:
        Map<string, AIEngineEventHandler[]>;


    // ==============================
    // Constructor
    // ==============================

    constructor(
        config?:
        Partial<IAIEngineConfig>
    ) {

        this.config = {

            engineId:
                "universal-ai-engine",

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

            ...config

        };


        this.state =
            "CREATED";


        this.modules =
            new Map<
                string,
                IAIEngineModule
            >();


        this.createdAt =
            Date.now();


        this.startTime =
            this.createdAt;


        this.errors =
            [];


        this.requestCount =
            0;


        this.runningTasks =
            0;


        this.lastActivity =
            this.createdAt;


        this.listeners =
            new Map<
                string,
                AIEngineEventHandler[]
            >();
    }


    // ==============================
    // Basic Information
    // ==============================

    public getState():
        AIEngineState {

        return this.state;
    }


    public getConfig():
        IAIEngineConfig {

        return {

            ...this.config,

            enabledModules: [
                ...this.config.enabledModules
            ],

            metadata:
                this.config.metadata
                    ? {
                        ...this.config.metadata
                    }
                    : undefined

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


    public getRunningTaskCount():
        number {

        return this.runningTasks;
    }


    // ==============================
    // Internal State
    // ==============================

    private touchActivity():
        void {

        this.lastActivity =
            Date.now();
    }


    private setState(
        state:
        AIEngineState
    ):
        void {

        this.state =
            state;

        this.touchActivity();

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
        error:
        string
    ):
        void {

        this.errors.push(
            error
        );

        this.touchActivity();

        this.emit({

            type:
                "ENGINE.ERROR",

            timestamp:
                Date.now(),

            payload:
                error

        });
    }


    // ==============================
    // Module Management
    // ==============================

    public registerModule(
        module:
        IAIEngineModule
    ):
        boolean {

        try {

            if (!module) {

                throw new Error(
                    "Module is required"
                );
            }


            if (!module.id) {

                throw new Error(
                    "Module id missing"
                );
            }


            if (!module.name) {

                throw new Error(
                    "Module name missing"
                );
            }


            if (
                this.modules.has(
                    module.id
                )
            ) {

                throw new Error(
                    `Module already registered: ${module.id}`
                );
            }


            this.modules.set(
                module.id,
                module
            );


            this.touchActivity();


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

                error instanceof Error
                    ? error.message
                    : "Module registration failed"

            );

            return false;
        }
    }


    public unregisterModule(
        moduleId:
        string
    ):
        boolean {

        if (!moduleId) {

            return false;
        }


        const removed =
            this.modules.delete(
                moduleId
            );


        if (removed) {

            this.touchActivity();


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
        moduleId:
        string
    ):
        IAIEngineModule | undefined {

        return this.modules.get(
            moduleId
        );
    }


    public hasModule(
        moduleId:
        string
    ):
        boolean {

        return this.modules.has(
            moduleId
        );
    }


    // ==============================
    // Engine Lifecycle
    // ==============================

    public async initialize():
        Promise<void> {

        if (
            this.state ===
            "SHUTDOWN"
        ) {

            throw new Error(
                "Engine has been shut down"
            );
        }


        if (
            this.state ===
            "RUNNING"
        ) {

            return;
        }


        try {

            this.setState(
                "INITIALIZING"
            );


            this.emit({

                type:
                    "ENGINE.INITIALIZATION_STARTED",

                timestamp:
                    Date.now()

            });


            for (
                const module
                of this.modules.values()
            ) {

                try {

                    await module.initialize();

                } catch (error) {

                    const message =
                        error instanceof Error
                            ? error.message
                            : `Failed to initialize module: ${module.id}`;

                    throw new Error(
                        message
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

            this.setState(
                "ERROR"
            );


            this.addError(

                error instanceof Error
                    ? error.message
                    : "Initialization failed"

            );


            throw error;
        }
    }


    public async start():
        Promise<void> {

        if (
            this.state !==
                "READY"
            &&
            this.state !==
                "PAUSED"
        ) {

            throw new Error(
                `Engine cannot start from state: ${this.state}`
            );
        }


        this.startTime =
            Date.now();


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


    public async pause():
        Promise<void> {

        if (
            this.state !==
            "RUNNING"
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


    public async resume():
        Promise<void> {

        if (
            this.state !==
            "PAUSED"
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


    public async stop():
        Promise<void> {

        if (
            this.state ===
            "SHUTDOWN"
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


    public async restart():
        Promise<void> {

        if (
            this.state ===
            "SHUTDOWN"
        ) {

            throw new Error(
                "Cannot restart a shut down engine"
            );
        }


        if (
            this.state !==
            "STOPPED"
            &&
            this.state !==
            "ERROR"
        ) {

            await this.stop();
        }


        await this.initialize();

        await this.start();
    }


    // ==============================
    // Request Processing
    // ==============================

    public async process(
        request:
        IAIEngineRequest
    ):
        Promise<IAIEngineResponse> {

        const processingStart =
            Date.now();


        if (!request) {

            return {

                success:
                    false,

                error:
                    "Request is required",

                processingTime:
                    Date.now()
                    -
                    processingStart

            };
        }


        if (!request.id) {

            return {

                success:
                    false,

                error:
                    "Request id is required",

                processingTime:
                    Date.now()
                    -
                    processingStart

            };
        }


        if (
            this.state !==
            "RUNNING"
        ) {

            return {

                success:
                    false,

                error:
                    "AI Engine is not running",

                processingTime:
                    Date.now()
                    -
                    processingStart

            };
        }


        this.requestCount++;

        this.runningTasks++;

        this.touchActivity();


        this.emit({

            type:
                "ENGINE.REQUEST_RECEIVED",

            timestamp:
                Date.now(),

            payload:
                request

        });


        try {

            /*
             * Current orchestration layer.
             *
             * Module-specific AI execution will be
             * connected here by the AI Engine routing layer.
             */

            const response:
                IAIEngineResponse = {

                success:
                    true,

                result: {

                    message:
                        "Request processed",

                    requestId:
                        request.id,

                    input:
                        request.input

                },

                intent:
                    request.type,

                executionPath: [

                    "AIEngineManager"

                ],

                confidence:
                    1,

                processingTime:
                    Date.now()
                    -
                    processingStart

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
                error instanceof Error
                    ? error.message
                    : "Processing failed";


            this.addError(
                message
            );


            const response:
                IAIEngineResponse = {

                success:
                    false,

                error:
                    message,

                processingTime:
                    Date.now()
                    -
                    processingStart

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

            this.runningTasks =
                Math.max(
                    0,
                    this.runningTasks - 1
                );


            this.touchActivity();
        }
    }


    // ==============================
    // Engine Status
    // ==============================

    public getStatus():
        IAIEngineStatus {

        return {

            state:
                this.state,

            uptime:
                Date.now()
                -
                this.startTime,

            activeModules:
                this.getModules(),

            loadedModels:
                [],

            tasksRunning:
                this.runningTasks,

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


    // ==============================
    // Health Check
    // ==============================

    public healthCheck():
        boolean {

        if (
            this.state !==
                "READY"
            &&
            this.state !==
                "RUNNING"
            &&
            this.state !==
                "PAUSED"
        ) {

            return false;
        }


        for (
            const module
            of this.modules.values()
        ) {

            try {

                module.getStatus();

            } catch {

                return false;
            }
        }


        return true;
    }


    // ==============================
    // Event System
    // ==============================

    public on(
        eventType:
        string,

        callback:
        AIEngineEventHandler
    ):
        void {

        if (
            !eventType
            ||
            typeof callback !==
                "function"
        ) {

            return;
        }


        const handlers =
            this.listeners.get(
                eventType
            )
            ??
            [];


        handlers.push(
            callback
        );


        this.listeners.set(
            eventType,
            handlers
        );
    }


    public off(
        eventType:
        string,

        callback:
        AIEngineEventHandler
    ):
        void {

        const handlers =
            this.listeners.get(
                eventType
            );


        if (!handlers) {

            return;
        }


        const remaining =
            handlers.filter(
                handler =>
                    handler !== callback
            );


        if (
            remaining.length ===
            0
        ) {

            this.listeners.delete(
                eventType
            );

            return;
        }


        this.listeners.set(
            eventType,
            remaining
        );
    }


    public emit(
        event:
        IAIEngineEvent
    ):
        void {

        const handlers =
            this.listeners.get(
                event.type
            );


        if (!handlers) {

            return;
        }


        for (
            const handler
            of [
                ...handlers
            ]
        ) {

            try {

                handler(
                    event
                );

            } catch (error) {

                this.addError(

                    error instanceof Error
                        ? error.message
                        : "Event handler error"

                );
            }
        }
    }


    // ==============================
    // Validation
    // ==============================

    public validateConfig():
        boolean {

        if (
            !this.config.engineId
   
