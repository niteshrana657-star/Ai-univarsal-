/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Data Protection
 * File: DataProtection.ts
 * -------------------------------------------------------------
 *
 * Protects sensitive application data.
 *
 * Features:
 * - Data masking
 * - Sensitive field protection
 * - Secure data handling
 * - Data validation
 * -------------------------------------------------------------
 */


export interface ProtectedData {

    id: string;

    value: string;

    protected: boolean;

    createdAt: number;

}



export class DataProtection {


    private protectedKeys:
        string[] = [

            "password",

            "token",

            "secret",

            "apiKey",

            "privateKey"

        ];



    /**
     * Check sensitive data
     */
    isSensitive(
        key: string
    ):
        boolean {


        return this.protectedKeys
            .includes(
                key
            );

    }



    /**
     * Mask sensitive value
     */
    mask(
        value: string
    ):
        string {


        if (
            value.length <= 4
        ) {

            return "****";

        }



        return (

            value.substring(
                0,
                2
            )

            +

            "****"

            +

            value.substring(
                value.length - 2
            )

        );

    }



    /**
     * Protect data object
     */
    protectObject(
        data:
            Record<string, unknown>
    ):
        Record<string, unknown> {


        const protectedData:
            Record<string, unknown> = {};



        Object.entries(data)
            .forEach(

                ([key, value]) => {


                    if (
                        this.isSensitive(key)
                        &&
                        typeof value === "string"
                    ) {


                        protectedData[key] =
                            this.mask(value);

                    }

                    else {


                        protectedData[key] =
                            value;

                    }

                }

            );



        return protectedData;

    }



    /**
     * Create protected data record
     */
    create(
        value: string
    ):
        ProtectedData {


        return {

            id:
                crypto.randomUUID(),

            value:
                this.mask(value),

            protected:
                true,

            createdAt:
                Date.now()

        };

    }



    /**
     * Add custom protected key
     */
    addProtectedKey(
        key: string
    ):
        void {


        if (
            !this.protectedKeys
                .includes(key)
        ) {

            this.protectedKeys.push(
                key
            );

        }

    }



    /**
     * Get protected keys
     */
    getProtectedKeys():
        string[] {


        return [

            ...this.protectedKeys

        ];

    }

}



export default DataProtection;
