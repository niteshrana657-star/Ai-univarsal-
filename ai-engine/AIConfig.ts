/**
 * Universal AI Operating Companion
 * AI Configuration
 * Version: 1.0.0
 */


/**
 * AI Runtime Environment
 */
export enum AIRuntime {

    DEVELOPMENT = "development",

    TESTING = "testing",

    PRODUCTION = "production"

}



/**
 * AI Provider Type
 */
export enum AIProviderType {

    LOCAL = "local",

    CLOUD = "cloud",

    HYBRID = "hybrid"

}



/**
 * AI Feature Configuration
 */
export interface AIFeatureConfig {

    memory: boolean;

    voice: boolean;

    screenUnderstanding: boolean;

    automation: boolean;

    plugins: boolean;

    remoteAssistance: boolean;

}



/**
 * AI Security Configuration
 */
export interface AISecurityConfig {

    requirePermission: boolean;

    sensitiveActionApproval: boolean;

    encryptedMemory: boolean;

}



/**
 * Main AI Configuration
 */
export interface AIConfig {


    appName: string;


    version: string;


    runtime: AIRuntime;


    providerType: AIProviderType;


    features: AIFeatureConfig;


    security: AISecurityConfig;


    maxContextLength: number;


    enableLogging: boolean;


}



/**
 * Default AI Configuration
 */
export const DefaultAIConfig:
    AIConfig = {


    appName:
        "Universal AI Operating Companion",


    version:
        "1.0.0",


    runtime:
        AIRuntime.DEVELOPMENT,


    providerType:
        AIProviderType.HYBRID,


    features:
    {

        memory:
            true,

        voice:
            true,

        screenUnderstanding:
            true,

        automation:
            true,

        plugins:
            true,

        remoteAssistance:
            false

    },


    security:
    {

        requirePermission:
            true,

        sensitiveActionApproval:
            true,

        encryptedMemory:
            true

    },


    maxContextLength:
        100000,


    enableLogging:
        true

};
