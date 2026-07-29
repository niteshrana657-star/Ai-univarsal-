/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Scheduler Service
 * File: SchedulerService.ts
 * -------------------------------------------------------------
 *
 * Handles scheduled automation tasks.
 *
 * Features:
 * - Create schedules
 * - Manage scheduled jobs
 * - Enable/disable schedules
 * - Track execution timing
 * -------------------------------------------------------------
 */


export interface ScheduledTask {

    id: string;

    name: string;

    executeAt: number;

    actionType: string;

    enabled: boolean;

    createdAt: number;

}



export class SchedulerService {


    private schedules:
        ScheduledTask[] = [];



    /**
     * Create scheduled task
     */
    createSchedule(
        task:
            Omit<ScheduledTask, "id" | "createdAt">
    ):
        ScheduledTask {


        const schedule:
            ScheduledTask = {

                id:
                    crypto.randomUUID(),

                createdAt:
                    Date.now(),

                ...task

            };



        this.schedules.push(
            schedule
        );


        return schedule;

    }



    /**
     * Get all schedules
     */
    getSchedules():
        ScheduledTask[] {


        return [
            ...this.schedules
        ];

    }



    /**
     * Get pending schedules
     */
    getPending(
        currentTime:
            number = Date.now()
    ):
        ScheduledTask[] {


        return this.schedules.filter(

            schedule =>

                schedule.enabled &&
                schedule.executeAt <= currentTime

        );

    }



    /**
     * Enable schedule
     */
    enable(
        id: string
    ):
        boolean {


        const schedule =
            this.schedules.find(

                item =>
                    item.id === id

            );



        if (!schedule) {

            return false;

        }



        schedule.enabled =
            true;


        return true;

    }



    /**
     * Disable schedule
     */
    disable(
        id: string
    ):
        boolean {


        const schedule =
            this.schedules.find(

                item =>
                    item.id === id

            );



        if (!schedule) {

            return false;

        }



        schedule.enabled =
            false;


        return true;

    }



    /**
     * Remove schedule
     */
    remove(
        id: string
    ):
        boolean {


        const before =
            this.schedules.length;



        this.schedules =
            this.schedules.filter(

                item =>
                    item.id !== id

            );



        return (
            before !== this.schedules.length
        );

    }



    /**
     * Clear all schedules
     */
    clear():
        void {


        this.schedules = [];

    }

}



export default SchedulerService;
