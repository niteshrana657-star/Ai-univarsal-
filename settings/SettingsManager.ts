/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Settings Manager
 * File: SettingsManager.ts
 * -------------------------------------------------------------
 *
 * Main controller for application settings.
 *
 * Features:
 * - Manage all settings modules
 * - Update settings
 * - Read complete configuration
 * - Reset settings
 * -------------------------------------------------------------
 */


import {
    AppSettings
} from "./SettingsTypes";


import {
    DEFAULT_SETTINGS
} from "./SettingsConstants";


import {
    UserPreferences
} from "./UserPreferences";


import {
    PrivacySettings
} from "./PrivacySettings";


import {
    LanguageSettings
} from "./LanguageSettings";


import {
    AppConfiguration
} from "./AppConfiguration";



export class SettingsManager {


    private userPreferences:
        UserPreferences;


    private privacySettings:
        PrivacySettings;


    private languageSettings:
        LanguageSettings;


    private appConfiguration:
        AppConfiguration;



    constructor() {


        this.userPreferences =
            new UserPreferences();


        this.privacySettings =
            new PrivacySettings();


        this.languageSettings =
            new LanguageSettings();


        this.appConfiguration =
            new AppConfiguration();

    }



    /**
     * Get complete settings
     */
    get():
        AppSettings {


        return {

            user:
                this.userPreferences.get(),

            privacy:
                this.privacySettings.get(),

            ai:
                {
                    ...DEFAULT_SETTINGS.ai
                },

            updatedAt:
                Date.now()

        };

    }



    /**
     * Update user settings
     */
    updateUser(
        changes:
            Partial<AppSettings["user"]>
    ) {


        return this.userPreferences
            .update(
                changes
            );

    }



    /**
     * Update privacy settings
     */
    updatePrivacy(
        changes:
            Partial<AppSettings["privacy"]>
    ) {


        return this.privacySettings
            .update(
                changes
            );

    }



    /**
     * Change language
     */
    setLanguage(
        language:
            AppSettings["user"]["language"]
    ) {


        return this.languageSettings
            .set(
                language
            );

    }



    /**
     * Get app configuration
     */
    getConfiguration() {


        return this.appConfiguration
            .get();

    }



    /**
     * Reset all settings
     */
    reset():
        void {


        this.userPreferences
            .reset();


        this.privacySettings
            .reset();


        this.languageSettings
            .reset();


        this.appConfiguration
            .reset();

    }

}



export default SettingsManager;
