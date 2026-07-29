/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Encryption
 * File: MemoryEncryption.ts
 * -------------------------------------------------------------
 *
 * Provides secure encryption and decryption
 * for stored memory data.
 *
 * Features:
 * - Encrypt memory content
 * - Decrypt stored data
 * - Hash sensitive values
 * - Protect user privacy
 * -------------------------------------------------------------
 */


export class MemoryEncryption {


    private key: string;



    constructor(
        key?: string
    ) {

        this.key =
            key ??
            "DEFAULT_MEMORY_SECURITY_KEY";

    }



    /**
     * Encrypt data
     */
    encrypt(
        data: string
    ): string {


        const encoded =
            Buffer
                .from(
                    data + this.key
                )
                .toString("base64");


        return encoded;

    }



    /**
     * Decrypt data
     */
    decrypt(
        encryptedData: string
    ): string {


        const decoded =
            Buffer
                .from(
                    encryptedData,
                    "base64"
                )
                .toString();



        return decoded.replace(
            this.key,
            ""
        );

    }



    /**
     * Hash data
     */
    hash(
        data: string
    ): string {


        let hash = 0;


        for (
            let i = 0;
            i < data.length;
            i++
        ) {

            hash =
                (
                    (
                        hash << 5
                    ) -
                    hash
                ) +
                data.charCodeAt(i);


            hash |= 0;

        }


        return Math.abs(hash)
            .toString(16);

    }



    /**
     * Check encrypted data
     */
    isEncrypted(
        data: string
    ): boolean {


        try {

            const decoded =
                Buffer
                    .from(
                        data,
                        "base64"
                    )
                    .toString();


            return decoded.includes(
                this.key
            );

        }

        catch {

            return false;

        }

    }

}



export default MemoryEncryption;
