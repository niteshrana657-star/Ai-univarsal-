/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Automation Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for Automation module.
 * -------------------------------------------------------------
 */


// Security

export {
    AutomationSecurity
} from "./AutomationSecurity";

export type {
    SecurityRisk,
    SecurityCheckResult,
    AutomationAction
} from "./AutomationSecurity";


// Rules

export {
    AutomationRules
} from "./AutomationRules";

export type {
    AutomationRule,
    RuleCondition,
    RuleMatchContext
} from "./AutomationRules";


// Action Runner

export {
    ActionRunner
} from "./ActionRunner";

export type {
    ActionStatus,
    ActionExecutionResult
} from "./ActionRunner";


// Task Planner

export {
    TaskPlanner
} from "./TaskPlanner";

export type {
    TaskStep,
    AutomationTask,
    TaskStatus
} from "./TaskPlanner";


// Task Executor

export {
    TaskExecutor
} from "./TaskExecutor";

export type {
    TaskExecutionResult
} from "./TaskExecutor";


// Event Trigger

export {
    EventTrigger
} from "./EventTrigger";

export type {
    EventType,
    AutomationEvent,
    EventCallback
} from "./EventTrigger";


// Scheduler

export {
    SchedulerService
} from "./SchedulerService";

export type {
    ScheduledTask
} from "./SchedulerService";


// Workflow

export {
    WorkflowManager
} from "./WorkflowManager";

export type {
    Workflow,
    WorkflowStep
} from "./WorkflowManager";
