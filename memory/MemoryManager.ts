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

import type {
    ConversationEntry
} from "./ConversationMemory";

import type {
    UserProfileEntry
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


/**
 * -------------------------------------------------------------
 * Memory Manager
 * -------------------------------------------------------------
 */

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
     * -----------------------------------------------------------
     * Store memory
     * -----------------------------------------------------------
     */

    async save(
        memory: MemoryEntry
    ): Promise<void> {

        const createdAt =
            memory.createdAt ??
            Date.now();


        switch (memory.type) {

            case "conversation": {

                const roleValue =
                    memory.metadata?.role;

                const role:
                    ConversationEntry["role"] =
                    roleValue === "assistant" ||
                    roleValue === "system"
                        ? roleValue
                        : "user";


                const entry:
                    ConversationEntry = {

                    id:
                        memory.id,

                    role,

                    message:
                        memory.content,

                    timestamp:
                        createdAt,

                    metadata:
                        memory.metadata

                };


                await this.conversation
                    .save(entry);

                break;
            }


            case "profile": {

                const keyValue =
                    memory.metadata?.key;


                const key =
                    typeof keyValue === "string" &&
                    keyValue.length > 0
                        ? keyValue
                        : memory.id ??
                          memory.content;


                const entry:
                    UserProfileEntry = {

                    id:
                        memory.id,

                    key,

                    value:
                        memory.content,

                    createdAt

                };


                await this.profile
                    .save(entry);

                break;
            }


            case "long-term":

                await this.longTerm.save({

                    ...memory,

                    createdAt

                });

                break;


            default:

                await this.shortTerm.save({

                    ...memory,

                    createdAt

                });

                break;

        }

    }


    /**
     * -----------------------------------------------------------
     * Search memory
     * -----------------------------------------------------------
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


        const [
            shortTermResults,
            longTermResults,
            conversationResults,
            profileResults
        ] = results;


        const conversations:
            MemoryEntry[] =
            conversationResults.map(
                entry => ({

                    id:
                        entry.id,

                    content:
                        entry.message,

                    type:
                        "conversation",

                    metadata: {

                        ...entry.metadata,

                        role:
                            entry.role

                    },

                    createdAt:
                        entry.timestamp

                })
            );


        const profiles:
            MemoryEntry[] =
            profileResults.map(
                entry => ({

                    id:
                        entry.id,

                    content:
                        String(entry.value),

                    type:
                        "profile",

                    metadata: {

                        category:
                            entry.category,

                        key:
                            entry.key

                    },

                    createdAt:
                        entry.createdAt

                })
            );


        return [

            ...shortTermResults,

            ...longTermResults,

            ...conversations,

            ...profiles

        ];

    }


    /**
     * -----------------------------------------------------------
     * Get complete AI context
     * -----------------------------------------------------------
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
     * -----------------------------------------------------------
     * Clear temporary memory
     * -----------------------------------------------------------
     */

    async clearTemporary():
        Promise<void> {

        await this.shortTerm.clear();

    }


    /**
     * -----------------------------------------------------------
     * Clear all memory
     * -----------------------------------------------------------
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
