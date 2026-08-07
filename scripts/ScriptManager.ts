/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scripts Module
 * File: ScriptManager.ts
 * -------------------------------------------------------------
 */

export enum ScriptStatus {

  CREATED = "CREATED",

  RUNNING = "RUNNING",

  COMPLETED = "COMPLETED",

  FAILED = "FAILED",

  STOPPED = "STOPPED"

}

export interface Script {

  id: string;

  name: string;

  code: string;

  status: ScriptStatus;

  createdAt: number;

  updatedAt: number;

}

export class ScriptManager {

  private scripts =
    new Map<string, Script>();

  /**
   * Register Script
   */
  public register(
    script: Script
  ): void {

    this.scripts.set(
      script.id,
      script
    );

  }

  /**
   * Get Script
   */
  public get(
    id: string
  ): Script | undefined {

    return this.scripts.get(id);

  }

  /**
   * Get All Scripts
   */
  public getAll():
    Script[] {

    return Array.from(
      this.scripts.values()
    );

  }

  /**
   * Update Script Status
   */
  public updateStatus(
    id: string,
    status: ScriptStatus
  ): boolean {

    const script =
      this.scripts.get(id);

    if (!script) {

      return false;

    }

    script.status = status;

    script.updatedAt =
      Date.now();

    return true;

  }

  /**
   * Remove Script
   */
  public remove(
    id: string
  ): boolean {

    return this.scripts.delete(
      id
    );

  }

  /**
   * Total Scripts
   */
  public count():
    number {

    return this.scripts.size;

  }

  /**
   * Clear Scripts
   */
  public clear():
    void {

    this.scripts.clear();

  }

}

const scriptManager =
  new ScriptManager();

export default scriptManager;
