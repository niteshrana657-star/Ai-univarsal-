/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * File: RequestQueue.ts
 * -------------------------------------------------------------
 */

export interface QueueRequest<T = unknown> {

  id: string;

  request: T;

  createdAt: number;

}

export class RequestQueue {

  private queue: QueueRequest[] = [];

  /**
   * Add Request
   */
  public enqueue<T>(
    request: T
  ): string {

    const id =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;

    this.queue.push({

      id,

      request,

      createdAt: Date.now()

    });

    return id;

  }

  /**
   * Get Next Request
   */
  public dequeue():
    QueueRequest | null {

    return this.queue.shift() ?? null;

  }

  /**
   * Peek Request
   */
  public peek():
    QueueRequest | null {

    return this.queue.length > 0
      ? this.queue[0]
      : null;

  }

  /**
   * Queue Size
   */
  public size():
    number {

    return this.queue.length;

  }

  /**
   * Is Empty
   */
  public isEmpty():
    boolean {

    return this.queue.length === 0;

  }

  /**
   * Get All Requests
   */
  public getAll():
    QueueRequest[] {

    return [...this.queue];

  }

  /**
   * Remove Request By Id
   */
  public remove(
    id: string
  ): boolean {

    const index =
      this.queue.findIndex(
        item => item.id === id
      );

    if (index === -1) {

      return false;

    }

    this.queue.splice(
      index,
      1
    );

    return true;

  }

  /**
   * Clear Queue
   */
  public clear(): void {

    this.queue = [];

  }

}

const requestQueue =
  new RequestQueue();

export default requestQueue;
