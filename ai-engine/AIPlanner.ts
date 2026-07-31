/**
 * Universal AI Operating Companion
 * AI Task Planner
 * Version: 1.0.0
 */



/**
 * Task Step
 */
export interface TaskStep {


    id: string;


    title: string;


    description: string;


    completed: boolean;


    order: number;

}



/**
 * AI Plan
 */
export interface AIPlan {


    id: string;


    goal: string;


    steps: TaskStep[];


    createdAt: number;


}



/**
 * AI Planner
 */
export class AIPlanner {


    private plans:
        AIPlan[];



    constructor() {

        this.plans =
            [];

    }



    /**
     * Create plan
     */
    createPlan(
        goal: string,
        steps: string[]
    ): AIPlan {


        const taskSteps:
            TaskStep[] =
            steps.map(

                (step, index) =>

                ({

                    id:
                        this.generateId(),

                    title:
                        step,

                    description:
                        step,

                    completed:
                        false,

                    order:
                        index + 1

                })

            );



        const plan:
            AIPlan =
        {

            id:
                this.generateId(),


            goal,


            steps:
                taskSteps,


            createdAt:
                Date.now()

        };



        this.plans.push(
            plan
        );


        return plan;

    }



    /**
     * Complete step
     */
    completeStep(
        planId: string,
        stepId: string
    ): boolean {


        const plan =
            this.plans.find(

                item =>
                    item.id === planId

            );


        if (!plan) {

            return false;

        }


        const step =
            plan.steps.find(

                item =>
                    item.id === stepId

            );


        if (!step) {

            return false;

        }


        step.completed =
            true;


        return true;

    }



    /**
     * Get plan
     */
    getPlan(
        id: string
    ):
        AIPlan | undefined {


        return this.plans.find(

            plan =>
                plan.id === id

        );

    }



    /**
     * Get all plans
     */
    getAllPlans():
        AIPlan[] {


        return [
            ...this.plans
        ];

    }



    /**
     * Remove plan
     */
    removePlan(
        id: string
    ): boolean {


        const length =
            this.plans.length;


        this.plans =
            this.plans.filter(

                plan =>
                    plan.id !== id

            );


        return (
            length !== this.plans.length
        );

    }



    /**
     * Generate ID
     */
    private generateId():
        string {


        return (

            "plan_"

            +

            Date.now()
                .toString(36)

        );

    }

}
