/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Test Result
 * File: TestResult.ts
 * -------------------------------------------------------------
 *
 * Stores and manages test execution results.
 *
 * Features:
 * - Create results
 * - Track status
 * - Store errors
 * - Calculate success
 * -------------------------------------------------------------
 */



import {
    TestStatus,
    TestExecution
} from "./TestTypes";



export class TestResult {


    private results:
        TestExecution[] = [];



    /**
     * Add test result
     */
    add(
        result:
            TestExecution
    ):
        void {


        this.results.push(
            result
        );

    }



    /**
     * Create new execution result
     */
    create(
        testId:
            string
    ):
        TestExecution {


        const execution:
            TestExecution = {

                id:
                    crypto.randomUUID(),

                testId,

                status:
                    "pending",

                startedAt:
                    Date.now()

            };



        this.results.push(
            execution
        );



        return execution;

    }



    /**
     * Update test status
     */
    updateStatus(
        id:
            string,

        status:
            TestStatus,

        error?:
            string
    ):
        boolean {


        const result =
            this.results.find(

                item =>
                    item.id === id

            );



        if (!result) {

            return false;

        }



        result.status =
            status;



        result.completedAt =
            Date.now();



        if (error) {

            result.error =
                error;

        }



        return true;

    }



    /**
     * Get all results
     */
    getAll():
        TestExecution[] {


        return [

            ...this.results

        ];

    }



    /**
     * Get failed tests
     */
    getFailed():
        TestExecution[] {


        return this.results.filter(

            item =>
                item.status === "failed"

        );

    }



    /**
     * Clear results
     */
    clear():
        void {


        this.results = [];

    }

}



export default TestResult;
