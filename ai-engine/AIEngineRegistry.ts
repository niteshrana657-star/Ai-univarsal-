/**
 * AIEngineRegistry.ts
 *
 * Central registry system for Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Register AI modules
 * - Manage services
 * - Track bridges
 * - Discover capabilities
 */


// ==============================
// Core Types
// ==============================


export type RegistryItemType =
    | "MODULE"
    | "SERVICE"
    | "BRIDGE"
    | "PLUGIN";


export type RegistryStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "FAILED"
    | "LOADING";



// ==============================
// Registry Entry Contract
// ==============================


export interface IRegistryEntry {


    id:
        string;


    name:
        string;


    type:
        RegistryItemType;


    version:
        string;


    status:
        RegistryStatus;


    capabilities:
        string[];


    dependencies:
        string[];


    permissions:
        string[];


    metadata?:
        Record<string, unknown>;



    registeredAt:
        number;

}





// ==============================
// Module Information
// ==============================


export interface IModuleInfo {


    moduleId:
        string;


    moduleName:
        string;


    version:
        string;


    category:
        string;


    state:
        RegistryStatus;


    capabilities:
        string[];


    dependencies:
        string[];


    health:
        boolean;


    metadata?:
        Record<string, unknown>;

}





// ==============================
// Service Information
// ==============================


export interface IServiceInfo {


    serviceId:
        string;


    name:
        string;


    type:
        string;


    status:
        RegistryStatus;


    provider:
        string;


    version:
        string;


    capabilities:
        string[];


    metadata?:
        Record<string, unknown>;

}





// ==============================
// Bridge Information
// ==============================


export interface IBridgeInfo {


    bridgeId:
        string;


    name:
        string;


    targetModule:
        string;


    status:
        RegistryStatus;


    capabilities:
        string[];


    securityLevel:
        string;


    metadata?:
        Record<string, unknown>;

}
// ==============================
// AIEngineRegistry Class
// ==============================


export class AIEngineRegistry {


    private modules:
        Map<string, IModuleInfo>;


    private services:
        Map<string, IServiceInfo>;


    private bridges:
        Map<string, IBridgeInfo>;


    private capabilities:
        Map<string, string[]>;


    private createdAt:
        number;



    constructor() {


        this.modules =
            new Map<
                string,
                IModuleInfo
            >();



        this.services =
            new Map<
                string,
                IServiceInfo
            >();



        this.bridges =
            new Map<
                string,
                IBridgeInfo
            >();



        this.capabilities =
            new Map<
                string,
                string[]
            >();



        this.createdAt =
            Date.now();
    }





    // ==============================
    // Basic Information
    // ==============================


    public getModules():
        IModuleInfo[] {


        return Array.from(
            this.modules.values()
        );
    }





    public getServices():
        IServiceInfo[] {


        return Array.from(
            this.services.values()
        );
    }





    public getBridges():
        IBridgeInfo[] {


        return Array.from(
            this.bridges.values()
        );
    }





    public getCreatedAt():
        number {


        return this.createdAt;
    }





    // ==============================
    // Existence Checks
    // ==============================


    public hasModule(
        id: string
    ):
    boolean {


        return this.modules.has(
            id
        );
    }





    public hasService(
        id: string
    ):
    boolean {


        return this.services.has(
            id
        );
    }





    public hasBridge(
        id: string
    ):
    boolean {


        return this.bridges.has(
            id
        );
    }
}
// ==============================
// Module Registry
// ==============================


public registerModule(
    module: IModuleInfo
): boolean {


    try {


        if(
            !module.moduleId ||
            !module.moduleName
        ) {


            throw new Error(
                "Invalid module information"
            );
        }



        this.modules.set(

            module.moduleId,

            module

        );



        this.indexCapabilities(

            module.moduleId,

            module.capabilities

        );



        return true;



    } catch(error) {


        return false;
    }
}





public unregisterModule(
    moduleId: string
):
boolean {


    const removed =
        this.modules.delete(
            moduleId
        );


    this.capabilities.delete(
        moduleId
    );


    return removed;
}





public getModule(
    moduleId: string
):
IModuleInfo | undefined {


    return this.modules.get(
        moduleId
    );
}





public updateModule(
    module: IModuleInfo
):
boolean {


    if(
        !this.modules.has(
            module.moduleId
        )
    ) {


        return false;
    }



    this.modules.set(

        module.moduleId,

        module

    );



    this.indexCapabilities(

        module.moduleId,

        module.capabilities

    );



    return true;
}





// ==============================
// Service Registry
// ==============================


public registerService(
    service: IServiceInfo
):
boolean {


    try {


        if(
            !service.serviceId
        ) {


            throw new Error(
                "Service id missing"
            );
        }



        this.services.set(

            service.serviceId,

            service

        );



        return true;



    } catch(error) {


        return false;
    }
}





