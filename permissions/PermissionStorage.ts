export class PermissionStorage {
  private static storage: Record<string, boolean> = {};

  static save(permissionId: string, granted: boolean): void {
    this.storage[permissionId] = granted;
  }

  static get(permissionId: string): boolean {
    return this.storage[permissionId] ?? false;
  }

  static getAll(): Record<string, boolean> {
    return { ...this.storage };
  }

  static clear(): void {
    this.storage = {};
  }
}
