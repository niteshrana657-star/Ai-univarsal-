/**
 * Universal AI Operating Companion
 * Core Security Manager
 * Version: 1.0.0
 */



/**
 * Security Permission Levels
 */
export enum SecurityLevel {

    NONE = "none",

    BASIC = "basic",

    SENSITIVE = "sensitive",

    CRITICAL = "critical"

}



/**
 * Security Permission Data
 */
export interface SecurityPermission {

    name: string;

    level: SecurityLevel;

    granted: boolean;

    grantedAt?: number;

}



/**
 * Core Security Manager
 */
export class CoreSecurity {


    private permissions:
        Map<string, SecurityPermission>;



    constructor() {

        this.permissions =
            new Map();

    }



    /**
     * Register permission
     */
    registerPermission(
        name: string,
        level: SecurityLevel
    ): void {


        this.permissions.set(

            name,

            {

                name,

                level,

                granted: false

            }

        );

    }



    /**
     * Grant permission
     */
    grantPermission(
        name: string
    ): void {


        const permission =
            this.permissions.get(
                name
            );


        if (!permission) {

            return;

        }


        permission.granted =
            true;


        permission.grantedAt =
            Date.now();

    }



    /**
     * Revoke permission
     */
    revokePermission(
        name: string
    ): void {


        const permission =
            this.permissions.get(
                name
            );


        if (!permission) {

            return;

        }


        permission.granted =
            false;


        permission.grantedAt =
            undefined;

    }



    /**
     * Check permission
     */
    hasPermission(
        name: string
    ): boolean {


        const permission =
            this.permissions.get(
                name
            );


        return Boolean(
            permission
            &&
            permission.granted
        );

    }



    /**
     * Check sensitive action
     */
    canExecute(
        permissionName: string
    ): boolean {


        return this.hasPermission(
            permissionName
        );

    }



    /**
     * Get all permissions
     */
    getPermissions():
        SecurityPermission[] {


        return Array.from(
            this.permissions.values()
        ).map(
            item => ({
                ...item
            })
        );

    }



    /**
     * Clear security data
     */
    clear(): void {

        this.permissions.clear();

    }

}
