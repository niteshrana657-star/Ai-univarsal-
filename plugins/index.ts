/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugins Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for Plugins module.
 * -------------------------------------------------------------
 */


// Plugin Types

export type {
    PluginStatus,
    PluginPermission,
    PluginMetadata,
    PluginConfig,
    PluginContext,
    PluginInstance,
    PluginExecutionResult
} from "./PluginTypes";



// Plugin Events

export {
    PluginEvents
} from "./PluginEvents";


export type {
    PluginEventType,
    PluginEvent,
    PluginEventListener
} from "./PluginEvents";



// Plugin Security

export {
    PluginSecurity
} from "./PluginSecurity";


export type {
    PluginSecurityResult
} from "./PluginSecurity";



// Plugin Loader

export {
    PluginLoader
} from "./PluginLoader";


export type {
    LoadedPlugin
} from "./PluginLoader";



// Plugin Registry

export {
    PluginRegistry
} from "./PluginRegistry";



// Plugin Manager

export {
    PluginManager
} from "./PluginManager";
