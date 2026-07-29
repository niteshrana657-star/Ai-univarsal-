/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Threat Detector
 * File: ThreatDetector.ts
 * -------------------------------------------------------------
 *
 * Detects suspicious activities inside AI operations.
 *
 * Features:
 * - Risk analysis
 * - Threat detection
 * - Suspicious pattern tracking
 * - Security alerts
 * -------------------------------------------------------------
 */


export type ThreatLevel =
    | "safe"
    | "warning"
    | "danger"
    | "critical";



export interface ThreatReport {

    id: string;

    source: string;

    threatLevel: ThreatLevel;

    reason: string;

    timestamp: number;

}



export class ThreatDetector {


    private reports:
        ThreatReport[] = [];



    /**
     * Analyze operation
     */
    analyze(
        source: string,
        action: string
    ):
        ThreatReport {


        const level =
            this.detectLevel(
                action
            );



        const report:
            ThreatReport = {

                id:
                    crypto.randomUUID(),

                source,

                threatLevel:
                    level,

                reason:
                    this.getReason(level),

                timestamp:
                    Date.now()

            };



        this.reports.push(
            report
        );



        return report;

    }



    /**
     * Detect threat level
     */
    private detectLevel(
        action: string
    ):
        ThreatLevel {


        const dangerousWords = [

            "delete",

            "format",

            "remove",

            "hack",

            "bypass",

            "disable_security"

        ];



        const matched =
            dangerousWords.some(

                word =>

                    action
                        .toLowerCase()
                        .includes(word)

            );



        if (matched) {

            return "danger";

        }



        return "safe";

    }



    /**
     * Generate reason
     */
    private getReason(
        level: ThreatLevel
    ):
        string {


        switch(level) {


            case "danger":

                return "Suspicious operation detected.";


            case "warning":

                return "Operation requires review.";


            case "critical":

                return "Critical security threat detected.";


            default:

                return "No threat detected.";

        }

    }



    /**
     * Get reports
     */
    getReports():
        ThreatReport[] {


        return [

            ...this.reports

        ];

    }



    /**
     * Get latest threat
     */
    getLatest():
        ThreatReport | null {


        return (

            this.reports[
                this.reports.length - 1
            ]

            ?? null

        );

    }



    /**
     * Clear reports
     */
    clear():
        void {


        this.reports = [];

    }

}



export default ThreatDetector;
