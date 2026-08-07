/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Analytics Module
 * File: EventTracker.ts
 * -------------------------------------------------------------
 */

import AnalyticsManager from "./AnalyticsManager";

export interface TrackedEvent {

  id: string;

  category: string;

  action: string;

  label?: string;

  value?: number;

  timestamp: number;

  metadata?: Record<
    string,
    unknown
  >;

}

export class EventTracker {

  private history:
    TrackedEvent[] = [];

  /**
   * Track Event
   */
  public track(

    category: string,

    action: string,

    label?: string,

    value?: number,

    metadata?: Record<
      string,
      unknown
    >

  ): TrackedEvent {

    const event:
      TrackedEvent = {

      id:
        crypto.randomUUID(),

      category,

      action,

      label,

      value,

      timestamp:
        Date.now(),

      metadata

    };

    this.history.push(
      event
    );

    AnalyticsManager.track(

      `${category}.${action}`,

      {

        label,

        value,

        metadata

      }

    );

    return event;

  }

  /**
   * Get Events
   */
  public getEvents():
    TrackedEvent[] {

    return [
      ...this.history
    ];

  }

  /**
   * Find By Category
   */
  public findByCategory(

    category: string

  ): TrackedEvent[] {

    return this.history.filter(

      event =>

        event.category ===
        category

    );

  }

  /**
   * Total Events
   */
  public count():
    number {

    return this.history.length;

  }

  /**
   * Clear Events
   */
  public clear():
    void {

    this.history = [];

  }

}

const eventTracker =
  new EventTracker();

export default eventTracker;
