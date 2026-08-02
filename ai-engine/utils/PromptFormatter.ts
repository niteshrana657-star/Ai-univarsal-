/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: PromptFormatter.ts
 * -------------------------------------------------------------
 */

export interface PromptFormatOptions {

  trim: boolean;

  removeExtraSpaces: boolean;

  addSystemPrefix: boolean;

  systemPrefix: string;

}

export const DEFAULT_PROMPT_OPTIONS: PromptFormatOptions = {

  trim: true,

  removeExtraSpaces: true,

  addSystemPrefix: false,

  systemPrefix: "[SYSTEM]"

};

export class PromptFormatter {

  private options: PromptFormatOptions =
    DEFAULT_PROMPT_OPTIONS;

  /**
   * Configure Formatter
   */
  public configure(
    options: Partial<PromptFormatOptions>
  ): void {

    this.options = {

      ...this.options,

      ...options

    };

  }

  /**
   * Format Prompt
   */
  public format(
    prompt: string
  ): string {

    let result = prompt;

    if (this.options.trim) {

      result = result.trim();

    }

    if (
      this.options.removeExtraSpaces
    ) {

      result = result.replace(
        /\s+/g,
        " "
      );

    }

    if (
      this.options.addSystemPrefix
    ) {

      result =
        `${this.options.systemPrefix} ${result}`;

    }

    return result;

  }

  /**
   * Merge Prompt Parts
   */
  public merge(
    ...parts: string[]
  ): string {

    return parts
      .filter(
        part =>
          part.trim().length > 0
      )
      .join("\n");

  }

  /**
   * Normalize Prompt
   */
  public normalize(
    prompt: string
  ): string {

    return this.format(prompt);

  }

  /**
   * Reset Options
   */
  public reset(): void {

    this.options =
      DEFAULT_PROMPT_OPTIONS;

  }

}

const promptFormatter =
  new PromptFormatter();

export default promptFormatter;
