/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scripts Module
 * File: ScriptScheduler.ts
 * -------------------------------------------------------------
 */

import ScriptRunner from "./ScriptRunner";

export interface ScheduledScript {

  id: string;

  scriptId: string;

  interval: number;

  enabled: boolean;

  lastRun?: number;

  nextRun?: number;

}

export class ScriptScheduler {

  private schedules =
    new Map<string, ScheduledScript>();

  /**
   * Register Schedule
   */
  public register(
    schedule: ScheduledScript
  ): void {

    schedule.nextRun =
      Date.now() +
      schedule.interval;

    this.schedules.set(
      schedule.id,
      schedule
    );

  }

  /**
   * Execute Due Scripts
   */
  public async tick():
    Promise<void> {

    const now =
      Date.now();

    for (
      const schedule of
      this.schedules.values()
    ) {

      if (

        !schedule.enabled ||

        !schedule.nextRun ||

        schedule.nextRun > now

      ) {

        continue;

      }

      await ScriptRunner.run(

        schedule.scriptId

      );

      schedule.lastRun = now;

      schedule.nextRun =
        now +
        schedule.interval;

    }

  }

  /**
   * Enable Schedule
   */
  public enable(
    id: string
  ): boolean {

    const schedule =
      this.schedules.get(id);

    if (!schedule) {

      return false;

    }

    schedule.enabled = true;

    return true;

  }

  /**
   * Disable Schedule
   */
  public disable(
    id: string
  ): boolean {

    const schedule =
      this.schedules.get(id);

    if (!schedule) {

      return false;

    }

    schedule.enabled = false;

    return true;

  }

  /**
   * Remove Schedule
   */
  public remove(
    id: string
  ): boolean {

    return this.schedules.delete(
      id
    );

  }

  /**
   * Get Schedule
   */
  public get(
    id: string
  ): ScheduledScript | undefined {

    return this.schedules.get(id);

  }

  /**
   * Get All Schedules
   */
  public getAll():
    ScheduledScript[] {

    return Array.from(
      this.schedules.values()
    );

  }

  /**
   * Clear
   */
  public clear():
    void {

    this.schedules.clear();

  }

}

const scriptScheduler =
  new ScriptScheduler();

export default scriptScheduler;
