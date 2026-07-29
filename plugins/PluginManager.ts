/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Manager
 * File: PluginManager.ts
 * -------------------------------------------------------------
 *
 * Main controller for plugin ecosystem.
 *
 * Features:
 * - Register plugins
 * - Load plugins
 * - Enable / disable plugins
 * - Manage plugin lifecycle
 * -------------------------------------------------------------
 */


import {
    PluginInstance,
    PluginMetadata
} from "./PluginTypes";


import {
    PluginRegistry
} from "./PluginRegistry";


import {
    PluginLoader
} from "./PluginLoader";


import {
    PluginEvents
} from "./PluginEvents";



export class PluginManager {


    private registry:
        PluginRegistry;



    private loader:
        PluginLoader;



    private events:
        PluginEvents;



    constructor() {


        this.registry =
            new PluginRegistry();


        this.loader =
            new PluginLoader();


        this.events =
            new PluginEvents();

    }



    /**
     * Install plugin
     */
    install(
        metadata:
            PluginMetadata
    ):
        boolean {


        const result =
            this.registry.register(
                metadata
            );



        if (result) {

            this.events.emit(

                "installed",

                metadata.id

            );

        }



        return result;

    }



    /**
     * Load plugin
     */
    async load(
        plugin:
            PluginInstance
    ):
        Promise<boolean> {


        const result =
            await this.loader.load(
                plugin
            );



        if (result) {

            this.events.emit(

                "started",

                plugin.metadata.id

            );

        }



        return result;

    }



    /**
     * Start plugin
     */
    async start(
        pluginId: string
    ):
        Promise<boolean> {


        const result =
            await this.loader.start(
                pluginId
            );



        if (result) {

            this.events.emit(

                "enabled",

                pluginId

            );

        }



        return result;

    }



    /**
     * Stop plugin
     */
    async stop(
        pluginId: string
    ):
        Promise<boolean> {


        const result =
            await this.loader.stop(
                pluginId
            );



        if (result) {

            this.events.emit(

                "disabled",

                pluginId

            );

        }



        return result;

    }



    /**
     * Remove plugin
     */
    remove(
        pluginId: string
    ):
        boolean {


        const result =
            this.registry.remove(
                pluginId
            );



        if (result) {

            this.events.emit(

                "removed",

                pluginId

            );

        }



        return result;

    }



    /**
     * Get plugins
     */
    getPlugins():
        PluginMetadata[] {


        return this.registry.getAll();

    }



    /**
     * Get events
     */
    getEvents():
        PluginEvents {


        return this.events;

    }



    /**
     * Get loader
     */
    getLoader():
        PluginLoader {


        return this.loader;

    }

}



export default PluginManager;
