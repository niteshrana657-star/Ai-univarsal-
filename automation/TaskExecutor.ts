/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Task Executor
 * File: TaskExecutor.ts
 * -------------------------------------------------------------
 *
 * Executes planned automation tasks.
 *
 * Features:
 * - Execute task steps
 * - Track execution status
 * - Handle failures
 * - Maintain execution history
 * -------------------------------------------------------------
 */


import {
    AutomationTask,
    TaskStep
} from "./TaskPlanner";



export interface TaskExecutionResult {

    taskId: string;

    success: boolean;

    completedSteps: number;

    failedStep?: string;

    message: string;

    timestamp: number;

}



export class TaskExecutor {



    private history:
        TaskExecutionResult[] = [];



    /**
     * Execute automation task
     */
    async execute(
        task: AutomationTask
    ):
        Promise<TaskExecutionResult> {


        let completedSteps = 0;


        let failedStep:
            string | undefined;



        try {


            for (
                const step of task.steps
            ) {


                const success =
                    await this.executeStep(
                        step
                    );



                if (!success) {

                    failedStep =
                        step.id;

                    break;

                }



                completedSteps++;

            }



            const result:
                TaskExecutionResult = {

                    taskId:
                        task.id,

                    success:
                        failedStep === undefined,

                    completedSteps,

                    failedStep,

                    message:
                        failedStep
                            ? "Task execution stopped."
                            : "Task completed successfully.",

                    timestamp:
                        Date.now()

                };



            this.history.push(
                result
            );


            return result;


        }

        catch (error) {


            const result:
                TaskExecutionResult = {

                    taskId:
                        task.id,

                    success:
                        false,

                    completedSteps,

                    message:
                        error instanceof Error
                            ? error.message
                            : "Unknown execution error.",

                    timestamp:
                        Date.now()

                };


            this.history.push(
                result
            );


            return result;

        }

    }



    /**
     * Execute single step
     */
    private async executeStep(
        step: TaskStep
    ):
        Promise<boolean> {


        /*
         * Real device automation execution
         * will connect here in future:
         * Accessibility Service,
         * Android Native Actions,
         * Plugin Actions.
         */


        if (
            !step.actionType ||
            !step.description
        ) {

            return false;

        }



        return true;

    }



    /**
     * Get execution history
     */
    getHistory():
        TaskExecutionResult[] {


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



export default TaskExecutor;
