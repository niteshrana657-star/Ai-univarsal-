/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Workflow Manager
 * File: WorkflowManager.ts
 * -------------------------------------------------------------
 *
 * Manages complete automation workflows.
 *
 * Features:
 * - Create workflows
 * - Manage workflow steps
 * - Enable/disable workflows
 * - Prepare workflow execution
 * -------------------------------------------------------------
 */


export interface WorkflowStep {

    id: string;

    actionType: string;

    description: string;

    order: number;

}



export interface Workflow {

    id: string;

    name: string;

    description?: string;

    steps: WorkflowStep[];

    enabled: boolean;

    createdAt: number;

}



export class WorkflowManager {


    private workflows:
        Workflow[] = [];



    /**
     * Create workflow
     */
    createWorkflow(
        name: string,
        description?: string
    ):
        Workflow {


        const workflow:
            Workflow = {

                id:
                    crypto.randomUUID(),

                name,

                description,

                steps: [],

                enabled:
                    true,

                createdAt:
                    Date.now()

            };



        this.workflows.push(
            workflow
        );



        return workflow;

    }



    /**
     * Add workflow step
     */
    addStep(
        workflowId: string,
        actionType: string,
        description: string
    ):
        WorkflowStep | null {


        const workflow =
            this.getWorkflow(
                workflowId
            );



        if (!workflow) {

            return null;

        }



        const step:
            WorkflowStep = {

                id:
                    crypto.randomUUID(),

                actionType,

                description,

                order:
                    workflow.steps.length + 1

            };



        workflow.steps.push(
            step
        );



        return step;

    }



    /**
     * Get workflow
     */
    getWorkflow(
        id: string
    ):
        Workflow | null {


        return (

            this.workflows.find(

                workflow =>
                    workflow.id === id

            )

            ?? null

        );

    }



    /**
     * Get all workflows
     */
    getWorkflows():
        Workflow[] {


        return [
            ...this.workflows
        ];

    }



    /**
     * Enable workflow
     */
    enable(
        id: string
    ):
        boolean {


        const workflow =
            this.getWorkflow(id);



        if (!workflow) {

            return false;

        }



        workflow.enabled =
            true;



        return true;

    }



    /**
     * Disable workflow
     */
    disable(
        id: string
    ):
        boolean {


        const workflow =
            this.getWorkflow(id);



        if (!workflow) {

            return false;

        }



        workflow.enabled =
            false;



        return true;

    }



    /**
     * Delete workflow
     */
    delete(
        id: string
    ):
        boolean {


        const before =
            this.workflows.length;



        this.workflows =
            this.workflows.filter(

                workflow =>
                    workflow.id !== id

            );



        return (
            before !== this.workflows.length
        );

    }



    /**
     * Clear workflows
     */
    clear():
        void {


        this.workflows = [];

    }

}



export default WorkflowManager;
