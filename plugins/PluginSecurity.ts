/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Security
 * File: PluginSecurity.ts
 * -------------------------------------------------------------
 *
 * Security layer for plugin ecosystem.
 *
 * Features:
 * - Plugin permission validation
 * - Access control
 * - Security checks
 * - Block unsafe plugins
 * -------------------------------------------------------------
 */


import {
    PluginMetadata,
    PluginPermission
} from "./PluginTypes";



export interface PluginSecurityResult {

    allowed: boolean;

    reason: string;

    missingPermissions?: PluginPermission[];

}



export class PluginSecurity {


    private blockedPlugins:
        string[] = [];



    /**
     * Validate plugin security
     */
    validate(
        plugin: PluginMetadata,
        requiredPermissions:
            PluginPermission[] = []
    ):
        PluginSecurityResult {


        if (
            this.blockedPlugins
                .includes(plugin.id)
        ) {


            return {

                allowed:
                    false,

                reason:
                    "Plugin is blocked by security system."

            };

        }



        const missing =
            requiredPermissions.filter(

                permission =>

                    !plugin.permissions
                        .includes(permission)

            );



        if (
            missing.length > 0
        ) {


            return {

                allowed:
                    false,

                reason:
                    "Plugin does not have required permissions.",

                missingPermissions:
                    missing

            };

        }



        return {

            allowed:
                true,

            reason:
                "Plugin security validation successful."

        };

    }



    /**
     * Block plugin
     */
    block(
        pluginId: string
    ):
        void {


        if (
            !this.blockedPlugins
                .includes(pluginId)
        ) {

            this.blockedPlugins.push(
                pluginId
            );

        }

    }



    /**
     * Unblock plugin
     */
    unblock(
        pluginId: string
    ):
        boolean {


        const before =
            this.blockedPlugins.length;



        this.blockedPlugins =
            this.blockedPlugins.filter(

                id =>
                    id !== pluginId

            );



        return (
            before !==
            this.blockedPlugins.length
        );

    }



    /**
     * Check blocked status
     */
    isBlocked(
        pluginId: string
    ):
        boolean {


        return this.blockedPlugins
            .includes(pluginId);

    }



    /**
     * Get blocked plugins
     */
    getBlockedPlugins():
        string[] {


        return [
            ...this.blockedPlugins
        ];

    }



    /**
     * Clear security list
     */
    clear():
        void {


        this.blockedPlugins = [];

    }

}



export default PluginSecurity;
