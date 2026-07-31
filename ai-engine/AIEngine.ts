/**
 * Universal AI Operating Companion
 * Main AI Engine Controller
 * Version: 1.0.0
 */


import {
    AIConfig,
    DefaultAIConfig
} from "./AIConfig";


import {
    AIState
} from "./AIState";


import {
    AIContext
} from "./AIContext";


import {
    AIPlanner
} from "./AIPlanner";


import {
    AIReasoning
} from "./AIReasoning";


import {
    AIResponse,
    AIResponseData
} from "./AIResponse";


import {
    AIEngineState
} from "./AIConstants";



/**
 * AI Engine Options
 */
export interface AIEngineOptions {


    config?: AIConfig;


    context?: AIContext;

}



/**
 * Main AI Engine
 */
export class AIEngine {


    private config:
        AIConfig;


    private state:
        AIState;


    private context:
        AIContext;


    private planner:
        AIPlanner;


    private reasoning:
        AIReasoning;


    private response:
        AIResponse;



    constructor(
        options?: AIEngineOptions
    ) {


        this.config =
            options?.config ||
            DefaultAIConfig;



        this.context =
            options?.context ||
            new AIContext();



        this.state =
            new AIState();



        this.planner =
            new AIPlanner();



        this.reasoning =
            new AIReasoning();



        this.response =
            new AIResponse();

    }



    /**
     * Initialize AI
     */
    async initialize():
        Promise<void> {


        this.state.setState(
            AIEngineState.INITIALIZING,
            "AI initialization started"
        );


        this.state.setState(
            AIEngineState.IDLE,
            "AI ready"
        );

    }



    /**
     * Process user request
     */
    async process(
        input: string
    ):
        Promise<AIResponseData> {


        this.state.setState(
            AIEngineState.THINKING,
            "Understanding request"
        );



        this.context.add({

            type:
                "user" as any,

            key:
                "last_input",

            value:
                input,

            timestamp:
                Date.now()

        });



        const analysis =
            this.reasoning.analyze(
                input
            );



        this.state.setState(
            AIEngineState.PROCESSING,
            "Generating response"
        );



        const result =
            this.response.create(

                analysis.conclusion

            );



        this.state.setState(
            AIEngineState.COMPLETED,
            "Task completed"
        );



        return result;

    }



    /**
     * Create task plan
     */
    createPlan(
        goal: string,
        steps: string[]
    ) {


        return this.planner.createPlan(
            goal,
            steps
        );

    }



    /**
     * Get current state
     */
    getState() {


        return this.state.getState();

    }



    /**
     * Get context
     */
    getContext() {


        return this.context.getContext();

    }



    /**
     * Shutdown AI
     */
    async shutdown():
        Promise<void> {


        this.state.setState(
            AIEngineState.STOPPED,
            "AI stopped"
        );

    }


}
