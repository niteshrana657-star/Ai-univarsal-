/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Automation Security
 * File: AutomationSecurity.ts
 * -------------------------------------------------------------
 *
 * Security layer for automation actions.
 *
 * Features:
 * - Action permission checks
 * - Risk evaluation
 * - Confirmation requirement
 * - Dangerous action blocking
 * -------------------------------------------------------------
 */


export type SecurityRisk =
    | "low"
    | "medium"
    | "high"
    | "critical";



export interface SecurityCheckResult {

    allowed: boolean;

    risk: SecurityRisk;

    reason: string;

    requiresConfirmation: boolean;

}



export interface AutomationAction {

    type: string;

    target?: string;

    data?: unknown;

    reversible?: boolean;

}



export class AutomationSecurity {



    private blockedActions:
        string[] = [

            "delete_system_data",

            "remove_account",

            "change_security_settings",

            "send_private_information"

        ];



    /**
     * Check automation action safety
     */
    check(
        action: AutomationAction
    ):
        SecurityCheckResult {


        if (
            this.blockedActions
                .includes(action.type)
        ) {


            return {

                allowed: false,

                risk:
                    "critical",

                reason:
                    "Blocked dangerous automation action.",

                requiresConfirmation:
                    true

            };

        }



        const risk =
            this.calculateRisk(
                action
            );



        return {

            allowed:
                risk !== "critical",

            risk,

            reason:
                "Action security verified.",

            requiresConfirmation:
                risk === "high"

        };

    }



    /**
     * Calculate action risk
     */
    private calculateRisk(
        action: AutomationAction
    ):
        SecurityRisk {


        if (
            action.reversible === false
        ) {

            return "high";

        }



        if (
            action.type
                .includes("payment")
        ) {

            return "high";

        }



        if (
            action.type
                .includes("permission")
        ) {

            return "medium";

        }



        return "low";

    }



    /**
     * Add blocked action
     */
    blockAction(
        actionType: string
    ):
        void {


        if (
            !this.blockedActions
                .includes(actionType)
        ) {

            this.blockedActions
                .push(actionType);

        }

    }



    /**
     * Get blocked actions
     */
    getBlockedActions():
        string[] {


        return [

            ...this.blockedActions

        ];

    }



    /**
     * Clear security rules
     */
    reset():
        void {


        this.blockedActions = [

            "delete_system_data",

            "remove_account",

            "change_security_settings",

            "send_private_information"

        ];

    }

}



export default AutomationSecurity;
