/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Test Reporter
 * File: TestReporter.ts
 * -------------------------------------------------------------
 *
 * Generates reports from test executions.
 *
 * Features:
 * - Create summaries
 * - Calculate pass/fail counts
 * - Generate readable reports
 * -------------------------------------------------------------
 */


import {
    TestExecution,
    TestSummary
} from "./TestTypes";



export class TestReporter {


    /**
     * Generate test summary
     */
    generateSummary(
        results:
            TestExecution[]
    ):
        TestSummary {


        let passed = 0;

        let failed = 0;

        let skipped = 0;



        for (
            const result of results
        ) {


            switch(
                result.status
            ) {


                case "passed":

                    passed++;

                    break;



                case "failed":

                    failed++;

                    break;



                case "skipped":

                    skipped++;

                    break;

            }

        }



        const duration =
            results.reduce(

                (total, item) =>

                    total
                    +
                    (
                        item.completedAt
                            ?
                            item.completedAt -
                            item.startedAt
                            :
                            0
                    ),

                0

            );



        return {

            total:
                results.length,

            passed,

            failed,

            skipped,

            duration

        };

    }



    /**
     * Generate text report
     */
    generateText(
        results:
            TestExecution[]
    ):
        string {


        const summary =
            this.generateSummary(
                results
            );



        return `

Universal AI Operating Companion
Test Report

Total:
${summary.total}

Passed:
${summary.passed}

Failed:
${summary.failed}

Skipped:
${summary.skipped}

Duration:
${summary.duration} ms

        `.trim();

    }

}



export default TestReporter;
