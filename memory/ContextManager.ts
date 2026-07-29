/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Context Manager
 * File: ContextManager.ts
 * -------------------------------------------------------------
 *
 * Responsible for managing active AI context.
 *
 * Handles:
 * - Current session context
 * - Memory context merging
 * - Context updates
 * - Context cleanup
 * -------------------------------------------------------------
 */


export interface AIContext {

    sessionId?: string;

    userId?: string;

    language?: string;

    currentTask?: string;

    application?: string;

    screen?: Record<string, unknown>;

    memory?: Record<string, unknown>;

    metadata?: Record<string, unknown>;

}



export class ContextManager {


    private context:
        AIContext = {};



    /**
     * Set complete context
     */
    setContext(
        context: AIContext
    ): void {

        this.context = {

            ...context

        };

    }



    /**
     * Update context
     */
    updateContext(
        updates: Partial<AIContext>
    ): void {


        this.context = {

            ...this.context,

            ...updates,

            metadata: {

                ...(this.context.metadata ?? {}),

                ...(updates.metadata ?? {})

            },

            screen: {

                ...(this.context.screen ?? {}),

                ...(updates.screen ?? {})

            },

            memory: {

                ...(this.context.memory ?? {}),

                ...(updates.memory ?? {})

            }

        };

    }



    /**
     * Get current context
     */
    getContext():

        AIContext {

        return {

            ...this.context

        };

    }



    /**
     * Add memory context
     */
    attachMemory(
        memory: Record<string, unknown>
    ): void {


        this.context.memory = {

            ...(this.context.memory ?? {}),

            ...memory

        };

    }



    /**
     * Add screen context
     */
    attachScreen(
        screen: Record<string, unknown>
    ): void {


        this.context.screen = {

            ...(this.context.screen ?? {}),

            ...screen

        };

    }



    /**
     * Clear context
     */
    clear(): void {

        this.context = {};

    }



    /**
     * Check context availability
     */
    hasContext(): boolean {

        return Object.keys(
            this.context
        ).length > 0;

    }

}



export default ContextManager;
