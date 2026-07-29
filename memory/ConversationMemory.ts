/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Conversation Memory
 * File: ConversationMemory.ts
 * -------------------------------------------------------------
 *
 * Manages conversation history memory.
 *
 * Handles:
 * - Saving conversations
 * - Retrieving history
 * - Searching conversations
 * - Clearing conversation memory
 * -------------------------------------------------------------
 */


export interface ConversationEntry {

    id?: string;

    role:
        | "user"
        | "assistant"
        | "system";

    message: string;

    timestamp?: number;

    metadata?:
        Record<string, unknown>;

}



export class ConversationMemory {


    private conversations:
        ConversationEntry[] = [];



    /**
     * Save conversation
     */
    async save(
        entry: ConversationEntry
    ): Promise<void> {


        this.conversations.push({

            ...entry,

            timestamp:
                entry.timestamp ??
                Date.now()

        });

    }



    /**
     * Get all conversations
     */
    async getAll():

        Promise<ConversationEntry[]> {


        return [

            ...this.conversations

        ];

    }



    /**
     * Get recent conversations
     */
    async getRecent(
        limit: number = 10
    ):

        Promise<ConversationEntry[]> {


        return this.conversations
            .slice(-limit);

    }



    /**
     * Search conversations
     */
    async search(
        query: string
    ):

        Promise<ConversationEntry[]> {


        const keyword =
            query.toLowerCase();


        return this.conversations.filter(
            item =>
                item.message
                .toLowerCase()
                .includes(keyword)
        );

    }



    /**
     * Count conversations
     */
    async count():

        Promise<number> {

        return this.conversations.length;

    }



    /**
     * Clear conversation memory
     */
    async clear():

        Promise<void> {


        this.conversations = [];

    }

}



export default ConversationMemory;
