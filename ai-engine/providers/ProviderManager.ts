/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ProviderManager.ts
 * -------------------------------------------------------------
 */

import {
  AIProvider,
  ProviderStatus
} from "./AIProvider";

export class ProviderManager {

  private readonly providers =
    new Map<string, AIProvider>();

  private activeProviderId:
    string | null = null;

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

    if (
      this.activeProviderId === null
    ) {
      this.activeProviderId =
        provider.id;
    }

  }

  /**
   * Register Multiple Providers
   */
  public registerMany(
    providers: AIProvider[]
  ): void {

    providers.forEach(
      provider =>
        this.register(provider)
    );

  }

  /**
   * Get Provider
   */
  public get(
    id: string
  ): AIProvider | undefined {

    return this.providers.get(id);

  }

  /**
   * Get Active Provider
   */
  public getActive():
    AIProvider | null {

    if (!this.activeProviderId) {
      return null;
    }

    return (
      this.providers.get(
        this.activeProviderId
      ) ?? null
    );

  }

  /**
   * Set Active Provider
   */
  public setActive(
    id: string
  ): boolean {

    if (
      !this.providers.has(id)
    ) {
      return false;
    }

    this.activeProviderId = id;

    return true;

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
   * Get Connected Providers
   */
  public getConnected():
    AIProvider[] {

    return this.getAll().filter(
      provider =>
        provider.isConnected()
    );

  }

  /**
   * Connect Provider
   */
  public async connect(
    id: string
  ): Promise<boolean> {

    const provider =
      this.get(id);

    if (!provider) {
      return false;
    }

    return provider.connect();

  }

  /**
   * Disconnect Provider
   */
  public async disconnect(
    id: string
  ): Promise<boolean> {

    const provider =
      this.get(id);

    if (!provider) {
      return false;
    }

    await provider.disconnect();

    return true;

  }

  /**
   * Get Provider Status
   */
  public getStatus(
    id: string
  ): ProviderStatus | null {

    const provider =
      this.get(id);

    if (!provider) {
      return null;
    }

    return provider.getStatus();

  }

  /**
   * Remove Provider
   */
  public remove(
    id: string
  ): boolean {

    if (
      this.activeProviderId === id
    ) {
      this.activeProviderId = null;
    }

    return this.providers.delete(id);

  }

  /**
   * Clear Providers
   */
  public clear(): void {

    this.providers.clear();

    this.activeProviderId = null;

  }

  /**
   * Total Providers
   */
  public count(): number {

    return this.providers.size;

  }

  /**
   * Has Provider
   */
  public has(
    id: string
  ): boolean {

    return this.providers.has(id);

  }

}

const providerManager =
  new ProviderManager();

export default providerManager;
