/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * App Context Analyzer
 * File: AppContextAnalyzer.ts
 * -------------------------------------------------------------
 *
 * Analyzes current application context.
 *
 * Features:
 * - Detect active app
 * - Analyze app state
 * - Track user activity context
 * - Prepare AI readable application context
 * -------------------------------------------------------------
 */


export interface AppContext {

    appName: string;

    packageName?: string;

    activity?: string;

    category?: string;

    state?: string;

    metadata?: Record<string, unknown>;

    timestamp: number;

}



export interface AppContextInput {

    appName?: string;

    packageName?: string;

    activity?: string;

    screenText?: string;

    metadata?: Record<string, unknown>;

}



export class AppContextAnalyzer {



    /**
     * Analyze application context
     */
    analyze(
        input: AppContextInput
    ):
        AppContext {


        return {

            appName:
                input.appName ??
                "Unknown App",


            packageName:
                input.packageName ??
                "Unknown Package",


            activity:
                input.activity ??
                "Unknown Activity",


            category:
                this.detectCategory(
                    input.appName ?? ""
                ),


            state:
                this.detectState(
                    input.screenText ?? ""
                ),


            metadata:
                input.metadata ?? {},


            timestamp:
                Date.now()

        };

    }



    /**
     * Detect application category
     */
    private detectCategory(
        appName: string
    ):
        string {


        const name =
            appName.toLowerCase();



        if (
            name.includes("chrome") ||
            name.includes("browser")
        ) {

            return "browser";

        }



        if (
            name.includes("youtube") ||
            name.includes("video")
        ) {

            return "media";

        }



        if (
            name.includes("whatsapp") ||
            name.includes("message")
        ) {

            return "communication";

        }



        if (
            name.includes("bank") ||
            name.includes("payment")
        ) {

            return "finance";

        }



        return "general";

    }



    /**
     * Detect current app state
     */
    private detectState(
        text: string
    ):
        string {


        const content =
            text.toLowerCase();



        if (
            content.includes("login") ||
            content.includes("sign in")
        ) {

            return "authentication";

        }



        if (
            content.includes("error") ||
            content.includes("failed")
        ) {

            return "error";

        }



        return "active";

    }



    /**
     * Convert context for AI
     */
    toAIContext(
        context: AppContext
    ):
        Record<string, unknown> {


        return {

            currentApplication:
                context.appName,


            applicationCategory:
                context.category,


            applicationState:
                context.state,


            currentActivity:
                context.activity,


            analyzedAt:
                context.timestamp

        };

    }

}



export default AppContextAnalyzer;
