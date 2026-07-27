export class OverlayService {
  private visible = false;

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  getStatus(): string {
    return this.visible ? "Visible" : "Hidden";
  }
}
