/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * File: WhatsAppIntegration.ts
 * -------------------------------------------------------------
 */

import IntegrationManager, {
  Integration,
  IntegrationType
} from "./IntegrationManager";

export interface WhatsAppAccount {

  id: string;

  phoneNumber: string;

  displayName?: string;

  connected: boolean;

}

export interface WhatsAppMessage {

  to: string;

  text: string;

}

export class WhatsAppIntegration {

  private account:
    WhatsAppAccount | null = null;

  /**
   * Connect WhatsApp
   */
  public connect(
    account: WhatsAppAccount
  ): boolean {

    this.account = account;

    const integration: Integration = {

      id: account.id,

      name: "WhatsApp",

      type:
        IntegrationType.WHATSAPP,

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
   * Disconnect
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
    message: WhatsAppMessage
  ): Promise<boolean> {

    if (!this.isConnected()) {

      return false;

    }

    // Reserved for
    // WhatsApp API

    return true;

  }

  /**
   * Get Account
   */
  public getAccount():
    WhatsAppAccount | null {

    return this.account;

  }

  /**
   * Is Connected
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

const whatsAppIntegration =
  new WhatsAppIntegration();

export default whatsAppIntegration;
