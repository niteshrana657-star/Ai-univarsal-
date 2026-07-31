/**
 * Universal AI Operating Companion
 * Core Event Bus
 * Version: 1.0.0
 */

import { AIEvent } from "../types";


type EventCallback = (
    event: AIEvent
) => void | Promise<void>;


/**
 * Event Bus
 * Handles communication between Core modules
 */
export class EventBus {


    private listeners:
        Map<string, Set<EventCallback>>;


    constructor() {

        this.listeners = new Map();

    }



    /**
     * Subscribe to an event
     */
    on(
        eventName: string,
        callback: EventCallback
    ): void {


        if (!this.listeners.has(eventName)) {

            this.listeners.set(
                eventName,
                new Set()
            );

        }


        this.listeners
            .get(eventName)!
            .add(callback);

    }



    /**
     * Remove event listener
     */
    off(
        eventName: string,
        callback: EventCallback
    ): void {


        const callbacks =
            this.listeners.get(eventName);


        if (!callbacks) {
            return;
        }


        callbacks.delete(callback);


        if (callbacks.size === 0) {

            this.listeners.delete(
                eventName
            );

        }

    }



    /**
     * Emit event
     */
    async emit(
        event: AIEvent
    ): Promise<void> {


        const callbacks =
            this.listeners.get(
                event.type
            );


        if (!callbacks) {

            return;

        }


        const executionList =
            Array.from(callbacks);



        for (const callback of executionList) {

            await callback(event);

        }

    }



    /**
     * Remove all listeners
     */
    clear(): void {

        this.listeners.clear();

    }



    /**
     * Check listener exists
     */
    hasListeners(
        eventName: string
    ): boolean {

        return (
            this.listeners.has(eventName)
            &&
            this.listeners.get(eventName)!.size > 0
        );

    }

}
