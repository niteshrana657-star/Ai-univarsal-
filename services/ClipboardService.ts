export interface ClipboardData {
  text: string;
  timestamp: number;
  source?: string;
}

class ClipboardService {
  private history: ClipboardData[] = [];
  private maxHistory = 50;

  async initialize(): Promise<void> {
    console.log("ClipboardService initialized");
  }

  async getCurrentClipboard(): Promise<string | null> {
    // Native Android implementation will replace this.
    return null;
  }

  async saveClipboard(
    text: string,
    source?: string
  ): Promise<void> {
    if (!text || text.trim().length === 0) {
      return;
    }

    this.history.unshift({
      text,
      timestamp: Date.now(),
      source,
    });

    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
  }

  getHistory(): ClipboardData[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  search(query: string): ClipboardData[] {
    const q = query.toLowerCase();

    return this.history.filter(item =>
      item.text.toLowerCase().includes(q)
    );
  }

  async copyToClipboard(text: string): Promise<boolean> {
    // Placeholder for native clipboard support.
    console.log("Copy requested:", text);
    return true;
  }

  getLatest(): ClipboardData | null {
    return this.history.length > 0
      ? this.history[0]
      : null;
  }
}

export default new ClipboardService();
