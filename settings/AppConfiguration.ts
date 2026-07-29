/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * App Configuration
 * File: AppConfiguration.ts
 * -------------------------------------------------------------
 *
 * Manages application level configuration.
 *
 * Features:
 * - App environment settings
 * - Feature flags
 * - Runtime configuration
 * - Configuration updates
 * -------------------------------------------------------------
 */


export interface AppConfigurationData {

    appName:
        string;

    version:
        string;

    environment:
        "development"
        |
        "production";

    debugMode:
        boolean;

    offlineMode:
        boolean;

    autoUpdate:
        boolean;

}



export class AppConfiguration {


    private config:
        AppConfigurationData;



    constructor() {


        this.config = {

            appName:
                "Universal AI Operating Companion",

            version:
                "1.0.0",

            environment:
                "development",

            debugMode:
                true,

            offlineMode:
                false,

            autoUpdate:
                true

        };

    }



    /**
     * Get configuration
     */
    get():
        AppConfigurationData {


        return {

            ...this.config

        };

    }



    /**
     * Update configuration
     */
    update(
        changes:
            Partial<AppConfigurationData>
    ):
        AppConfigurationData {


        this.config = {

            ...this.config,

            ...changes

        };



        return this.get();

    }



    /**
     * Enable debug mode
     */
    setDebugMode(
        enabled:
            boolean
    ):
        void {


        this.config.debugMode =
            enabled;

    }



    /**
     * Enable offline mode
     */
    setOfflineMode(
        enabled:
            boolean
    ):
        void {


        this.config.offlineMode =
            enabled;

    }



    /**
     * Enable auto update
     */
    setAutoUpdate(
        enabled:
            boolean
    ):
        void {


        this.config.autoUpdate =
            enabled;

    }



    /**
     * Reset configuration
     */
    reset():
        void {


        this.config = {

            appName:
                "Universal AI Operating Companion",

            version:
                "1.0.0",

            environment:
                "development",

            debugMode:
                true,

            offlineMode:
                false,

            autoUpdate:
                true

        };

    }

}



export default AppConfiguration;
