export class CameraService {
  private enabled = false;

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getStatus(): string {
    return this.enabled ? "Enabled" : "Disabled";
  }
}
