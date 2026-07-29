/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Task Planner
 * File: TaskPlanner.ts
 * -------------------------------------------------------------
 *
 * Creates and manages automation task plans.
 *
 * Features:
 * - Create task plans
 * - Add task steps
 * - Validate plans
 * - Track execution readiness
 * -------------------------------------------------------------
 */


export type TaskStatus =
    | "created"
    | "ready"
    | "running"
    | "completed"
    | "failed";



export interface TaskStep {

    id: string;

    actionType: string;

    description: string;

    order: number;

    completed: boolean;

}



export interface AutomationTask {

    id: string;

    name: string;

    steps: TaskStep[];

    status: TaskStatus;

    createdAt: number;

}



export class TaskPlanner {


    private tasks:
        AutomationTask[] = [];



    /**
     * Create new automation task
     */
    createTask(
        name: string
    ):
        AutomationTask {


        const task: AutomationTask = {

            id:
                crypto.randomUUID(),

            name,

            steps: [],

            status:
                "created",

            createdAt:
                Date.now()

        };


        this.tasks.push(task);


        return task;

    }



    /**
     * Add step to task
     */
    addStep(
        taskId: string,
        actionType: string,
        description: string
    ):
        TaskStep | null {


        const task =
            this.tasks.find(

                item =>
                    item.id === taskId

            );



        if (!task) {

            return null;

        }



        const step: TaskStep = {

            id:
                crypto.randomUUID(),

            actionType,

            description,

            order:
                task.steps.length + 1,

            completed:
                false

        };



        task.steps.push(step);


        task.status =
            "ready";


        return step;

    }



    /**
     * Get task by id
     */
    getTask(
        id: string
    ):
        AutomationTask | null {


        return (

            this.tasks.find(

                task =>
                    task.id === id

            )

            ?? null

        );

    }



    /**
     * Validate task before execution
     */
    validate(
        id: string
    ):
        boolean {


        const task =
            this.getTask(id);



        if (!task) {

            return false;

        }



        return (
            task.steps.length > 0
        );

    }



    /**
     * Update task status
     */
    updateStatus(
        id: string,
        status: TaskStatus
    ):
        boolean {


        const task =
            this.getTask(id);



        if (!task) {

            return false;

        }



        task.status =
            status;


        return true;

    }



    /**
     * Get all tasks
     */
    getTasks():
        AutomationTask[] {


        return [
            ...this.tasks
        ];

    }



    /**
     * Remove task
     */
    deleteTask(
        id: string
    ):
        boolean {


        const before =
            this.tasks.length;



        this.tasks =
            this.tasks.filter(

                task =>
                    task.id !== id

            );



        return (
            before !== this.tasks.length
        );

    }



    /**
     * Clear all tasks
     */
    clear():
        void {


        this.tasks = [];

    }

}



export default TaskPlanner;
