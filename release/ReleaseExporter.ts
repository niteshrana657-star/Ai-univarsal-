/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: ReleaseExporter.ts
 * -------------------------------------------------------------
 */

import {
  ReleasePackage
} from "./ReleasePackageManager";

export interface ExportResult {

  success: boolean;

  fileName: string;

  exportedAt: number;

  message: string;

}

export class ReleaseExporter {

  /**
   * Export Release Package
   */
  public export(
    releasePackage: ReleasePackage
  ): ExportResult {

    const fileName =
      `${releasePackage.packageName}-${releasePackage.version}.zip`;

    return {

      success: true,

      fileName,

      exportedAt:
        Date.now(),

      message:
        "Release package exported successfully"

    };

  }

  /**
   * Generate Download Name
   */
  public generateFileName(
    packageName: string,
    version: string
  ): string {

    return `${packageName}-${version}.zip`;

  }

  /**
   * Check Export Format
   */
  public isSupportedFormat(
    extension: string
  ): boolean {

    return [
      ".zip",
      ".tar",
      ".apk",
      ".aab"
    ].includes(
      extension.toLowerCase()
    );

  }

}

const releaseExporter =
  new ReleaseExporter();

export default releaseExporter;
