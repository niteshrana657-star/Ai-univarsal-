/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: MemorySyncAdapter.ts
 * -------------------------------------------------------------
 */

import MemoryAdapter from "./MemoryAdapter";

export interface MemorySyncRecord {

  id: string;

  synced: boolean;

  source: string;

  destination: string;

  lastSyncedAt: number;

}

export class MemorySyncAdapter {

  /**
   * Sync Record
   */
  public sync(
    key: string,
    destination: string
  ): boolean {

    if (!MemoryAdapter.has(key)) {

      return false;

    }

    const record: MemorySyncRecord = {

      id: key,

      synced: true,

      source: "local",

      destination,

      lastSyncedAt: Date.now()

    };

    MemoryAdapter.save(
      `sync:${key}`,
      record
    );

    return true;

  }

  /**
   * Get Sync Status
   */
  public getStatus(
    key: string
  ): MemorySyncRecord | null {

    return MemoryAdapter.get<MemorySyncRecord>(
      `sync:${key}`
    );

  }

  /**
   * Check Synced
   */
  public isSynced(
    key: string
  ): boolean {

    const record =
      this.getStatus(key);

    return record?.synced ?? false;

  }

  /**
   * Remove Sync Record
   */
  public remove(
    key: string
  ): boolean {

    return MemoryAdapter.remove(
      `sync:${key}`
    );

  }

  /**
   * Clear Sync Records
   */
  public clear(): void {

    const records =
      MemoryAdapter.getAll();

    for (const record of records) {

      if (
        record.key.startsWith("sync:")
      ) {

        MemoryAdapter.remove(
          record.key
        );

      }

    }

  }

}

const memorySyncAdapter =
  new MemorySyncAdapter();

export default memorySyncAdapter;
