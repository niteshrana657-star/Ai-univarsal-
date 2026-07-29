/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Settings Types
 * File: SettingsTypes.ts
 * -------------------------------------------------------------
 *
 * Core type definitions for application settings.
 *
 * Features:
 * - User preferences
 * - Privacy configuration
 * - AI behaviour settings
 * - Language configuration
 * -------------------------------------------------------------
 */



export type ThemeMode =
    | "light"
    | "dark"
    | "system";



export type AppLanguage =
    | "en"
    | "hi"
    | "mr"
    | "te"
    | "bn"
    | "pa"
    | "kn"
    | "ta"
    | "ur";



export type AIResponseMode =
    | "normal"
    | "concise"
    | "detailed";



export interface UserPreferences {

    theme:
        ThemeMode;

    language:
        AppLanguage;

    responseMode:
        AIResponseMode;

    voiceEnabled:
        boolean;

    notificationsEnabled:
        boolean;

}



export interface PrivacySettings {

    screenAccess:
        boolean;

    microphoneAccess:
        boolean;

    cameraAccess:
        boolean;

    memoryStorage:
        boolean;

    dataSharing:
        boolean;

}



export interface AISettings {

    autoSuggestions:
        boolean;

    proactiveAssistance:
        boolean;

    learningMode:
        boolean;

    confirmationRequired:
        boolean;

}



export interface AppSettings {

    user:
        UserPreferences;

    privacy:
        PrivacySettings;

    ai:
        AISettings;

    updatedAt:
        number;

}
