/**
 * Universal AI Operating Companion
 * AI State Manager
 * Version: 1.0.0
 */


import {
    AIEngineState
} from "./AIConstants";



/**
 * State History Record
 */
export interface AIStateHistory {


    state: AIEngineState;


    message?: string;


    timestamp: number;

}



/**
 * AI State Manager
 */
export class AIState {


    private currentState:
        AIEngineState;



    private history:
        AIStateHistory[];



    constructor() {


        this.currentState =
            AIEngineState.IDLE;


        this.history =
            [];

    }



    /**
     * Set AI state
     */
    setState(
        state: AIEngineState,
        message?: string
    ): void {


        this.currentState =
            state;


        this.history.push({

            state,

            message,

            timestamp:
                Date.now()

        });

    }



    /**
     * Get current state
     */
    getState():
        AIEngineState {


        return this.currentState;

    }



    /**
     * Check state
     */
    is(
        state: AIEngineState
    ): boolean {


        return (
            this.currentState === state
        );

    }



    /**
     * Get state history
     */
    getHistory():
        AIStateHistory[] {


        return [
            ...this.history
        ];

    }



    /**
     * Reset state
     */
    reset(): void {


        this.setState(
            AIEngineState.IDLE,
            "AI reset to idle"
        );

    }



    /**
     * Clear history
     */
    clearHistory(): void {


        this.history =
            [];

    }

}
