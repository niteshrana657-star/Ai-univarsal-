/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Deployment Module
 * File: ReleaseManager.ts
 * -------------------------------------------------------------
 */

export enum ReleaseStatus {

  DRAFT = "DRAFT",

  READY = "READY",

  RELEASED = "RELEASED",

  ARCHIVED = "ARCHIVED"

}

export interface Release {

  id: string;

  version: string;

  title: string;

  notes: string;

  status: ReleaseStatus;

  createdAt: number;

  releasedAt?: number;

}

export class ReleaseManager {

  private releases =
    new Map<string, Release>();

  /**
   * Create Release
   */
  public create(
    release: Release
  ): void {

    this.releases.set(
      release.id,
      release
    );

  }

  /**
   * Publish Release
   */
  public publish(
    id: string
  ): boolean {

    const release =
      this.releases.get(id);

    if (!release) {

      return false;

    }

    release.status =
      ReleaseStatus.RELEASED;

    release.releasedAt =
      Date.now();

    return true;

  }

  /**
   * Archive Release
   */
  public archive(
    id: string
  ): boolean {

    const release =
      this.releases.get(id);

    if (!release) {

      return false;

    }

    release.status =
      ReleaseStatus.ARCHIVED;

    return true;

  }

  /**
   * Get Release
   */
  public get(
    id: string
  ): Release | undefined {

    return this.releases.get(id);

  }

  /**
   * Get All Releases
   */
  public getAll():
    Release[] {

    return Array.from(
      this.releases.values()
    );

  }

  /**
   * Remove Release
   */
  public remove(
    id: string
  ): boolean {

    return this.releases.delete(
      id
    );

  }

  /**
   * Clear Releases
   */
  public clear():
    void {

    this.releases.clear();

  }

}

const releaseManager =
  new ReleaseManager();

export default releaseManager;
