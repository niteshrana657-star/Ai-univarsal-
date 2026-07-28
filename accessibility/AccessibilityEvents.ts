/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Accessibility Module
 * File: AccessibilityEvents.ts
 * -------------------------------------------------------------
 */

import {
  AccessibilityEvent,
  AccessibilityEventType,
  AccessibilityNodeInfo,
} from "./AccessibilityTypes";

import {
  ACCESSIBILITY_EVENT_CONSTANTS,
} from "./AccessibilityConstants";


/**
 * Create unique event ID
 */
export function createAccessibilityEventId(): string {
  return (
    "access_event_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).substring(2, 10)
  );
}


/**
 * Create Accessibility Event
 */
export function createAccessibilityEvent(
  type: AccessibilityEventType,
  packageName: string,
  className: string,
  data?: {
    text?: string;
    description?: string;
    node?: AccessibilityNodeInfo;
  }
): AccessibilityEvent {

  return {
    id: createAccessibilityEventId(),

    timestamp: Date.now(),

    type,

    packageName,

    className,

    text: data?.text,

    description: data?.description,

    node: data?.node,
  };
}


/**
 * Validate Accessibility Event
 */
export function isValidAccessibilityEvent(
  event: AccessibilityEvent
): boolean {

  if (!event.id) {
    return false;
  }

  if (!event.timestamp) {
    return false;
  }

  if (!event.packageName) {
    return false;
  }

  if (!event.className) {
    return false;
  }

  if (!event.type) {
    return false;
  }

  return true;
}


/**
 * Check Event Size Limits
 */
export function sanitizeAccessibilityEvent(
  event: AccessibilityEvent
): AccessibilityEvent {

  const sanitized = {
    ...event,
  };


  if (
    sanitized.text &&
    sanitized.text.length > 500
  ) {
    sanitized.text =
      sanitized.text.substring(0, 500);
  }


  if (
    sanitized.description &&
    sanitized.description.length > 500
  ) {
    sanitized.description =
      sanitized.description.substring(0, 500);
  }


  return sanitized;
}


/**
 * Event History Manager
 */
export class AccessibilityEventHistory {

  private events: AccessibilityEvent[] = [];


  add(
    event: AccessibilityEvent
  ): void {

    if (!isValidAccessibilityEvent(event)) {
      return;
    }


    this.events.push(
      sanitizeAccessibilityEvent(event)
    );


    if (
      this.events.length >
      ACCESSIBILITY_EVENT_CONSTANTS.MAX_EVENT_HISTORY
    ) {
      this.events.shift();
    }
  }


  getAll(): AccessibilityEvent[] {

    return [
      ...this.events,
    ];
  }


  getLatest():
    AccessibilityEvent | undefined {

    return this.events[
      this.events.length - 1
    ];
  }


  getByType(
    type: AccessibilityEventType
  ): AccessibilityEvent[] {

    return this.events.filter(
      event =>
        event.type === type
    );
  }


  clear(): void {

    this.events = [];
  }


  size(): number {

    return this.events.length;
  }
}


/**
 * Event Filtering
 */
export function shouldProcessAccessibilityEvent(
  event: AccessibilityEvent
): boolean {

  if (!isValidAccessibilityEvent(event)) {
    return false;
  }


  return true;
}
