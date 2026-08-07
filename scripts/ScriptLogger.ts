/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scripts Module
 * File: ScriptLogger.ts
 * -------------------------------------------------------------
 */

export enum LogLevel {

  INFO = "INFO",

  WARNING = "WARNING",

  ERROR = "ERROR",

  DEBUG = "DEBUG"

}

export interface ScriptLog {

  id: string;

  scriptId: string;

  level: LogLevel;

  message: string;

  timestamp: number;

}

export class ScriptLogger {

  private logs: ScriptLog[] = [];

  /**
   * Add Log
   */
  public log(
    entry: ScriptLog
  ): void {

    this.logs.push(entry);

  }

  /**
   * Get All Logs
   */
  public getAll():
    ScriptLog[] {

    return [...this.logs];

  }

  /**
   * Get Logs By Script
   */
  public getByScript(
    scriptId: string
  ): ScriptLog[] {

    return this.logs.filter(

      log =>

        log.scriptId === scriptId

    );

  }

  /**
   * Get Logs By Level
   */
  public getByLevel(
    level: LogLevel
  ): ScriptLog[] {

    return this.logs.filter(

      log =>

        log.level === level

    );

  }

  /**
   * Latest Log
   */
  public latest():
    ScriptLog | null {

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

const scriptLogger =
  new ScriptLogger();

export default scriptLogger;
