/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: ReleasePackageManager.ts
 * -------------------------------------------------------------
 */

export enum PackageStatus {

  PENDING = "PENDING",

  BUILDING = "BUILDING",

  READY = "READY",

  FAILED = "FAILED"

}

export interface ReleasePackage {

  id: string;

  version: string;

  buildNumber: number;

  packageName: string;

  outputPath: string;

  status: PackageStatus;

  createdAt: number;

  completedAt?: number;

}

export class ReleasePackageManager {

  private packages =
    new Map<string, ReleasePackage>();

  /**
   * Create Package
   */
  public create(
    pkg: ReleasePackage
  ): void {

    this.packages.set(
      pkg.id,
      pkg
    );

  }

  /**
   * Update Status
   */
  public updateStatus(
    id: string,
    status: PackageStatus
  ): boolean {

    const pkg =
      this.packages.get(id);

    if (!pkg) {

      return false;

    }

    pkg.status = status;

    if (
      status === PackageStatus.READY ||
      status === PackageStatus.FAILED
    ) {

      pkg.completedAt =
        Date.now();

    }

    return true;

  }

  /**
   * Get Package
   */
  public get(
    id: string
  ): ReleasePackage | undefined {

    return this.packages.get(id);

  }

  /**
   * Get All Packages
   */
  public getAll():
    ReleasePackage[] {

    return Array.from(
      this.packages.values()
    );

  }

  /**
   * Remove Package
   */
  public remove(
    id: string
  ): boolean {

    return this.packages.delete(id);

  }

  /**
   * Count Packages
   */
  public count():
    number {

    return this.packages.size;

  }

  /**
   * Clear Packages
   */
  public clear():
    void {

    this.packages.clear();

  }

}

const releasePackageManager =
  new ReleasePackageManager();

export default releasePackageManager;
