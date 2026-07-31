/**
 * Universal AI Operating Companion
 * Core Event Listener Interface
 * Version: 1.0.0
 */

import {
    CoreEvent,
    CoreEventType
} from "./EventTypes";


/**
 * Event Listener Function
 */
export type EventHandler = (
    event: CoreEvent
) => void | Promise<void>;



/**
 * Event Listener Contract
 */
export interface EventListener {


    /**
     * Events handled by this listener
     */
    events: CoreEventType[];



    /**
     * Handle incoming event
     */
    handle(
        event: CoreEvent
    ): void | Promise<void>;

}



/**
 * Listener Registration Data
 */
export interface ListenerRegistration {

    id: string;

    listener: EventListener;

    active: boolean;

}



/**
 * Helper Type Guard
 */
export function isEventListener(
    value: unknown
): value is EventListener {


    if (
        typeof value !== "object"
        ||
        value === null
    ) {

        return false;

    }


    const listener =
        value as EventListener;


    return (
        Array.isArray(listener.events)
        &&
        typeof listener.handle === "function"
    );

}
