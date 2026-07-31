/**
 * Universal AI Operating Companion
 * Plugin Registry
 * Version: 1.0.0
 */


/**
 * Plugin Contract
 */
export interface RegisteredPlugin {

    id: string;

    name: string;

    version: string;

    description?: string;

    enabled: boolean;


    initialize?(): Promise<void>;

    start?(): Promise<void>;

    stop?(): Promise<void>;

}



/**
 * Plugin Registry Manager
 */
export class PluginRegistry {


    private plugins:
        Map<string, RegisteredPlugin>;



    constructor() {

        this.plugins =
            new Map();

    }



    /**
     * Register plugin
     */
    register(
        plugin: RegisteredPlugin
    ): void {


        if (
            !plugin.id
            ||
            !plugin.name
        ) {

            throw new Error(
                "Plugin id and name are required"
            );

        }


        this.plugins.set(
            plugin.id,
            plugin
        );

    }



    /**
     * Remove plugin
     */
    unregister(
        pluginId: string
    ): void {


        this.plugins.delete(
            pluginId
        );

    }



    /**
     * Get plugin
     */
    get(
        pluginId: string
    ): RegisteredPlugin | undefined {


        return this.plugins.get(
            pluginId
        );

    }



    /**
     * Check plugin exists
     */
    has(
        pluginId: string
    ): boolean {


        return this.plugins.has(
            pluginId
        );

    }



    /**
     * Enable plugin
     */
    enable(
        pluginId: string
    ): void {


        const plugin =
            this.plugins.get(
                pluginId
            );


        if (plugin) {

            plugin.enabled = true;

        }

    }



    /**
     * Disable plugin
     */
    disable(
        pluginId: string
    ): void {


        const plugin =
            this.plugins.get(
                pluginId
            );


        if (plugin) {

            plugin.enabled = false;

        }

    }



    /**
     * Initialize plugins
     */
    async initializeAll(): Promise<void> {


        for (
            const plugin
            of this.plugins.values()
        ) {


            if (
                plugin.enabled
                &&
                plugin.initialize
            ) {

                await plugin.initialize();

            }

        }

    }



    /**
     * Start plugins
     */
    async startAll(): Promise<void> {


        for (
            const plugin
            of this.plugins.values()
        ) {


            if (
                plugin.enabled
                &&
                plugin.start
            ) {

                await plugin.start();

            }

        }

    }



    /**
     * Stop plugins
     */
    async stopAll(): Promise<void> {


        for (
            const plugin
            of this.plugins.values()
        ) {


            if (
                plugin.stop
            ) {

                await plugin.stop();

            }

        }

    }



    /**
     * Get all plugins
     */
    list(): RegisteredPlugin[] {


        return Array.from(
            this.plugins.values()
        ).map(
            plugin => ({
                ...plugin
            })
        );

    }



    /**
     * Clear plugins
     */
    clear(): void {

        this.plugins.clear();

    }

          }
