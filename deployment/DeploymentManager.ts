/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Deployment Module
 * File: DeploymentManager.ts
 * -------------------------------------------------------------
 */

export enum DeploymentStatus {

  IDLE = "IDLE",

  BUILDING = "BUILDING",

  DEPLOYING = "DEPLOYING",

  SUCCESS = "SUCCESS",

  FAILED = "FAILED"

}

export interface Deployment {

  id: string;

  version: string;

  platform: string;

  status: DeploymentStatus;

  startedAt: number;

  finishedAt?: number;

}

export class DeploymentManager {

  private deployments =
    new Map<string, Deployment>();

  /**
   * Create Deployment
   */
  public create(
    deployment: Deployment
  ): void {

    this.deployments.set(
      deployment.id,
      deployment
    );

  }

  /**
   * Update Status
   */
  public updateStatus(
    id: string,
    status: DeploymentStatus
  ): boolean {

    const deployment =
      this.deployments.get(id);

    if (!deployment) {

      return false;

    }

    deployment.status = status;

    if (

      status ===
        DeploymentStatus.SUCCESS ||

      status ===
        DeploymentStatus.FAILED

    ) {

      deployment.finishedAt =
        Date.now();

    }

    return true;

  }

  /**
   * Get Deployment
   */
  public get(
    id: string
  ): Deployment | undefined {

    return this.deployments.get(id);

  }

  /**
   * Get All Deployments
   */
  public getAll():
    Deployment[] {

    return Array.from(
      this.deployments.values()
    );

  }

  /**
   * Remove Deployment
   */
  public remove(
    id: string
  ): boolean {

    return this.deployments.delete(
      id
    );

  }

  /**
   * Count Deployments
   */
  public count():
    number {

    return this.deployments.size;

  }

  /**
   * Clear
   */
  public clear():
    void {

    this.deployments.clear();

  }

}

const deploymentManager =
  new DeploymentManager();

export default deploymentManager;
