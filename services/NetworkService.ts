export interface NetworkStatus {
  isConnected: boolean;
  connectionType: "wifi" | "mobile" | "ethernet" | "unknown";
  lastUpdated: number;
}

export class NetworkService {
  private status: NetworkStatus = {
    isConnected: false,
    connectionType: "unknown",
    lastUpdated: Date.now(),
  };

  async initialize(): Promise<void> {
    console.log("NetworkService initialized");
  }

  updateStatus(
    connected: boolean,
    type: NetworkStatus["connectionType"] = "unknown"
  ): void {
    this.status = {
      isConnected: connected,
      connectionType: type,
      lastUpdated: Date.now(),
    };
  }

  isConnected(): boolean {
    return this.status.isConnected;
  }

  getConnectionType(): string {
    return this.status.connectionType;
  }

  getStatus(): NetworkStatus {
    return { ...this.status };
  }

  async waitForConnection(
    timeout: number = 10000
  ): Promise<boolean> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (this.status.isConnected) {
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return false;
  }

  reset(): void {
    this.status = {
      isConnected: false,
      connectionType: "unknown",
      lastUpdated: Date.now(),
    };
  }
}

export default new NetworkService();
