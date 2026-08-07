/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * File: GoogleIntegration.ts
 * -------------------------------------------------------------
 */

import IntegrationManager, {
  Integration,
  IntegrationType
} from "./IntegrationManager";

export interface GoogleAccount {

  id: string;

  email: string;

  displayName: string;

  connected: boolean;

  accessToken?: string;

  refreshToken?: string;

  expiresAt?: number;

}

export class GoogleIntegration {

  private account:
    GoogleAccount | null = null;

  /**
   * Connect Account
   */
  public connect(
    account: GoogleAccount
  ): boolean {

    this.account = account;

    const integration: Integration = {

      id: account.id,

      name: "Google",

      type:
        IntegrationType.GOOGLE,

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
   * Get Account
   */
  public getAccount():
    GoogleAccount | null {

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
   * Refresh Token
   */
  public refresh():
    boolean {

    if (!this.account) {

      return false;

    }

    this.account.expiresAt =

      Date.now() +

      3600 * 1000;

    return true;

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.account = null;

  }

}

const googleIntegration =
  new GoogleIntegration();

export default googleIntegration;
