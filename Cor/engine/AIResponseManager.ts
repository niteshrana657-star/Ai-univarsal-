/**
 * Universal AI Operating Companion
 * AI Response Manager
 * Version: 1.0.0
 */


/**
 * Response Type
 */
export enum ResponseType {

    TEXT = "text",

    VOICE = "voice",

    NOTIFICATION = "notification",

    ACTION = "action"

}



/**
 * AI Response Data
 */
export interface ManagedAIResponse {

    id: string;

    type: ResponseType;

    message: string;

    success: boolean;

    timestamp: number;

    metadata?: Record<string, unknown>;

}



/**
 * AI Response Manager
 */
export class AIResponseManager {


    private history:
        ManagedAIResponse[];



    constructor() {

        this.history = [];

    }



    /**
     * Create AI response
     */
    createResponse(
        message: string,
        type: ResponseType = ResponseType.TEXT,
        metadata?: Record<string, unknown>
    ): ManagedAIResponse {


        const response:
            ManagedAIResponse = {

            id:
                this.generateId(),

            type,

            message,

            success:
                true,

            timestamp:
                Date.now(),

            metadata

        };


        this.history.push(
            response
        );


        return response;

    }



    /**
     * Create error response
     */
    createError(
        message: string
    ): ManagedAIResponse {


        const response:
            ManagedAIResponse = {

            id:
                this.generateId(),

            type:
                ResponseType.TEXT,

            message,

            success:
                false,

            timestamp:
                Date.now()

        };


        this.history.push(
            response
        );


        return response;

    }



    /**
     * Get response history
     */
    getHistory(): ManagedAIResponse[] {


        return this.history.map(
            item => ({
                ...item
            })
        );

    }



    /**
     * Get latest response
     */
    getLatest():
        ManagedAIResponse | undefined {


        return this.history[
            this.history.length - 1
        ];

    }



    /**
     * Clear history
     */
    clearHistory(): void {

        this.history = [];

    }



    /**
     * Generate response ID
     */
    private generateId(): string {


        return (

            "response_"

            +

            Date.now()
                .toString(36)

            +

            "_"

            +

            Math.random()
                .toString(36)
                .substring(2, 8)

        );

    }

}
