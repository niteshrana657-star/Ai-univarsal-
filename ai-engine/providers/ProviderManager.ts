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

        if (!provider || !provider.id) {
            throw new Error(
                "Invalid AI provider."
            );
        }

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

        this.activeProviderId =
            id;

        return true;

    }


    /**
     * Get Active Provider ID
     */
    public getActiveId():
        string | null {

        return this.activeProviderId;

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

        try {

            return await provider.connect();

        } catch {

            return false;

        }

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

        try {

            await provider.disconnect();

            return true;

        } catch {

            return false;

        }

    }


    /**
     * Get Provider Status
     */
    public getStatus(
        id: string
    ):
        ProviderStatus | null {

        const provider =
            this.get(id);

        if (!provider) {
            return null;
        }

        return provider.getStatus();

    }


    /**
     * Check Provider Exists
     */
    public has(
        id: string
    ): boolean {

        return this.providers.has(id);

    }


    /**
     * Remove Provider
     */
    public remove(
        id: string
    ): boolean {

        const removed =
            this.providers.delete(id);

        if (
            this.activeProviderId === id
        ) {

            this.activeProviderId =
                null;

            const firstProvider =
                this.providers.values()
                    .next()
                    .value as
                    AIProvider | undefined;

            if (firstProvider) {

                this.activeProviderId =
                    firstProvider.id;

            }

        }

        return removed;

    }


    /**
     * Clear Providers
     */
    public clear(): void {

        this.providers.clear();

        this.activeProviderId =
            null;

    }


    /**
     * Total Providers
     */
    public count(): number {

        return this.providers.size;

    }

}


const providerManager =
    new ProviderManager();


export default providerManager;
