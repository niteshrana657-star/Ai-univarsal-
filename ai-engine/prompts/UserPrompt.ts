/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: UserPrompt.ts
 * -------------------------------------------------------------
 */


export interface UserPromptInput {

  message: string;

  language?: string;

  context?: Record<string, unknown>;

  userIntent?: string;

  priority?: 
    "LOW" |
    "NORMAL" |
    "HIGH" |
    "CRITICAL";

  requiresAction?: boolean;
}


export interface UserPrompt {

  id: string;

  timestamp: number;

  message: string;

  language: string;

  intent: string;

  priority: string;

  context: Record<string, unknown>;

  requiresAction: boolean;
}


/**
 * Create Unique Prompt ID
 */
export function createUserPromptId(): string {

  return (
    "user_prompt_" +
    Date.now().toString(36) +
    "_" +
    Math.random()
      .toString(36)
      .substring(2, 10)
  );
}


/**
 * Build User Prompt
 */
export function createUserPrompt(
  input: UserPromptInput
): UserPrompt {


  return {

    id:
      createUserPromptId(),

    timestamp:
      Date.now(),

    message:
      input.message.trim(),

    language:
      input.language ??
      "auto",

    intent:
      input.userIntent ??
      "general",

    priority:
      input.priority ??
      "NORMAL",

    context:
      input.context ??
      {},

    requiresAction:
      input.requiresAction ??
      false,
  };
}


/**
 * Validate User Prompt
 */
export function validateUserPrompt(
  prompt: UserPrompt
): boolean {


  if (!prompt.id) {
    return false;
  }


  if (!prompt.message) {
    return false;
  }


  if (!prompt.timestamp) {
    return false;
  }


  return true;
}


/**
 * Sanitize User Input
 */
export function sanitizeUserMessage(
  message: string
): string {


  return message
    .trim()
    .substring(0, 5000);
}


/**
 * Extract Basic Intent
 */
export function detectBasicIntent(
  message: string
): string {


  const text =
    message.toLowerCase();


  if (
    text.includes("open") ||
    text.includes("start")
  ) {
    return "OPEN_ACTION";
  }


  if (
    text.includes("create") ||
    text.includes("make")
  ) {
    return "CREATE_ACTION";
  }


  if (
    text.includes("help") ||
    text.includes("how")
  ) {
    return "ASSISTANCE";
  }


  return "GENERAL_QUERY";
}
