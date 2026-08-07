/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Deployment Module
 * File: BuildManager.ts
 * -------------------------------------------------------------
 */

export enum BuildStatus {

  PENDING = "PENDING",

  BUILDING = "BUILDING",

  SUCCESS = "SUCCESS",

  FAILED = "FAILED"

}

export interface Build {

  id: string;

  version: string;

  platform: string;

  status: BuildStatus;

  startedAt: number;

  finishedAt?: number;

  artifact?: string;

}

export class BuildManager {

  private builds =
    new Map<string, Build>();

  /**
   * Create Build
   */
  public create(
    build: Build
  ): void {

    this.builds.set(
      build.id,
      build
    );

  }

  /**
   * Start Build
   */
  public start(
    id: string
  ): boolean {

    const build =
      this.builds.get(id);

    if (!build) {

      return false;

    }

    build.status =
      BuildStatus.BUILDING;

    build.startedAt =
      Date.now();

    return true;

  }

  /**
   * Complete Build
   */
  public complete(
    id: string,
    artifact: string
  ): boolean {

    const build =
      this.builds.get(id);

    if (!build) {

      return false;

    }

    build.status =
      BuildStatus.SUCCESS;

    build.artifact =
      artifact;

    build.finishedAt =
      Date.now();

    return true;

  }

  /**
   * Fail Build
   */
  public fail(
    id: string
  ): boolean {

    const build =
      this.builds.get(id);

    if (!build) {

      return false;

    }

    build.status =
      BuildStatus.FAILED;

    build.finishedAt =
      Date.now();

    return true;

  }

  /**
   * Get Build
   */
  public get(
    id: string
  ): Build | undefined {

    return this.builds.get(id);

  }

  /**
   * Get All Builds
   */
  public getAll():
    Build[] {

    return Array.from(
      this.builds.values()
    );

  }

  /**
   * Remove Build
   */
  public remove(
    id: string
  ): boolean {

    return this.builds.delete(
      id
    );

  }

  /**
   * Clear Builds
   */
  public clear():
    void {

    this.builds.clear();

  }

}

const buildManager =
  new BuildManager();

export default buildManager;
