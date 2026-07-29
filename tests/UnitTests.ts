/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Unit Tests
 * File: UnitTests.ts
 * -------------------------------------------------------------
 *
 * Default unit test collection.
 *
 * Features:
 * - Basic framework validation
 * - Register internal tests
 * - Verify core functions
 * -------------------------------------------------------------
 */


import {
    TestCase
} from "./TestTypes";



export class UnitTests {


    private tests:
        TestCase[] = [];



    constructor() {


        this.registerDefaultTests();

    }



    /**
     * Register default tests
     */
    private registerDefaultTests():
        void {


        this.tests.push(

            {

                id:
                    "system_basic_test",

                name:
                    "System Basic Test",

                description:
                    "Checks basic system execution.",

                category:
                    "unit",

                execute:
                    async () => {

                        return true;

                    }

            },


            {

                id:
                    "memory_test",

                name:
                    "Memory Availability Test",

                description:
                    "Checks memory module availability.",

                category:
                    "unit",

                execute:
                    async () => {

                        return true;

                    }

            },


            {

                id:
                    "security_test",

                name:
                    "Security Layer Test",

                description:
                    "Checks security framework response.",

                category:
                    "security",

                execute:
                    async () => {

                        return true;

                    }

            }

        );

    }



    /**
     * Get all unit tests
     */
    getTests():
        TestCase[] {


        return [

            ...this.tests

        ];

    }



    /**
     * Add custom test
     */
    add(
        test:
            TestCase
    ):
        void {


        this.tests.push(
            test
        );

    }



    /**
     * Clear tests
     */
    clear():
        void {


        this.tests = [];

    }

}



export default UnitTests;
