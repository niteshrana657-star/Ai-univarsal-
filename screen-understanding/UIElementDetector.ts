/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Element Detector
 * File: UIElementDetector.ts
 * -------------------------------------------------------------
 *
 * Detects and structures UI elements from screen data.
 *
 * Features:
 * - Detect buttons
 * - Detect text elements
 * - Detect input fields
 * - Prepare automation-ready UI map
 * -------------------------------------------------------------
 */


export type UIElementType =
    | "button"
    | "text"
    | "input"
    | "image"
    | "unknown";



export interface UIElement {

    id: string;

    type: UIElementType;

    text?: string;

    clickable?: boolean;

    editable?: boolean;

    position?: {

        x: number;

        y: number;

        width: number;

        height: number;

    };

    metadata?: Record<string, unknown>;

}



export interface UIDetectionInput {

    elements?: unknown[];

    visibleText?: string;

}



export class UIElementDetector {



    /**
     * Detect UI elements
     */
    detect(
        input: UIDetectionInput
    ):
        UIElement[] {


        const detected:
            UIElement[] = [];



        if (input.elements) {

            for (
                const element of input.elements
            ) {


                detected.push(

                    this.normalizeElement(
                        element
                    )

                );

            }

        }



        if (
            input.visibleText &&
            detected.length === 0
        ) {


            detected.push({

                id:
                    crypto.randomUUID(),

                type:
                    "text",

                text:
                    input.visibleText,

                clickable:
                    false

            });

        }



        return detected;

    }



    /**
     * Normalize raw UI data
     */
    private normalizeElement(
        element: any
    ):
        UIElement {


        const text =
            element?.text ??
            element?.label ??
            "";



        return {

            id:
                element?.id ??
                crypto.randomUUID(),


            type:
                this.detectType(
                    element
                ),


            text,


            clickable:
                Boolean(
                    element?.clickable
                ),


            editable:
                Boolean(
                    element?.editable
                ),


            position:
                element?.position,


            metadata:
                element

        };

    }



    /**
     * Detect element type
     */
    private detectType(
        element: any
    ):
        UIElementType {


        if (
            element?.editable
        ) {

            return "input";

        }



        if (
            element?.clickable
        ) {

            return "button";

        }



        if (
            element?.text
        ) {

            return "text";

        }



        if (
            element?.image
        ) {

            return "image";

        }



        return "unknown";

    }



    /**
     * Find clickable elements
     */
    getClickable(
        elements: UIElement[]
    ):
        UIElement[] {


        return elements.filter(

            element =>
                element.clickable === true

        );

    }



    /**
     * Find input fields
     */
    getInputs(
        elements: UIElement[]
    ):
        UIElement[] {


        return elements.filter(

            element =>
                element.editable === true

        );

    }

}



export default UIElementDetector;
