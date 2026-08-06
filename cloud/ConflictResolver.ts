/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Cloud Sync Module
 * File: ConflictResolver.ts
 * -------------------------------------------------------------
 */

export enum ConflictStrategy {

  KEEP_LOCAL = "KEEP_LOCAL",

  KEEP_REMOTE = "KEEP_REMOTE",

  KEEP_NEWEST = "KEEP_NEWEST",

  MANUAL = "MANUAL"

}

export interface ConflictItem<T = unknown> {

  id: string;

  local: T;

  remote: T;

  localTimestamp: number;

  remoteTimestamp: number;

}

export interface ConflictResult<T = unknown> {

  resolved: boolean;

  strategy: ConflictStrategy;

  data: T;

}

export class ConflictResolver {

  private strategy =
    ConflictStrategy.KEEP_NEWEST;

  /**
   * Set Strategy
   */
  public setStrategy(
    strategy: ConflictStrategy
  ): void {

    this.strategy = strategy;

  }

  /**
   * Get Strategy
   */
  public getStrategy():
    ConflictStrategy {

    return this.strategy;

  }

  /**
   * Resolve Conflict
   */
  public resolve<T>(
    item: ConflictItem<T>
  ): ConflictResult<T> {

    switch (this.strategy) {

      case ConflictStrategy.KEEP_LOCAL:

        return {

          resolved: true,

          strategy: this.strategy,

          data: item.local

        };

      case ConflictStrategy.KEEP_REMOTE:

        return {

          resolved: true,

          strategy: this.strategy,

          data: item.remote

        };

      case ConflictStrategy.KEEP_NEWEST:

        return {

          resolved: true,

          strategy: this.strategy,

          data:
            item.localTimestamp >=
            item.remoteTimestamp
              ? item.local
              : item.remote

        };

      case ConflictStrategy.MANUAL:

      default:

        return {

          resolved: false,

          strategy: this.strategy,

          data: item.local

        };

    }

  }

  /**
   * Reset Strategy
   */
  public reset(): void {

    this.strategy =
      ConflictStrategy.KEEP_NEWEST;

  }

}

const conflictResolver =
  new ConflictResolver();

export default conflictResolver;
