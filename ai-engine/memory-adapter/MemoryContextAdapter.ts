/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: MemoryContextAdapter.ts
 * -------------------------------------------------------------
 */

import MemoryAdapter from "./MemoryAdapter";

export interface MemoryContext {

  sessionId: string;

  userId: string | null;

  context: Record<string, unknown>;

  createdAt: number;

  updatedAt: number;

}

export class MemoryContextAdapter {

  /**
   * Save Context
   */
  public saveContext(
    context: MemoryContext
  ): void {

    MemoryAdapter.save(
      `context:${context.sessionId}`,
      context
    );

  }

  /**
   * Get Context
   */
  public getContext(
    sessionId: string
  ): MemoryContext | null {

    return MemoryAdapter.get<MemoryContext>(
      `context:${sessionId}`
    );

  }

  /**
   * Update Context Value
   */
  public updateValue(
    sessionId: string,
    key: string,
    value: unknown
  ): boolean {

    const context =
      this.getContext(sessionId);

    if (!context) {

      return false;

    }

    context.context[key] = value;

    context.updatedAt =
      Date.now();

    this.saveContext(context);

    return true;

  }

  /**
   * Remove Context
   */
  public removeContext(
    sessionId: string
  ): boolean {

    return MemoryAdapter.remove(
      `context:${sessionId}`
    );

  }

  /**
   * Context Exists
   */
  public exists(
    sessionId: string
  ): boolean {

    return MemoryAdapter.has(
      `context:${sessionId}`
    );

  }

  /**
   * Clear All Contexts
   */
  public clear(): void {

    const records =
      MemoryAdapter.getAll();

    for (const record of records) {

      if (
        record.key.startsWith(
          "context:"
        )
      ) {

        MemoryAdapter.remove(
          record.key
        );

      }

    }

  }

}

const memoryContextAdapter =
  new MemoryContextAdapter();

export default memoryContextAdapter;
