/**
 * Universal AI Operating Companion
 * Core Manager
 * Version: 1.0.0
 */


import {
    AIEngine
} from "../engine/AIEngine";

import {
    CoreSecurity
} from "../security/CoreSecurity";

import {
    SecurityPolicy
} from "../security/SecurityPolicy";

import {
    ServiceRegistry
} from "../registry/ServiceRegistry";

import {
    PluginRegistry
} from "../registry/PluginRegistry";

import {
    SystemContext
} from "../context/SystemContext";

import {
    TaskContext
} from "../context/TaskContext";

import {
    EventBus
} from "../events/EventBus";



/**
 * Core Manager
 */
export class CoreManager {


    private systemContext:
        SystemContext;


    private taskContext:
        TaskContext;


    private eventBus:
        EventBus;


    private aiEngine:
        AIEngine;


    private security:
        CoreSecurity;


    private securityPolicy:
        SecurityPolicy;


    private services:
        ServiceRegistry;


    private plugins:
        PluginRegistry;



    constructor(
        systemContext: SystemContext,
        taskContext: TaskContext,
        eventBus: EventBus
    ) {


        this.systemContext =
            systemContext;


        this.taskContext =
            taskContext;


        this.eventBus =
            eventBus;



        this.aiEngine =
            new AIEngine({

                systemContext:
                    this.systemContext,

                taskContext:
                    this.taskContext,

                eventBus:
                    this.eventBus

            });



        this.security =
            new CoreSecurity();



        this.securityPolicy =
            new SecurityPolicy();



        this.services =
            new ServiceRegistry();



        this.plugins =
            new PluginRegistry();

    }



    /**
     * Initialize Core
     */
    async initialize(): Promise<void> {


        await this.aiEngine
            .initialize();


        await this.services
            .initializeAll();


        await this.plugins
            .initializeAll();


    }



    /**
     * Start Core
     */
    async start(): Promise<void> {


        await this.services
            .startAll();


        await this.plugins
            .startAll();

    }



    /**
     * Stop Core
     */
    async shutdown(): Promise<void> {


        await this.services
            .stopAll();


        await this.plugins
            .stopAll();


        await this.aiEngine
            .shutdown();

    }



    /**
     * Get AI Engine
     */
    getAIEngine(): AIEngine {

        return this.aiEngine;

    }



    /**
     * Get Security
     */
    getSecurity(): CoreSecurity {

        return this.security;

    }



    /**
     * Get Security Policy
     */
    getSecurityPolicy(): SecurityPolicy {

        return this.securityPolicy;

    }



    /**
     * Get Services
     */
    getServices(): ServiceRegistry {

        return this.services;

    }



    /**
     * Get Plugins
     */
    getPlugins(): PluginRegistry {

        return this.plugins;

    }



    /**
     * Get Context
     */
    getContext(): SystemContext {

        return this.systemContext;

    }

}
