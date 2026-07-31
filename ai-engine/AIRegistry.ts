/**
 * Universal AI Operating Companion
 * AI Registry System
 * Version: 1.0.0
 */



/**
 * Registry Item Type
 */
export enum AIRegistryType {

    MODEL = "model",

    PROVIDER = "provider",

    SERVICE = "service",

    PLUGIN = "plugin"

}



/**
 * Registry Item
 */
export interface AIRegistryItem {


    id: string;


    name: string;


    type: AIRegistryType;


    instance: unknown;


    enabled: boolean;


    createdAt: number;

}



/**
 * AI Registry Manager
 */
export class AIRegistry {


    private items:
        Map<string, AIRegistryItem>;



    constructor() {


        this.items =
            new Map();

    }



    /**
     * Register component
     */
    register(
        item:
            Omit<AIRegistryItem, "createdAt">
    ): void {


        this.items.set(

            item.id,

            {

                ...item,

                createdAt:
                    Date.now()

            }

        );

    }



    /**
     * Remove component
     */
    unregister(
        id: string
    ): boolean {


        return this.items.delete(
            id
        );

    }



    /**
     * Get component
     */
    get(
        id: string
    ):
        AIRegistryItem | undefined {


        return this.items.get(
            id
        );

    }



    /**
     * Get by type
     */
    getByType(
        type: AIRegistryType
    ):
        AIRegistryItem[] {


        return Array.from(
            this.items.values()
        ).filter(

            item =>
                item.type === type

        );

    }



    /**
     * Enable component
     */
    enable(
        id: string
    ): boolean {


        const item =
            this.items.get(
                id
            );


        if (!item) {

            return false;

        }


        item.enabled =
            true;


        return true;

    }



    /**
     * Disable component
     */
    disable(
        id: string
    ): boolean {


        const item =
            this.items.get(
                id
            );


        if (!item) {

            return false;

        }


        item.enabled =
            false;


        return true;

    }



    /**
     * Get all components
     */
    getAll():
        AIRegistryItem[] {


        return Array.from(
            this.items.values()
        );

    }



    /**
     * Clear registry
     */
    clear(): void {


        this.items.clear();

    }

}
