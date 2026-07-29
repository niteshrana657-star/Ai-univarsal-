/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Short Term Memory
 * File: ShortTermMemory.ts
 * -------------------------------------------------------------
 *
 * Handles temporary AI memory.
 *
 * Features:
 * - Store recent context
 * - Retrieve active memory
 * - Search temporary data
 * - Auto cleanup support
 * -------------------------------------------------------------
 */


export interface ShortTermMemoryEntry {

    id?: string;

    content: string;

    metadata?:
        Record<string, unknown>;

    createdAt?: number;

    expiresAt?: number;

}



export class ShortTermMemory {


    private memories:
        ShortTermMemoryEntry[] = [];



    /**
     * Save temporary memory
     */
    async save(
        memory: ShortTermMemoryEntry
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
     * Get all active memories
     */
    async getAll():

        Promise<ShortTermMemoryEntry[]> {


        this.cleanupExpired();


        return [

            ...this.memories

        ];

    }



    /**
     * Search temporary memory
     */
    async search(
        query: string
    ):
        Promise<ShortTermMemoryEntry[]> {


        this.cleanupExpired();


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
     * Remove expired memories
     */
    private cleanupExpired(): void {


        const now =
            Date.now();



        this.memories =
            this.memories.filter(

                item =>

                    !item.expiresAt ||
                    item.expiresAt > now

            );

    }



    /**
     * Clear short term memory
     */
    async clear():

        Promise<void> {


        this.memories = [];

    }



    /**
     * Count active memories
     */
    async count():

        Promise<number> {


        this.cleanupExpired();


        return this.memories.length;

    }

}



export default ShortTermMemory;
