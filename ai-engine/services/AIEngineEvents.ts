/**
 * Universal AI Operating Companion
 * AI Engine Events
 *
 * Central event system for the AI Engine.
 */

export type AIEngineEventName =
    | "AI_ENGINE_INITIALIZED"
    | "AI_ENGINE_SHUTDOWN"
    | "AI_REQUEST_STARTED"
    | "AI_REQUEST_COMPLETED"
    | "AI_REQUEST_FAILED"
    | "AI_ENGINE_ERROR"
    | "AI_PROVIDER_CHANGED"
    | "AI_STATE_CHANGED"
    | "AI_SECURITY_EVENT";


/**
 * AI Engine Event
 */
export interface AIEngineEvent<T = unknown> {

    type: AIEngineEventName;

    payload: T;

    timestamp: number;

}


/**
 * Event listener
 */
export type AIEngineEventListener<T = unknown> =
    (
        event: AIEngineEvent<T>
    ) => void;


/**
 * AI Engine Events Manager
 */
export class AIEngineEvents {

    private readonly listeners:
        Map<
            AIEngineEventName,
            Set<AIEngineEventListener>
        >;


    constructor() {

        this.listeners =
            new Map();

    }


    /**
     * Register an event listener
     */
    on<T = unknown>(
        eventName: AIEngineEventName,
        listener: AIEngineEventListener<T>
    ): () => void {

        let eventListeners =
            this.listeners.get(
                eventName
            );


        if (!eventListeners) {

            eventListeners =
                new Set();

            this.listeners.set(
                eventName,
                eventListeners
            );

        }


        eventListeners.add(
            listener as AIEngineEventListener
        );


        return () => {

            this.off(
                eventName,
                listener
            );

        };

    }


    /**
     * Remove an event listener
     */
    off<T = unknown>(
        eventName: AIEngineEventName,
        listener: AIEngineEventListener<T>
    ): void {

        const eventListeners =
            this.listeners.get(
                eventName
            );


        if (!eventListeners) {

            return;

        }


        eventListeners.delete(
            listener as AIEngineEventListener
        );


        if (
            eventListeners.size === 0
        ) {

            this.listeners.delete(
                eventName
            );

        }

    }


    /**
     * Emit an event
     */
    emit<T = unknown>(
        eventName: AIEngineEventName,
        payload: T
    ): void {

        const event:
            AIEngineEvent<T> = {

            type:
                eventName,

            payload,

            timestamp:
                Date.now()

        };


        const eventListeners =
            this.listeners.get(
                eventName
            );


        if (!eventListeners) {

            return;

        }


        for (
            const listener
            of eventListeners
        ) {

            try {

                listener(event);

            } catch {

                /*
                 * Listener failures must not
                 * break the AI Engine event loop.
                 */

            }

        }

    }


    /**
     * Check whether an event has listeners
     */
    hasListeners(
        eventName: AIEngineEventName
    ): boolean {

        const eventListeners =
            this.listeners.get(
                eventName
            );


        return Boolean(
            eventListeners &&
            eventListeners.size > 0
        );

    }


    /**
     * Remove all listeners
     */
    clear(): void {

        this.listeners.clear();

    }


    /**
     * Remove listeners for one event
     */
    clearEvent(
        eventName: AIEngineEventName
    ): void {

        this.listeners.delete(
            eventName
        );

    }

}
