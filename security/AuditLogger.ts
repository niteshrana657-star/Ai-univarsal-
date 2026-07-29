/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Audit Logger
 * File: AuditLogger.ts
 * -------------------------------------------------------------
 *
 * Records security and system activity logs.
 *
 * Features:
 * - Create audit records
 * - Track security actions
 * - Search logs
 * - Clear logs
 * -------------------------------------------------------------
 */


export type AuditAction =
    | "access"
    | "permission"
    | "security"
    | "automation"
    | "plugin"
    | "system";



export interface AuditRecord {

    id: string;

    action: AuditAction;

    source: string;

    message: string;

    timestamp: number;

    metadata?: unknown;

}



export class AuditLogger {


    private logs:
        AuditRecord[] = [];



    /**
     * Add audit log
     */
    log(
        action: AuditAction,
        source: string,
        message: string,
        metadata?: unknown
    ):
        AuditRecord {


        const record:
            AuditRecord = {

                id:
                    crypto.randomUUID(),

                action,

                source,

                message,

                timestamp:
                    Date.now(),

                metadata

            };



        this.logs.push(
            record
        );



        return record;

    }



    /**
     * Get all logs
     */
    getLogs():
        AuditRecord[] {


        return [

            ...this.logs

        ];

    }



    /**
     * Search logs
     */
    search(
        keyword: string
    ):
        AuditRecord[] {


        const value =
            keyword.toLowerCase();



        return this.logs.filter(

            log =>

                log.message
                    .toLowerCase()
                    .includes(value)

                ||

                log.source
                    .toLowerCase()
                    .includes(value)

        );

    }



    /**
     * Get latest log
     */
    getLatest():
        AuditRecord | null {


        return (

            this.logs[
                this.logs.length - 1
            ]

            ?? null

        );

    }



    /**
     * Clear logs
     */
    clear():
        void {


        this.logs = [];

    }



    /**
     * Export logs
     */
    export():
        AuditRecord[] {


        return [

            ...this.logs

        ];

    }

}



export default AuditLogger;
