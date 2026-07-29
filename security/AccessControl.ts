/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Access Control
 * File: AccessControl.ts
 * -------------------------------------------------------------
 *
 * Manages user and system access permissions.
 *
 * Features:
 * - Grant permissions
 * - Revoke permissions
 * - Check access
 * - Role based security
 * -------------------------------------------------------------
 */


export type AccessRole =
    | "user"
    | "admin"
    | "system";



export interface AccessPermission {

    id: string;

    name: string;

    granted: boolean;

}



export interface AccessUser {

    id: string;

    role: AccessRole;

    permissions: AccessPermission[];

}



export class AccessControl {


    private users:
        Map<string, AccessUser> =
            new Map();



    /**
     * Register user access
     */
    register(
        user: AccessUser
    ):
        void {


        this.users.set(

            user.id,

            user

        );

    }



    /**
     * Grant permission
     */
    grant(
        userId: string,
        permission: string
    ):
        boolean {


        const user =
            this.users.get(
                userId
            );



        if (!user) {

            return false;

        }



        const existing =
            user.permissions.find(

                item =>
                    item.name === permission

            );



        if (existing) {

            existing.granted = true;

        }

        else {


            user.permissions.push({

                id:
                    crypto.randomUUID(),

                name:
                    permission,

                granted:
                    true

            });

        }



        return true;

    }



    /**
     * Revoke permission
     */
    revoke(
        userId: string,
        permission: string
    ):
        boolean {


        const user =
            this.users.get(
                userId
            );



        if (!user) {

            return false;

        }



        const item =
            user.permissions.find(

                permissionItem =>
                    permissionItem.name === permission

            );



        if (!item) {

            return false;

        }



        item.granted =
            false;



        return true;

    }



    /**
     * Check access
     */
    check(
        userId: string,
        permission: string
    ):
        boolean {


        const user =
            this.users.get(
                userId
            );



        if (!user) {

            return false;

        }



        return user.permissions.some(

            item =>

                item.name === permission
                &&
                item.granted

        );

    }



    /**
     * Get user
     */
    getUser(
        id: string
    ):
        AccessUser | null {


        return (

            this.users.get(id)
            ??
            null

        );

    }



    /**
     * Remove user
     */
    remove(
        id: string
    ):
        boolean {


        return this.users.delete(
            id
        );

    }



    /**
     * Clear access data
     */
    clear():
        void {


        this.users.clear();

    }

}



export default AccessControl;
