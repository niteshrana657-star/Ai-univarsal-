/**
 * Universal AI Operating Companion
 * Service Registry
 * Version: 1.0.0
 */


/**
 * Generic Service Contract
 */
export interface RegisteredService {

    name: string;

    version?: string;

    initialize?(): Promise<void>;

    start?(): Promise<void>;

    stop?(): Promise<void>;

}



/**
 * Service Registry Manager
 */
export class ServiceRegistry {


    private services:
        Map<string, RegisteredService>;



    constructor() {

        this.services =
            new Map();

    }



    /**
     * Register service
     */
    register(
        service: RegisteredService
    ): void {


        if (
            !service.name
        ) {

            throw new Error(
                "Service name is required"
            );

        }


        this.services.set(
            service.name,
            service
        );

    }



    /**
     * Remove service
     */
    unregister(
        name: string
    ): void {


        this.services.delete(
            name
        );

    }



    /**
     * Get service
     */
    get<T extends RegisteredService>(
        name: string
    ): T | undefined {


        return this.services.get(
            name
        ) as T | undefined;

    }



    /**
     * Check service exists
     */
    has(
        name: string
    ): boolean {


        return this.services.has(
            name
        );

    }



    /**
     * Initialize all services
     */
    async initializeAll(): Promise<void> {


        for (
            const service
            of this.services.values()
        ) {


            if (
                service.initialize
            ) {

                await service.initialize();

            }

        }

    }



    /**
     * Start all services
     */
    async startAll(): Promise<void> {


        for (
            const service
            of this.services.values()
        ) {


            if (
                service.start
            ) {

                await service.start();

            }

        }

    }



    /**
     * Stop all services
     */
    async stopAll(): Promise<void> {


        for (
            const service
            of this.services.values()
        ) {


            if (
                service.stop
            ) {

                await service.stop();

            }

        }

    }



    /**
     * List services
     */
    list(): string[] {


        return Array.from(
            this.services.keys()
        );

    }



    /**
     * Clear registry
     */
    clear(): void {

        this.services.clear();

    }

}
