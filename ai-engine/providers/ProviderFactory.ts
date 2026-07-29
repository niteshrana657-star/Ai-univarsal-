/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ProviderFactory.ts
 * -------------------------------------------------------------
 */

import {
  AIProvider
} from "./AIProvider";

export type ProviderCreator = () => AIProvider;

export class ProviderFactory {

  private readonly creators =
    new Map<string, ProviderCreator>();

  /**
   * Register Provider Creator
   */
  public register(
    provider: string,
    creator: ProviderCreator
  ): void {

    this.creators.set(
      provider.toUpperCase(),
      creator
    );

  }

  /**
   * Create Provider
   */
  public create(
    provider: string
  ): AIProvider | null {

    const creator =
      this.creators.get(
        provider.toUpperCase()
      );

    if (!creator) {
      return null;
    }

    return creator();

  }

  /**
   * Check Provider Support
   */
  public supports(
    provider: string
  ): boolean {

    return this.creators.has(
      provider.toUpperCase()
    );

  }

  /**
   * Get Registered Providers
   */
  public getProviders():
    string[] {

    return Array.from(
      this.creators.keys()
    );

  }

  /**
   * Remove Provider
   */
  public unregister(
    provider: string
  ): boolean {

    return this.creators.delete(
      provider.toUpperCase()
    );

  }

  /**
   * Clear Factory
   */
  public clear(): void {

    this.creators.clear();

  }

  /**
   * Total Registered Providers
   */
  public count(): number {

    return this.creators.size;

  }

  /**
   * Register Multiple Providers
   */
  public registerMany(
    providers: Record<
      string,
      ProviderCreator
    >
  ): void {

    Object.entries(
      providers
    ).forEach(
      ([name, creator]) => {

        this.register(
          name,
          creator
        );

      }
    );

  }

}

const providerFactory =
  new ProviderFactory();

export default providerFactory;
