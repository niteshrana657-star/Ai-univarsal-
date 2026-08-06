/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * File: SecureStorage.ts
 * -------------------------------------------------------------
 */

import LocalStorage from "./LocalStorage";

export interface SecureStorageOptions {

  encrypt: boolean;

  expiresAt?: number;

}

interface SecureRecord {

  value: string;

  expiresAt?: number;

}

export class SecureStorage {

  /**
   * Encode Data
   */
  private encode(
    value: unknown
  ): string {

    return btoa(
      JSON.stringify(value)
    );

  }

  /**
   * Decode Data
   */
  private decode<T>(
    value: string
  ): T {

    return JSON.parse(
      atob(value)
    ) as T;

  }

  /**
   * Save Secure Value
   */
  public set<T>(
    key: string,
    value: T,
    options?: Partial<SecureStorageOptions>
  ): void {

    const record: SecureRecord = {

      value: this.encode(value),

      expiresAt: options?.expiresAt

    };

    LocalStorage.set(
      `secure:${key}`,
      record
    );

  }

  /**
   * Get Secure Value
   */
  public get<T>(
    key: string
  ): T | null {

    const record =
      LocalStorage.get<SecureRecord>(
        `secure:${key}`
      );

    if (!record) {

      return null;

    }

    if (
      record.expiresAt &&
      Date.now() > record.expiresAt
    ) {

      this.remove(key);

      return null;

    }

    return this.decode<T>(
      record.value
    );

  }

  /**
   * Check Key Exists
   */
  public has(
    key: string
  ): boolean {

    return this.get(key) !== null;

  }

  /**
   * Remove Secure Value
   */
  public remove(
    key: string
  ): boolean {

    return LocalStorage.remove(
      `secure:${key}`
    );

  }

  /**
   * Clear Secure Storage
   */
  public clear(): void {

    const records =
      LocalStorage.getAll();

    for (const record of records) {

      if (
        record.key.startsWith(
          "secure:"
        )
      ) {

        LocalStorage.remove(
          record.key
        );

      }

    }

  }

}

const secureStorage =
  new SecureStorage();

export default secureStorage;
