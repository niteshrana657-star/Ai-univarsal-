/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * Exports
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  IntegrationType,
  default as IntegrationManager
} from "./IntegrationManager";

export type {
  Integration
} from "./IntegrationManager";

export {
  default as GoogleIntegration
} from "./GoogleIntegration";

export type {
  GoogleAccount
} from "./GoogleIntegration";

export {
  default as GitHubIntegration
} from "./GitHubIntegration";

export type {
  GitHubAccount
} from "./GitHubIntegration";

export {
  default as TelegramIntegration
} from "./TelegramIntegration";

export type {
  TelegramAccount,
  TelegramMessage
} from "./TelegramIntegration";

export {
  default as WhatsAppIntegration
} from "./WhatsAppIntegration";

export type {
  WhatsAppAccount,
  WhatsAppMessage
} from "./WhatsAppIntegration";
