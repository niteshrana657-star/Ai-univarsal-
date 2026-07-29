/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: PromptBuilder.ts
 * -------------------------------------------------------------
 */

import SYSTEM_PROMPT from "./SystemPrompt";
import createContextPrompt, {
  AIContextInput
} from "./ContextPrompt";

import {
  UserPrompt,
  sanitizeUserMessage,
  detectBasicIntent
} from "./UserPrompt";

export interface FinalPrompt {

  system: string;

  context: string;

  user: string;

  prompt: string;

  timestamp: number;

}

export class PromptBuilder {

  public build(
    userPrompt: UserPrompt,
    context: AIContextInput
  ): FinalPrompt {

    const cleanedMessage =
      sanitizeUserMessage(
        userPrompt.message
      );

    const detectedIntent =
      detectBasicIntent(
        cleanedMessage
      );

    const contextPrompt =
      createContextPrompt(
        context
      );

    const userSection = `

USER MESSAGE

${cleanedMessage}

INTENT

${detectedIntent}

LANGUAGE

${userPrompt.language}

PRIORITY

${userPrompt.priority}

ACTION REQUIRED

${userPrompt.requiresAction}

`;

    const finalPrompt = [

      SYSTEM_PROMPT,

      contextPrompt,

      userSection

    ].join("\n\n");

    return {

      system:
        SYSTEM_PROMPT,

      context:
        contextPrompt,

      user:
        userSection,

      prompt:
        finalPrompt,

      timestamp:
        Date.now()

    };

  }

  public buildFromMessage(
    message: string,
    context: AIContextInput
  ): FinalPrompt {

    return this.build(
      {

        id: "quick",

        timestamp:
          Date.now(),

        message,

        language: "auto",

        intent:
          detectBasicIntent(
            message
          ),

        priority:
          "NORMAL",

        context: {},

        requiresAction:
          false

      },

      context

    );

  }

}

export default new PromptBuilder();
