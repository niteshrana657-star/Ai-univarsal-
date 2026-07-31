/**
 * Universal AI Operating Companion
 * AI Context Manager
 * Version: 1.0.0
 */


/**
 * Context Source Types
 */
export enum AIContextType {

    USER = "user",

    TASK = "task",

    SCREEN = "screen",

    MEMORY = "memory",

    SYSTEM = "system",

    ENVIRONMENT = "environment"

}



/**
 * Context Data
 */
export interface AIContextItem {


    type: AIContextType;


    key: string;


    value: unknown;


    timestamp: number;


}



/**
 * Complete AI Context
 */
export interface AIContextData {


    sessionId: string;


    items: AIContextItem[];


    createdAt: number;


    updatedAt: number;

}



/**
 * AI Context Manager
 */
export class AIContext {


    private context:
        AIContextData;



    constructor(
        sessionId?: string
    ) {


        this.context =
        {

            sessionId:
                sessionId ||
                this.generateSessionId(),


            items: [],


            createdAt:
                Date.now(),


            updatedAt:
                Date.now()

        };

    }



    /**
     * Add context
     */
    add(
        item: AIContextItem
    ): void {


        this.context.items.push(
            item
        );


        this.context.updatedAt =
            Date.now();

    }



    /**
     * Update context
     */
    update(
        key: string,
        value: unknown
    ): void {


        const item =
            this.context.items.find(
                context =>
                    context.key === key
            );


        if (item) {


            item.value =
                value;


            item.timestamp =
                Date.now();


        } else {


            this.add({

                type:
                    AIContextType.SYSTEM,

                key,

                value,

                timestamp:
                    Date.now()

            });

        }


        this.context.updatedAt =
            Date.now();

    }



    /**
     * Get context item
     */
    get(
        key: string
    ): AIContextItem | undefined {


        return this.context.items.find(

            item =>
                item.key === key

        );

    }



    /**
     * Get all context
     */
    getAll():
        AIContextItem[] {


        return [
            ...this.context.items
        ];

    }



    /**
     * Remove context
     */
    remove(
        key: string
    ): void {


        this.context.items =
            this.context.items.filter(

                item =>
                    item.key !== key

            );


        this.context.updatedAt =
            Date.now();

    }



    /**
     * Clear context
     */
    clear(): void {


        this.context.items =
            [];


        this.context.updatedAt =
            Date.now();

    }



    /**
     * Get complete context
     */
    getContext():
        AIContextData {


        return {

            ...this.context,

            items:
                [
                    ...this.context.items
                ]

        };

    }



    /**
     * Generate session ID
     */
    private generateSessionId():
        string {


        return (

            "session_"

            +

            Date.now()
                .toString(36)

        );

    }

  }
