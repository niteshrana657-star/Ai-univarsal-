/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Security Manager
 * File: SecurityManager.ts
 * -------------------------------------------------------------
 *
 * Main controller for security operations.
 *
 * Features:
 * - Security policy checking
 * - Threat detection
 * - Audit logging
 * - Data protection access
 * -------------------------------------------------------------
 */


import {
    SecurityPolicy
} from "./SecurityPolicy";


import {
    ThreatDetector
} from "./ThreatDetector";


import {
    AuditLogger
} from "./AuditLogger";


import {
    DataProtection
} from "./DataProtection";


import {
    EncryptionService
} from "./EncryptionService";



export class SecurityManager {


    private policy:
        SecurityPolicy;


    private threatDetector:
        ThreatDetector;


    private auditLogger:
        AuditLogger;


    private dataProtection:
        DataProtection;


    private encryption:
        EncryptionService;



    constructor() {


        this.policy =
            new SecurityPolicy();


        this.threatDetector =
            new ThreatDetector();


        this.auditLogger =
            new AuditLogger();


        this.dataProtection =
            new DataProtection();


        this.encryption =
            new EncryptionService();

    }



    /**
     * Check operation security
     */
    checkOperation(
        operation: string
    ) {


        const result =
            this.policy.check(
                operation
            );


        this.auditLogger.log(

            "security",

            "SecurityManager",

            `Operation checked: ${operation}`

        );


        return result;

    }



    /**
     * Analyze threat
     */
    analyzeThreat(
        source: string,
        action: string
    ) {


        const result =
            this.threatDetector.analyze(
                source,
                action
            );


        this.auditLogger.log(

            "security",

            source,

            `Threat analysis completed for ${action}`

        );


        return result;

    }



    /**
     * Encrypt data
     */
    encryptData(
        value: string
    ) {


        this.auditLogger.log(

            "system",

            "SecurityManager",

            "Data encryption requested."

        );


        return this.encryption.encrypt(
            value
        );

    }



    /**
     * Decrypt data
     */
    decryptData(
        data:
            {
                encrypted: string;
                timestamp: number;
            }
    ) {


        return this.encryption.decrypt(
            data
        );

    }



    /**
     * Protect object data
     */
    protectData(
        data:
            Record<string, unknown>
    ) {


        return this.dataProtection
            .protectObject(
                data
            );

    }



    /**
     * Get audit logs
     */
    getAuditLogs() {


        return this.auditLogger
            .getLogs();

    }



    /**
     * Get threat reports
     */
    getThreatReports() {


        return this.threatDetector
            .getReports();

    }



    /**
     * Reset security data
     */
    reset():
        void {


        this.auditLogger.clear();

        this.threatDetector.clear();

        this.policy.reset();

    }

}



export default SecurityManager;
