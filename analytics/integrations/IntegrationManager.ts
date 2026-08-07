/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Integrations Module
 * File: IntegrationManager.ts
 * -------------------------------------------------------------
 */

export enum IntegrationType {

  GOOGLE = "GOOGLE",

  MICROSOFT = "MICROSOFT",

  GITHUB = "GITHUB",

  TELEGRAM = "TELEGRAM",

  WHATSAPP = "WHATSAPP",

  CUSTOM = "CUSTOM"

}

export interface Integration {

  id: string;

  name: string;

  type: IntegrationType;

  enabled: boolean;

  connected: boolean;

  createdAt: number;

}

export class IntegrationManager {

  private integrations =
    new Map<string, Integration>();

  /**
   * Register Integration
   */
  public register(
    integration: Integration
  ): void {

    this.integrations.set(

      integration.id,

      integration

    );

  }

  /**
   * Remove Integration
   */
  public remove(
    id: string
  ): boolean {

    return this.integrations.delete(
      id
    );

  }

  /**
   * Get Integration
   */
  public get(
    id: string
  ): Integration | undefined {

    return this.integrations.get(
      id
    );

  }

  /**
   * Get All Integrations
   */
  public getAll():
    Integration[] {

    return Array.from(

      this.integrations.values()

    );

  }

  /**
   * Enable Integration
   */
  public enable(
    id: string
  ): boolean {

    const integration =
      this.integrations.get(id);

    if (!integration) {

      return false;

    }

    integration.enabled = true;

    return true;

  }

  /**
   * Disable Integration
   */
  public disable(
    id: string
  ): boolean {

    const integration =
      this.integrations.get(id);

    if (!integration) {

      return false;

    }

    integration.enabled = false;

    return true;

  }

  /**
   * Clear
   */
  public clear(): void {

    this.integrations.clear();

  }

}

const integrationManager =
  new IntegrationManager();

export default integrationManager;
