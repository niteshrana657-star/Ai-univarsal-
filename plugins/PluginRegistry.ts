/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Registry
 * File: PluginRegistry.ts
 * -------------------------------------------------------------
 *
 * Stores and manages registered plugins.
 *
 * Features:
 * - Register plugins
 * - Find plugins
 * - Remove plugins
 * - Manage plugin metadata
 * -------------------------------------------------------------
 */


import {
    PluginMetadata
} from "./PluginTypes";



export class PluginRegistry {


    private plugins:
        Map<string, PluginMetadata> =
            new Map();



    /**
     * Register plugin
     */
    register(
        plugin: PluginMetadata
    ):
        boolean {


        if (
            this.plugins.has(
                plugin.id
            )
        ) {

            return false;

        }



        this.plugins.set(

            plugin.id,

            plugin

        );



        return true;

    }



    /**
     * Update plugin
     */
    update(
        plugin:
            PluginMetadata
    ):
        boolean {


        if (
            !this.plugins.has(
                plugin.id
            )
        ) {

            return false;

        }



        this.plugins.set(

            plugin.id,

            plugin

        );



        return true;

    }



    /**
     * Get plugin
     */
    get(
        id: string
    ):
        PluginMetadata | null {


        return (

            this.plugins.get(
                id
            )

            ?? null

        );

    }



    /**
     * Get all plugins
     */
    getAll():
        PluginMetadata[] {


        return Array.from(

            this.plugins.values()

        );

    }



    /**
     * Remove plugin
     */
    remove(
        id: string
    ):
        boolean {


        return this.plugins.delete(
            id
        );

    }



    /**
     * Check plugin exists
     */
    exists(
        id: string
    ):
        boolean {


        return this.plugins.has(
            id
        );

    }



    /**
     * Clear registry
     */
    clear():
        void {


        this.plugins.clear();

    }

}



export default PluginRegistry;
