/**
 * Universal AI Operating Companion
 * User Context Management
 * Version: 1.0.0
 */

import {
    PlatformType
} from "../types";


/**
 * User Context Data
 */
export interface UserContextData {

    userId?: string;

    sessionId: string;

    language: string;

    platform: PlatformType;

    preferences: Record<string, unknown>;

    activeApplication?: string;

    lastActivity?: number;

}



/**
 * User Context Manager
 */
export class UserContext {


    private context: UserContextData;



    constructor(
        platform: PlatformType
    ) {

        this.context = {

            sessionId:
                this.generateSessionId(),

            language: "en",

            platform,

            preferences: {}

        };

    }



    /**
     * Get current user context
     */
    get(): UserContextData {

        return {
            ...this.context
        };

    }



    /**
     * Update user context
     */
    update(
        data: Partial<UserContextData>
    ): void {

        this.context = {

            ...this.context,

            ...data,

            lastActivity:
                Date.now()

        };

    }



    /**
     * Set user preference
     */
    setPreference(
        key: string,
        value: unknown
    ): void {
       
        this.context.preferences[key] = value;

        this.context.lastActivity =
            Date.now();

    }



    /**
     * Get user preference
     */
    getPreference<T>(
        key: string
    ): T | undefined {


               return this.context.preferences[key] as 
T | undefined; 

    }



    /**
     * Clear user context
     */
    clear(): void {


        this.context = {

            sessionId:
                this.generateSessionId(),

            language:
                "en",

            platform:
                this.context.platform,

            preferences: {}

        };

    }



    /**
     * Generate unique session ID
     */
    private generateSessionId(): string {


        return (

            "session_" +

            Date.now().toString(36)

            +

            "_"

            +

            Math.random()
                .toString(36)
                .substring(2, 10)

        );

    }

}
