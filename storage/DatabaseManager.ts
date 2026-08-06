/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Storage Module
 * File: DatabaseManager.ts
 * -------------------------------------------------------------
 */

import LocalStorage from "./LocalStorage";

export interface DatabaseRecord<T = unknown> {

  id: string;

  collection: string;

  data: T;

  createdAt: number;

  updatedAt: number;

}

export class DatabaseManager {

  /**
   * Insert Record
   */
  public insert<T>(
    collection: string,
    id: string,
    data: T
  ): void {

    const now = Date.now();

    const record: DatabaseRecord<T> = {

      id,

      collection,

      data,

      createdAt: now,

      updatedAt: now

    };

    LocalStorage.set(
      `db:${collection}:${id}`,
      record
    );

  }

  /**
   * Find Record
   */
  public find<T>(
    collection: string,
    id: string
  ): DatabaseRecord<T> | null {

    return LocalStorage.get<
      DatabaseRecord<T>
    >(
      `db:${collection}:${id}`
    );

  }

  /**
   * Update Record
   */
  public update<T>(
    collection: string,
    id: string,
    data: T
  ): boolean {

    const existing =
      this.find<T>(
        collection,
        id
      );

    if (!existing) {

      return false;

    }

    existing.data = data;

    existing.updatedAt =
      Date.now();

    LocalStorage.set(
      `db:${collection}:${id}`,
      existing
    );

    return true;

  }

  /**
   * Delete Record
   */
  public delete(
    collection: string,
    id: string
  ): boolean {

    return LocalStorage.remove(
      `db:${collection}:${id}`
    );

  }

  /**
   * Find All Records
   */
  public findAll(
    collection: string
  ): DatabaseRecord[] {

    return LocalStorage
      .getAll()
      .filter(record =>
        record.key.startsWith(
          `db:${collection}:`
        )
      )
      .map(record =>
        record.value as DatabaseRecord
      );

  }

  /**
   * Count Records
   */
  public count(
    collection: string
  ): number {

    return this.findAll(
      collection
    ).length;

  }

  /**
   * Clear Collection
   */
  public clear(
    collection: string
  ): void {

    const records =
      this.findAll(collection);

    for (const record of records) {

      LocalStorage.remove(
        `db:${collection}:${record.id}`
      );

    }

  }

}

const databaseManager =
  new DatabaseManager();

export default databaseManager;
