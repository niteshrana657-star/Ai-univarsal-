/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: PromptManager.ts
 * -------------------------------------------------------------
 */

import PromptBuilder, {
  FinalPrompt
} from "./PromptBuilder";

import {
  AIContextInput
} from "./ContextPrompt";

import {
  UserPrompt,
  createUserPrompt,
  UserPromptInput
} from "./UserPrompt";

export interface PromptHistory {

  id: string;

  timestamp: number;

  prompt: FinalPrompt;

}

export class PromptManager {

  private history: PromptHistory[] = [];

  /**
   * Create prompt from input
   */
  public createPrompt(
    input: UserPromptInput,
    context: AIContextInput
  ): FinalPrompt {

    const userPrompt: UserPrompt =
      createUserPrompt(input);

    const prompt =
      PromptBuilder.build(
        userPrompt,
        context
      );

    this.history.push({

      id:
        userPrompt.id,

      timestamp:
        Date.now(),

      prompt

    });

    return prompt;

  }

  /**
   * Get Prompt History
   */
  public getHistory(): PromptHistory[] {

    return [...this.history];

  }

  /**
   * Get Latest Prompt
   */
  public getLatestPrompt():
    PromptHistory | null {

    if (
      this.history.length === 0
    ) {
      return null;
    }

    return this.history[
      this.history.length - 1
    ];

  }

  /**
   * Clear History
   */
  public clearHistory(): void {

    this.history = [];

  }

  /**
   * Remove Prompt
   */
  public removePrompt(
    id: string
  ): boolean {

    const index =
      this.history.findIndex(
        item => item.id === id
      );

    if (index === -1) {
      return false;
    }

    this.history.splice(
      index,
      1
    );

    return true;

  }

  /**
   * Total Prompt Count
   */
  public getPromptCount():
    number {

    return this.history.length;

  }

  /**
   * Check History
   */
  public hasHistory():
    boolean {

    return this.history.length > 0;

  }

}

const promptManager =
  new PromptManager();

export default promptManager;
