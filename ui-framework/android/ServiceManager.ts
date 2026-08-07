/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: ServiceManager.ts
 * -------------------------------------------------------------
 */

export enum ServiceState {

  STOPPED = "STOPPED",

  STARTING = "STARTING",

  RUNNING = "RUNNING",

  STOPPING = "STOPPING"

}

export interface AndroidService {

  id: string;

  name: string;

  state: ServiceState;

  createdAt: number;

}

export class ServiceManager {

  private services =
    new Map<string, AndroidService>();

  /**
   * Register Service
   */
  public register(
    service: AndroidService
  ): void {

    this.services.set(
      service.id,
      service
    );

  }

  /**
   * Start Service
   */
  public start(
    id: string
  ): boolean {

    const service =
      this.services.get(id);

    if (!service) {

      return false;

    }

    service.state =
      ServiceState.RUNNING;

    return true;

  }

  /**
   * Stop Service
   */
  public stop(
    id: string
  ): boolean {

    const service =
      this.services.get(id);

    if (!service) {

      return false;

    }

    service.state =
      ServiceState.STOPPED;

    return true;

  }

  /**
   * Get Service
   */
  public get(
    id: string
  ): AndroidService | undefined {

    return this.services.get(id);

  }

  /**
   * Get All Services
   */
  public getAll():
    AndroidService[] {

    return Array.from(
      this.services.values()
    );

  }

  /**
   * Remove Service
   */
  public remove(
    id: string
  ): boolean {

    return this.services.delete(
      id
    );

  }

  /**
   * Clear Services
   */
  public clear():
    void {

    this.services.clear();

  }

}

const serviceManager =
  new ServiceManager();

export default serviceManager;
