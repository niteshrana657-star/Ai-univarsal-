/**
 * Universal AI Operating Companion
 * System Context Management
 * Version: 1.0.0
 */

import {
    AIMode,
    PlatformType
} from "../types";


/**
 * System Context Data
 */
export interface SystemContextData {

    platform: PlatformType;

    aiMode: AIMode;

    initialized: boolean;

    running: boolean;

    activeModules: string[];

    services: Record<string, boolean>;

    permissions: Record<string, boolean>;

    lastUpdated: number;

}



/**
 * System Context Manager
 */
export class SystemContext {


    private context: SystemContextData;



    constructor(
        platform: PlatformType
    ) {

        this.context = {

            platform,

            aiMode: AIMode.IDLE,

            initialized: false,

            running: false,

            activeModules: [],

            services: {},

            permissions: {},

            lastUpdated: Date.now()

        };

    }



    /**
     * Get system context
     */
    get(): SystemContextData {

        return {
            ...this.context,

            activeModules: [
                ...this.context.activeModules
            ]

        };

    }



    /**
     * Mark initialized
     */
    setInitialized(
        value: boolean
    ): void {

        this.context.initialized =
            value;

        this.updateTime();

    }



    /**
     * Set AI Mode
     */
    setAIMode(
        mode: AIMode
    ): void {

        this.context.aiMode =
            mode;

        this.updateTime();

    }



    /**
     * Start/Stop system
     */
    setRunning(
        value: boolean
    ): void {

        this.context.running =
            value;

        this.updateTime();

    }



    /**
     * Register module
     */
    addModule(
        moduleName: string
    ): void {


        if (
            !this.context.activeModules
                .includes(moduleName)
        ) {

            this.context.activeModules
                .push(moduleName);

        }


        this.updateTime();

    }



    /**
     * Remove module
     */
    removeModule(
        moduleName: string
    ): void {


        this.context.activeModules =
            this.context.activeModules
                .filter(
                    item =>
                        item !== moduleName
                );


        this.updateTime();

    }



    /**
     * Update service status
     */
    setServiceStatus(
        serviceName: string,
        status: boolean
    ): void {


        this.context.services[serviceName] =
            status;


        this.updateTime();

    }



    /**
     * Update permission status
     */
    setPermissionStatus(
        permission: string,
        status: boolean
    ): void {


        this.context.permissions[permission] =
            status;


        this.updateTime();

    }



    /**
     * Update timestamp
     */
    private updateTime(): void {

        this.context.lastUpdated =
            Date.now();

    }



    /**
     * Reset context
     */
    reset(): void {


        this.context = {

            ...this.context,

            aiMode: AIMode.IDLE,

            running: false,

            activeModules: [],

            services: {},

            permissions: {},

            lastUpdated: Date.now()

        };

    }

}
