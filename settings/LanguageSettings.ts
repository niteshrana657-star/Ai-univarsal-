/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Language Settings
 * File: LanguageSettings.ts
 * -------------------------------------------------------------
 *
 * Manages application language configuration.
 *
 * Features:
 * - Current language handling
 * - Language switching
 * - Supported language checking
 * - Language reset
 * -------------------------------------------------------------
 */


import {
    AppLanguage
} from "./SettingsTypes";


import {
    DEFAULT_LANGUAGE,
    SUPPORTED_LANGUAGES
} from "./SettingsConstants";



export class LanguageSettings {


    private language:
        AppLanguage;



    constructor() {


        this.language =
            DEFAULT_LANGUAGE;

    }



    /**
     * Get current language
     */
    get():
        AppLanguage {


        return this.language;

    }



    /**
     * Set language
     */
    set(
        language:
            AppLanguage
    ):
        boolean {


        if (
            !this.isSupported(language)
        ) {

            return false;

        }



        this.language =
            language;



        return true;

    }



    /**
     * Check language support
     */
    isSupported(
        language:
            string
    ):
        boolean {


        return SUPPORTED_LANGUAGES
            .includes(
                language as AppLanguage
            );

    }



    /**
     * Get available languages
     */
    getSupported():
        AppLanguage[] {


        return [

            ...SUPPORTED_LANGUAGES

        ];

    }



    /**
     * Reset language
     */
    reset():
        void {


        this.language =
            DEFAULT_LANGUAGE;

    }

}



export default LanguageSettings;
