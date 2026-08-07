/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Analytics Module
 * File: AnalyticsManager.ts
 * -------------------------------------------------------------
 */

export interface AnalyticsEvent {

  id: string;

  name: string;

  timestamp: number;

  data?: Record<string, unknown>;

}

export interface AnalyticsSession {

  id: string;

  startedAt: number;

  endedAt?: number;

  active: boolean;

}

export class AnalyticsManager {

  private events: AnalyticsEvent[] = [];

  private session:
    AnalyticsSession | null = null;

  /**
   * Start Session
   */
  public startSession(
    id: string
  ): AnalyticsSession {

    this.session = {

      id,

      startedAt: Date.now(),

      active: true

    };

    return this.session;

  }

  /**
   * End Session
   */
  public endSession(): void {

    if (!this.session) {

      return;

    }

    this.session.endedAt =
      Date.now();

    this.session.active =
      false;

  }

  /**
   * Get Session
   */
  public getSession():
    AnalyticsSession | null {

    return this.session;

  }

  /**
   * Track Event
   */
  public track(
    name: string,
    data?: Record<
      string,
      unknown
    >
  ): AnalyticsEvent {

    const event: AnalyticsEvent = {

      id:
        crypto.randomUUID(),

      name,

      timestamp:
        Date.now(),

      data

    };

    this.events.push(
      event
    );

    return event;

  }

  /**
   * Get Events
   */
  public getEvents():
    AnalyticsEvent[] {

    return [
      ...this.events
    ];

  }

  /**
   * Total Events
   */
  public count():
    number {

    return this.events.length;

  }

  /**
   * Clear Analytics
   */
  public clear():
    void {

    this.events = [];

    this.session = null;

  }

}

const analyticsManager =
  new AnalyticsManager();

export default analyticsManager;
