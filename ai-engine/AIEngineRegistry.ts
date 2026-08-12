/**
 * AIEngineRegistry.ts
 *
 * Registry for Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Register AI Engine modules
 * - Unregister modules
 * - Track module state and health
 * - Manage module metadata
 * - Resolve dependencies
 * - Provide registry health information
 * - Support lifecycle cleanup
 */

// ==============================
// Core Types
// ==============================

export type AIRegistryModuleState =
    | "REGISTERED"
    | "INITIALIZING"
    | "ACTIVE"
    | "PAUSED"
    | "ERROR"
    | "STOPPED"
    | "DISABLED";

export type AIRegistryModuleCategory =
    | "CORE"
    | "AI"
    | "MEMORY"
    | "VOICE"
    | "AUTOMATION"
    | "SECURITY"
    | "PERMISSIONS"
    | "NETWORK"
    | "STORAGE"
    | "CLOUD"
    | "ANALYTICS"
    | "INTEGRATION"
    | "UI"
    | "PLUGIN"
    | "SYSTEM"
    | "OTHER";

// ==============================
// Module Definition
// ==============================

export interface IAIRegistryModule {

    moduleId: string;

    moduleName: string;

    version: string;

    category: AIRegistryModuleCategory | string;

    state: AIRegistryModuleState;

    capabilities: string[];

    dependencies: string[];

    health: boolean;

    description?: string;

    metadata?: Record<string, unknown>;

    registeredAt?: number;

    updatedAt?: number;
}

// ==============================
// Registry Entry
// ==============================

export interface IAIRegistryEntry
    extends IAIRegistryModule {

    registeredAt: number;

    updatedAt: number;
}

// ==============================
// Registry Statistics
// ==============================

export interface IAIRegistryStats {

    total: number;

    active: number;

    registered: number;

    initializing: number;

    paused: number;

    error: number;

    stopped: number;

    disabled: number;

    healthy: number;

    unhealthy: number;
}

// ==============================
// Registry Health
// ==============================

export interface IAIRegistryHealth {

    healthy: boolean;

    totalModules: number;

    healthyModules: number;

    unhealthyModules: number;

    errors: string[];

    timestamp: number;
}

// ==============================
// Registry Event
// ==============================

export interface IAIRegistryEvent {

    type: string;

    moduleId?: string;

    timestamp: number;

    payload?: unknown;
}

// ==============================
// Event Listener
// ==============================

export type AIRegistryEventListener =
    (
        event: IAIRegistryEvent
    ) => void;

// ==============================
// AIEngineRegistry
// ==============================

export class AIEngineRegistry {

    private readonly modules:
        Map<string, IAIRegistryEntry>;

    private readonly listeners:
        Map<string, Set<AIRegistryEventListener>>;

    private readonly errors:
        string[];

    private createdAt: number;


    constructor() {

        this.modules =
            new Map<
                string,
                IAIRegistryEntry
            >();

        this.listeners =
            new Map<
                string,
                Set<AIRegistryEventListener>
            >();

        this.errors = [];

        this.createdAt =
            Date.now();
    }


    // ==============================
    // Registration
    // ==============================

    public registerModule(
        module: IAIRegistryModule
    ): boolean {

        try {

            this.validateModuleDefinition(
                module
            );

            const now =
                Date.now();

            const existing =
                this.modules.get(
                    module.moduleId
                );

            const entry:
                IAIRegistryEntry = {

                ...module,

                capabilities: [
                    ...module.capabilities
                ],

                dependencies: [
                    ...module.dependencies
                ],

                registeredAt:
                    existing?.registeredAt ??
                    module.registeredAt ??
                    now,

                updatedAt:
                    now
            };

            this.modules.set(
                module.moduleId,
                entry
            );

            this.emit({
                type:
                    existing
                        ? "MODULE.UPDATED"
                        : "MODULE.REGISTERED",

                moduleId:
                    module.moduleId,

                timestamp:
                    now,

                payload:
                    entry
            });

            return true;

        } catch (error) {

            this.addError(
                error instanceof Error
                    ? error.message
                    : "Module registration failed"
            );

            return false;
        }
    }


    // ==============================
    // Unregister
    // ==============================

    public unregisterModule(
        moduleId: string
    ): boolean {

        const removed =
            this.modules.delete(
                moduleId
            );

        if (removed) {

            this.emit({

                type:
                    "MODULE.UNREGISTERED",

                moduleId,

                timestamp:
                    Date.now()
            });
        }

        return removed;
    }


    // ==============================
    // Get Module
    // ==============================

