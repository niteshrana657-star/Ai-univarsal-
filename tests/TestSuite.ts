/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Test Suite
 * File: TestSuite.ts
 * -------------------------------------------------------------
 *
 * Manages groups of test cases.
 *
 * Features:
 * - Add tests
 * - Remove tests
 * - Get tests
 * - Organize test collections
 * -------------------------------------------------------------
 */


import {
    TestCase,
    TestCategory
} from "./TestTypes";



export class TestSuite {


    private tests:
        TestCase[] = [];



    /**
     * Add test case
     */
    add(
        test:
            TestCase
    ):
        boolean {


        const exists =
            this.tests.some(

                item =>
                    item.id === test.id

            );



        if (exists) {

            return false;

        }



        this.tests.push(
            test
        );



        return true;

    }



    /**
     * Remove test
     */
    remove(
        id:
            string
    ):
        boolean {


        const before =
            this.tests.length;



        this.tests =
            this.tests.filter(

                test =>
                    test.id !== id

            );



        return (
            before !== this.tests.length
        );

    }



    /**
     * Get all tests
     */
    getAll():
        TestCase[] {


        return [

            ...this.tests

        ];

    }



    /**
     * Get tests by category
     */
    getByCategory(
        category:
            TestCategory
    ):
        TestCase[] {


        return this.tests.filter(

            test =>
                test.category === category

        );

    }



    /**
     * Count tests
     */
    count():
        number {


        return this.tests.length;

    }



    /**
     * Clear suite
     */
    clear():
        void {


        this.tests = [];

    }

}



export default TestSuite;
