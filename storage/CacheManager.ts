/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * File: CacheManager.ts
 * -------------------------------------------------------------
 */

import LocalStorage from "./LocalStorage";

export interface CacheEntry<T = unknown> {

  key: string;

  value: T;

  expiresAt: number;

  createdAt: number;

}

export class CacheManager {

  /**
   * Save Cache
   */
  public set<T>(
    key: string,
    value: T,
    ttl: number = 300000
  ): void {

    const now = Date.now();

    const entry: CacheEntry<T> = {

      key,

      value,

      createdAt: now,

      expiresAt: now + ttl

    };

    LocalStorage.set(
      `cache:${key}`,
      entry
    );

  }

  /**
   * Read Cache
   */
  public get<T>(
    key: string
  ): T | null {

    const entry =
      LocalStorage.get<CacheEntry<T>>(
        `cache:${key}`
      );

    if (!entry) {

      return null;

    }

    if (
      Date.now() > entry.expiresAt
    ) {

      this.remove(key);

      return null;

    }

    return entry.value;

  }

  /**
   * Cache Exists
   */
  public has(
    key: string
  ): boolean {

    return this.get(key) !== null;

  }

  /**
   * Remove Cache
   */
  public remove(
    key: string
  ): boolean {

    return LocalStorage.remove(
      `cache:${key}`
    );

  }

  /**
   * Clear Expired Cache
   */
  public clearExpired(): void {

    const records =
      LocalStorage.getAll();

    for (const record of records) {

      if (
        !record.key.startsWith(
          "cache:"
        )
      ) {

        continue;

      }

      const entry =
        record.value as CacheEntry;

      if (
        Date.now() >
        entry.expiresAt
      ) {

        LocalStorage.remove(
          record.key
        );

      }

    }

  }

  /**
   * Clear All Cache
   */
  public clear(): void {

    const records =
      LocalStorage.getAll();

    for (const record of records) {

      if (
        record.key.startsWith(
          "cache:"
        )
      ) {

        LocalStorage.remove(
          record.key
        );

      }

    }

  }

}

const cacheManager =
  new CacheManager();

export default cacheManager;
