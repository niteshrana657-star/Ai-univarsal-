/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Settings Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for Settings module.
 * -------------------------------------------------------------
 */


// Settings Types

export type {
    ThemeMode,
    AppLanguage,
    AIResponseMode,
    UserPreferences as UserPreferencesType,
    PrivacySettings as PrivacySettingsType,
    AISettings,
    AppSettings
} from "./SettingsTypes";



// Settings Constants

export {
    DEFAULT_THEME,
    DEFAULT_LANGUAGE,
    DEFAULT_RESPONSE_MODE,
    SUPPORTED_LANGUAGES,
    DEFAULT_SETTINGS
} from "./SettingsConstants";



// User Preferences

export {
    UserPreferences
} from "./UserPreferences";



// Privacy Settings

export {
    PrivacySettings
} from "./PrivacySettings";



// Language Settings

export {
    LanguageSettings
} from "./LanguageSettings";



// App Configuration

export {
    AppConfiguration
} from "./AppConfiguration";



// Settings Manager

export {
    SettingsManager
} from "./SettingsManager";