    public getModule(
        moduleId: string
    ):
        IAIRegistryEntry | undefined {

        return this.modules.get(
            moduleId
        );
    }


    // ==============================
    // Has Module
    // ==============================

    public hasModule(
        moduleId: string
    ): boolean {

        return this.modules.has(
            moduleId
        );
    }


    // ==============================
    // Get All Modules
    // ==============================

    public getModules():
        IAIRegistryEntry[] {

        return Array.from(
            this.modules.values()
        ).map(
            module => ({
                ...module,

                capabilities: [
                    ...module.capabilities
                ],

                dependencies: [
                    ...module.dependencies
                ]
            })
        );
    }


    // ==============================
    // Get Module IDs
    // ==============================

    public getModuleIds():
        string[] {

        return Array.from(
            this.modules.keys()
        );
    }


    // ==============================
    // Module Count
    // ==============================

    public getModuleCount():
        number {

        return this.modules.size;
    }


    // ==============================
    // Update Module State
    // ==============================

    public setModuleState(
        moduleId: string,
        state: AIRegistryModuleState
    ): boolean {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {

            this.addError(
                `Module not found: ${moduleId}`
            );

            return false;
        }

        module.state =
            state;

        module.updatedAt =
            Date.now();

        this.emit({

            type:
                "MODULE.STATE_CHANGED",

            moduleId,

            timestamp:
                Date.now(),

            payload:
                state
        });

        return true;
    }


    // ==============================
    // Update Health
    // ==============================

    public setModuleHealth(
        moduleId: string,
        health: boolean
    ): boolean {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {

            this.addError(
                `Module not found: ${moduleId}`
            );

            return false;
        }

        module.health =
            health;

        module.updatedAt =
            Date.now();

        this.emit({

            type:
                "MODULE.HEALTH_CHANGED",

            moduleId,

            timestamp:
                Date.now(),

            payload:
                health
        });

        return true;
    }


    // ==============================
    // Update Capabilities
    // ==============================

    public setModuleCapabilities(
        moduleId: string,
        capabilities: string[]
    ): boolean {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {

            this.addError(
                `Module not found: ${moduleId}`
            );

            return false;
        }

        module.capabilities =
            [
                ...capabilities
            ];

        module.updatedAt =
            Date.now();

        this.emit({

            type:
                "MODULE.CAPABILITIES_CHANGED",

            moduleId,

            timestamp:
                Date.now(),

            payload:
                capabilities
        });

        return true;
    }


    // ==============================
    // Find By Category
    // ==============================

