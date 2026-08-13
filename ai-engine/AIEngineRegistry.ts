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
 * - Event notifications
 * - Registry import/export
 */

// ============================================================
// Core Types
// ============================================================

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

// ============================================================
// Module Definition
// ============================================================

export interface IAIRegistryModule {

    moduleId: string;

    moduleName: string;

    version: string;

    category:
        AIRegistryModuleCategory | string;

    state:
        AIRegistryModuleState;

    capabilities: string[];

    dependencies: string[];

    health: boolean;

    description?: string;

    metadata?: Record<string, unknown>;

    registeredAt?: number;

    updatedAt?: number;
}

// ============================================================
// Registry Entry
// ============================================================

export interface IAIRegistryEntry
    extends IAIRegistryModule {

    registeredAt: number;

    updatedAt: number;
}

// ============================================================
// Registry Statistics
// ============================================================

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

// ============================================================
// Registry Health
// ============================================================

export interface IAIRegistryHealth {

    healthy: boolean;

    totalModules: number;

    healthyModules: number;

    unhealthyModules: number;

    errors: string[];

    timestamp: number;
}

// ============================================================
// Registry Event
// ============================================================

export interface IAIRegistryEvent {

    type: string;

    moduleId?: string;

    timestamp: number;

    payload?: unknown;
}

// ============================================================
// Event Listener
// ============================================================

export type AIRegistryEventListener =
    (
        event: IAIRegistryEvent
    ) => void;

// ============================================================
// AIEngineRegistry
// ============================================================

export class AIEngineRegistry {

    private readonly modules:
        Map<string, IAIRegistryEntry>;

    private readonly listeners:
        Map<
            string,
            Set<AIRegistryEventListener>
        >;

    private readonly errors:
        string[];

    private readonly createdAt:
        number;


    // ========================================================
    // Constructor
    // ========================================================

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


    // ========================================================
    // Registration
    // ========================================================

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

                moduleId:
                    module.moduleId,

                moduleName:
                    module.moduleName,

                version:
                    module.version,

                category:
                    module.category,

                state:
                    module.state,

                capabilities:
                    [
                        ...module.capabilities
                    ],

                dependencies:
                    [
                        ...module.dependencies
                    ],

                health:
                    module.health,

                description:
                    module.description,

                metadata:
                    module.metadata
                        ? {
                            ...module.metadata
                        }
                        : undefined,

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
                    this.cloneEntry(
                        entry
                    )
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


    // ========================================================
    // Unregister
    // ========================================================

    public unregisterModule(
        moduleId: string
    ): boolean {

        const normalizedId =
            moduleId.trim();

        if (!normalizedId) {

            this.addError(
                "Module ID cannot be empty"
            );

            return false;
        }

        const removed =
            this.modules.delete(
                normalizedId
            );

        if (removed) {

            this.emit({

                type:
                    "MODULE.UNREGISTERED",

                moduleId:
                    normalizedId,

                timestamp:
                    Date.now()
            });
        }

        return removed;
    }


    // ========================================================
    // Get Module
    // ========================================================

    public getModule(
        moduleId: string
    ):
        IAIRegistryEntry | undefined {

        const module =
            this.modules.get(
                moduleId
            );

        if (!module) {
            return undefined;
        }

        return this.cloneEntry(
            module
        );
    }


    // ========================================================
    // Has Module
    // ========================================================

    public hasModule(
        moduleId: string
    ): boolean {

        return this.modules.has(
            moduleId
        );
    }


    // ========================================================
    // Get All Modules
    // ========================================================

    public getModules():
        IAIRegistryEntry[] {

        return Array.from(
            this.modules.values()
        ).map(
            module =>
                this.cloneEntry(
                    module
                )
        );
    }


    // ========================================================
    // Get Module IDs
    // ========================================================

    public getModuleIds():
        string[] {

        return Array.from(
            this.modules.keys()
        );
    }


    // ========================================================
    // Module Count
    // ========================================================

    public getModuleCount():
        number {

        return this.modules.size;
    }


    // ========================================================
    // Update Module
    // ========================================================

