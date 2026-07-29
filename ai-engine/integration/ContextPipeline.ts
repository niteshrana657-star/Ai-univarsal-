/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Context Pipeline
 * File: ContextPipeline.ts
 * -------------------------------------------------------------
 *
 * Creates unified AI context pipeline.
 *
 * Handles:
 * - Memory context
 * - User context
 * - Screen context
 * - Runtime context
 * - Final AI input preparation
 * -------------------------------------------------------------
 */


import {
    AIEngineMemoryBridge
} from "./AIEngineMemoryBridge";



export interface PipelineContext {

    user?: Record<string, unknown>;

    screen?: Record<string, unknown>;

    device?: Record<string, unknown>;

    memory?: unknown;

    runtime?: Record<string, unknown>;

}



export class ContextPipeline {


    private memoryBridge:
        AIEngineMemoryBridge;



    constructor(
        memoryBridge?: AIEngineMemoryBridge
    ) {

        this.memoryBridge =
            memoryBridge ??
            new AIEngineMemoryBridge();

    }



    /**
     * Build complete AI context
     */
    async build(
        input: PipelineContext
    ):
        Promise<PipelineContext> {


        const memory =
            await this.memoryBridge
                .getAIContext();



        return {

            user:
                input.user ?? {},


            screen:
                input.screen ?? {},


            device:
                input.device ?? {},


            memory,


            runtime:
                input.runtime ?? {}

        };

    }



    /**
     * Update context
     */
    merge(
        current: PipelineContext,
        updates: Partial<PipelineContext>
    ):
        PipelineContext {


        return {

            ...current,

            ...updates,


            user: {

                ...(current.user ?? {}),

                ...(updates.user ?? {})

            },


            screen: {

                ...(current.screen ?? {}),

                ...(updates.screen ?? {})

            },


            device: {

                ...(current.device ?? {}),

                ...(updates.device ?? {})

            },


            runtime: {

                ...(current.runtime ?? {}),

                ...(updates.runtime ?? {})

            }

        };

    }



    /**
     * Validate context
     */
    validate(
        context: PipelineContext
    ):
        boolean {


        return !!context;

    }

}



export default ContextPipeline;
