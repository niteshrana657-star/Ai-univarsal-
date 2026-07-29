/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Automation Rules
 * File: AutomationRules.ts
 * -------------------------------------------------------------
 *
 * Rule management system for automation decisions.
 *
 * Features:
 * - Create automation rules
 * - Match conditions
 * - Enable / disable rules
 * - Safe rule execution checks
 * -------------------------------------------------------------
 */


export type RuleCondition =
    "always"
    | "app"
    | "event"
    | "time"
    | "keyword";


export interface AutomationRule {

    id: string;

    name: string;

    condition: RuleCondition;

    value?: string;

    actionType: string;

    enabled: boolean;

    createdAt: number;

}



export interface RuleMatchContext {

    appName?: string;

    eventName?: string;

    currentTime?: string;

    text?: string;

}



export class AutomationRules {


    private rules:
        AutomationRule[] = [];



    /**
     * Create new rule
     */
    createRule(
        rule:
            Omit<AutomationRule, "id" | "createdAt">
    ):
        AutomationRule {


        const newRule: AutomationRule = {

            id:
                crypto.randomUUID(),

            createdAt:
                Date.now(),

            ...rule

        };


        this.rules.push(
            newRule
        );


        return newRule;

    }



    /**
     * Get all rules
     */
    getRules():
        AutomationRule[] {


        return [
            ...this.rules
        ];

    }



    /**
     * Find matching rules
     */
    findMatches(
        context:
            RuleMatchContext
    ):
        AutomationRule[] {


        return this.rules.filter(

            rule =>

                rule.enabled &&
                this.matchRule(
                    rule,
                    context
                )

        );

    }



    /**
     * Check rule condition
     */
    private matchRule(
        rule: AutomationRule,
        context: RuleMatchContext
    ):
        boolean {


        switch (
            rule.condition
        ) {


            case "always":

                return true;



            case "app":

                return (

                    context.appName
                        ?.toLowerCase()
                        .includes(
                            rule.value
                                ?.toLowerCase() ?? ""
                        )

                    ?? false

                );



            case "event":

                return (

                    context.eventName
                        ?.toLowerCase()
                        .includes(
                            rule.value
                                ?.toLowerCase() ?? ""
                        )

                    ?? false

                );



            case "keyword":

                return (

                    context.text
                        ?.toLowerCase()
                        .includes(
                            rule.value
                                ?.toLowerCase() ?? ""
                        )

                    ?? false

                );



            case "time":

                return (

                    context.currentTime ===
                    rule.value

                );



            default:

                return false;

        }

    }



    /**
     * Enable rule
     */
    enable(
        id: string
    ):
        boolean {


        const rule =
            this.rules.find(
                item =>
                    item.id === id
            );


        if (!rule) {

            return false;

        }


        rule.enabled = true;


        return true;

    }



    /**
     * Disable rule
     */
    disable(
        id: string
    ):
        boolean {


        const rule =
            this.rules.find(
                item =>
                    item.id === id
            );


        if (!rule) {

            return false;

        }


        rule.enabled = false;


        return true;

    }



    /**
     * Delete rule
     */
    delete(
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
            this.rules.length !== before
        );

    }



    /**
     * Clear all rules
     */
    clear():
        void {


        this.rules = [];

    }

}



export default AutomationRules;
