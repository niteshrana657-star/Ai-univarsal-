/**
 * PermissionConstants.ts
 *
 * Permission definitions for the Universal AI Operating Companion.
 *
 * This file contains the canonical list of permissions
 * required by the application.
 */


// ==============================
// Permission Definition
// ==============================

export interface PermissionDefinition {

    id: string;

    title: string;

    description: string;

}


// ==============================
// Permission Constants
// ==============================

export const PERMISSIONS: PermissionDefinition[] = [

    {
        id: "accessibility",

        title:
            "Accessibility Service",

        description:
            "Required for screen understanding and automation."

    },



    {
        id: "screen_capture",

        title:
            "Screen Capture",

        description:
            "Required to analyze screen content."

    },



    {
        id: "overlay",

        title:
            "Overlay Permission",

        description:
            "Required to show the AI assistant over apps."

    },



    {
        id: "notification",

        title:
            "Notification Access",

        description:
            "Required to read notifications."

    },



    {
        id: "microphone",

        title:
            "Microphone",

        description:
            "Required for voice commands."

    },



    {
        id: "camera",

        title:
            "Camera",

        description:
            "Required for camera-based AI features."

    },



    {
        id: "storage",

        title:
            "Storage",

        description:
            "Required to access and manage application files."

    },



    {
        id: "battery_optimization",

        title:
            "Battery Optimization",

        description:
            "Required to keep background AI services running reliably."

    },



    {
        id: "auto_start",

        title:
            "Auto Start",

        description:
            "Required to start AI services automatically when supported by the device."

    },



    {
        id: "background_service",

        title:
            "Background Service",

        description:
            "Required to allow AI services to operate in the background."

    }

];


// ==============================
// Permission IDs
// ==============================

export const PERMISSION_IDS = {

    ACCESSIBILITY:
        "accessibility",

    SCREEN_CAPTURE:
        "screen_capture",

    OVERLAY:
        "overlay",

    NOTIFICATION:
        "notification",

    MICROPHONE:
        "microphone",

    CAMERA:
        "camera",

    STORAGE:
        "storage",

    BATTERY_OPTIMIZATION:
        "battery_optimization",

    AUTO_START:
        "auto_start",

    BACKGROUND_SERVICE:
        "background_service"

} as const;


// ==============================
// Helper
// ==============================

export function getPermissionById(
    id: string
): PermissionDefinition | undefined {

    return PERMISSIONS.find(
        (permission) =>
            permission.id === id
    );

}


// ==============================
// Validation
// ==============================

export function isValidPermissionId(
    id: string
): boolean {

    return PERMISSIONS.some(
        (permission) =>
            permission.id === id
    );

}
