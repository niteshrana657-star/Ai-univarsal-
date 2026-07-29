/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Encryption Service
 * File: EncryptionService.ts
 * -------------------------------------------------------------
 *
 * Provides data encryption and decryption utilities.
 *
 * Features:
 * - Encrypt sensitive data
 * - Decrypt stored data
 * - Generate secure keys
 * - Hash verification
 * -------------------------------------------------------------
 */


export interface EncryptedData {

    encrypted: string;

    timestamp: number;

}



export class EncryptionService {


    private key:
        string;



    constructor() {

        this.key =
            this.generateKey();

    }



    /**
     * Generate internal key
     */
    private generateKey():
        string {


        return (

            crypto.randomUUID()
            +
            crypto.randomUUID()

        );

    }



    /**
     * Encrypt text
     */
    encrypt(
        value: string
    ):
        EncryptedData {


        const encoded =
            btoa(

                value
                +
                "::"
                +
                this.key

            );



        return {

            encrypted:
                encoded,

            timestamp:
                Date.now()

        };

    }



    /**
     * Decrypt text
     */
    decrypt(
        data:
            EncryptedData
    ):
        string | null {


        try {


            const decoded =
                atob(
                    data.encrypted
                );



            return decoded
                .replace(
                    "::" + this.key,
                    ""
                );


        }

        catch {


            return null;

        }

    }



    /**
     * Create hash
     */
    hash(
        value: string
    ):
        string {


        let hash = 0;



        for (
            let i = 0;
            i < value.length;
            i++
        ) {


            hash =
                (
                    hash << 5
                )
                -
                hash
                +
                value.charCodeAt(i);



            hash |= 0;

        }



        return String(hash);

    }



    /**
     * Verify hash
     */
    verifyHash(
        value: string,
        hashValue: string
    ):
        boolean {


        return (
            this.hash(value)
            ===
            hashValue
        );

    }

}



export default EncryptionService;