    public getModulesByCategory(
        category: string
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.category === category
        );
    }


    // ==============================
    // Find By State
    // ==============================

    public getModulesByState(
        state: AIRegistryModuleState
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.state === state
        );
    }


    // ==============================
    // Find By Capability
    // ==============================

    public findByCapability(
        capability: string
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.capabilities.includes(
                    capability
                )
        );
    }


    // ==============================
    // Find By Dependency
    // ==============================

    public findDependents(
        moduleId: string
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.dependencies.includes(
                    moduleId
                )
        );
    }


    // ==============================
    // Dependency Check
    // ==============================

    public areDependenciesAvailable(
        moduleId: string
    ): boolean {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {
            return false;
        }

        return module.dependencies.every(
            dependency =>
                this.modules.has(
                    dependency
                )
        );
    }


    // ==============================
    // Missing Dependencies
    // ==============================

    public getMissingDependencies(
        moduleId: string
    ):
        string[] {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {
            return [];
        }

        return module.dependencies.filter(
            dependency =>
                !this.modules.has(
                    dependency
                )
        );
    }


    // ==============================
    // Statistics
    // ==============================

    public getStats():
        IAIRegistryStats {

        const modules =
            this.getModules();

        return {

            total:
                modules.length,

            active:
                this.countState(
                    modules,
                    "ACTIVE"
                ),

            registered:
                this.countState(
                    modules,
                    "REGISTERED"
                ),

            initializing:
                this.countState(
                    modules,
                    "INITIALIZING"
                ),

            paused:
                this.countState(
                    modules,
                    "PAUSED"
                ),

            error:
                this.countState(
                    modules,
                    "ERROR"
                ),

            stopped:
                this.countState(
                    modules,
                    "STOPPED"
                ),

            disabled:
                this.countState(
                    modules,
                    "DISABLED"
                ),

            healthy:
                modules.filter(
                    module =>
                        module.health
                ).length,

            unhealthy:
                modules.filter(
                    module =>
                        !module.health
                ).length
        };
    }


    // ==============================
    // Health Check
    // ==============================

    public healthCheck():
        IAIRegistryHealth {

        const modules =
            this.getModules();

        const unhealthy =
            modules.filter(
                module =>
                    !module.health ||
                    module.state === "ERROR"
            );

        const errors:
            string[] = [
                ...this.errors
            ];

        for (
            const module
            of unhealthy
        ) {

            errors.push(
                `Module unhealthy: ${module.moduleId}`
            );
        }

        return {

            healthy:
                modules.length === 0
                    ? true
                    : unhealthy.length === 0,

            totalModules:
                modules.length,

            healthyModules:
                modules.length -
                unhealthy.length,

            unhealthyModules:
                unhealthy.length,

            errors,

            timestamp:
                Date.now()
        };
    }


    // ==============================
    // Validation
    // ==============================

    public validateModule(
        module: IAIRegistryModule
    ): boolean {

        try {

            this.validateModuleDefinition(
                module
            );

            return true;

        } catch {

            return false;
        }
    }


    private validateModuleDefinition(
        module: IAIRegistryModule
    ): void {

        if (!module) {

            throw new Error(
                "Module definition is missing"
            );
        }

        if (!module.moduleId) {

            throw new Error(
                "Module ID is missing"
            );
        }

        if (!module.moduleName) {

            throw new Error(
                `Module name is missing: ${module.moduleId}`
            );
        }

        if (!module.version) {

            throw new Error(
                `Module version is missing: ${module.moduleId}`
            );
        }

        if (!module.category) {

            throw new Error(
                `Module category is missing: ${module.moduleId}`
            );
        }

        if (!Array.isArray(
            module.capabilities
        )) {

            throw new Error(
                `Module capabilities must be an array: ${module.moduleId}`
            );
        }

        if (!Array.isArray(
            module.dependencies
        )) {

            throw new Error(
                `Module dependencies must be an array: ${module.moduleId}`
            );
        }
    }


    // ==============================
    // Errors
    // ==============================

    private addError(
        error: string
    ): void {

        this.errors.push(
            error
        );

        this.emit({

            type:
                "REGISTRY.ERROR",

            timestamp:
                Date.now(),

            payload:
                error
        });
    }


    public getErrors():
        string[] {

        return [
            ...this.errors
        ];
    }


    public clearErrors():
        void {

        this.errors.length =
            0;
    }


    // ==============================
    // Events
    // ==============================

    public on(
        eventType: string,
        listener: AIRegistryEventListener
    ): () => void {

        let handlers =
            this.listeners.get(
                eventType
            );

        if (!handlers) {

            handlers =
                new Set<
                    AIRegistryEventListener
                >();

            this.listeners.set(
                eventType,
                handlers
            );
        }

        handlers.add(
            listener
        );

        return () => {

            handlers?.delete(
                listener
            );
        };
    }


    public off(
        eventType: string,
        listener: AIRegistryEventListener
    ): void {

        const handlers =
            this.listeners.get(
                eventType
            );

        if (!handlers) {
            return;
        }

        handlers.delete(
            listener
        );

        if (
            handlers.size === 0
        ) {

            this.listeners.delete(
                eventType
            );
        }
    }


    private emit(
        event: IAIRegistryEvent
    ): void {

        const handlers =
            this.listeners.get(
                event.type
            );

        if (!handlers) {
            return;
        }

        for (
            const handler
            of handlers
        ) {

            try {

                handler(
                    event
                );

            } catch (error) {

                this.errors.push(

                    error instanceof Error
                        ? error.message
                        : "Registry event handler failed"

                );
            }
        }
    }


    // ==============================
    // Export Registry
    // ==============================

    public export():
        IAIRegistryEntry[] {

        return this.getModules();
    }


    // ==============================
    // Import Registry
    // ==============================

    public import(
        modules: IAIRegistryModule[]
    ): number {

        if (!Array.isArray(
            modules
        )) {

            return 0;
        }

        let imported =
            0;

        for (
            const module
            of modules
        ) {

            if (
                this.registerModule(
                    module
                )
            ) {

                imported++;
            }
        }

        return imported;
    }


    // ==============================
    // Registry Information
    // ==============================

    public getRegistryInfo():
        Record<string, unknown> {

        return {

            createdAt:
                this.createdAt,

            moduleCount:
                this.modules.size,

            stats:
                this.getStats(),

            health:
                this.healthCheck(),

            errors:
                this.getErrors()
        };
    }


    // ==============================
    // Clear Registry
    // ==============================

    public clear():
        void {

        const moduleIds =
            this.getModuleIds();

        this.modules.clear();

        this.emit({

            type:
                "REGISTRY.CLEARED",

            timestamp:
                Date.now(),

            paylo
