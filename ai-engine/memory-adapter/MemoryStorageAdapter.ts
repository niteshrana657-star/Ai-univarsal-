/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: MemoryStorageAdapter.ts
 * -------------------------------------------------------------
 */

import MemoryAdapter, {
  MemoryRecord
} from "./MemoryAdapter";

export interface MemoryStorageStatistics {

  totalRecords: number;

  totalKeys: number;

  lastUpdated: number;

}

export class MemoryStorageAdapter {

  /**
   * Save Record
   */
  public save(
    key: string,
    value: unknown
  ): void {

    MemoryAdapter.save(
      key,
      value
    );

  }

  /**
   * Load Record
   */
  public load<T = unknown>(
    key: string
  ): T | null {

    return MemoryAdapter.get<T>(
      key
    );

  }

  /**
   * Delete Record
   */
  public delete(
    key: string
  ): boolean {

    return MemoryAdapter.remove(
      key
    );

  }

  /**
   * Check Record Exists
   */
  public exists(
    key: string
  ): boolean {

    return MemoryAdapter.has(
      key
    );

  }

  /**
   * Get All Records
   */
  public getAll():
    MemoryRecord[] {

    return MemoryAdapter.getAll();

  }

  /**
   * Storage Statistics
   */
  public getStatistics():
    MemoryStorageStatistics {

    return {

      totalRecords:
        MemoryAdapter.count(),

      totalKeys:
        MemoryAdapter.getAll().length,

      lastUpdated:
        Date.now()

    };

  }

  /**
   * Clear Storage
   */
  public clear(): void {

    MemoryAdapter.clear();

  }

}

const memoryStorageAdapter =
  new MemoryStorageAdapter();

export default memoryStorageAdapter;