    public updateModule(
        moduleId: string,
        updates:
            Partial<
                Omit<
                    IAIRegistryModule,
                    "moduleId"
                >
            >
    ): boolean {

        const existing =
            this.modules.get(
                moduleId
            );

        if (!existing) {

            this.addError(
                `Module not found: ${moduleId}`
            );

            return false;
        }

        try {

            const updated:
                IAIRegistryModule = {

                ...existing,

                ...updates,

                moduleId:
                    existing.moduleId,

                capabilities:
                    updates.capabilities
                        ? [
                            ...updates.capabilities
                        ]
                        : [
                            ...existing.capabilities
                        ],

                dependencies:
                    updates.dependencies
                        ? [
                            ...updates.dependencies
                        ]
                        : [
                            ...existing.dependencies
                        ]
            };

            this.validateModuleDefinition(
                updated
            );

            const now =
                Date.now();

            const entry:
                IAIRegistryEntry = {

                ...updated,

                registeredAt:
                    existing.registeredAt,

                updatedAt:
                    now
            };

            this.modules.set(
                moduleId,
                entry
            );

            this.emit({

                type:
                    "MODULE.UPDATED",

                moduleId,

                timestamp:
                    now,

                payload:
                    this.cloneEntry(
                        entry
                    )
            });

            return true;

        } catch (error) {

            this.addError(
                error instanceof Error
                    ? error.message
                    : "Module update failed"
            );

            return false;
        }
    }


    // ========================================================
    // Update Module State
    // ========================================================

