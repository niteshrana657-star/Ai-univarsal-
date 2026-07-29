/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ContextPrompt.ts
 * -------------------------------------------------------------
 */

export const CONTEXT_PROMPT_VERSION = "1.0.0";

export interface DeviceContext {

  platform?: string;

  manufacturer?: string;

  model?: string;

  osVersion?: string;

  batteryLevel?: number;

  charging?: boolean;

  networkType?: string;

}

export interface ScreenContext {

  currentApp?: string;

  currentActivity?: string;

  currentScreen?: string;

  visibleText?: string;

  selectedText?: string;

  url?: string;

}

export interface MemoryContext {

  previousConversation?: string[];

  userPreferences?: Record<string, unknown>;

  learnedFacts?: Record<string, unknown>;

}

export interface PermissionContext {

  accessibilityGranted?: boolean;

  overlayGranted?: boolean;

  microphoneGranted?: boolean;

  cameraGranted?: boolean;

  notificationGranted?: boolean;

  storageGranted?: boolean;

  screenCaptureGranted?: boolean;

}

export interface AIContextInput {

  language?: string;

  location?: string;

  timezone?: string;

  device?: DeviceContext;

  screen?: ScreenContext;

  memory?: MemoryContext;

  permissions?: PermissionContext;

  extras?: Record<string, unknown>;

}

export function buildContextPrompt(
  context: AIContextInput
): string {

  const language =
    context.language ?? "auto";

  const location =
    context.location ?? "Unknown";

  const timezone =
    context.timezone ?? "Auto";

  const device =
    context.device ?? {};

  const screen =
    context.screen ?? {};

  const permissions =
    context.permissions ?? {};

  return `

CURRENT CONTEXT

Language:
${language}

Location:
${location}

Timezone:
${timezone}

DEVICE

Platform:
${device.platform ?? "Unknown"}

Manufacturer:
${device.manufacturer ?? "Unknown"}

Model:
${device.model ?? "Unknown"}

Operating System:
${device.osVersion ?? "Unknown"}

Battery:
${device.batteryLevel ?? "Unknown"}

Charging:
${device.charging ?? "Unknown"}

Network:
${device.networkType ?? "Unknown"}

SCREEN

Current App:
${screen.currentApp ?? "Unknown"}

Current Activity:
${screen.currentActivity ?? "Unknown"}

Current Screen:
${screen.currentScreen ?? "Unknown"}

Visible Text:
${screen.visibleText ?? "None"}

Selected Text:
${screen.selectedText ?? "None"}

Current URL:
${screen.url ?? "None"}

PERMISSIONS

Accessibility:
${permissions.accessibilityGranted}

Overlay:
${permissions.overlayGranted}

Microphone:
${permissions.microphoneGranted}

Camera:
${permissions.cameraGranted}

Notification:
${permissions.notificationGranted}

Storage:
${permissions.storageGranted}

Screen Capture:
${permissions.screenCaptureGranted}

`;
}
export function buildMemorySection(
  memory?: MemoryContext
): string {

  if (!memory) {
    return `
MEMORY

No memory available.
`;
  }

  return `

MEMORY

Previous Conversations:
${(memory.previousConversation ?? []).join("\n") || "None"}

User Preferences:
${JSON.stringify(
  memory.userPreferences ?? {},
  null,
  2
)}

Learned Facts:
${JSON.stringify(
  memory.learnedFacts ?? {},
  null,
  2
)}

`;
}

export function buildSafetySection(): string {

  return `

SAFETY RULES

• Never access protected data without permission.

• Never perform irreversible actions
without confirmation.

• Never expose private information.

• Explain important actions before execution.

• Respect user privacy at all times.

• Allow user override for every action.

`;
}

export function buildReasoningSection(): string {

  return `

REASONING RULES

1. Understand user intent.

2. Use available context only.

3. If context is insufficient,
ask a clarification question.

4. Never invent information.

5. Prefer accurate answers
over confident answers.

6. Mention uncertainty whenever needed.

`;
}

export function buildResponseRules(): string {

  return `

RESPONSE STYLE

• Friendly

• Professional

• Clear

• Actionable

• Step-by-step whenever useful

• Match user's language

• Keep unnecessary text minimal

`;
}

export function buildAutomationSection(
  permissions?: PermissionContext
): string {

  const allowed =
    permissions?.accessibilityGranted &&
    permissions?.overlayGranted;

  return `

AUTOMATION

Automation Available:
${allowed ? "YES" : "NO"}

Before automation:

1. Verify permission.

2. Explain action.

3. Confirm with user if needed.

4. Execute safely.

`;
}

export function buildCompleteContext(
  context: AIContextInput
): string {

  return [

    buildContextPrompt(context),

    buildMemorySection(
      context.memory
    ),

    buildSafetySection(),

    buildReasoningSection(),

    buildResponseRules(),

    buildAutomationSection(
      context.permissions
    )

  ].join("\n");

}
/**
 * Validate Context
 */
export function validateContext(
  context: AIContextInput
): boolean {

  if (!context) {
    return false;
  }

  return true;
}


/**
 * Normalize Context
 */
export function normalizeContext(
  context: AIContextInput
): AIContextInput {

  return {

    language:
      context.language ?? "auto",

    location:
      context.location ?? "Unknown",

    timezone:
      context.timezone ?? "Auto",

    device:
      context.device ?? {},

    screen:
      context.screen ?? {},

    memory:
      context.memory ?? {},

    permissions:
      context.permissions ?? {},

    extras:
      context.extras ?? {}

  };

}


/**
 * Merge Context
 */
export function mergeContext(
  base: AIContextInput,
  updates: Partial<AIContextInput>
): AIContextInput {

  return {

    ...base,

    ...updates,

    device: {
      ...(base.device ?? {}),
      ...(updates.device ?? {})
    },

    screen: {
      ...(base.screen ?? {}),
      ...(updates.screen ?? {})
    },

    memory: {
      ...(base.memory ?? {}),
      ...(updates.memory ?? {})
    },

    permissions: {
      ...(base.permissions ?? {}),
      ...(updates.permissions ?? {})
    },

    extras: {
      ...(base.extras ?? {}),
      ...(updates.extras ?? {})
    }

  };

}


/**
 * Build Final Context Prompt
 */
export function createContextPrompt(
  context: AIContextInput
): string {

  const normalized =
    normalizeContext(context);

  if (!validateContext(normalized)) {
    return "";
  }

  return buildCompleteContext(
    normalized
  );

}


/**
 * Empty Context
 */
export const EMPTY_CONTEXT: AIContextInput = {

  language: "auto",

  location: "Unknown",

  timezone: "Auto",

  device: {},

  screen: {},

  memory: {},

  permissions: {},

  extras: {}

};


/**
 * Default Export
 */
export default createContextPrompt;
