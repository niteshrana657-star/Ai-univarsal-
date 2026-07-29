/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Settings Constants
 * File: SettingsConstants.ts
 * -------------------------------------------------------------
 *
 * Default values and fixed configuration constants.
 *
 * Features:
 * - Default app settings
 * - Supported languages
 * - Theme options
 * - AI behaviour defaults
 * -------------------------------------------------------------
 */



import {
    AppLanguage,
    ThemeMode,
    AIResponseMode
} from "./SettingsTypes";



export const DEFAULT_THEME:
    ThemeMode =
        "system";



export const DEFAULT_LANGUAGE:
    AppLanguage =
        "en";



export const DEFAULT_RESPONSE_MODE:
    AIResponseMode =
        "normal";



export const SUPPORTED_LANGUAGES:
    AppLanguage[] = [

        "en",

        "hi",

        "mr",

        "te",

        "bn",

        "pa",

        "kn",

        "ta",

        "ur"

    ];



export const DEFAULT_SETTINGS = {

    user: {

        theme:
            DEFAULT_THEME,

        language:
            DEFAULT_LANGUAGE,

        responseMode:
            DEFAULT_RESPONSE_MODE,

        voiceEnabled:
            true,

        notificationsEnabled:
            true

    },


    privacy: {

        screenAccess:
            false,

        microphoneAccess:
            false,

        cameraAccess:
            false,

        memoryStorage:
            true,

        dataSharing:
            false

    },


    ai: {

        autoSuggestions:
            true,

        proactiveAssistance:
            true,

        learningMode:
            true,

        confirmationRequired:
            true

    }

};
