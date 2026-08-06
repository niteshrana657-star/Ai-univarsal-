/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * File: ConnectionMonitor.ts
 * -------------------------------------------------------------
 */

import NetworkManager from "./NetworkManager";

export type ConnectionListener = (
  online: boolean
) => void;

export class ConnectionMonitor {

  private monitoring = false;

  private listeners =
    new Set<ConnectionListener>();

  /**
   * Start Monitoring
   */
  public start(): void {

    if (this.monitoring) {

      return;

    }

    this.monitoring = true;

    if (typeof window !== "undefined") {

      window.addEventListener(
        "online",
        this.handleOnline
      );

      window.addEventListener(
        "offline",
        this.handleOffline
      );

      NetworkManager.update(
        navigator.onLine
      );

    }

  }

  /**
   * Stop Monitoring
   */
  public stop(): void {

    if (!this.monitoring) {

      return;

    }

    this.monitoring = false;

    if (typeof window !== "undefined") {

      window.removeEventListener(
        "online",
        this.handleOnline
      );

      window.removeEventListener(
        "offline",
        this.handleOffline
      );

    }

  }

  /**
   * Is Monitoring
   */
  public isMonitoring():
    boolean {

    return this.monitoring;

  }

  /**
   * Add Listener
   */
  public addListener(
    listener: ConnectionListener
  ): void {

    this.listeners.add(listener);

  }

  /**
   * Remove Listener
   */
  public removeListener(
    listener: ConnectionListener
  ): void {

    this.listeners.delete(listener);

  }

  /**
   * Notify Listeners
   */
  private notify(
    online: boolean
  ): void {

    this.listeners.forEach(
      listener => listener(online)
    );

  }

  /**
   * Handle Online
   */
  private handleOnline = (): void => {

    NetworkManager.update(true);

    this.notify(true);

  };

  /**
   * Handle Offline
   */
  private handleOffline = (): void => {

    NetworkManager.update(false);

    this.notify(false);

  };

}

const connectionMonitor =
  new ConnectionMonitor();

export default connectionMonitor;
