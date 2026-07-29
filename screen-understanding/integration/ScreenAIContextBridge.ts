/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen AI Context Bridge
 * File: ScreenAIContextBridge.ts
 * -------------------------------------------------------------
 *
 * Connects Screen Understanding with AI Engine context system.
 *
 * Features:
 * - Combine screen analysis data
 * - Prepare AI readable context
 * - Connect visual understanding
 * - Provide automation ready context
 * -------------------------------------------------------------
 */


export interface ScreenAIContext {

    application?: Record<string, unknown>;

    screen?: Record<string, unknown>;

    visual?: Record<string, unknown>;

    memory?: Record<string, unknown>;

    timestamp: number;

}



export interface ScreenBridgeInput {

    appContext?: Record<string, unknown>;

    screenContext?: Record<string, unknown>;

    visualContext?: Record<string, unknown>;

    memoryContext?: Record<string, unknown>;

}



export class ScreenAIContextBridge {


    /**
     * Build AI screen context
     */
    buildContext(
        input: ScreenBridgeInput
    ):
        ScreenAIContext {


        return {

            application:
                input.appContext ?? {},


            screen:
                input.screenContext ?? {},


            visual:
                input.visualContext ?? {},


            memory:
                input.memoryContext ?? {},


            timestamp:
                Date.now()

        };

    }



    /**
     * Convert screen context for AI prompt
     */
    toPromptContext(
        context: ScreenAIContext
    ):
        string {


        return `

SCREEN CONTEXT

APPLICATION:

${JSON.stringify(
    context.application,
    null,
    2
)}


SCREEN DATA:

${JSON.stringify(
    context.screen,
    null,
    2
)}


VISUAL DATA:

${JSON.stringify(
    context.visual,
    null,
    2
)}


SCREEN MEMORY:

${JSON.stringify(
    context.memory,
    null,
    2
)}


`;

    }



    /**
     * Validate context
     */
    validate(
        context: ScreenAIContext
    ):
        boolean {


        return !!context;

    }



    /**
     * Clear temporary context
     */
    clear():
        ScreenAIContext {


        return {

            application: {},

            screen: {},

            visual: {},

            memory: {},

            timestamp:
                Date.now()

        };

    }

}



export default ScreenAIContextBridge;
