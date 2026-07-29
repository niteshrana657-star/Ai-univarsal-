/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Test Types
 * File: TestTypes.ts
 * -------------------------------------------------------------
 *
 * Core definitions for testing framework.
 *
 * Features:
 * - Test cases
 * - Test categories
 * - Test status
 * - Test execution details
 * -------------------------------------------------------------
 */



export type TestStatus =
    | "pending"
    | "running"
    | "passed"
    | "failed"
    | "skipped";



export type TestCategory =
    | "unit"
    | "integration"
    | "security"
    | "performance"
    | "system";



export interface TestCase {

    id: string;

    name: string;

    description: string;

    category: TestCategory;

    execute:
        () => Promise<boolean>;

}



export interface TestExecution {

    id: string;

    testId: string;

    status: TestStatus;

    startedAt: number;

    completedAt?: number;

    error?: string;

}



export interface TestSummary {

    total: number;

    passed: number;

    failed: number;

    skipped: number;

    duration: number;

}
