/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: ChangelogManager.ts
 * -------------------------------------------------------------
 */

export interface ChangelogEntry {

  id: string;

  version: string;

  title: string;

  description: string;

  author: string;

  createdAt: number;

}

export class ChangelogManager {

  private entries:
    ChangelogEntry[] = [];

  /**
   * Add Entry
   */
  public add(
    entry: ChangelogEntry
  ): void {

    this.entries.push(entry);

  }

  /**
   * Get All Entries
   */
  public getAll():
    ChangelogEntry[] {

    return [...this.entries];

  }

  /**
   * Get By Version
   */
  public getByVersion(
    version: string
  ): ChangelogEntry[] {

    return this.entries.filter(

      entry =>

        entry.version === version

    );

  }

  /**
   * Remove Entry
   */
  public remove(
    id: string
  ): boolean {

    const index =
      this.entries.findIndex(

        entry =>

          entry.id === id

      );

    if (index === -1) {

      return false;

    }

    this.entries.splice(
      index,
      1
    );

    return true;

  }

  /**
   * Count Entries
   */
  public count():
    number {

    return this.entries.length;

  }

  /**
   * Clear Entries
   */
  public clear():
    void {

    this.entries = [];

  }

}

const changelogManager =
  new ChangelogManager();

export default changelogManager;
