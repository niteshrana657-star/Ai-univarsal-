/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Analytics Module
 * File: MetricsCollector.ts
 * -------------------------------------------------------------
 */

import EventTracker from "./EventTracker";
import SessionManager from "./SessionManager";

export interface AnalyticsMetrics {

  totalEvents: number;

  sessionDuration: number;

  averageEventsPerMinute: number;

  activeSession: boolean;

  generatedAt: number;

}

export class MetricsCollector {

  /**
   * Collect Metrics
   */
  public collect():
    AnalyticsMetrics {

    const totalEvents =
      EventTracker.count();

    const durationMs =
      SessionManager.getDuration();

    const durationMinutes =

      durationMs <= 0

        ? 1

        : durationMs / 60000;

    return {

      totalEvents,

      sessionDuration:
        durationMs,

      averageEventsPerMinute:

        Number(

          (
            totalEvents /

            durationMinutes

          ).toFixed(2)

        ),

      activeSession:

        SessionManager.isActive(),

      generatedAt:
        Date.now()

    };

  }

  /**
   * Convert Metrics
   * To JSON
   */
  public toJSON():
    string {

    return JSON.stringify(

      this.collect(),

      null,

      2

    );

  }

  /**
   * Reset Collector
   */
  public reset():
    void {

    // Reserved
    // for future cache

  }

}

const metricsCollector =
  new MetricsCollector();

export default metricsCollector;
