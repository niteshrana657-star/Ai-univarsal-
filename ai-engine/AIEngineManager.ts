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

  // ==============================
// AIEngineManager Class
// ==============================


export class AIEngineManager {


    private config: IAIEngineConfig;


    private state: AIEngineState;


    private modules:
        Map<string, IAIEngineModule>;


    private startTime: number;


    private errors: string[];


    private requestCount: number;


    private listeners:
        Map<
            string,
            Array<(event: IAIEngineEvent)=>void>
        >;



    constructor(
        config: IAIEngineConfig
    ) {


        this.config = config;


        this.state = "CREATED";


        this.modules =
            new Map<
                string,
                IAIEngineModule
            >();



        this.startTime =
            Date.now();



        this.errors = [];


        this.requestCount = 0;



        this.listeners =
            new Map();
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


        return this.config;
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





    // ==============================
    // Internal State
    // ==============================


    private setState(
        state: AIEngineState
    ): void {


        this.state = state;


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
    ): void {


        this.errors.push(
            error
        );


        this.emit({

            type:
                "ENGINE.ERROR",

            timestamp:
                Date.now(),

            payload:
                error
        });
    }
          }
    timestamp: number;

    payload?: unknown;
}

// ==============================
// Module Management
// ==============================


public registerModule(
    module: IAIEngineModule
): boolean {


    try {


        if (!module.id) {

            throw new Error(
                "Module id missing"
            );
        }


        this.modules.set(
            module.id,
            module
        );


        this.emit({

            type:
                "MODULE.REGISTERED",

            timestamp:
                Date.now(),

            payload:
                module.id
        });


        return true;



    } catch(error) {


        this.addError(

            error instanceof Error
                ? error.message
                : "Module registration failed"

        );


        return false;
    }
}





public unregisterModule(
    moduleId: string
): boolean {


    const removed =
        this.modules.delete(
            moduleId
        );


    if(removed) {


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





// ==============================
// Engine Lifecycle
// ==============================


public async initialize():
Promise<void> {


    try {


        this.setState(
            "INITIALIZING"
        );


        for(
            const module
            of this.modules.values()
        ) {


            await module.initialize();

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



    } catch(error) {


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


    if(
        this.state !== "READY" &&
        this.state !== "PAUSED"
    ) {


        throw new Error(
            "Engine cannot start"
        );
    }



    this.setState(
        "RUNNING"
    );


    this.startTime =
        Date.now();
}





public async pause():
Promise<void> {


    if(
        this.state !== "RUNNING"
    ) {


        throw new Error(
            "Engine is not running"
        );
    }


    this.setState(
        "PAUSED"
    );
}





public async resume():
Promise<void> {


    if(
        this.state !== "PAUSED"
    ) {


        throw new Error(
            "Engine is not paused"
        );
    }


    this.setState(
        "RUNNING"
    );
}





public async stop():
Promise<void> {


    this.setState(
        "STOPPED"
    );
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
    request: IAIEngineRequest
): Promise<IAIEngineResponse> {


    const startTime =
        Date.now();


    try {


        if(
            this.state !== "RUNNING"
        ) {


            throw new Error(
                "AI Engine is not running"
            );
        }


        this.requestCount++;



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


            success: true,


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
                Date.now() - startTime

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



    } catch(error) {



        const message =
            error instanceof Error
                ? error.message
                : "Processing failed";



        this.addError(
            message
        );



        return {


            success: false,


            error:
                message,


            processingTime:
                Date.now() - startTime

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
            this.requestCount,


        errors:
            [
                ...this.errors
            ],


        lastActivity:
            Date.now(),


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

    eventType: string,

    callback:
    (event: IAIEngineEvent)=>void

): void {


    const handlers =

        this.listeners
  // ==============================
// Shutdown
// ==============================


public async shutdown():
Promise<void> {


    try {


        for(
            const module
            of this.modules.values()
        ) {


            await module.shutdown();

        }



        this.modules.clear();



        this.listeners.clear();



        this.setState(
            "SHUTDOWN"
        );



        this.emit({

            type:
                "ENGINE.SHUTDOWN",

            timestamp:
                Date.now()

        });



    } catch(error) {


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


    if(
        !this.config.engineId
    ) {


        this.addError(
            "Engine ID is missing"
        );


        return false;
    }



    if(
        !this.config.version
    ) {


        this.addError(
            "Engine version is missing"
        );


        return false;
    }



    return true;
}





public validateModule(
    module: IAIEngineModule
):
boolean {


    return !!(
        module.id
        &&
        module.name
    );
}





// ==============================
// Utility Methods
// ==============================


public clearErrors():
void {


    this.errors = [];

}





public getRequestCount():
number {


    return this.requestCount;

}





public isRunning():
boolean {


    return (
        this.state === "RUNNING"
    );

}





public isReady():
boolean {


    return (
        this.state === "READY"
    );

}





public getEngineInfo():
Record<string, unknown> {


    return {


        engineId:
            this.config.engineId,


        version:
            this.config.version,


        mode:
            this.config.mode,


        state:
            this.state,


        modules:
            this.getModules(),


        requests:
            this.requestCount,


        uptime:
            Date.now()
            -
            this.startTime

    };
}