    public setModuleState(
        moduleId: string,
        state:
            AIRegistryModuleState
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
                module.updatedAt,

            payload:
                state
        });

        return true;
    }


    // ========================================================
    // Update Health
    // ========================================================

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
                module.updatedAt,

            payload:
                health
        });

        return true;
    }


    // ========================================================
    // Update Capabilities
    // ========================================================

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

        if (!Array.isArray(
            capabilities
        )) {

            this.addError(
                `Capabilities must be an array: ${moduleId}`
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
                module.updatedAt,

            payload:
                [
                    ...module.capabilities
                ]
        });

        return true;
    }


    // ========================================================
    // Update Dependencies
    // ========================================================

    public setModuleDependencies(
        moduleId: string,
        dependencies: string[]
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

        if (!Array.isArray(
            dependencies
        )) {

            this.addError(
                `Dependencies must be an array: ${moduleId}`
            );

            return false;
        }

        module.dependencies =
            [
                ...dependencies
            ];

        module.updatedAt =
            Date.now();

        this.emit({

            type:
                "MODULE.DEPENDENCIES_CHANGED",

            moduleId,

            timestamp:
                module.updatedAt,

            payload:
                [
                    ...module.dependencies
                ]
        });

        return true;
    }


    // ========================================================
    // Find By Category
    // ========================================================

    public getModulesByCategory(
        category: string
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.category === category
        );
    }


    // ========================================================
    // Find By State
    // ========================================================

    public getModulesByState(
        state:
            AIRegistryModuleState
    ):
        IAIRegistryEntry[] {

        return this.getModules().filter(
            module =>
                module.state === state
        );
    }


    // ========================================================
    // Find By Capability
    // ========================================================

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


    // ========================================================
    // Find Dependents
    // ========================================================

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


    // ========================================================
    // Dependency Availability
    // ========================================================

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


    // ========================================================
    // Missing Dependencies
    // ========================================================

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


    // ========================================================
    // Statistics
    // ========================================================

    public getStats():
        IAIRegistryStats {

        const modules =
            Array.from(
                this.modules.values()
            );

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
                        module.health === true
                ).length,

            unhealthy:
                modules.filter(
                    module =>
                        module.health === false
                ).length
        };
    }


    // ========================================================
    // Health Check
    // ========================================================

    public healthCheck():
        IAIRegistryHealth {

        const modules =
            Array.from(
                this.modules.values()
            );

        const unhealthy =
            modules.filter(
                module =>
                    module.health !== true ||
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

            const message =
                `Module unhealthy: ${module.moduleId}`;

            if (!errors.includes(
                message
            )) {

                errors.push(
                    message
                );
            }
        }

        return {

            healthy:
                unhealthy.length === 0,

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


    // ========================================================
    // Validation
    // ========================================================

    public validateModule(
        module:
            IAIRegistryModule
    ):
        boolean {

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
        module:
            IAIRegistryModule
    ):
        void {

        if (!module) {

            throw new Error(
                "Module definition is missing"
            );
        }

        if (
            typeof module.moduleId !==
            "string" ||
            !module.moduleId.trim()
        ) {

            throw new Error(
                "Module ID is missing"
            );
        }

        if (
            typeof module.moduleName !==
            "string" ||
            !module.moduleName.trim()
        ) {

            throw new Error(
                `Module name is missing: ${module.moduleId}`
            );
        }

        if (
            typeof module.version !==
            "string" ||
            !module.version.trim()
        ) {

            throw new Error(
                `Module version is missing: ${module.moduleId}`
            );
        }

        if (
            typeof module.category !==
            "string" ||
            !module.category.trim()
        ) {

            throw new Error(
                `Module category is missing: ${module.moduleId}`
            );
        }

        if (
            !Array.isArray(
                module.capabilities
            )
        ) {

            throw new Error(
                `Module capabilities must be an array: ${module.moduleId}`
            );
        }

        if (
            !Array.isArray(
                module.dependencies
            )
        ) {

            throw new Error(
                `Module dependencies must be an array: ${module.moduleId}`
            );
        }

        if (
            typeof module.health !==
            "boolean"
        ) {

            throw new Error(
                `Module health must be boolean: ${module.moduleId}`
            );
        }

        if (
            !this.isValidModuleState(
                module.state
            )
        ) {

            throw new Error(
                `Invalid module state: ${module.moduleId}`
            );
        }
    }


    private isValidModuleState(
        state:
            AIRegistryModuleState
    ):
        boolean {

        return (

            state === "REGISTERED" ||
            state === "INITIALIZING" ||
            state === "ACTIVE" ||
            state === "PAUSED" ||
            state === "ERROR" ||
            state === "STOPPED" ||
            state === "DISABLED"

        );
    }


    // ========================================================
    // Error Management
    // ========================================================

    private addError(
        error: string
    ):
        void {

        const message =
            error.trim();

        if (!message) {
            return;
        }

        this.errors.push(
            message
        );

        this.emit({

            type:
                "REGISTRY.ERROR",

            timestamp:
                Date.now(),

            payload:
                message
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


    // ========================================================
    // Event Registration
    // ========================================================

    public on(
        eventType: string,
        listener:
            AIRegistryEventListener
    ):
        () => void {

        if (
            typeof eventType !==
            "string" ||
            !eventType.trim()
        ) {

            throw new Error(
                "Event type cannot be empty"
            );
        }

        if (
            typeof listener !==
            "function"
        ) {

            throw new Error(
                "Event listener must be a function"
            );
        }

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

            this.off(
                eventType,
                listener
            );
        };
    }


    // ========================================================
    // Event Removal
    // ========================================================

    public off(
        eventType: string,
        listener:
            AIRegistryEventListener
    ):
        void {

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


    // ========================================================
    // Event Emit
    // ========================================================

    private emit(
        event:
            IAIRegistryEvent
    ):
        void {

        const handlers =
            this.listeners.get(
                event.type
            );

        if (!handlers) {
            return;
        }

        for (
            const handler
            of Array.from(
                handlers
            )
        ) {

            try {

                handler(
                    event
                );

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : "Registry event handler failed";

                this.errors.push(
                    message
                );
            }
        }
    }


    // ========================================================
    // Export Registry
    // ========================================================

    public export():
        IAIRegistryEntry[] {

        return this.getModules();
    }


    // ========================================================
    // Import Registry
    // ========================================================

    public import(
        modules:
            IAIRegistryModule[]
    ):
        number {

        if (
            !Array.isArray(
                modules
            )
        ) {

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


    // ========================================================
    // Registry Information
    // ========================================================

    public getRegistryInfo():
        Record<string, unknown> {

        return {

            createdAt:
                this.createdAt,

            moduleCount:
                this.modules.size,

            moduleIds:
                this.getModuleIds(),

            stats:
                this.getStats(),

            health:
                this.healthCheck(),

            errors:
                this.getErrors()
        };
    }


    // ========================================================
    // Clear Registry
    // ========================================================

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

            payload:
                moduleIds
        });
    }


    // ========================================================
    // Destroy
    // ========================================================

    public destroy():
        void {

        this.clear();

        this.listeners.clear();

        this.errors.length =
            0;
    }


    // ========================================================
    // Utility
    // ========================================================

    private countState(
        modules:
            IAIRegistryEntry[],
        state:
            AIRegistryModuleState
    ):
        number {

        return modules.filter(
            module =>
                module.state === state
        ).length;
    }


    private cloneEntry(
        module:
            IAIRegistryEntry
    ):
        IAIRegistryEntry {

        return {

            ...module,

            capabilities:
                [
                    ...module.capabilities
                ],

            dependencies:
                [
                    ...module.dependencies
                ],

            metadata:
                module.metadata
                    ? {
                        ...module.metadata
                    }
                    : undefined
        };
    }
}


// ============================================================
// Default Registry
// ============================================================

export const DefaultAIEngineRegistry =
    new AIEngineRegistry();
