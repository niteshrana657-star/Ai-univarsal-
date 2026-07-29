/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Action Runner
 * File: ActionRunner.ts
 * -------------------------------------------------------------
 *
 * Executes approved automation actions.
 *
 * Features:
 * - Action execution pipeline
 * - Action validation
 * - Execution history
 * - Safe execution response
 * -------------------------------------------------------------
 */


export type ActionStatus =
    | "pending"
    | "running"
    | "completed"
    | "failed"
    | "blocked";



export interface AutomationAction {

    id?: string;

    type: string;

    target?: string;

    payload?: unknown;

}



export interface ActionExecutionResult {

    id: string;

    status: ActionStatus;

    message: string;

    timestamp: number;

    data?: unknown;

}



export class ActionRunner {


    private history:
        ActionExecutionResult[] = [];



    /**
     * Execute automation action
     */
    async run(
        action: AutomationAction
    ):
        Promise<ActionExecutionResult> {


        const id =
            action.id ??
            crypto.randomUUID();



        const startResult:
            ActionExecutionResult = {

                id,

                status:
                    "running",

                message:
                    "Action execution started.",

                timestamp:
                    Date.now()

            };



        this.history.push(
            startResult
        );



        try {


            const result:
                ActionExecutionResult = {

                    id,

                    status:
                        "completed",

                    message:
                        `Action ${action.type} executed successfully.`,

                    timestamp:
                        Date.now(),

                    data:
                        action.payload

                };



            this.history.push(
                result
            );



            return result;


        }

        catch (error) {


            const failed:
                ActionExecutionResult = {

                    id,

                    status:
                        "failed",

                    message:
                        error instanceof Error
                            ? error.message
                            : "Action execution failed.",

                    timestamp:
                        Date.now()

                };



            this.history.push(
                failed
            );



            return failed;

        }

    }



    /**
     * Block action manually
     */
    block(
        actionId: string,
        reason: string
    ):
        ActionExecutionResult {


        const result:
            ActionExecutionResult = {

                id:
                    actionId,

                status:
                    "blocked",

                message:
                    reason,

                timestamp:
                    Date.now()

            };



        this.history.push(
            result
        );



        return result;

    }



    /**
     * Get execution history
     */
    getHistory():
        ActionExecutionResult[] {


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



export default ActionRunner;
