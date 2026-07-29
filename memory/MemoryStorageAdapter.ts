/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Storage Adapter
 * File: MemoryStorageAdapter.ts
 * -------------------------------------------------------------
 *
 * Provides storage abstraction layer for memory.
 *
 * Features:
 * - Save memory data
 * - Read memory data
 * - Delete memory data
 * - Clear storage
 * - Future database integration support
 * -------------------------------------------------------------
 */


export interface StorageRecord {

    id: string;

    data: unknown;

    createdAt?: number;

    updatedAt?: number;

}



export interface StorageProvider {

    save(
        record: StorageRecord
    ): Promise<void>;


    get(
        id: string
    ): Promise<StorageRecord | null>;


    getAll():
        Promise<StorageRecord[]>;


    delete(
        id: string
    ): Promise<void>;


    clear():
        Promise<void>;

}



export class MemoryStorageAdapter {


    private storage:
        Map<string, StorageRecord>;



    constructor() {

        this.storage =
            new Map<string, StorageRecord>();

    }



    /**
     * Save data
     */
    async save(
        record: StorageRecord
    ): Promise<void> {


        this.storage.set(

            record.id,

            {

                ...record,

                createdAt:
                    record.createdAt ??
                    Date.now(),

                updatedAt:
                    Date.now()

            }

        );

    }



    /**
     * Get data by id
     */
    async get(
        id: string
    ):
        Promise<StorageRecord | null> {


        return (
            this.storage.get(id)
            ?? null
        );

    }



    /**
     * Get all stored records
     */
    async getAll():
        Promise<StorageRecord[]> {


        return Array.from(
            this.storage.values()
        );

    }



    /**
     * Delete record
     */
    async delete(
        id: string
    ):
        Promise<void> {


        this.storage.delete(id);

    }



    /**
     * Clear storage
     */
    async clear():
        Promise<void> {


        this.storage.clear();

    }



    /**
     * Check record exists
     */
    async exists(
        id: string
    ):
        Promise<boolean> {


        return this.storage.has(id);

    }

}



export default MemoryStorageAdapter;
