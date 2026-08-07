/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: VersionManager.ts
 * -------------------------------------------------------------
 */

export interface Version {

  major: number;

  minor: number;

  patch: number;

  build: number;

}

export class VersionManager {

  private version: Version = {

    major: 1,

    minor: 0,

    patch: 0,

    build: 1

  };

  /**
   * Get Current Version
   */
  public get(): Version {

    return {

      ...this.version

    };

  }

  /**
   * Version String
   */
  public toString(): string {

    const v =
      this.version;

    return `${v.major}.${v.minor}.${v.patch}+${v.build}`;

  }

  /**
   * Increase Patch
   */
  public bumpPatch(): void {

    this.version.patch++;

    this.version.build++;

  }

  /**
   * Increase Minor
   */
  public bumpMinor(): void {

    this.version.minor++;

    this.version.patch = 0;

    this.version.build++;

  }

  /**
   * Increase Major
   */
  public bumpMajor(): void {

    this.version.major++;

    this.version.minor = 0;

    this.version.patch = 0;

    this.version.build++;

  }

  /**
   * Set Version
   */
  public set(
    version: Version
  ): void {

    this.version = {

      ...version

    };

  }

}

const versionManager =
  new VersionManager();

export default versionManager;