public unregisterService(
    serviceId: string
):
boolean {


    return this.services.delete(
        serviceId
    );
}





public getService(
    serviceId: string
):
IServiceInfo | undefined {


    return this.services.get(
        serviceId
    );
}





public findServicesByCapability(
    capability: string
):
IServiceInfo[] {


    return Array.from(

        this.services.values()

    ).filter(

        service =>
            service.capabilities.includes(
                capability
            )

    );
}
// ==============================
// Bridge Registry
// ==============================


public registerBridge(
    bridge: IBridgeInfo
):
boolean {


    try {


        if(
            !bridge.bridgeId ||
            !bridge.name
        ) {


            throw new Error(
                "Invalid bridge information"
            );
        }



        this.bridges.set(

            bridge.bridgeId,

            bridge

        );



        this.indexCapabilities(

            bridge.bridgeId,

            bridge.capabilities

        );



        return true;



    } catch(error) {


        return false;
    }
}





public unregisterBridge(
    bridgeId: string
):
boolean {


    this.capabilities.delete(
        bridgeId
    );


    return this.bridges.delete(
        bridgeId
    );
}





public getBridge(
    bridgeId: string
):
IBridgeInfo | undefined {


    return this.bridges.get(
        bridgeId
    );
}





public findBridgesByCapability(
    capability: string
):
IBridgeInfo[] {


    return Array.from(

        this.bridges.values()

    ).filter(

        bridge =>
            bridge.capabilities.includes(
                capability
            )

    );
}





// ==============================
// Capability Index
// ==============================


private indexCapabilities(
    id: string,
    capabilities: string[]
):
void {


    this.capabilities.set(

        id,

        [
            ...capabilities
        ]

    );
}





public getCapabilities(
    id: string
):
string[] {


    return (

        this.capabilities.get(
            id
        )
        ||
        []

    );
}





public findCapabilityProvider(
    capability: string
):
string[] {


    const providers: string[] = [];



    for(
        const [
            id,
            caps
        ]
        of this.capabilities.entries()
    ) {


        if(
            caps.includes(
                capability
            )
        ) {


            providers.push(
                id
            );
        }
    }



    return providers;
}





public search(
    capability: string
):
{
    modules: IModuleInfo[],
    services: IServiceInfo[],
    bridges: IBridgeInfo[]
} {


    return {


        modules:
            this.getModules()
            .filter(

                module =>
                    module.capabilities.includes(
                        capability
                    )

            ),



        services:
            this.getServices()
            .filter(

                service =>
                    service.capabilities.includes(
                        capability
                    )

            ),



        bridges:
            this.getBridges()
            .filter(

                bridge =>
                    bridge.capabilities.includes(
                        capability
                    )

            )

    };
}
// ==============================
// Event System
// ==============================


private listeners:
Map<
    string,
    Array<(payload: unknown)=>void>
>
=
new Map();





public on(
    event:
    string,

    callback:
    (payload: unknown)=>void

):
void {


    const handlers =
        this.listeners.get(
            event
        )
        ||
        [];



    handlers.push(
        callback
    );



    this.listeners.set(

        event,

        handlers

    );
}





public emit(
    event:
    string,

    payload?:
    unknown

):
void {


    const handlers =
        this.listeners.get(
            event
        );



    if(!handlers) {

        return;
    }



    for(
        const handler
        of handlers
    ) {


        try {


            handler(
                payload
            );


        } catch(error) {


            console.error(
                "Registry event error",
                error
            );
        }
    }
}





// ==============================
// Validation
// ==============================


public validateModule(
    module:
    IModuleInfo
):
boolean {


    return !!(

        module.moduleId
        &&
        module.moduleName
        &&
        module.version

    );
}





public validateService(
    service:
    IServiceInfo
):
boolean {


    return !!(

        service.serviceId
        &&
        service.name

    );
}





public validateBridge(
    bridge:
    IBridgeInfo
):
boolean {


    return !!(

        bridge.bridgeId
        &&
        bridge.name

    );
}





// ==============================
// Registry Status
// ==============================


public getStatus():
Record<string, unknown>
{


    return {


        modules:
            this.modules.size,


        services:
            this.services.size,


        bridges:
            this.bridges.size,


        capabilities:
            this.capabilities.size,


        createdAt:
            this.createdAt

    };
}





// ==============================
// Clear Registry
// ==============================


public clear():
void {


    this.modules.clear();


    this.services.clear();


    this.bridges.clear();


    this.capabilities.clear();


    this.listeners.clear();
}





public isEmpty():
boolean {


    return (

        this.modules.size === 0

        &&

        this.services.size === 
