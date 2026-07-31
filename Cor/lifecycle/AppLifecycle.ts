/**
 * Universal AI Operating Companion
 * Application Lifecycle Manager
 * Version: 1.0.0
 */

import {
    SystemContext
} from "../context/SystemContext";

import {
    AIMode
} from "../types";



/**
 * Application Lifecycle States
 */
export enum AppLifecycleState {

    CREATED = "created",

    INITIALIZING = "initializing",

    READY = "ready",

    RUNNING = "running",

    PAUSED = "paused",

    STOPPED = "stopped",

    ERROR = "error"

}



/**
 * Application Lifecycle Manager
 */
export class AppLifecycle {


    private state:
        AppLifecycleState;


    private systemContext:
        SystemContext;



    constructor(
        systemContext: SystemContext
    ) {

        this.state =
            AppLifecycleState.CREATED;


        this.systemContext =
            systemContext;

    }



    /**
     * Initialize application
     */
    async initialize(): Promise<void> {


        this.state =
            AppLifecycleState.INITIALIZING;


        this.systemContext
            .setInitialized(true);


        this.state =
            AppLifecycleState.READY;

    }



    /**
     * Start application
     */
    async start(): Promise<void> {


        this.state =
            AppLifecycleState.RUNNING;


        this.systemContext
            .setRunning(true);


        this.systemContext
            .setAIMode(
                AIMode.ACTIVE
            );

    }



    /**
     * Pause application
     */
    async pause(): Promise<void> {


        this.state =
            AppLifecycleState.PAUSED;


        this.systemContext
            .setAIMode(
                AIMode.PAUSED
            );

    }



    /**
     * Stop application
     */
    async stop(): Promise<void> {


        this.state =
            AppLifecycleState.STOPPED;


        this.systemContext
            .setRunning(false);


        this.systemContext
            .setAIMode(
                AIMode.IDLE
            );

    }



    /**
     * Get current lifecycle state
     */
    getState(): AppLifecycleState {

        return this.state;

    }



    /**
     * Check running status
     */
    isRunning(): boolean {

        return (
            this.state ===
            AppLifecycleState.RUNNING
        );

    }



    /**
     * Set error state
     */
    setError(): void {


        this.state =
            AppLifecycleState.ERROR;


        this.systemContext
            .setAIMode(
                AIMode.ERROR
            );

    }

}
