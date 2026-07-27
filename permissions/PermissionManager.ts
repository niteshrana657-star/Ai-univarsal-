export interface PermissionState {
  name: string;
  granted: boolean;
}

export class PermissionManager {
  private permissions: PermissionState[] = [];

  constructor() {
    this.permissions = [];
  }

  getPermissions(): PermissionState[] {
    return this.permissions;
  }

  updatePermission(name: string, granted: boolean): void {
    const index = this.permissions.findIndex(
      (permission) => permission.name === name
    );

    if (index >= 0) {
      this.permissions[index].granted = granted;
    } else {
      this.permissions.push({
        name,
        granted,
      });
    }
  }

  isGranted(name: string): boolean {
    return (
      this.permissions.find(
        (permission) => permission.name === name
      )?.granted ?? false
    );
  }
}
