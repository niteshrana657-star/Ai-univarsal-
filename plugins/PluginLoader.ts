/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Loader
 * File: PluginLoader.ts
 * -------------------------------------------------------------
 *
 * Handles plugin loading lifecycle.
 *
 * Features:
 * - Load plugins
 * - Initialize plugins
 * - Start plugins
 * - Stop plugins
 * -------------------------------------------------------------
 */


import {
    PluginInstance
} from "./PluginTypes";



export interface LoadedPlugin {

    id: string;

    instance: PluginInstance;

    loadedAt: number;

}



export class PluginLoader {


    private loadedPlugins:
        Map<string, LoadedPlugin> =
            new Map();



    /**
     * Load plugin
     */
    async load(
        plugin:
            PluginInstance
    ):
        Promise<boolean> {


        try {


            await plugin.initialize();



            this.loadedPlugins.set(

                plugin.metadata.id,

                {

                    id:
                        plugin.metadata.id,

                    instance:
                        plugin,

                    loadedAt:
                        Date.now()

                }

            );



            return true;


        }

        catch {

            return false;

        }

    }



    /**
     * Start plugin
     */
    async start(
        pluginId: string
    ):
        Promise<boolean> {


        const loaded =
            this.loadedPlugins.get(
                pluginId
            );



        if (!loaded) {

            return false;

        }



        await loaded.instance.start();



        return true;

    }



    /**
     * Stop plugin
     */
    async stop(
        pluginId: string
    ):
        Promise<boolean> {


        const loaded =
            this.loadedPlugins.get(
                pluginId
            );



        if (!loaded) {

            return false;

        }



        await loaded.instance.stop();



        return true;

    }



    /**
     * Remove plugin
     */
    async unload(
        pluginId: string
    ):
        Promise<boolean> {


        const loaded =
            this.loadedPlugins.get(
                pluginId
            );



        if (!loaded) {

            return false;

        }



        await loaded.instance.destroy();



        this.loadedPlugins.delete(
            pluginId
        );



        return true;

    }



    /**
     * Get loaded plugins
     */
    getLoaded():
        LoadedPlugin[] {


        return Array.from(

            this.loadedPlugins.values()

        );

    }



    /**
     * Check plugin loaded
     */
    isLoaded(
        pluginId: string
    ):
        boolean {


        return this.loadedPlugins.has(
            pluginId
        );

    }



    /**
     * Clear all plugins
     */
    async clear():
        Promise<void> {


        for (
            const plugin of this.loadedPlugins.values()
        ) {


            await plugin.instance.destroy();

        }



        this.loadedPlugins.clear();

    }

}



export default PluginLoader;
