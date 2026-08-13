import { AIModel } from "../Models/AIModel";

export interface RuntimeStatus {
  running: boolean;
  initialized: boolean;
  currentModel: AIModel | null;
  startedAt: number | null;
  lastUpdated: number;
}

export class RuntimeState {
  private status: RuntimeStatus = {
    running: false,
    initialized: false,
    currentModel: null,
    startedAt: null,
    lastUpdated: Date.now()
  };

  public initialize(): void {
    this.status.initialized = true;
    this.status.lastUpdated = Date.now();
  }

  public start(model: AIModel | null): void {
    this.status.running = true;
    this.status.currentModel = model;
    this.status.startedAt = Date.now();
    this.status.lastUpdated = Date.now();
  }

  public stop(): void {
    this.status.running = false;
    this.status.lastUpdated = Date.now();
  }

  public setCurrentModel(model: AIModel | null): void {
    this.status.currentModel = model;
    this.status.lastUpdated = Date.now();
  }

  public getCurrentModel(): AIModel | null {
    return this.status.currentModel;
  }

  public isRunning(): boolean {
    return this.status.running;
  }

  public isInitialized(): boolean {
    return this.status.initialized;
  }

  public getUptime(): number {
    if (this.status.startedAt === null) {
      return 0;
    }

    return Date.now() - this.status.startedAt;
  }

  public getStatus(): RuntimeStatus {
    return {
      ...this.status
    };
  }

  public reset(): void {
    this.status = {
      running: false,
      initialized: false,
      currentModel: null,
      startedAt: null,
      lastUpdated: Date.now()
    };
  }
}

const runtimeState = new RuntimeState();

export default runtimeState;
