import { PermissionManager } from "./PermissionManager";
import { PermissionStorage } from "./PermissionStorage";

export class PermissionService {
  private manager = new PermissionManager();

  grantPermission(permissionId: string): void {
    this.manager.updatePermission(permissionId, true);
    PermissionStorage.save(permissionId, true);
  }

  denyPermission(permissionId: string): void {
    this.manager.updatePermission(permissionId, false);
    PermissionStorage.save(permissionId, false);
  }

  isPermissionGranted(permissionId: string): boolean {
    return PermissionStorage.get(permissionId);
  }
}
