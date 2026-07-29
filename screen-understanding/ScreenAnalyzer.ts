/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen Analyzer
 * File: ScreenAnalyzer.ts
 * -------------------------------------------------------------
 *
 * Analyzes captured screen information.
 *
 * Features:
 * - Extract screen metadata
 * - Process visible content
 * - Generate AI readable context
 * - Detect application information
 * -------------------------------------------------------------
 */


export interface ScreenAnalysisResult {

    appName?: string;

    activity?: string;

    visibleText?: string;

    elements?: unknown[];

    timestamp: number;

    metadata?: Record<string, unknown>;

}



export interface ScreenInput {

    appName?: string;

    activity?: string;

    text?: string;

    elements?: unknown[];

    metadata?: Record<string, unknown>;

}



export class ScreenAnalyzer {


    /**
     * Analyze screen data
     */
    analyze(
        input: ScreenInput
    ):
        ScreenAnalysisResult {


        return {

            appName:
                input.appName ??
                "Unknown",


            activity:
                input.activity ??
                "Unknown",


            visibleText:
                this.cleanText(
                    input.text ?? ""
                ),


            elements:
                input.elements ?? [],


            timestamp:
                Date.now(),


            metadata:
                input.metadata ?? {}

        };

    }



    /**
     * Create AI context
     */
    buildContext(
        result: ScreenAnalysisResult
    ):
        Record<string, unknown> {


        return {

            currentApp:
                result.appName,


            currentActivity:
                result.activity,


            visibleText:
                result.visibleText,


            uiElements:
                result.elements,


            analyzedAt:
                result.timestamp

        };

    }



    /**
     * Clean extracted text
     */
    private cleanText(
        text: string
    ):
        string {


        return text

            .replace(
                /\s+/g,
                " "
            )

            .trim();

    }



    /**
     * Check empty screen data
     */
    isValid(
        result: ScreenAnalysisResult
    ):
        boolean {


        return Boolean(

            result.appName ||
            result.visibleText ||
            result.elements?.length

        );

    }

}



export default ScreenAnalyzer;
