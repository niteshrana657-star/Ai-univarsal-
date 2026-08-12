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

    engineId:
        string;

    version:
        string;

    environment:
        | "development"
        | "production"
        | "testing";

    mode:
        AIEngineMode;

    language:
        string;

    enabledModules:
        string[];

    securityLevel:
        string;

    memoryMode:
        string;

    performanceMode:
        string;

    metadata?:
        Record<string, unknown>;
}


export interface IAIEngineStatus {

    state:
        AIEngineState;

    uptime:
        number;

    activeModules:
        string[];

    loadedModels:
        string[];

    tasksRunning:
        number;

    memoryUsage?:
        number;

    errors:
        string[];

    lastActivity:
        number;

    timestamp:
        number;
}


export interface IAIEngineRequest {

    id:
        string;

    input:
        unknown;

    type:
        string;

    source?:
        string;

    context?:
        Record<string, unknown>;

    priority?:
        AIRequestPriority;

    permissions?:
        string[];

    sessionId?:
        string;

    timestamp:
        number;

    metadata?:
        Record<string, unknown>;
}


export interface IAIEngineResponse {

    success:
        boolean;

    result?:
        unknown;

    intent?:
        string;

    executionPath?:
        string[];

    confidence?:
        number;

    processingTime?:
        number;

    error?:
        string;

    metadata?:
        Record<string, unknown>;
}


export interface IAIEngineModule {

    id:
        string;

    name:
        string;

    initialize():
        Promise<void>;

    shutdown():
        Promise<void>;

    getStatus():
        unknown;
}


export interface IAIEngineEvent {

    type:
        string;

    timestamp:
        number;

    payload?:
        unknown;
}


// ==============================
// AIEngineManager Class
// ==============================

export class AIEngineManager {

    private config:
        IAIEngineConfig;


    private state:
        AIEngineState;


    private modules:
        Map<string, IAIEngineModule>;


    private startTime:
        number;


    private errors:
        string[];


    private requestCount:
        number;


    private lastActivity:
        number;


    private listeners:
        Map<
            string,
            Array<(event: IAIEngineEvent) => void>
        >;


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
                "STANDARD",

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


        this.startTime =
            Date.now();


        this.lastActivity =
            Date.now();


        this.errors =
            [];


        this.requestCount =
            0;


        this.listeners =
            new Map<
                string,
                Array<(event: IAIEngineEvent) => void>
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

            enabledModules:
                [
                    ...this.config.enabledModules
                ]

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


    // ==============================
    // Internal State
    // ==============================

    private setState(
        state:
        AIEngineState
    ):
        void {

        this.state =
            state;


        this.lastActivity =
            Date.now();


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


        this.lastActivity =
            Date.now();


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


            this.modules.set(

                module.id,

                module

            );


            if (
                !this.config.enabledModules.includes(
                    module.id
                )
            ) {

                this.config.enabledModules.push(
                    module.id
                );
            }


            this.lastActivity =
                Date.now();


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

        const removed =
            this.modules.delete(
                moduleId
            );


        if (removed) {

            this.config.enabledModules =
                this.config.enabledModules.filter(

                    id =>
                        id !== moduleId

                );


            this.lastActivity =
                Date.now();


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

        try {

            if (
                this.state === "READY" ||
                this.state === "RUNNING"
            ) {

                return;
            }


            this.setState(
                "INITIALIZING"
            );


            for (
                const module
                of this.modules.values()
            ) {

                await module.initialize();

            }


            this.lastActivity =
                Date.now();


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
            this.state !== "READY" &&
            this.state !== "PAUSED"
        ) {

            throw new Error(
                "Engine cannot start. Engine must be READY or PAUSED."
            );
        }


        this.setState(
            "RUNNING"
        );


        this.startTime =
            Date.now();


        this.lastActivity =
            Date.now();


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


    public async stop():
        Promise<void> {

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


    public async restart():
        Promise<void> {

        await this.stop();

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


        try {

            if (
                this.state !== "RUNNING"
            ) {

                throw new Error(
                    "AI Engine is not running"
                );
            }


            if (
                !this.validateRequest(
                    request
                )
            ) {

                throw new Error(
                    "Invalid AI engine request"
                );
            }


            this.requestCount++;


            this.lastActivity =
                Date.now();


            this.emit({

                type:
                    "ENGINE.REQUEST_RECEIVED",

                timestamp:
                    Date.now(),

                payload:
                    request

            });


            const response:
                IAIEngineResponse = {

                success:
                    true,

                result: {

                    message:
                        "Request processed",

                    requestId:
                        request.id

                },

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


            this.lastActivity =
                Date.now();


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


            return {

                success:
                    false,

                error:
                    message,

                processingTime:
                    Date.now()
                    -
                    processingStart

            };
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
                this.state === "RUNNING"
                    ? this.requestCount
                    : 0,

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

        return (

            this.state === "READY"

            ||

            this.state === "RUNNING"

        );
    }


    // ==============================
    // Event System
    // ==============================

    public on(
        eventType:
        string,

        callback:
        (event: IAIEngineEvent) => void

    ):
        void {

        const handlers =
            this.listeners.get(
                eventType
            )
            ||
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
        (event: IAIEngineEvent) => void

    ):
        void {

        const handlers =
            this.listeners.get(
                eventType
            );


        if (!handlers) {

            return;
        }


        const filtered =
            handlers.filter(

                handler =>
                    handler !== callback

            );


        if (
            filtered.length === 0
        ) {

            this.listeners.delete(
                eventType
            );

        } else {

            this.listeners.set(

                eventType,

                filtered

            );
        }
    }


    private emit(
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
            of handlers
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
    // Shutdown
    // ==============================

    public async shutdown():
        Promise<void> {

        try {

            for (
                const module
                of this.modules.values()
            ) {

                await module.shutdown();

            }


            this.modules.clear();


            this.config.enabledModules =
                [];


            this.setState(
                "SHUTDOWN"
            );


            this.emit({

                type:
                    "ENGINE.SHUTDOWN",

                timestamp:
                    Date.now()

            });


            this.listeners.clear();


        } catch (error) {

            this.setState(
                "ERROR"
            );


            this.addError(

                error instanceof Error
                    ? error.message
                    : "Shutdown failed"

            );


            throw error;
        }
    }


    // ==============================
    // Validation
    // ==============================

    public validateConfig():
        boolean {

        if (
            !this.config.engineId
        ) {

            this.addError(
                "Engine ID is missing"
            );


            return false;
        }


        if (
            !this.config.version
        ) {

            this.addError(
                "Engine version is missing"
            );


            return false;
        }


        if (
            !this.config.environment
        ) {

            this.addError(
                "Engine environment is missing"
            );


            return false;
        }


        if (
            !this.config.mode
        ) {

            this.addError(
                "Engine mode is missing"
            );


            return false;
        }


        return true;
    }


    public validateRequest(
        request:
        IAIEngineRequest
    ):
        boolean {

        return !!(

            request

            &&

            request.id

            &&

            request.type

        );
    }


    public validateModule(
        module:
        IAIEngineModule
    ):
        boolean {

        return !!(

            module

            &&

            module.id

            &&

            module.name

            &&

            typeof module.initialize === "function"

            &&

            typeof module.shutdown === "function"

        );
    }


    // ==============================
    // Utility Methods
    // ==============================

    public clearErrors():
        void {

        this.errors =
            [];


        this.lastActivity =
            Date.now();
    }


    public resetRequestCount():
        void {

        this.requestCount =
            0;


        this.lastActivity =
            Date.now();
    }


    public isRunning():
        boolean {

        return (
            this.state === "RUNNING"
 
