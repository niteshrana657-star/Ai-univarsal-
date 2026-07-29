/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * User Preferences
 * File: UserPreferences.ts
 * -------------------------------------------------------------
 *
 * Manages user preference settings.
 *
 * Features:
 * - Create preferences
 * - Update preferences
 * - Reset preferences
 * - Read current preferences
 * -------------------------------------------------------------
 */


import {
    UserPreferences as UserPreferencesType
} from "./SettingsTypes";


import {
    DEFAULT_SETTINGS
} from "./SettingsConstants";



export class UserPreferences {


    private preferences:
        UserPreferencesType;



    constructor() {


        this.preferences = {

            ...DEFAULT_SETTINGS.user

        };

    }



    /**
     * Get preferences
     */
    get():
        UserPreferencesType {


        return {

            ...this.preferences

        };

    }



    /**
     * Update preference
     */
    update(
        changes:
            Partial<UserPreferencesType>
    ):
        UserPreferencesType {


        this.preferences = {

            ...this.preferences,

            ...changes

        };



        return this.get();

    }



    /**
     * Change theme
     */
    setTheme(
        theme:
            UserPreferencesType["theme"]
    ):
        void {


        this.preferences.theme =
            theme;

    }



    /**
     * Change language
     */
    setLanguage(
        language:
            UserPreferencesType["language"]
    ):
        void {


        this.preferences.language =
            language;

    }



    /**
     * Enable voice
     */
    setVoice(
        enabled:
            boolean
    ):
        void {


        this.preferences.voiceEnabled =
            enabled;

    }



    /**
     * Reset defaults
     */
    reset():
        void {


        this.preferences = {

            ...DEFAULT_SETTINGS.user

        };

    }

}



export default UserPreferences;
