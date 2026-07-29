/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  SYSTEM_PROMPT,
  SYSTEM_PROMPT_VERSION
} from "./SystemPrompt";

export {
  default as createContextPrompt,
  CONTEXT_PROMPT_VERSION,
  EMPTY_CONTEXT,
  createContextPrompt,
  buildCompleteContext,
  normalizeContext,
  validateContext,
  mergeContext
} from "./ContextPrompt";

export {
  createUserPrompt,
  createUserPromptId,
  sanitizeUserMessage,
  detectBasicIntent,
  validateUserPrompt
} from "./UserPrompt";

export type {
  UserPrompt,
  UserPromptInput
} from "./UserPrompt";

export {
  default as PromptBuilder
} from "./PromptBuilder";

export type {
  FinalPrompt
} from "./PromptBuilder";

export {
  default as PromptManager
} from "./PromptManager";

export type {
  PromptHistory
} from "./PromptManager";

export {
  PromptTemplates,
  getPromptTemplate,
  getTemplatesByCategory,
  getAllTemplates
} from "./PromptTemplates";

export type {
  PromptTemplate
} from "./PromptTemplates";

export type {
  AIContextInput,
  DeviceContext,
  ScreenContext,
  MemoryContext,
  PermissionContext
} from "./ContextPrompt";
