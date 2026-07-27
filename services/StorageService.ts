export interface StorageItem {
  key: string;
  value: unknown;
  updatedAt: number;
}

export class StorageService {
  private storage = new Map<string, StorageItem>();

  async initialize(): Promise<void> {
    console.log("StorageService initialized");
  }

  async setItem(key: string, value: unknown): Promise<boolean> {
    this.storage.set(key, {
      key,
      value,
      updatedAt: Date.now(),
    });

    return true;
  }

  async getItem<T>(key: string): Promise<T | null> {
    const item = this.storage.get(key);

    if (!item) {
      return null;
    }

    return item.value as T;
  }

  async removeItem(key: string): Promise<boolean> {
    return this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  hasItem(key: string): boolean {
    return this.storage.has(key);
  }

  getKeys(): string[] {
    return Array.from(this.storage.keys());
  }

  size(): number {
    return this.storage.size;
  }

  async exportData(): Promise<StorageItem[]> {
    return Array.from(this.storage.values());
  }

  async importData(data: StorageItem[]): Promise<void> {
    this.storage.clear();

    for (const item of data) {
      this.storage.set(item.key, item);
    }
  }
}

export default new StorageService();
