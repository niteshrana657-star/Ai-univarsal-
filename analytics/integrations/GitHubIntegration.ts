/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * File: GitHubIntegration.ts
 * -------------------------------------------------------------
 */

import IntegrationManager, {
  Integration,
  IntegrationType
} from "./IntegrationManager";

export interface GitHubAccount {

  id: string;

  username: string;

  email?: string;

  avatarUrl?: string;

  accessToken?: string;

  connected: boolean;

}

export class GitHubIntegration {

  private account:
    GitHubAccount | null = null;

  /**
   * Connect GitHub
   */
  public connect(
    account: GitHubAccount
  ): boolean {

    this.account = account;

    const integration: Integration = {

      id: account.id,

      name: "GitHub",

      type:
        IntegrationType.GITHUB,

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
   * Disconnect GitHub
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
    GitHubAccount | null {

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
   * Update Token
   */
  public updateToken(
    token: string
  ): boolean {

    if (!this.account) {

      return false;

    }

    this.account.accessToken =
      token;

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

const gitHubIntegration =
  new GitHubIntegration();

export default gitHubIntegration;
