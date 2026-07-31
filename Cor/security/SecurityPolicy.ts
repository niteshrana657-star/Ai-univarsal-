/**
 * Universal AI Operating Companion
 * Security Policy Manager
 * Version: 1.0.0
 */



/**
 * Policy Action Types
 */
export enum PolicyAction {

    VIEW_DATA = "view_data",

    MODIFY_DATA = "modify_data",

    EXECUTE_ACTION = "execute_action",

    REMOTE_CONTROL = "remote_control",

    ACCESS_SENSITIVE_APP = "access_sensitive_app"

}



/**
 * Security Rule
 */
export interface SecurityRule {

    action: PolicyAction;

    allowed: boolean;

    requiresPermission: boolean;

    description: string;

}



/**
 * Security Policy Manager
 */
export class SecurityPolicy {


    private rules:
        Map<PolicyAction, SecurityRule>;



    constructor() {

        this.rules =
            new Map();


        this.initializeDefaultRules();

    }



    /**
     * Create default security rules
     */
    private initializeDefaultRules(): void {


        this.rules.set(

            PolicyAction.VIEW_DATA,

            {

                action:
                    PolicyAction.VIEW_DATA,

                allowed:
                    true,

                requiresPermission:
                    true,

                description:
                    "Viewing user data requires permission"

            }

        );



        this.rules.set(

            PolicyAction.MODIFY_DATA,

            {

                action:
                    PolicyAction.MODIFY_DATA,

                allowed:
                    false,

                requiresPermission:
                    true,

                description:
                    "Modifying data requires explicit permission"

            }

        );



        this.rules.set(

            PolicyAction.EXECUTE_ACTION,

            {

                action:
                    PolicyAction.EXECUTE_ACTION,

                allowed:
                    false,

                requiresPermission:
                    true,

                description:
                    "Actions require user approval"

            }

        );



        this.rules.set(

            PolicyAction.REMOTE_CONTROL,

            {

                action:
                    PolicyAction.REMOTE_CONTROL,

                allowed:
                    false,

                requiresPermission:
                    true,

                description:
                    "Remote control always requires approval"

            }

        );



        this.rules.set(

            PolicyAction.ACCESS_SENSITIVE_APP,

            {

                action:
                    PolicyAction.ACCESS_SENSITIVE_APP,

                allowed:
                    false,

                requiresPermission:
                    true,

                description:
                    "Sensitive applications require special permission"

            }

        );

    }



    /**
     * Check policy
     */
    canPerform(
        action: PolicyAction,
        permissionGranted: boolean
    ): boolean {


        const rule =
            this.rules.get(
                action
            );


        if (!rule) {

            return false;

        }


        if (!rule.allowed) {

            return false;

        }


        if (
            rule.requiresPermission
            &&
            !permissionGranted
        ) {

            return false;

        }


        return true;

    }



    /**
     * Update rule
     */
    updateRule(
        rule: SecurityRule
    ): void {


        this.rules.set(
            rule.action,
            rule
        );

    }



    /**
     * Get rule
     */
    getRule(
        action: PolicyAction
    ): SecurityRule | undefined {


        return this.rules.get(
            action
        );

    }



    /**
     * Get all rules
     */
    getAllRules(): SecurityRule[] {


        return Array.from(
            this.rules.values()
        );

    }

}
