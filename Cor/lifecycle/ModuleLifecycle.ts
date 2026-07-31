/**
 * Universal AI Operating Companion
 * Module Lifecycle Manager
 * Version: 1.0.0
 */


/**
 * Module Lifecycle State
 */
export enum ModuleState {

    CREATED = "created",

    INITIALIZING = "initializing",

    READY = "ready",

    RUNNING = "running",

    STOPPED = "stopped",

    ERROR = "error"

}



/**
 * Module Lifecycle Contract
 */
export interface LifecycleModule {

    name: string;

    initialize(): Promise<void>;

    start(): Promise<void>;

    stop(): Promise<void>;

}



/**
 * Module Lifecycle Manager
 */
export class ModuleLifecycle {


    private modules:
        Map<string, LifecycleModule>;


    private states:
        Map<string, ModuleState>;



    constructor() {

        this.modules =
            new Map();


        this.states =
            new Map();

    }



    /**
     * Register module
     */
    register(
        module: LifecycleModule
    ): void {


        this.modules.set(
            module.name,
            module
        );


        this.states.set(
            module.name,
            ModuleState.CREATED
        );

    }



    /**
     * Initialize all modules
     */
    async initializeAll(): Promise<void> {


        for (
            const [name, module]
            of this.modules
        ) {


            try {


                this.states.set(
                    name,
                    ModuleState.INITIALIZING
                );


                await module.initialize();


                this.states.set(
                    name,
                    ModuleState.READY
                );


            } catch {


                this.states.set(
                    name,
                    ModuleState.ERROR
                );

            }

        }

    }



    /**
     * Start all modules
     */
    async startAll(): Promise<void> {


        for (
            const [name, module]
            of this.modules
        ) {


            try {


                await module.start();


                this.states.set(
                    name,
                    ModuleState.RUNNING
                );


            } catch {


                this.states.set(
                    name,
                    ModuleState.ERROR
                );

            }

        }

    }



    /**
     * Stop all modules
     */
    async stopAll(): Promise<void> {


        for (
            const [name, module]
            of this.modules
        ) {


            try {


                await module.stop();


                this.states.set(
                    name,
                    ModuleState.STOPPED
                );


            } catch {


                this.states.set(
                    name,
                    ModuleState.ERROR
                );

            }

        }

    }



    /**
     * Get module state
     */
    getState(
        name: string
    ): ModuleState | undefined {

        return this.states.get(name);

    }



    /**
     * Get registered modules
     */
    getModules(): string[] {

        return Array.from(
            this.modules.keys()
        );

    }



    /**
     * Remove module
     */
    unregister(
        name: string
    ): void {


        this.modules.delete(name);

        this.states.delete(name);

    }

}
