/**
 * Universal AI Operating Companion
 * AI Manager
 * Version: 1.0.0
 */


import {
    AIEngine
} from "./AIEngine";


import {
    AIConfig,
    DefaultAIConfig
} from "./AIConfig";


import {
    AIEngineState
} from "./AIConstants";



/**
 * AI Manager Status
 */
export interface AIManagerStatus {


    running: boolean;


    state: AIEngineState;


    startedAt?: number;


}



/**
 * AI Manager
 */
export class AIManager {


    private engine:
        AIEngine;


    private config:
        AIConfig;


    private running:
        boolean;


    private startedAt:
        number | undefined;



    constructor(
        config?: AIConfig
    ) {


        this.config =
            config ||
            DefaultAIConfig;


        this.engine =
            new AIEngine({

                config:
                    this.config

            });


        this.running =
            false;


        this.startedAt =
            undefined;

    }



    /**
     * Start AI system
     */
    async start():
        Promise<void> {


        await this.engine
            .initialize();


        this.running =
            true;


        this.startedAt =
            Date.now();

    }



    /**
     * Stop AI system
     */
    async stop():
        Promise<void> {


        await this.engine
            .shutdown();


        this.running =
            false;

    }



    /**
     * Restart AI
     */
    async restart():
        Promise<void> {


        await this.stop();


        await this.start();

    }



    /**
     * Process request
     */
    async execute(
        input: string
    ) {


        if (!this.running) {


            await this.start();

        }


        return this.engine
            .process(input);

    }



    /**
     * Get AI Engine
     */
    getEngine():
        AIEngine {


        return this.engine;

    }



    /**
     * Get status
     */
    getStatus():
        AIManagerStatus {


        return {


            running:
                this.running,


            state:
                this.engine
                    .getState(),


            startedAt:
                this.startedAt

        };

    }



    /**
     * Get config
     */
    getConfig():
        AIConfig {


        return this.config;

    }


}
