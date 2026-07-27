export function getPermissionLabel(permissionId: string): string {
  const labels: Record<string, string> = {
    accessibility: "Accessibility Service",
    screen_capture: "Screen Capture",
    overlay: "Overlay Permission",
    notification: "Notification Access",
    microphone: "Microphone",
    camera: "Camera",
    storage: "Storage",
  };

  return labels[permissionId] || permissionId;
}

export function isPermissionValid(permissionId: string): boolean {
  return permissionId.trim().length > 0;
}
