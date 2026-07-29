/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen Capture Manager
 * File: ScreenCaptureManager.ts
 * -------------------------------------------------------------
 *
 * Manages screen capture lifecycle.
 *
 * Features:
 * - Capture permission state
 * - Start/stop capture session
 * - Store latest screen frame
 * - Provide screen data for AI processing
 * -------------------------------------------------------------
 */


export interface ScreenFrame {

    id: string;

    data: unknown;

    timestamp: number;

}



export interface CaptureStatus {

    active: boolean;

    permissionGranted: boolean;

}



export class ScreenCaptureManager {


    private status:
        CaptureStatus;


    private frames:
        ScreenFrame[] = [];



    constructor() {

        this.status = {

            active: false,

            permissionGranted: false

        };

    }



    /**
     * Update permission status
     */
    setPermission(
        granted: boolean
    ): void {


        this.status.permissionGranted =
            granted;

    }



    /**
     * Start screen capture
     */
    start():

        boolean {


        if (
            !this.status.permissionGranted
        ) {

            return false;

        }



        this.status.active =
            true;


        return true;

    }



    /**
     * Stop screen capture
     */
    stop():

        void {


        this.status.active =
            false;

    }



    /**
     * Add captured frame
     */
    addFrame(
        data: unknown
    ):
        ScreenFrame {


        const frame: ScreenFrame = {

            id:
                crypto.randomUUID(),

            data,

            timestamp:
                Date.now()

        };



        this.frames.push(
            frame
        );



        return frame;

    }



    /**
     * Get latest frame
     */
    getLatest():

        ScreenFrame | null {


        if (
            this.frames.length === 0
        ) {

            return null;

        }



        return this.frames[
            this.frames.length - 1
        ];

    }



    /**
     * Get capture status
     */
    getStatus():

        CaptureStatus {


        return {

            ...this.status

        };

    }



    /**
     * Clear captured frames
     */
    clear():

        void {


        this.frames = [];

    }

}



export default ScreenCaptureManager;
