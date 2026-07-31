/**
 * Universal AI Operating Companion
 * AI Planner
 * Version: 1.0.0
 */

import {
    AIRequest,
    AITask
} from "../types";

import {
    TaskContext
} from "../context/TaskContext";



/**
 * Planned Action
 */
export interface PlannedAction {

    id: string;

    name: string;

    description: string;

    order: number;

}



/**
 * AI Plan Structure
 */
export interface AIPlan {

    taskId: string;

    request: AIRequest;

    actions: PlannedAction[];

    createdAt: number;

}



/**
 * AI Planning Engine
 */
export class AIPlanner {


    private taskContext:
        TaskContext;



    constructor(
        taskContext: TaskContext
    ) {

        this.taskContext =
            taskContext;

    }



    /**
     * Create execution plan
     */
    createPlan(
        request: AIRequest
    ): AIPlan {


        const task =
            this.taskContext.createTask(
                "AI Planning",
                request.userInput
            );



        const actions:
            PlannedAction[] = [

            {

                id:
                    "analyze_request",

                name:
                    "Analyze Request",

                description:
                    "Understand user intent and required actions",

                order:
                    1

            },

            {

                id:
                    "prepare_response",

                name:
                    "Prepare Response",

                description:
                    "Generate appropriate AI response",

                order:
                    2

            }

        ];



        return {

            taskId:
                task.taskId,

            request,

            actions,

            createdAt:
                Date.now()

        };

    }



    /**
     * Add custom action
     */
    addAction(
        plan: AIPlan,
        action: PlannedAction
    ): AIPlan {


        return {

            ...plan,

            actions: [

                ...plan.actions,

                action

            ]

        };

    }



    /**
     * Sort actions
     */
    optimizePlan(
        plan: AIPlan
    ): AIPlan {


        return {

            ...plan,

            actions:
                [...plan.actions]
                    .sort(
                        (a,b)=>
                            a.order - b.order
                    )

        };

    }



    /**
     * Validate plan
     */
    validatePlan(
        plan: AIPlan
    ): boolean {


        return (

            Boolean(plan.taskId)

            &&

            plan.actions.length > 0

        );

    }



    /**
     * Get task information
     */
    getTask(
        taskId: string
    ): AITask | undefined {


        const task =
            this.taskContext
                .getTask(taskId);


        if (!task) {

            return undefined;

        }


        return task;

    }

}
