/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Manager
 * File: MemoryManager.ts
 * -------------------------------------------------------------
 *
 * Central controller for all memory operations.
 *
 * Handles:
 * - Short term memory
 * - Long term memory
 * - Conversation memory
 * - User profile memory
 * - Memory search
 * - Memory synchronization
 * -------------------------------------------------------------
 */


import {
    ShortTermMemory
} from "./ShortTermMemory";


import {
    LongTermMemory
} from "./LongTermMemory";


import {
    ConversationMemory
} from "./ConversationMemory";


import {
    UserProfileMemory
} from "./UserProfileMemory";



export interface MemoryEntry {

    id?: string;

    content: string;

    type?:
        | "conversation"
        | "short-term"
        | "long-term"
        | "profile"
        | "fact";

    metadata?:
        Record<string, unknown>;

    createdAt?: number;

}



export class MemoryManager {


    private shortTerm:
        ShortTermMemory;


    private longTerm:
        LongTermMemory;


    private conversation:
        ConversationMemory;


    private profile:
        UserProfileMemory;



    constructor() {

        this.shortTerm =
            new ShortTermMemory();


        this.longTerm =
            new LongTermMemory();


        this.conversation =
            new ConversationMemory();


        this.profile =
            new UserProfileMemory();

    }



    /**
     * Store memory
     */
    async save(
        memory: MemoryEntry
    ): Promise<void> {


        const entry = {

            ...memory,

            createdAt:
                memory.createdAt ??
                Date.now()

        };


        switch(entry.type) {


            case "conversation":

                await this.conversation
                    .save(entry);

                break;



            case "profile":

                await this.profile
                    .save(entry);

                break;



            case "long-term":

                await this.longTerm
                    .save(entry);

                break;



            default:

                await this.shortTerm
                    .save(entry);

        }

    }



    /**
     * Search memory
     */
    async search(
        query: string
    ): Promise<MemoryEntry[]> {


        const results =
            await Promise.all([

                this.shortTerm.search(query),

                this.longTerm.search(query),

                this.conversation.search(query),

                this.profile.search(query)

            ]);


        return results.flat();

    }



    /**
     * Get complete AI context
     */
    async getContext() {


        return {

            shortTerm:
                await this.shortTerm.getAll(),


            longTerm:
                await this.longTerm.getAll(),


            conversations:
                await this.conversation.getAll(),


            profile:
                await this.profile.getAll()

        };

    }



    /**
     * Clear temporary memory
     */
    async clearTemporary():

        Promise<void> {


        await this.shortTerm.clear();

    }



    /**
     * Clear all memory
     */
    async clearAll():

        Promise<void> {


        await this.shortTerm.clear();


        await this.longTerm.clear();


        await this.conversation.clear();


        await this.profile.clear();

    }

}



export default MemoryManager;
