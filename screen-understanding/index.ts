/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Screen Understanding Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for Screen Understanding module.
 * -------------------------------------------------------------
 */


// Screen Analyzer
export {
    ScreenAnalyzer
} from "./ScreenAnalyzer";

export type {
    ScreenAnalysisResult,
    ScreenInput
} from "./ScreenAnalyzer";


// Screen Capture
export {
    ScreenCaptureManager
} from "./ScreenCaptureManager";

export type {
    ScreenFrame,
    CaptureStatus
} from "./ScreenCaptureManager";


// Privacy Guard
export {
    ScreenPrivacyGuard
} from "./ScreenPrivacyGuard";

export type {
    PrivacyCheckResult,
    PrivacySettings
} from "./ScreenPrivacyGuard";


// App Context
export {
    AppContextAnalyzer
} from "./AppContextAnalyzer";

export type {
    AppContext,
    AppContextInput
} from "./AppContextAnalyzer";


// UI Elements
export {
    UIElementDetector
} from "./UIElementDetector";

export type {
    UIElement,
    UIElementType,
    UIDetectionInput
} from "./UIElementDetector";


// Visual Understanding
export {
    VisualUnderstanding
} from "./VisualUnderstanding";

export type {
    VisualObject,
    VisualAnalysisResult,
    VisualInput
} from "./VisualUnderstanding";


// Screen Memory
export {
    ScreenMemory
} from "./ScreenMemory";

export type {
    ScreenMemoryEntry
} from "./ScreenMemory";


// Action Suggestions
export {
    ActionSuggestionEngine
} from "./ActionSuggestionEngine";

export type {
    ActionSuggestion,
    ActionContext,
    ActionPriority
} from "./ActionSuggestionEngine";
