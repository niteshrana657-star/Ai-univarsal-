/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * File: TelegramIntegration.ts
 * -------------------------------------------------------------
 */

import IntegrationManager, {
  Integration,
  IntegrationType
} from "./IntegrationManager";

export interface TelegramAccount {

  id: string;

  username: string;

  botToken?: string;

  chatId?: string;

  connected: boolean;

}

export interface TelegramMessage {

  chatId: string;

  text: string;

  parseMode?: "Markdown" | "HTML";

}

export class TelegramIntegration {

  private account:
    TelegramAccount | null = null;

  /**
   * Connect Telegram
   */
  public connect(
    account: TelegramAccount
  ): boolean {

    this.account = account;

    const integration: Integration = {

      id: account.id,

      name: "Telegram",

      type:
        IntegrationType.TELEGRAM,

      enabled: true,

      connected: true,

      createdAt:
        Date.now()

    };

    IntegrationManager.register(
      integration
    );

    return true;

  }

  /**
   * Disconnect Telegram
   */
  public disconnect():
    boolean {

    if (!this.account) {

      return false;

    }

    IntegrationManager.remove(
      this.account.id
    );

    this.account = null;

    return true;

  }

  /**
   * Send Message
   */
  public async sendMessage(
    message: TelegramMessage
  ): Promise<boolean> {

    if (!this.isConnected()) {

      return false;

    }

    // Future Telegram API call

    return true;

  }

  /**
   * Get Connected Account
   */
  public getAccount():
    TelegramAccount | null {

    return this.account;

  }

  /**
   * Check Connection
   */
  public isConnected():
    boolean {

    return (

      this.account !== null &&

      this.account.connected

    );

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.account = null;

  }

}

const telegramIntegration =
  new TelegramIntegration();

export default telegramIntegration;
