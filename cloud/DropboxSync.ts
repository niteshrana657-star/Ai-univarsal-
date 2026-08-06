/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Cloud Sync Module
 * File: DropboxSync.ts
 * -------------------------------------------------------------
 */

import CloudManager, {
  CloudProvider
} from "./CloudManager";

export interface DropboxFile {

  id: string;

  name: string;

  path: string;

  size: number;

  modifiedTime: number;

}

export class DropboxSync {

  /**
   * Check Connection
   */
  public isConnected(): boolean {

    const account =
      CloudManager.getActive();

    return (
      account?.provider ===
        CloudProvider.DROPBOX &&
      account.connected
    );

  }

  /**
   * Connect Dropbox
   */
  public async connect():
    Promise<boolean> {

    return true;

  }

  /**
   * Disconnect Dropbox
   */
  public async disconnect():
    Promise<boolean> {

    return true;

  }

  /**
   * Upload File
   */
  public async upload(
    file: DropboxFile
  ): Promise<boolean> {

    if (!this.isConnected()) {

      return false;

    }

    return true;

  }

  /**
   * Download File
   */
  public async download(
    fileId: string
  ): Promise<DropboxFile | null> {

    if (!this.isConnected()) {

      return null;

    }

    return {

      id: fileId,

      name: "Unknown",

      path: "/",

      size: 0,

      modifiedTime:
        Date.now()

    };

  }

  /**
   * Delete File
   */
  public async delete(
    fileId: string
  ): Promise<boolean> {

    if (!this.isConnected()) {

      return false;

    }

    return true;

  }

  /**
   * List Files
   */
  public async list():
    Promise<DropboxFile[]> {

    if (!this.isConnected()) {

      return [];

    }

    return [];

  }

}

const dropboxSync =
  new DropboxSync();

export default dropboxSync;
