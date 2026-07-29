/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Privacy Settings
 * File: PrivacySettings.ts
 * -------------------------------------------------------------
 *
 * Manages privacy and permission preferences.
 *
 * Features:
 * - Privacy controls
 * - Permission state management
 * - Data sharing preferences
 * - Reset privacy settings
 * -------------------------------------------------------------
 */


import {
    PrivacySettings as PrivacySettingsType
} from "./SettingsTypes";


import {
    DEFAULT_SETTINGS
} from "./SettingsConstants";



export class PrivacySettings {


    private settings:
        PrivacySettingsType;



    constructor() {


        this.settings = {

            ...DEFAULT_SETTINGS.privacy

        };

    }



    /**
     * Get privacy settings
     */
    get():
        PrivacySettingsType {


        return {

            ...this.settings

        };

    }



    /**
     * Update privacy settings
     */
    update(
        changes:
            Partial<PrivacySettingsType>
    ):
        PrivacySettingsType {


        this.settings = {

            ...this.settings,

            ...changes

        };



        return this.get();

    }



    /**
     * Enable screen access
     */
    setScreenAccess(
        enabled:
            boolean
    ):
        void {


        this.settings.screenAccess =
            enabled;

    }



    /**
     * Enable microphone access
     */
    setMicrophoneAccess(
        enabled:
            boolean
    ):
        void {


        this.settings.microphoneAccess =
            enabled;

    }



    /**
     * Enable camera access
     */
    setCameraAccess(
        enabled:
            boolean
    ):
        void {


        this.settings.cameraAccess =
            enabled;

    }



    /**
     * Enable memory storage
     */
    setMemoryStorage(
        enabled:
            boolean
    ):
        void {


        this.settings.memoryStorage =
            enabled;

    }



    /**
     * Allow data sharing
     */
    setDataSharing(
        enabled:
            boolean
    ):
        void {


        this.settings.dataSharing =
            enabled;

    }



    /**
     * Reset privacy settings
     */
    reset():
        void {


        this.settings = {

            ...DEFAULT_SETTINGS.privacy

        };

    }

}



export default PrivacySettings;
