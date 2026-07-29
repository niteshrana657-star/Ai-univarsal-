/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Memory Integration
 * File: MemoryIntegration.ts
 * -------------------------------------------------------------
 *
 * Connects AI Engine with Memory Module.
 * Handles:
 * - Memory retrieval
 * - Context preparation
 * - User preference access
 * - Safe memory usage
 * -------------------------------------------------------------
 */


export interface MemoryRecord {

    id?: string;

    content: string;

    type?: 
        | "conversation"
        | "preference"
        | "fact"
        | "task"
        | "system";

    createdAt?: number;

    metadata?: Record<string, unknown>;

}



export interface MemoryProvider {

    getMemories(
        query?: string
    ): Promise<MemoryRecord[]>;


    saveMemory(
        memory: MemoryRecord
    ): Promise<void>;


    clearMemory?(): Promise<void>;

}



export interface MemoryContext {

    conversations: MemoryRecord[];

    preferences:
        Record<string, unknown>;

    facts:
        Record<string, unknown>;

}



export class MemoryIntegration {


    private memoryProvider:
        MemoryProvider | null = null;


    private enabled:
        boolean = true;



    constructor(
        provider?: MemoryProvider
    ) {

        if (provider) {

            this.memoryProvider = provider;

        }

    }



    /**
     * Attach Memory Provider
     */
    connect(
        provider: MemoryProvider
    ): void {

        this.memoryProvider =
            provider;

    }



    /**
     * Enable Memory Access
     */
    enable(): void {

        this.enabled = true;

    }



    /**
     * Disable Memory Access
     */
    disable(): void {

        this.enabled = false;

    }



    /**
     * Check Memory Status
     */
    isEnabled(): boolean {

        return this.enabled;

    }



    /**
     * Get AI Context from Memory
     */
    async getContext(
        query?: string
    ): Promise<MemoryContext> {


        if (
            !this.enabled ||
            !this.memoryProvider
        ) {

            return this.emptyContext();

        }


        const memories =
            await this.memoryProvider
                .getMemories(query);



        return this.buildContext(
            memories
        );

    }



    /**
     * Save New Memory
     */
    async save(
        memory: MemoryRecord
    ): Promise<boolean> {


        if (
            !this.enabled ||
            !this.memoryProvider
        ) {

            return false;

        }


        await this.memoryProvider
            .saveMemory(memory);


        return true;

    }



    /**
     * Convert Memory Records
     * into AI Context
     */
    private buildContext(
        memories: MemoryRecord[]
    ): MemoryContext {


        const context:
            MemoryContext = {

                conversations: [],

                preferences: {},

                facts: {}

            };



        for (const memory of memories) {


            switch(memory.type) {


                case "conversation":

                    context.conversations
                        .push(memory);

                    break;



                case "preference":

                    Object.assign(
                        context.preferences,
                        memory.metadata ?? {}
                    );

                    break;



                case "fact":

                    Object.assign(
                        context.facts,
                        memory.metadata ?? {}
                    );

                    break;



                default:

                    break;

            }

        }


        return context;

    }



    /**
     * Empty Memory Context
     */
    private emptyContext():
        MemoryContext {


        return {

            conversations: [],

            preferences: {},

            facts: {}

        };

    }



    /**
     * Clear Memory
     */
    async clear():
        Promise<boolean> {


        if (
            !this.memoryProvider ||
            !this.memoryProvider.clearMemory
        ) {

            return false;

        }


        await this.memoryProvider
            .clearMemory();


        return true;

    }

}



export default MemoryIntegration;
