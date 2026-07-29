/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Test Runner
 * File: TestRunner.ts
 * -------------------------------------------------------------
 *
 * Executes registered test cases.
 *
 * Features:
 * - Run single test
 * - Run complete suite
 * - Track execution status
 * - Handle failures
 * -------------------------------------------------------------
 */


import {
    TestCase
} from "./TestTypes";


import {
    TestResult
} from "./TestResult";


import {
    TestSuite
} from "./TestSuite";



export class TestRunner {


    private result:
        TestResult;



    constructor() {


        this.result =
            new TestResult();

    }



    /**
     * Run single test
     */
    async run(
        test:
            TestCase
    ):
        Promise<boolean> {


        const execution =
            this.result.create(
                test.id
            );



        try {


            const passed =
                await test.execute();



            this.result.updateStatus(

                execution.id,

                passed
                    ? "passed"
                    : "failed"

            );



            return passed;


        }

        catch(error) {


            this.result.updateStatus(

                execution.id,

                "failed",

                error instanceof Error
                    ? error.message
                    : String(error)

            );



            return false;

        }

    }



    /**
     * Run complete suite
     */
    async runSuite(
        suite:
            TestSuite
    ):
        Promise<void> {


        const tests =
            suite.getAll();



        for (
            const test of tests
        ) {


            await this.run(
                test
            );

        }

    }



    /**
     * Get results
     */
    getResults() {


        return this.result
            .getAll();

    }



    /**
     * Clear results
     */
    clear():
        void {


        this.result.clear();

    }

}



export default TestRunner;
