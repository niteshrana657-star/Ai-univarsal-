/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Deployment Module
 * File: DeployLogger.ts
 * -------------------------------------------------------------
 */

export enum DeployLogLevel {

  INFO = "INFO",

  WARNING = "WARNING",

  ERROR = "ERROR",

  DEBUG = "DEBUG"

}

export interface DeployLog {

  id: string;

  deploymentId: string;

  level: DeployLogLevel;

  message: string;

  timestamp: number;

}

export class DeployLogger {

  private logs: DeployLog[] = [];

  /**
   * Add Log
   */
  public log(
    entry: DeployLog
  ): void {

    this.logs.push(entry);

  }

  /**
   * Get All Logs
   */
  public getAll():
    DeployLog[] {

    return [...this.logs];

  }

  /**
   * Get Logs By Deployment
   */
  public getByDeployment(
    deploymentId: string
  ): DeployLog[] {

    return this.logs.filter(

      log =>

        log.deploymentId ===
        deploymentId

    );

  }

  /**
   * Get Logs By Level
   */
  public getByLevel(
    level: DeployLogLevel
  ): DeployLog[] {

    return this.logs.filter(

      log =>

        log.level === level

    );

  }

  /**
   * Latest Log
   */
  public latest():
    DeployLog | null {

    if (
      this.logs.length === 0
    ) {

      return null;

    }

    return this.logs[
      this.logs.length - 1
    ];

  }

  /**
   * Total Logs
   */
  public count():
    number {

    return this.logs.length;

  }

  /**
   * Clear Logs
   */
  public clear():
    void {

    this.logs = [];

  }

}

const deployLogger =
  new DeployLogger();

export default deployLogger;
