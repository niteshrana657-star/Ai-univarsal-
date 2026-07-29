/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Long Term Memory
 * File: LongTermMemory.ts
 * -------------------------------------------------------------
 *
 * Handles permanent AI memory storage.
 *
 * Features:
 * - Store important information
 * - Retrieve saved memories
 * - Search long term data
 * - Remove memories
 * -------------------------------------------------------------
 */


export interface LongTermMemoryEntry {

    id?: string;

    content: string;

    category?:
        | "fact"
        | "preference"
        | "knowledge"
        | "task";

    metadata?:
        Record<string, unknown>;

    createdAt?: number;

}



export class LongTermMemory {


    private memories:
        LongTermMemoryEntry[] = [];



    /**
     * Save long term memory
     */
    async save(
        memory: LongTermMemoryEntry
    ): Promise<void> {


        this.memories.push({

            ...memory,

            id:
                memory.id ??
                crypto.randomUUID(),

            createdAt:
                memory.createdAt ??
                Date.now()

        });

    }



    /**
     * Get all memories
     */
    async getAll():

        Promise<LongTermMemoryEntry[]> {


        return [

            ...this.memories

        ];

    }



    /**
     * Search memory
     */
    async search(
        query: string
    ):

        Promise<LongTermMemoryEntry[]> {


        const keyword =
            query.toLowerCase();


        return this.memories.filter(
            item =>

                item.content
                .toLowerCase()
                .includes(keyword)

        );

    }



    /**
     * Get memory by ID
     */
    async getById(
        id: string
    ):

        Promise<LongTermMemoryEntry | undefined> {


        return this.memories.find(

            item =>
                item.id === id

        );

    }



    /**
     * Delete memory
     */
    async delete(
        id: string
    ):

        Promise<void> {


        this.memories =
            this.memories.filter(

                item =>
                    item.id !== id

            );

    }



    /**
     * Clear all long term memory
     */
    async clear():

        Promise<void> {


        this.memories = [];

    }

}



export default LongTermMemory;
