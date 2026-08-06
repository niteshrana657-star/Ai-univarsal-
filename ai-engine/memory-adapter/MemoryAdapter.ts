/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: MemoryAdapter.ts
 * -------------------------------------------------------------
 */

export interface MemoryRecord {

  id: string;

  key: string;

  value: unknown;

  createdAt: number;

  updatedAt: number;

}

export class MemoryAdapter {

  private storage =
    new Map<string, MemoryRecord>();

  /**
   * Save Value
   */
  public save(
    key: string,
    value: unknown
  ): void {

    const now = Date.now();

    this.storage.set(key, {

      id: key,

      key,

      value,

      createdAt: now,

      updatedAt: now

    });

  }

  /**
   * Read Value
   */
  public get<T = unknown>(
    key: string
  ): T | null {

    const record =
      this.storage.get(key);

    return record
      ? (record.value as T)
      : null;

  }

  /**
   * Check Key Exists
   */
  public has(
    key: string
  ): boolean {

    return this.storage.has(key);

  }

  /**
   * Delete Value
   */
  public remove(
    key: string
  ): boolean {

    return this.storage.delete(key);

  }

  /**
   * Get All Records
   */
  public getAll(): MemoryRecord[] {

    return Array.from(
      this.storage.values()
    );

  }

  /**
   * Total Records
   */
  public count(): number {

    return this.storage.size;

  }

  /**
   * Clear Memory
   */
  public clear(): void {

    this.storage.clear();

  }

}

const memoryAdapter =
  new MemoryAdapter();

export default memoryAdapter;
