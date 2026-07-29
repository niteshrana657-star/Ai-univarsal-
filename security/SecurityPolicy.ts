/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Security Policy
 * File: SecurityPolicy.ts
 * -------------------------------------------------------------
 *
 * Defines security rules and policies.
 *
 * Features:
 * - Operation permission rules
 * - Risk level checking
 * - Blocked operations
 * - Policy management
 * -------------------------------------------------------------
 */


export type SecurityRiskLevel =
    | "low"
    | "medium"
    | "high"
    | "critical";



export interface SecurityRule {

    id: string;

    operation: string;

    riskLevel: SecurityRiskLevel;

    allowed: boolean;

    requiresConfirmation: boolean;

}



export interface SecurityCheck {

    allowed: boolean;

    riskLevel: SecurityRiskLevel;

    reason: string;

    requiresConfirmation: boolean;

}



export class SecurityPolicy {


    private rules:
        SecurityRule[] = [];



    constructor() {


        this.loadDefaultRules();

    }



    /**
     * Load default security rules
     */
    private loadDefaultRules():
        void {


        this.rules = [

            {
                id:
                    "system_delete",

                operation:
                    "delete_system_data",

                riskLevel:
                    "critical",

                allowed:
                    false,

                requiresConfirmation:
                    true

            },

            {
                id:
                    "permission_change",

                operation:
                    "change_permission",

                riskLevel:
                    "high",

                allowed:
                    false,

                requiresConfirmation:
                    true

            }

        ];

    }



    /**
     * Check operation security
     */
    check(
        operation: string
    ):
        SecurityCheck {


        const rule =
            this.rules.find(

                item =>
                    item.operation === operation

            );



        if (!rule) {


            return {

                allowed:
                    true,

                riskLevel:
                    "low",

                reason:
                    "No security restriction found.",

                requiresConfirmation:
                    false

            };

        }



        return {

            allowed:
                rule.allowed,

            riskLevel:
                rule.riskLevel,

            reason:
                rule.allowed
                    ? "Operation allowed."
                    : "Operation blocked by security policy.",

            requiresConfirmation:
                rule.requiresConfirmation

        };

    }



    /**
     * Add security rule
     */
    addRule(
        rule:
            SecurityRule
    ):
        void {


        this.rules.push(
            rule
        );

    }



    /**
     * Remove rule
     */
    removeRule(
        id: string
    ):
        boolean {


        const before =
            this.rules.length;



        this.rules =
            this.rules.filter(

                rule =>
                    rule.id !== id

            );



        return (
            before !== this.rules.length
        );

    }



    /**
     * Get all rules
     */
    getRules():
        SecurityRule[] {


        return [

            ...this.rules

        ];

    }



    /**
     * Reset policies
     */
    reset():
        void {


        this.rules = [];

        this.loadDefaultRules();

    }

}



export default SecurityPolicy;
