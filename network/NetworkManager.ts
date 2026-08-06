/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * File: NetworkManager.ts
 * -------------------------------------------------------------
 */

export enum NetworkStatus {

  ONLINE = "ONLINE",

  OFFLINE = "OFFLINE",

  UNKNOWN = "UNKNOWN"

}

export interface NetworkInfo {

  status: NetworkStatus;

  connected: boolean;

  lastUpdated: number;

}

export class NetworkManager {

  private info: NetworkInfo = {

    status: NetworkStatus.UNKNOWN,

    connected: false,

    lastUpdated: Date.now()

  };

  /**
   * Update Network Status
   */
  public update(
    connected: boolean
  ): void {

    this.info = {

      status: connected
        ? NetworkStatus.ONLINE
        : NetworkStatus.OFFLINE,

      connected,

      lastUpdated: Date.now()

    };

  }

  /**
   * Get Network Info
   */
  public getInfo():
    NetworkInfo {

    return this.info;

  }

  /**
   * Check Online
   */
  public isOnline():
    boolean {

    return this.info.connected;

  }

  /**
   * Check Offline
   */
  public isOffline():
    boolean {

    return !this.info.connected;

  }

  /**
   * Reset
   */
  public reset(): void {

    this.info = {

      status: NetworkStatus.UNKNOWN,

      connected: false,

      lastUpdated: Date.now()

    };

  }

}

const networkManager =
  new NetworkManager();

export default networkManager;
