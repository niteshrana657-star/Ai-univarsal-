/**
 * Universal AI Operating Companion
 * AI Engine Core Types
 *
 * Shared request and response contracts
 * used across AI Engine Core modules.
 */


/**
 * AI Request
 */
export interface AIRequest {

    /**
     * User message sent to the AI Engine.
     */
    message: string;


    /**
     * Optional contextual information.
     */
    context?: Record<string, unknown>;


    /**
     * Optional system-level instruction.
     */
    systemInstruction?: string;


    /**
     * Optional request metadata.
     */
    metadata?: Record<string, unknown>;

}


/**
 * AI Response
 */
export interface AIResponse {

    /**
     * Whether the request completed successfully.
     */
    success: boolean;


    /**
     * Generated AI response.
     */
    message: string;


    /**
     * Name of the provider that generated
     * the response.
     */
    provider?: string;


    /**
     * Error message when execution fails.
     */
    error?: string;


    /**
     * Response creation timestamp.
     */
    timestamp: number;

}
