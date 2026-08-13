/**

AIEngineManager.ts

Central controller of Universal AI Operating Companion.

Responsibilities:

Manage AI Engine lifecycle


Register and manage modules


Process AI requests


Maintain engine state


Handle engine events


Provide health/status information


Manage errors


Support graceful shutdown
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
(event: IAIEngineEvent) => void;

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
    Map<string, Set<AIEngineEventHandler>>;  


// ========================================================  
// Constructor  
// ========================================================  

constructor(  
    config?:  
    Partial<IAIEngineConfig>  
) {  

    this.config = {  

        ...DEFAULT_ENGINE_CONFIG,  

        ...config,  

        enabledModules:  
            config?.enabledModules  
                ? [  
                    ...config.enabledModules  
                ]  
                : [],  

        metadata:  
            config?.metadata  
                ? {  
                    ...config.metadata  
                }  
                : {}  
    };  


    this.state =  
        "CREATED";  


    this.modules =  
        new Map<string, IAIEngineModule>();  


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
                ...(this.config.metadata || {})  
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
// Internal State  
// ========================================================  

private setState(  
    state: AIEngineState  
): void {  

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
): void {  

    this.errors.push(  
        error  
    );  

    this.updateActivity();  

    this.emit({  

        type:  
            "ENGINE.ERROR",  

        timestamp:  
            Date.now(),  

        payload:  
            error  
    });  
}  


private updateActivity():  
    void {  

    this.lastActivity =  
        Date.now();  
}  


// ========================================================  
// Module Management  
// ========================================================  

public registerModule(  
    module: IAIEngineModule  
):  
    boolean {  

    try {  

        if (!module) {  

            throw new Error(  
                "Module is missing"  
            );  
        }  


        if (!module.id) {  

            throw new Error(  
                "Module id is missing"  
            );  
        }  


        if (!module.name) {  

            throw new Error(  
                "Module name is missing"  
            );  
        }  


        if (  
            typeof module.initialize !== "function"  
        ) {  

            throw new Error(  
                `Module ${module.id} has no initialize method`  
            );  
        }  


        if (  
            typeof module.shutdown !== "function"  
        ) {  

            throw new Error(  
                `Module ${module.id} has no shutdown method`  
            );  
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

            error instanceof Error  
                ? error.message  
                : "Module registration failed"  

        );  

        return false;  
    }  
}  


public unregisterModule(  
    moduleId: string  
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
        this.state === "RUNNING" ||  
        this.state === "READY"  
    ) {  

        return;  
    }  


    if (  
        this.state === "INITIALIZING"  
    ) {  

        return;  
    }  


    try {  

        this.setState(  
            "INITIALIZING"  
        );  


        const modules =  
            Array.from(  
                this.modules.values()  
            );  


        for (  
            const module  
            of modules  
        ) {  

            try {  

                await module.initialize();  

            } catch (error) {  

                const message =  
                    error instanceof Error  
                        ? error.message  
                        : "Module initialization failed";  

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

        this.setState(  
            "ERROR"  
        );  


        this.addError(  

            error instanceof Error  
                ? error.message  
                : "Engine initialization failed"  

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
        this.state === "SHUTDOWN"  
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
        this.state === "SHUTDOWN"  
    ) {  

        throw new Error(  
            "Cannot restart a shut down engine"  
        );  
    }  


    if (  
        this.state === "RUNNING" ||  
        this.state === "PAUSED"  
    ) {  

        await this.stop();  
    }  


    await this.initialize();  

    await this.start();  
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


        if (!request) {  

            throw new Error(  
                "Request is missing"  
            );  
        }  


        if (!request.id) {  

            throw new Error(  
                "Request id is missing"  
            );  
        }  


        if (!request.type) {  

            throw new Error(  
                "Request type is missing"  
            );  
        }  


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


        const response:  
            IAIEngineResponse = {  

            success:  
                true,  

            result: {  

                message:  
                    "Request processed",  

                requestId:  
                    request.id,  

                type:  
                    request.type  
            },  

            executionPath: [  

                "AIEngineManager"  

            ],  

            confidence:  
                1,  

            processingTime:  
                Date.now()  
                -  
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
                : "Request processing failed";  


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
// Engine Status  
// ========================================================  

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
// Health Check  
// ========================================================  

public healthCheck():  
    boolean {  

    return (  

        this.state === "READY" ||  

        this.state === "RUNNING" ||  

        this.state === "PAUSED"  

    );  
}  


// ========================================================  
// Event System  
// ========================================================  

public on(  
    eventType: string,  
    callback: AIEngineEventHandler  
):  
    void {  

    if (!eventType) {  

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
            new Set<AIEngineEventHandler>();  


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
