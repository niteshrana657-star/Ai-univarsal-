/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Deployment Module
 * File: PublishManager.ts
 * -------------------------------------------------------------
 */

export enum PublishStatus {

  PENDING = "PENDING",

  PUBLISHING = "PUBLISHING",

  PUBLISHED = "PUBLISHED",

  FAILED = "FAILED"

}

export interface PublishTarget {

  id: string;

  name: string;

  platform: string;

  url?: string;

  status: PublishStatus;

  publishedAt?: number;

}

export class PublishManager {

  private targets =
    new Map<string, PublishTarget>();

  /**
   * Register Target
   */
  public register(
    target: PublishTarget
  ): void {

    this.targets.set(
      target.id,
      target
    );

  }

  /**
   * Publish
   */
  public publish(
    id: string
  ): boolean {

    const target =
      this.targets.get(id);

    if (!target) {

      return false;

    }

    target.status =
      PublishStatus.PUBLISHED;

    target.publishedAt =
      Date.now();

    return true;

  }

  /**
   * Fail Publish
   */
  public fail(
    id: string
  ): boolean {

    const target =
      this.targets.get(id);

    if (!target) {

      return false;

    }

    target.status =
      PublishStatus.FAILED;

    return true;

  }

  /**
   * Get Target
   */
  public get(
    id: string
  ): PublishTarget | undefined {

    return this.targets.get(id);

  }

  /**
   * Get All Targets
   */
  public getAll():
    PublishTarget[] {

    return Array.from(
      this.targets.values()
    );

  }

  /**
   * Remove Target
   */
  public remove(
    id: string
  ): boolean {

    return this.targets.delete(
      id
    );

  }

  /**
   * Clear Targets
   */
  public clear():
    void {

    this.targets.clear();

  }

}

const publishManager =
  new PublishManager();

export default publishManager;
