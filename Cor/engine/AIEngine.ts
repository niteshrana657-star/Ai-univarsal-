/**
 * Universal AI Operating Companion
 * AI Engine Core
 * Version: 1.0.0
 */

import {
    AIRequest,
    AIResponse,
    AIMode
} from "../types";

import {
    SystemContext
} from "../context/SystemContext";

import {
    TaskContext
} from "../context/TaskContext";

import {
    EventBus
} from "../events/EventBus";

import {
    CoreEventType
} from "../events/EventTypes";



/**
 * AI Engine Configuration
 */
export interface AIEngineOptions {

    systemContext: SystemContext;

    taskContext: TaskContext;

    eventBus: EventBus;

}



/**
 * Main AI Engine
 */
export class AIEngine {


    private systemContext:
        SystemContext;


    private taskContext:
        TaskContext;


    private eventBus:
        EventBus;



    constructor(
        options: AIEngineOptions
    ) {

        this.systemContext =
            options.systemContext;


        this.taskContext =
            options.taskContext;


        this.eventBus =
            options.eventBus;

    }



    /**
     * Initialize AI Engine
     */
    async initialize(): Promise<void> {


        this.systemContext
            .setAIMode(
                AIMode.IDLE
            );


        await this.eventBus.emit({

            type:
                CoreEventType.CORE_INITIALIZED,

            timestamp:
                Date.now()

        });

    }



    /**
     * Process AI Request
     */
    async process(
        request: AIRequest
    ): Promise<AIResponse> {


        const task =
            this.taskContext.createTask(
                "AI Request Processing",
                request.userInput
            );


        this.taskContext
            .startTask(
                task.taskId
            );


        await this.eventBus.emit({

            type:
                CoreEventType.AI_REQUEST_RECEIVED,

            timestamp:
                Date.now(),

            payload: {

                source:
                    "AIEngine",

                data:
                    request

            }

        });



        try {


            this.systemContext
                .setAIMode(
                    AIMode.THINKING
                );


            /*
             * Actual AI provider connection
             * will be connected through
             * AI services layer.
             */


            const response: AIResponse = {

                id:
                    request.id,

                success:
                    true,

                message:
                    "AI request processed",

                timestamp:
                    Date.now()

            };


            this.taskContext
                .completeTask(
                    task.taskId,
                    response
                );


            this.systemContext
                .setAIMode(
                    AIMode.ACTIVE
                );


            await this.eventBus.emit({

                type:
                    CoreEventType.AI_RESPONSE_CREATED,

                timestamp:
                    Date.now(),

                payload: {

                    source:
                        "AIEngine",

                    data:
                        response

                }

            });


            return response;


        } catch(error) {


            this.taskContext
                .failTask(
                    task.taskId,
                    String(error)
                );


            this.systemContext
                .setAIMode(
                    AIMode.ERROR
                );


            throw error;

        }

    }



    /**
     * Get Current AI Mode
     */
    getMode(): AIMode {


        return this.systemContext
            .get()
            .aiMode;

    }



    /**
     * Shutdown Engine
     */
    async shutdown(): Promise<void> {


        this.systemContext
            .setAIMode(
                AIMode.IDLE
            );


    }

}
