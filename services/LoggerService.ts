export type LogLevel = "INFO" | "WARNING" | "ERROR" | "DEBUG";

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  source?: string;
  timestamp: number;
}

export class LoggerService {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  async initialize(): Promise<void> {
    this.info("LoggerService initialized", "LoggerService");
  }

  private addLog(
    level: LogLevel,
    message: string,
    source?: string
  ): void {
    const entry: LogEntry = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      level,
      message,
      source,
      timestamp: Date.now(),
    };

    this.logs.unshift(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
  }

  info(message: string, source?: string): void {
    this.addLog("INFO", message, source);
  }

  warning(message: string, source?: string): void {
    this.addLog("WARNING", message, source);
  }

  error(message: string, source?: string): void {
    this.addLog("ERROR", message, source);
  }

  debug(message: string, source?: string): void {
    this.addLog("DEBUG", message, source);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLogCount(): number {
    return this.logs.length;
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export default new LoggerService();
