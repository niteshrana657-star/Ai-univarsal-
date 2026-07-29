/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen Privacy Guard
 * File: ScreenPrivacyGuard.ts
 * -------------------------------------------------------------
 *
 * Protects user privacy during screen understanding.
 *
 * Features:
 * - Permission validation
 * - Sensitive data blocking
 * - Privacy mode control
 * - Safe screen processing
 * -------------------------------------------------------------
 */


export interface PrivacyCheckResult {

    allowed: boolean;

    reason: string;

}



export interface PrivacySettings {

    enabled: boolean;

    blockPasswords: boolean;

    blockBankingApps: boolean;

    blockPrivateContent: boolean;

}



export class ScreenPrivacyGuard {


    private settings:
        PrivacySettings;



    private sensitiveKeywords:
        string[] = [

            "password",

            "pin",

            "otp",

            "cvv",

            "credit card",

            "debit card",

            "bank",

            "login"

        ];



    constructor(
        settings?: Partial<PrivacySettings>
    ) {


        this.settings = {

            enabled: true,

            blockPasswords: true,

            blockBankingApps: true,

            blockPrivateContent: true,

            ...settings

        };

    }



    /**
     * Check screen access permission
     */
    checkAccess():

        PrivacyCheckResult {


        if (!this.settings.enabled) {

            return {

                allowed: false,

                reason:
                    "Privacy mode enabled"

            };

        }



        return {

            allowed: true,

            reason:
                "Screen access allowed"

        };

    }



    /**
     * Check visible text safety
     */
    checkText(
        text: string
    ):

        PrivacyCheckResult {


        const content =
            text.toLowerCase();



        for (
            const keyword of this.sensitiveKeywords
        ) {


            if (
                content.includes(keyword)
            ) {


                return {

                    allowed: false,

                    reason:
                        `Sensitive content detected: ${keyword}`

                };

            }

        }



        return {

            allowed: true,

            reason:
                "Content is safe"

        };

    }



    /**
     * Filter sensitive text
     */
    sanitize(
        text: string
    ):
        string {


        let result =
            text;



        for (
            const keyword of this.sensitiveKeywords
        ) {


            const regex =
                new RegExp(
                    keyword,
                    "gi"
                );


            result =
                result.replace(
                    regex,
                    "[PRIVATE]"
                );

        }



        return result;

    }



    /**
     * Update privacy settings
     */
    updateSettings(
        settings:
            Partial<PrivacySettings>
    ):
        void {


        this.settings = {

            ...this.settings,

            ...settings

        };

    }



    /**
     * Get settings
     */
    getSettings():

        PrivacySettings {


        return {

            ...this.settings

        };

    }

}



export default ScreenPrivacyGuard;
