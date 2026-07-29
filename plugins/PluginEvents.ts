/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Plugin Events
 * File: PluginEvents.ts
 * -------------------------------------------------------------
 *
 * Event system for plugin lifecycle communication.
 *
 * Features:
 * - Register plugin events
 * - Emit events
 * - Remove listeners
 * - Track event history
 * -------------------------------------------------------------
 */


export type PluginEventType =
    | "installed"
    | "enabled"
    | "disabled"
    | "started"
    | "stopped"
    | "error"
    | "removed"
    | "custom";



export interface PluginEvent {

    id: string;

    type: PluginEventType;

    pluginId: string;

    data?: unknown;

    timestamp: number;

}



export type PluginEventListener =
    (
        event: PluginEvent
    ) => void;



export class PluginEvents {


    private listeners:
        Map<PluginEventType, PluginEventListener[]> =
            new Map();



    private history:
        PluginEvent[] = [];



    /**
     * Add event listener
     */
    on(
        type: PluginEventType,
        listener: PluginEventListener
    ):
        void {


        const current =
            this.listeners.get(type)
            ?? [];


        current.push(
            listener
        );


        this.listeners.set(
            type,
            current
        );

    }



    /**
     * Remove event listener
     */
    off(
        type: PluginEventType,
        listener: PluginEventListener
    ):
        void {


        const current =
            this.listeners.get(type);



        if (!current) {

            return;

        }



        this.listeners.set(

            type,

            current.filter(
                item =>
                    item !== listener
            )

        );

    }



    /**
     * Emit plugin event
     */
    emit(
        type: PluginEventType,
        pluginId: string,
        data?: unknown
    ):
        PluginEvent {


        const event:
            PluginEvent = {

                id:
                    crypto.randomUUID(),

                type,

                pluginId,

                data,

                timestamp:
                    Date.now()

            };



        this.history.push(
            event
        );



        const listeners =
            this.listeners.get(type)
            ?? [];



        listeners.forEach(

            listener =>
                listener(event)

        );



        return event;

    }



    /**
     * Get event history
     */
    getHistory():
        PluginEvent[] {


        return [
            ...this.history
        ];

    }



    /**
     * Clear history
     */
    clear():
        void {


        this.history = [];

    }

}



export default PluginEvents;
