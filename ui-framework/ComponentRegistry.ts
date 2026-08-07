/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * File: ComponentRegistry.ts
 * -------------------------------------------------------------
 */

export interface UIComponent {

  id: string;

  name: string;

  version: string;

  enabled: boolean;

  createdAt: number;

  metadata?: Record<
    string,
    unknown
  >;

}

export class ComponentRegistry {

  private components =
    new Map<
      string,
      UIComponent
    >();

  /**
   * Register Component
   */
  public register(
    component: UIComponent
  ): void {

    this.components.set(
      component.id,
      component
    );

  }

  /**
   * Unregister Component
   */
  public unregister(
    id: string
  ): boolean {

    return this.components.delete(
      id
    );

  }

  /**
   * Get Component
   */
  public get(
    id: string
  ): UIComponent | undefined {

    return this.components.get(id);

  }

  /**
   * Get All Components
   */
  public getAll():
    UIComponent[] {

    return Array.from(
      this.components.values()
    );

  }

  /**
   * Enable Component
   */
  public enable(
    id: string
  ): boolean {

    const component =
      this.components.get(id);

    if (!component) {

      return false;

    }

    component.enabled = true;

    return true;

  }

  /**
   * Disable Component
   */
  public disable(
    id: string
  ): boolean {

    const component =
      this.components.get(id);

    if (!component) {

      return false;

    }

    component.enabled = false;

    return true;

  }

  /**
   * Check Registration
   */
  public has(
    id: string
  ): boolean {

    return this.components.has(id);

  }

  /**
   * Total Components
   */
  public count():
    number {

    return this.components.size;

  }

  /**
   * Clear Registry
   */
  public clear():
    void {

    this.components.clear();

  }

}

const componentRegistry =
  new ComponentRegistry();

export default componentRegistry;
