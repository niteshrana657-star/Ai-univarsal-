export interface SecurityEvent {
  id: string;
  type: string;
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: number;
}

export class SecurityService {
  private events: SecurityEvent[] = [];
  private locked = false;

  async initialize(): Promise<void> {
    console.log("SecurityService initialized");
  }

  lock(): void {
    this.locked = true;
    this.logEvent(
      "SYSTEM_LOCK",
      "Security lock enabled",
      "HIGH"
    );
  }

  unlock(): void {
    this.locked = false;
    this.logEvent(
      "SYSTEM_UNLOCK",
      "Security lock disabled",
      "MEDIUM"
    );
  }

  isLocked(): boolean {
    return this.locked;
  }

  logEvent(
    type: string,
    message: string,
    severity: SecurityEvent["severity"] = "LOW"
  ): void {
    this.events.unshift({
      id: Date.now().toString(),
      type,
      message,
      severity,
      timestamp: Date.now(),
    });

    if (this.events.length > 500) {
      this.events.pop();
    }
  }

  getEvents(): SecurityEvent[] {
    return [...this.events];
  }

  getEventsBySeverity(
    severity: SecurityEvent["severity"]
  ): SecurityEvent[] {
    return this.events.filter(
      event => event.severity === severity
    );
  }

  clearEvents(): void {
    this.events = [];
  }

  getEventCount(): number {
    return this.events.length;
  }

  getLatestEvent(): SecurityEvent | null {
    return this.events.length > 0
      ? this.events[0]
      : null;
  }
}

export default new SecurityService();
