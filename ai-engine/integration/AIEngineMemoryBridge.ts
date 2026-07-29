/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Memory Bridge
 * File: AIEngineMemoryBridge.ts
 * -------------------------------------------------------------
 *
 * Connects AI Engine with Memory Module.
 *
 * Responsibilities:
 * - Fetch memory context
 * - Prepare AI context
 * - Store conversations
 * - Maintain user memory flow
 * -------------------------------------------------------------
 */


import {
    MemoryManager,
    MemoryEntry
} from "../../memory";



export interface AIEngineMemoryContext {

    conversations: unknown[];

    shortTerm: unknown[];

    longTerm: unknown[];

    profile: unknown[];

}



export class AIEngineMemoryBridge {


    private memoryManager:
        MemoryManager;



    constructor(
        memoryManager?: MemoryManager
    ) {

        this.memoryManager =
            memoryManager ??
            new MemoryManager();

    }



    /**
     * Get memory context for AI
     */
    async getAIContext():

        Promise<AIEngineMemoryContext> {


        const context =
            await this.memoryManager
                .getContext();


        return {

            conversations:
                context.conversations,

            shortTerm:
                context.shortTerm,

            longTerm:
                context.longTerm,

            profile:
                context.profile

        };

    }



    /**
     * Save user conversation
     */
    async saveConversation(
        content: string
    ):
        Promise<void> {


        const memory:
            MemoryEntry = {

                content,

                type:
                    "conversation"

            };


        await this.memoryManager
            .save(memory);

    }



    /**
     * Save important information
     */
    async saveMemory(
        content: string,
        type:
            MemoryEntry["type"] = "fact"
    ):
        Promise<void> {


        await this.memoryManager
            .save({

                content,

                type

            });

    }



    /**
     * Search memory
     */
    async search(
        query: string
    ) {


        return await this.memoryManager
            .search(query);

    }



    /**
     * Clear temporary AI memory
     */
    async clearTemporary():

        Promise<void> {


        await this.memoryManager
            .clearTemporary();

    }



    /**
     * Clear complete memory
     */
    async clearAll():

        Promise<void> {


        await this.memoryManager
            .clearAll();

    }

}



export default AIEngineMemoryBridge;
