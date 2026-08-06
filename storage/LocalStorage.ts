/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * File: LocalStorage.ts
 * -------------------------------------------------------------
 */

export interface StorageRecord<T = unknown> {

  key: string;

  value: T;

  createdAt: number;

  updatedAt: number;

}

export class LocalStorage {

  private storage =
    new Map<string, StorageRecord>();

  /**
   * Save Value
   */
  public set<T>(
    key: string,
    value: T
  ): void {

    const now = Date.now();

    const existing =
      this.storage.get(key);

    this.storage.set(key, {

      key,

      value,

      createdAt:
        existing?.createdAt ?? now,

      updatedAt: now

    });

  }

  /**
   * Get Value
   */
  public get<T>(
    key: string
  ): T | null {

    return (
      this.storage.get(key)
        ?.value as T
    ) ?? null;

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
   * Remove Value
   */
  public remove(
    key: string
  ): boolean {

    return this.storage.delete(key);

  }

  /**
   * Get All Records
   */
  public getAll():
    StorageRecord[] {

    return Array.from(
      this.storage.values()
    );

  }

  /**
   * Total Records
   */
  public count():
    number {

    return this.storage.size;

  }

  /**
   * Clear Storage
   */
  public clear(): void {

    this.storage.clear();

  }

}

const localStorage =
  new LocalStorage();

export default localStorage;
