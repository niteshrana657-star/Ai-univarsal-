export interface MemoryRecord {
  id: string;
  category: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

export class MemoryService {
  private memories: MemoryRecord[] = [];
  private maxMemorySize = 1000;

  async initialize(): Promise<void> {
    console.log("MemoryService initialized");
  }

  addMemory(
    category: string,
    content: string,
    tags: string[] = []
  ): MemoryRecord {
    const memory: MemoryRecord = {
      id: Date.now().toString(),
      category,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags,
    };

    this.memories.unshift(memory);

    if (this.memories.length > this.maxMemorySize) {
      this.memories.pop();
    }

    return memory;
  }

  getAllMemories(): MemoryRecord[] {
    return [...this.memories];
  }

  getMemory(id: string): MemoryRecord | null {
    return this.memories.find(item => item.id === id) ?? null;
  }

  updateMemory(id: string, content: string): boolean {
    const memory = this.memories.find(item => item.id === id);

    if (!memory) {
      return false;
    }

    memory.content = content;
    memory.updatedAt = Date.now();

    return true;
  }

  deleteMemory(id: string): boolean {
    const index = this.memories.findIndex(item => item.id === id);

    if (index === -1) {
      return false;
    }

    this.memories.splice(index, 1);
    return true;
  }

  search(keyword: string): MemoryRecord[] {
    const query = keyword.toLowerCase();

    return this.memories.filter(item =>
      item.content.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  getCategory(category: string): MemoryRecord[] {
    return this.memories.filter(
      item => item.category === category
    );
  }

  clearAll(): void {
    this.memories = [];
  }

  getMemoryCount(): number {
    return this.memories.length;
  }
}

export default new MemoryService();
