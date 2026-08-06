/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Cloud Sync Module
 * File: CloudManager.ts
 * -------------------------------------------------------------
 */

export enum CloudProvider {

  GOOGLE_DRIVE = "GOOGLE_DRIVE",

  ONE_DRIVE = "ONE_DRIVE",

  DROPBOX = "DROPBOX",

  CUSTOM = "CUSTOM"

}

export interface CloudAccount {

  id: string;

  provider: CloudProvider;

  email: string;

  connected: boolean;

  lastSync: number;

}

export class CloudManager {

  private accounts =
    new Map<string, CloudAccount>();

  private activeAccount:
    string | null = null;

  /**
   * Connect Account
   */
  public connect(
    account: CloudAccount
  ): void {

    this.accounts.set(
      account.id,
      account
    );

    if (
      this.activeAccount === null
    ) {

      this.activeAccount =
        account.id;

    }

  }

  /**
   * Disconnect Account
   */
  public disconnect(
    id: string
  ): boolean {

    if (
      this.activeAccount === id
    ) {

      this.activeAccount =
        null;

    }

    return this.accounts.delete(
      id
    );

  }

  /**
   * Get Account
   */
  public get(
    id: string
  ): CloudAccount | undefined {

    return this.accounts.get(id);

  }

  /**
   * Get All Accounts
   */
  public getAll():
    CloudAccount[] {

    return Array.from(
      this.accounts.values()
    );

  }

  /**
   * Set Active Account
   */
  public setActive(
    id: string
  ): boolean {

    const account =
      this.accounts.get(id);

    if (!account) {

      return false;

    }

    this.activeAccount = id;

    return true;

  }

  /**
   * Get Active Account
   */
  public getActive():
    CloudAccount | null {

    if (
      !this.activeAccount
    ) {

      return null;

    }

    return (
      this.accounts.get(
        this.activeAccount
      ) ?? null
    );

  }

  /**
   * Is Connected
   */
  public isConnected():
    boolean {

    return (
      this.getActive() !== null
    );

  }

  /**
   * Clear Accounts
   */
  public clear(): void {

    this.accounts.clear();

    this.activeAccount =
      null;

  }

}

const cloudManager =
  new CloudManager();

export default cloudManager;
