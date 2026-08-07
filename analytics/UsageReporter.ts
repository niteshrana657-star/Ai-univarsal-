/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Analytics Module
 * File: UsageReporter.ts
 * -------------------------------------------------------------
 */

import AnalyticsManager from "./AnalyticsManager";
import SessionManager from "./SessionManager";
import EventTracker from "./EventTracker";

export interface UsageReport {

  generatedAt: number;

  totalEvents: number;

  sessionActive: boolean;

  sessionDuration: number;

  trackedEvents: number;

}

export class UsageReporter {

  /**
   * Generate Usage Report
   */
  public generate():
    UsageReport {

    return {

      generatedAt:
        Date.now(),

      totalEvents:
        AnalyticsManager.count(),

      sessionActive:
        SessionManager.isActive(),

      sessionDuration:
        SessionManager.getDuration(),

      trackedEvents:
        EventTracker.count()

    };

  }

  /**
   * Export Report
   */
  public export():
    string {

    return JSON.stringify(

      this.generate(),

      null,

      2

    );

  }

  /**
   * Print Report
   */
  public print():
    void {

    console.log(

      this.export()

    );

  }

}

const usageReporter =
  new UsageReporter();

export default usageReporter;
