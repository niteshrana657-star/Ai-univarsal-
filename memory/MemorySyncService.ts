/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Sync Service
 * File: MemorySyncService.ts
 * -------------------------------------------------------------
 *
 * Handles synchronization of memory data.
 *
 * Features:
 * - Sync local memory
 * - Import external memory
 * - Export memory backup
 * - Track sync status
 * -------------------------------------------------------------
 */


import {
    MemoryStorageAdapter,
    StorageRecord
} from "./MemoryStorageAdapter";



export interface SyncResult {

    success: boolean;

    syncedItems: number;

    timestamp: number;

}



export class MemorySyncService {


    private storage:
        MemoryStorageAdapter;


    private lastSync:
        number | null = null;



    constructor(
        storage?: MemoryStorageAdapter
    ) {

        this.storage =
            storage ??
            new MemoryStorageAdapter();

    }



    /**
     * Sync memory data
     */
    async sync(
        records: StorageRecord[]
    ):
        Promise<SyncResult> {


        let count = 0;


        for (const record of records) {

            await this.storage.save(
                record
            );

            count++;

        }


        this.lastSync =
            Date.now();


        return {

            success: true,

            syncedItems: count,

            timestamp:
                this.lastSync

        };

    }



    /**
     * Export memory backup
     */
    async export():

        Promise<StorageRecord[]> {


        return await this.storage.getAll();

    }



    /**
     * Import memory backup
     */
    async import(
        records: StorageRecord[]
    ):
        Promise<void> {


        for (const record of records) {

            await this.storage.save(
                record
            );

        }

    }



    /**
     * Get last sync time
     */
    getLastSync():
        number | null {


        return this.lastSync;

    }



    /**
     * Clear sync data
     */
    async clear():

        Promise<void> {


        await this.storage.clear();


        this.lastSync = null;

    }

}



export default MemorySyncService;
