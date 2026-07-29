/**
 * Universal AI Operating Companion
 * AI Engine State Management
 *
 * Maintains runtime state of AI Engine.
 */

import { AIRequest, AIResponse } from "./AIEngine";


export class AIEngineState {

    private initialized: boolean = false;

    private processing: boolean = false;

    private lastRequest:
        AIRequest | null = null;

    private lastResponse:
        AIResponse | null = null;

    private error:
        string | null = null;



    /**
     * Set initialization state
     */
    setInitialized(
        value: boolean
    ): void {

        this.initialized = value;

    }



    /**
     * Check initialization state
     */
    isInitialized(): boolean {

        return this.initialized;

    }



    /**
     * Set processing status
     */
    setProcessing(
        value: boolean
    ): void {

        this.processing = value;

    }



    /**
     * Check processing status
     */
    isProcessing(): boolean {

        return this.processing;

    }



    /**
     * Store latest AI request
     */
    setLastRequest(
        request: AIRequest
    ): void {

        this.lastRequest = request;

    }



    /**
     * Get latest request
     */
    getLastRequest():
        AIRequest | null {

        return this.lastRequest;

    }



    /**
     * Store latest AI response
     */
    setLastResponse(
        response: AIResponse
    ): void {

        this.lastResponse = response;

    }



    /**
     * Get latest response
     */
    getLastResponse():
        AIResponse | null {

        return this.lastResponse;

    }



    /**
     * Store error
     */
    setError(
        error: string | null
    ): void {

        this.error = error;

    }



    /**
     * Get current error
     */
    getError():
        string | null {

        return this.error;

    }



    /**
     * Check if engine has error
     */
    hasError(): boolean {

        return this.error !== null;

    }



    /**
     * Reset state
     */
    reset(): void {

        this.processing = false;

        this.lastRequest = null;

        this.lastResponse = null;

        this.error = null;

    }



    /**
     * Export complete state snapshot
     */
    getSnapshot() {

        return {

            initialized:
                this.initialized,

            processing:
                this.processing,

            lastRequest:
                this.lastRequest,

            lastResponse:
                this.lastResponse,

            error:
                this.error

        };

    }

}
