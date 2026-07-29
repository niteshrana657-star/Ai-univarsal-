/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * User Profile Memory
 * File: UserProfileMemory.ts
 * -------------------------------------------------------------
 *
 * Stores user-specific preferences and profile information.
 *
 * Features:
 * - Save user preferences
 * - Retrieve profile data
 * - Update profile information
 * - Search profile memory
 * -------------------------------------------------------------
 */


export interface UserProfileEntry {

    id?: string;

    key: string;

    value: unknown;

    category?: string;

    createdAt?: number;

    updatedAt?: number;

}



export class UserProfileMemory {


    private profile:
        UserProfileEntry[] = [];



    /**
     * Save profile data
     */
    async save(
        entry: UserProfileEntry
    ): Promise<void> {


        const existing =
            this.profile.find(

                item =>
                    item.key === entry.key

            );



        if (existing) {

            existing.value =
                entry.value;

            existing.updatedAt =
                Date.now();

            return;

        }



        this.profile.push({

            ...entry,

            id:
                entry.id ??
                crypto.randomUUID(),

            createdAt:
                entry.createdAt ??
                Date.now(),

            updatedAt:
                Date.now()

        });

    }



    /**
     * Get complete profile
     */
    async getAll():

        Promise<UserProfileEntry[]> {


        return [

            ...this.profile

        ];

    }



    /**
     * Get value by key
     */
    async get(
        key: string
    ):
        Promise<unknown | null> {


        const item =
            this.profile.find(

                profile =>
                    profile.key === key

            );



        return item
            ? item.value
            : null;

    }



    /**
     * Search profile data
     */
    async search(
        query: string
    ):
        Promise<UserProfileEntry[]> {


        const keyword =
            query.toLowerCase();



        return this.profile.filter(

            item =>

                item.key
                .toLowerCase()
                .includes(keyword)

        );

    }



    /**
     * Remove profile item
     */
    async delete(
        key: string
    ):
        Promise<void> {


        this.profile =
            this.profile.filter(

                item =>
                    item.key !== key

            );

    }



    /**
     * Clear profile
     */
    async clear():

        Promise<void> {


        this.profile = [];

    }

}



export default UserProfileMemory;
