/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Event Trigger
 * File: EventTrigger.ts
 * -------------------------------------------------------------
 *
 * Handles automation event detection.
 *
 * Features:
 * - Register events
 * - Trigger automation flows
 * - Event listeners
 * - Event history tracking
 * -------------------------------------------------------------
 */


export type EventType =
    | "app_open"
    | "app_close"
    | "notification"
    | "screen_change"
    | "time"
    | "custom";



export interface AutomationEvent {

    id: string;

    type: EventType;

    name: string;

    data?: unknown;

    timestamp: number;

}



export type EventCallback =
    (
        event: AutomationEvent
    ) => void;



export class EventTrigger {


    private listeners:
        Map<EventType, EventCallback[]> =
            new Map();



    private history:
        AutomationEvent[] = [];



    /**
     * Register event listener
     */
    on(
        type: EventType,
        callback: EventCallback
    ):
        void {


        const existing =
            this.listeners.get(type)
            ?? [];


        existing.push(
            callback
        );


        this.listeners.set(
            type,
            existing
        );

    }



    /**
     * Remove event listener
     */
    off(
        type: EventType,
        callback: EventCallback
    ):
        void {


        const existing =
            this.listeners.get(type);



        if (!existing) {

            return;

        }



        this.listeners.set(

            type,

            existing.filter(
                item =>
                    item !== callback
            )

        );

    }



    /**
     * Trigger event
     */
    trigger(
        type: EventType,
        name: string,
        data?: unknown
    ):
        AutomationEvent {


        const event:
            AutomationEvent = {

                id:
                    crypto.randomUUID(),

                type,

                name,

                data,

                timestamp:
                    Date.now()

            };



        this.history.push(
            event
        );



        const callbacks =
            this.listeners.get(type)
            ?? [];



        callbacks.forEach(

            callback =>
                callback(event)

        );



        return event;

    }



    /**
     * Get event history
     */
    getHistory():
        AutomationEvent[] {


        return [
            ...this.history
        ];

    }



    /**
     * Clear history
     */
    clearHistory():
        void {


        this.history = [];

    }

}



export default EventTrigger;
