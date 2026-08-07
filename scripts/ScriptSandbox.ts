/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scripts Module
 * File: ScriptSandbox.ts
 * -------------------------------------------------------------
 */

export interface SandboxLimits {

  maxExecutionTime: number;

  maxMemoryUsage: number;

  allowNetwork: boolean;

  allowFileSystem: boolean;

}

export interface SandboxResult {

  success: boolean;

  output?: unknown;

  error?: string;

  executionTime: number;

}

export class ScriptSandbox {

  private limits: SandboxLimits = {

    maxExecutionTime: 5000,

    maxMemoryUsage: 64,

    allowNetwork: false,

    allowFileSystem: false

  };

  /**
   * Configure Sandbox
   */
  public configure(
    limits: Partial<SandboxLimits>
  ): void {

    this.limits = {

      ...this.limits,

      ...limits

    };

  }

  /**
   * Get Limits
   */
  public getLimits():
    SandboxLimits {

    return {

      ...this.limits

    };

  }

  /**
   * Execute
   */
  public async execute(
    callback: () => unknown
  ): Promise<SandboxResult> {

    const started =
      Date.now();

    try {

      const output =
        await Promise.resolve(
          callback()
        );

      return {

        success: true,

        output,

        executionTime:
          Date.now() -
          started

      };

    } catch (error) {

      return {

        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown sandbox error",

        executionTime:
          Date.now() -
          started

      };

    }

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.limits = {

      maxExecutionTime: 5000,

      maxMemoryUsage: 64,

      allowNetwork: false,

      allowFileSystem: false

    };

  }

}

const scriptSandbox =
  new ScriptSandbox();

export default scriptSandbox;
