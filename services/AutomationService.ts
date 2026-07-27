export interface AutomationTask {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  lastRun?: number;
  createdAt: number;
}

export class AutomationService {
  private tasks: AutomationTask[] = [];

  async initialize(): Promise<void> {
    console.log("AutomationService initialized");
  }

  createTask(
    name: string,
    description: string
  ): AutomationTask {
    const task: AutomationTask = {
      id: Date.now().toString(),
      name,
      description,
      enabled: true,
      createdAt: Date.now(),
    };

    this.tasks.push(task);
    return task;
  }

  getTasks(): AutomationTask[] {
    return [...this.tasks];
  }

  getTask(id: string): AutomationTask | null {
    return this.tasks.find(task => task.id === id) ?? null;
  }

  enableTask(id: string): boolean {
    const task = this.getTask(id);

    if (!task) {
      return false;
    }

    task.enabled = true;
    return true;
  }

  disableTask(id: string): boolean {
    const task = this.getTask(id);

    if (!task) {
      return false;
    }

    task.enabled = false;
    return true;
  }

  runTask(id: string): boolean {
    const task = this.getTask(id);

    if (!task || !task.enabled) {
      return false;
    }

    task.lastRun = Date.now();
    console.log(`Running automation task: ${task.name}`);
    return true;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }

  clearTasks(): void {
    this.tasks = [];
  }

  getTaskCount(): number {
    return this.tasks.length;
  }
}

export default new AutomationService();
