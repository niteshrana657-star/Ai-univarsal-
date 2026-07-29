/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Action Suggestion Engine
 * File: ActionSuggestionEngine.ts
 * -------------------------------------------------------------
 *
 * Generates safe AI suggestions from screen context.
 *
 * Features:
 * - Analyze screen situation
 * - Generate possible actions
 * - Priority based suggestions
 * - Automation ready output
 * -------------------------------------------------------------
 */


export type ActionPriority =
    | "low"
    | "medium"
    | "high";



export interface ActionSuggestion {

    id: string;

    title: string;

    description: string;

    priority: ActionPriority;

    requiresConfirmation: boolean;

    actionType?: string;

}



export interface ActionContext {

    appName?: string;

    screenText?: string;

    detectedElements?: unknown[];

    visualContext?: Record<string, unknown>;

}



export class ActionSuggestionEngine {



    /**
     * Generate suggestions
     */
    suggest(
        context: ActionContext
    ):
        ActionSuggestion[] {


        const suggestions:
            ActionSuggestion[] = [];



        const text =
            (
                context.screenText ??
                ""
            )
            .toLowerCase();



        if (
            text.includes("error") ||
            text.includes("failed")
        ) {


            suggestions.push({

                id:
                    crypto.randomUUID(),

                title:
                    "Check error details",

                description:
                    "Review the visible error message and possible solutions.",

                priority:
                    "high",

                requiresConfirmation:
                    false,

                actionType:
                    "analysis"

            });

        }



        if (
            text.includes("login") ||
            text.includes("sign in")
        ) {


            suggestions.push({

                id:
                    crypto.randomUUID(),

                title:
                    "Help with login",

                description:
                    "Assist user with login steps without accessing private credentials.",

                priority:
                    "medium",

                requiresConfirmation:
                    true,

                actionType:
                    "guidance"

            });

        }



        if (
            context.detectedElements &&
            context.detectedElements.length > 0
        ) {


            suggestions.push({

                id:
                    crypto.randomUUID(),

                title:
                    "Analyze screen elements",

                description:
                    "Identify useful buttons and available actions.",

                priority:
                    "low",

                requiresConfirmation:
                    false,

                actionType:
                    "screen-analysis"

            });

        }



        return suggestions;

    }



    /**
     * Add custom suggestion
     */
    createSuggestion(
        title: string,
        description: string,
        priority:
            ActionPriority = "medium"
    ):
        ActionSuggestion {


        return {

            id:
                crypto.randomUUID(),

            title,

            description,

            priority,

            requiresConfirmation:
                true

        };

    }



    /**
     * Filter high priority actions
     */
    getHighPriority(
        suggestions:
            ActionSuggestion[]
    ):
        ActionSuggestion[] {


        return suggestions.filter(

            action =>
                action.priority === "high"

        );

    }

}



export default ActionSuggestionEngine;
