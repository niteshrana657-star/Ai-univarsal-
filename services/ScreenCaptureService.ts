export class ScreenCaptureService {
  private capturing = false;

  startCapture(): void {
    this.capturing = true;
  }

  stopCapture(): void {
    this.capturing = false;
  }

  isCapturing(): boolean {
    return this.capturing;
  }

  getStatus(): string {
    return this.capturing ? "Capturing" : "Stopped";
  }
}
