/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen Memory
 * File: ScreenMemory.ts
 * -------------------------------------------------------------
 *
 * Stores temporary screen understanding history.
 *
 * Features:
 * - Save analyzed screen states
 * - Retrieve recent screen context
 * - Search previous screens
 * - Clear screen history
 * -------------------------------------------------------------
 */


export interface ScreenMemoryEntry {

    id: string;

    appName?: string;

    screenText?: string;

    context?: Record<string, unknown>;

    timestamp: number;

}



export class ScreenMemory {


    private memories:
        ScreenMemoryEntry[] = [];



    /**
     * Save screen memory
     */
    save(
        entry:
            Omit<ScreenMemoryEntry, "id" | "timestamp">
    ):
        ScreenMemoryEntry {


        const memory: ScreenMemoryEntry = {

            id:
                crypto.randomUUID(),

            ...entry,

            timestamp:
                Date.now()

        };


        this.memories.push(
            memory
        );


        return memory;

    }



    /**
     * Get recent screen memories
     */
    getRecent(
        limit: number = 10
    ):
        ScreenMemoryEntry[] {


        return this.memories
            .slice(-limit);

    }



    /**
     * Search screen history
     */
    search(
        query: string
    ):
        ScreenMemoryEntry[] {


        const keyword =
            query.toLowerCase();



        return this.memories.filter(

            memory =>

                (
                    memory.screenText ??
                    ""
                )
                .toLowerCase()
                .includes(keyword)

                ||

                (
                    memory.appName ??
                    ""
                )
                .toLowerCase()
                .includes(keyword)

        );

    }



    /**
     * Get latest screen
     */
    getLatest():

        ScreenMemoryEntry | null {


        if (
            this.memories.length === 0
        ) {

            return null;

        }


        return this.memories[
            this.memories.length - 1
        ];

    }



    /**
     * Clear screen memory
     */
    clear():

        void {


        this.memories = [];

    }



    /**
     * Count stored screens
     */
    count():

        number {


        return this.memories.length;

    }

}



export default ScreenMemory;
