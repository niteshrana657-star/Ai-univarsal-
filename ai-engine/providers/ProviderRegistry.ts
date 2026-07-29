/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ProviderRegistry.ts
 * -------------------------------------------------------------
 */

import { AIProvider } from "./AIProvider";

export class ProviderRegistry {

  private static instance:
    ProviderRegistry;

  private readonly providers =
    new Map<string, AIProvider>();

  private constructor() {}

  /**
   * Get Singleton Instance
   */
  public static getInstance():
    ProviderRegistry {

    if (!ProviderRegistry.instance) {

      ProviderRegistry.instance =
        new ProviderRegistry();

    }

    return ProviderRegistry.instance;

  }

  /**
   * Register Provider
   */
  public register(
    provider: AIProvider
  ): void {

    this.providers.set(
      provider.id,
      provider
    );

  }

  /**
   * Unregister Provider
   */
  public unregister(
    id: string
  ): boolean {

    return this.providers.delete(id);

  }

  /**
   * Find Provider
   */
  public find(
    id: string
  ): AIProvider | undefined {

    return this.providers.get(id);

  }

  /**
   * Exists
   */
  public exists(
    id: string
  ): boolean {

    return this.providers.has(id);

  }

  /**
   * Get All Providers
   */
  public getAll():
    AIProvider[] {

    return Array.from(
      this.providers.values()
    );

  }

  /**
   * Find By Provider Name
   */
  public findByProvider(
    providerName: string
  ): AIProvider[] {

    return this.getAll().filter(

      provider =>

        provider.provider ===
        providerName

    );

  }

  /**
   * Connected Providers
   */
  public getConnected():
    AIProvider[] {

    return this.getAll().filter(

      provider =>

        provider.isConnected()

    );

  }

  /**
   * Disconnect All
   */
  public async disconnectAll():
    Promise<void> {

    for (
      const provider
      of this.providers.values()
    ) {

      if (
        provider.isConnected()
      ) {

        await provider.disconnect();

      }

    }

  }

  /**
   * Clear Registry
   */
  public clear(): void {

    this.providers.clear();

  }

  /**
   * Total Providers
   */
  public size(): number {

    return this.providers.size;

  }

}

const providerRegistry =
  ProviderRegistry.getInstance();

export default providerRegistry;
