/**
 * Universal AI Operating Companion
 * AI Service Layer
 * Version: 1.0.0
 */


import {
    AIManager
} from "./AIManager";


import {
    AIResponseData
} from "./AIResponse";


import {
    AIConfig
} from "./AIConfig";



/**
 * AI Service Status
 */
export interface AIServiceStatus {


    initialized: boolean;


    active: boolean;


}



/**
 * AI Service
 */
export class AIService {


    private manager:
        AIManager;


    private initialized:
        boolean;


    private active:
        boolean;



    constructor(
        config?: AIConfig
    ) {


        this.manager =
            new AIManager(
                config
            );


        this.initialized =
            false;


        this.active =
            false;

    }



    /**
     * Initialize service
     */
    async initialize():
        Promise<void> {


        await this.manager
            .start();


        this.initialized =
            true;


        this.active =
            true;

    }



    /**
     * Send request to AI
     */
    async request(
        input: string
    ):
        Promise<AIResponseData> {


        if (!this.initialized) {


            await this.initialize();

        }


        return this.manager
            .execute(
                input
            );

    }



    /**
     * Shutdown service
     */
    async shutdown():
        Promise<void> {


        await this.manager
            .stop();


        this.active =
            false;

    }



    /**
     * Get manager
     */
    getManager():
        AIManager {


        return this.manager;

    }



    /**
     * Get service status
     */
    getStatus():
        AIServiceStatus {


        return {

            initialized:
                this.initialized,


            active:
                this.active

        };

    }

}
