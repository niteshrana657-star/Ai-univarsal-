/**
 * Universal AI Operating Companion
 * AI Response System
 * Version: 1.0.0
 */



/**
 * Response Types
 */
export enum AIResponseType {

    TEXT = "text",

    VOICE = "voice",

    ACTION = "action",

    NOTIFICATION = "notification",

    ERROR = "error"

}



/**
 * Response Status
 */
export enum AIResponseStatus {

    SUCCESS = "success",

    FAILED = "failed",

    PENDING = "pending"

}



/**
 * AI Response Structure
 */
export interface AIResponseData {


    id: string;


    type: AIResponseType;


    status: AIResponseStatus;


    message: string;


    data?: unknown;


    createdAt: number;


    metadata?: Record<string, unknown>;

}



/**
 * AI Response Manager
 */
export class AIResponse {


    private responses:
        AIResponseData[];



    constructor() {


        this.responses =
            [];

    }



    /**
     * Create response
     */
    create(
        message: string,
        type:
            AIResponseType =
            AIResponseType.TEXT,
        data?: unknown
    ): AIResponseData {


        const response:
            AIResponseData =
        {

            id:
                this.generateId(),

            type,

            status:
                AIResponseStatus.SUCCESS,

            message,

            data,

            createdAt:
                Date.now()

        };


        this.responses.push(
            response
        );


        return response;

    }



    /**
     * Create error response
     */
    error(
        message: string,
        data?: unknown
    ): AIResponseData {


        const response:
            AIResponseData =
        {

            id:
                this.generateId(),

            type:
                AIResponseType.ERROR,

            status:
                AIResponseStatus.FAILED,

            message,

            data,

            createdAt:
                Date.now()

        };


        this.responses.push(
            response
        );


        return response;

    }



    /**
     * Get latest response
     */
    latest():
        AIResponseData | undefined {


        return this.responses[
            this.responses.length - 1
        ];

    }



    /**
     * Get all responses
     */
    getAll():
        AIResponseData[] {


        return [
            ...this.responses
        ];

    }



    /**
     * Clear responses
     */
    clear(): void {


        this.responses =
            [];

    }



    /**
     * Generate ID
     */
    private generateId():
        string {


        return (

            "ai_response_"

            +

            Date.now()
                .toString(36)

        );

    }

}
