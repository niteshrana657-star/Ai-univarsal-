/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Cloud Sync Module
 * File: SyncEngine.ts
 * -------------------------------------------------------------
 */

import CloudManager from "./CloudManager";
import GoogleDriveSync from "./GoogleDriveSync";
import OneDriveSync from "./OneDriveSync";
import DropboxSync from "./DropboxSync";

export enum SyncStatus {

  IDLE = "IDLE",

  SYNCING = "SYNCING",

  SUCCESS = "SUCCESS",

  FAILED = "FAILED"

}

export interface SyncResult {

  success: boolean;

  provider: string;

  timestamp: number;

  message: string;

}

export class SyncEngine {

  private status =
    SyncStatus.IDLE;

  /**
   * Current Status
   */
  public getStatus():
    SyncStatus {

    return this.status;

  }

  /**
   * Perform Sync
   */
  public async sync():
    Promise<SyncResult> {

    const account =
      CloudManager.getActive();

    if (!account) {

      return {

        success: false,

        provider: "NONE",

        timestamp: Date.now(),

        message:
          "No active cloud account."

      };

    }

    this.status =
      SyncStatus.SYNCING;

    try {

      switch (
        account.provider
      ) {

        case "GOOGLE_DRIVE":

          await GoogleDriveSync.list();

          break;

        case "ONE_DRIVE":

          await OneDriveSync.list();

          break;

        case "DROPBOX":

          await DropboxSync.list();

          break;

      }

      this.status =
        SyncStatus.SUCCESS;

      return {

        success: true,

        provider:
          account.provider,

        timestamp:
          Date.now(),

        message:
          "Synchronization completed."

      };

    } catch {

      this.status =
        SyncStatus.FAILED;

      return {

        success: false,

        provider:
          account.provider,

        timestamp:
          Date.now(),

        message:
          "Synchronization failed."

      };

    }

  }

  /**
   * Reset Engine
   */
  public reset(): void {

    this.status =
      SyncStatus.IDLE;

  }

}

const syncEngine =
  new SyncEngine();

export default syncEngine;
