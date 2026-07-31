/**
 * Universal AI Operating Companion
 * Task Context Management
 * Version: 1.0.0
 */

import {
    TaskStatus
} from "../types";


/**
 * Task Context Data
 */
export interface TaskContextData {

    taskId: string;

    name: string;

    description?: string;

    status: TaskStatus;

    createdAt: number;

    startedAt?: number;

    completedAt?: number;

    result?: unknown;

    error?: string;

}



/**
 * Task Context Manager
 */
export class TaskContext {


    private tasks:
        Map<string, TaskContextData>;



    constructor() {

        this.tasks =
            new Map();

    }



    /**
     * Create new task
     */
    createTask(
        name: string,
        description?: string
    ): TaskContextData {


        const task: TaskContextData = {

            taskId:
                this.generateTaskId(),

            name,

            description,

            status:
                TaskStatus.CREATED,

            createdAt:
                Date.now()

        };


        this.tasks.set(
            task.taskId,
            task
        );


        return {
            ...task
        };

    }



    /**
     * Start task
     */
    startTask(
        taskId: string
    ): void {


        const task =
            this.tasks.get(taskId);


        if (!task) {

            return;

        }


        task.status =
            TaskStatus.RUNNING;


        task.startedAt =
            Date.now();

    }



    /**
     * Complete task
     */
    completeTask(
        taskId: string,
        result?: unknown
    ): void {


        const task =
            this.tasks.get(taskId);


        if (!task) {

            return;

        }


        task.status =
            TaskStatus.COMPLETED;


        task.result =
            result;


        task.completedAt =
            Date.now();

    }



    /**
     * Fail task
     */
    failTask(
        taskId: string,
        error: string
    ): void {


        const task =
            this.tasks.get(taskId);


        if (!task) {

            return;

        }


        task.status =
            TaskStatus.FAILED;


        task.error =
            error;


        task.completedAt =
            Date.now();

    }



    /**
     * Get task
     */
    getTask(
        taskId: string
    ): TaskContextData | undefined {


        const task =
            this.tasks.get(taskId);


        return task
            ? { ...task }
            : undefined;

    }



    /**
     * Get all tasks
     */
    getAllTasks(): TaskContextData[] {


        return Array.from(
            this.tasks.values()
        ).map(
            task => ({
                ...task
            })
        );

    }



    /**
     * Remove task
     */
    removeTask(
        taskId: string
    ): void {

        this.tasks.delete(
            taskId
        );

    }



    /**
     * Clear tasks
     */
    clear(): void {

        this.tasks.clear();

    }



    /**
     * Generate task ID
     */
    private generateTaskId(): string {


        return (

            "task_"

            +

            Date.now()
                .toString(36)

            +

            "_"

            +

            Math.random()
                .toString(36)
                .substring(2, 8)

        );

    }

}
