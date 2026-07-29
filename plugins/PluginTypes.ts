/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Types
 * File: PluginTypes.ts
 * -------------------------------------------------------------
 *
 * Core type definitions for plugin ecosystem.
 *
 * Features:
 * - Plugin metadata
 * - Plugin lifecycle
 * - Plugin permissions
 * - Plugin configuration
 * -------------------------------------------------------------
 */


export type PluginStatus =
    | "installed"
    | "enabled"
    | "disabled"
    | "error"
    | "removed";



export type PluginPermission =
    | "ai_access"
    | "memory_access"
    | "screen_access"
    | "automation_access"
    | "network_access"
    | "storage_access";



export interface PluginMetadata {

    id: string;

    name: string;

    version: string;

    description?: string;

    author?: string;

    status: PluginStatus;

    permissions: PluginPermission[];

    createdAt: number;

}



export interface PluginConfig {

    enabled: boolean;

    settings:
        Record<string, unknown>;

}



export interface PluginContext {

    pluginId: string;

    config: PluginConfig;

    metadata: PluginMetadata;

}



export interface PluginInstance {

    metadata: PluginMetadata;

    initialize():
        Promise<void> | void;

    start():
        Promise<void> | void;

    stop():
        Promise<void> | void;

    destroy():
        Promise<void> | void;

}



export interface PluginExecutionResult {

    success: boolean;

    message: string;

    data?: unknown;

    timestamp: number;

}
