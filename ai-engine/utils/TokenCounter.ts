/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: TokenCounter.ts
 * -------------------------------------------------------------
 */

export interface TokenUsage {

  promptTokens: number;

  completionTokens: number;

  totalTokens: number;

}

export class TokenCounter {

  /**
   * Estimate Tokens
   * (Approximation: 1 token ≈ 4 characters)
   */
  public estimate(
    text: string
  ): number {

    if (!text) {

      return 0;

    }

    return Math.ceil(
      text.length / 4
    );

  }

  /**
   * Count Prompt Tokens
   */
  public countPrompt(
    prompt: string
  ): number {

    return this.estimate(
      prompt
    );

  }

  /**
   * Count Completion Tokens
   */
  public countCompletion(
    completion: string
  ): number {

    return this.estimate(
      completion
    );

  }

  /**
   * Calculate Usage
   */
  public calculate(
    prompt: string,
    completion: string
  ): TokenUsage {

    const promptTokens =
      this.countPrompt(prompt);

    const completionTokens =
      this.countCompletion(completion);

    return {

      promptTokens,

      completionTokens,

      totalTokens:
        promptTokens +
        completionTokens

    };

  }

  /**
   * Check Token Limit
   */
  public exceedsLimit(
    text: string,
    limit: number
  ): boolean {

    return (
      this.estimate(text) >
      limit
    );

  }

  /**
   * Remaining Tokens
   */
  public remaining(
    used: number,
    limit: number
  ): number {

    return Math.max(
      0,
      limit - used
    );

  }

}

const tokenCounter =
  new TokenCounter();

export default tokenCounter;
