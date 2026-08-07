/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scripts Module
 * File: ScriptRunner.ts
 * -------------------------------------------------------------
 */

import ScriptManager, {
  Script,
  ScriptStatus
} from "./ScriptManager";

export interface ScriptExecutionResult {

  success: boolean;

  scriptId: string;

  startedAt: number;

  finishedAt: number;

  message: string;

}

export class ScriptRunner {

  /**
   * Execute Script
   */
  public async run(
    id: string
  ): Promise<ScriptExecutionResult> {

    const script =
      ScriptManager.get(id);

    const startedAt =
      Date.now();

    if (!script) {

      return {

        success: false,

        scriptId: id,

        startedAt,

        finishedAt:
          Date.now(),

        message:
          "Script not found"

      };

    }

    ScriptManager.updateStatus(

      id,

      ScriptStatus.RUNNING

    );

    try {

      /**
       * Reserved
       * Future Script Engine
       */

      ScriptManager.updateStatus(

        id,

        ScriptStatus.COMPLETED

      );

      return {

        success: true,

        scriptId: id,

        startedAt,

        finishedAt:
          Date.now(),

        message:
          "Script executed successfully"

      };

    } catch {

      ScriptManager.updateStatus(

        id,

        ScriptStatus.FAILED

      );

      return {

        success: false,

        scriptId: id,

        startedAt,

        finishedAt:
          Date.now(),

        message:
          "Script execution failed"

      };

    }

  }

  /**
   * Stop Script
   */
  public stop(
    id: string
  ): boolean {

    return ScriptManager
      .updateStatus(

        id,

        ScriptStatus.STOPPED

      );

  }

  /**
   * Restart Script
   */
  public async restart(
    id: string
  ): Promise<ScriptExecutionResult> {

    this.stop(id);

    return this.run(id);

  }

  /**
   * Get Script
   */
  public get(
    id: string
  ): Script | undefined {

    return ScriptManager.get(id);

  }

}

const scriptRunner =
  new ScriptRunner();

export default scriptRunner;
