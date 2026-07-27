export interface AnalyticsEvent {
  id: string;
  name: string;
  category: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

export class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private enabled = true;
  private maxEvents = 1000;

  async initialize(): Promise<void> {
    console.log("AnalyticsService initialized");
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  trackEvent(
    name: string,
    category: string,
    data?: Record<string, unknown>
  ): void {
    if (!this.enabled) {
      return;
    }

    const event: AnalyticsEvent = {
      id: Date.now().toString(),
      name,
      category,
      data,
      timestamp: Date.now(),
    };

    this.events.unshift(event);

    if (this.events.length > this.maxEvents) {
      this.events.pop();
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getEventsByCategory(category: string): AnalyticsEvent[] {
    return this.events.filter(
      event => event.category === category
    );
  }

  getEventCount(): number {
    return this.events.length;
  }

  clearEvents(): void {
    this.events = [];
  }

  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  getLatestEvent(): AnalyticsEvent | null {
    return this.events.length > 0
      ? this.events[0]
      : null;
  }
}

export default new AnalyticsService();
