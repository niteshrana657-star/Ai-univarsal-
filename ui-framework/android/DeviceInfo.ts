/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Android Native Module
 * File: DeviceInfo.ts
 * -------------------------------------------------------------
 */

export interface DeviceInformation {

  manufacturer: string;

  brand: string;

  model: string;

  device: string;

  product: string;

  hardware: string;

  androidVersion: string;

  sdkVersion: number;

  securityPatch: string;

  fingerprint: string;

}

export class DeviceInfo {

  private info:
    DeviceInformation = {

    manufacturer: "Unknown",

    brand: "Unknown",

    model: "Unknown",

    device: "Unknown",

    product: "Unknown",

    hardware: "Unknown",

    androidVersion: "Unknown",

    sdkVersion: 0,

    securityPatch: "Unknown",

    fingerprint: "Unknown"

  };

  /**
   * Update Device Information
   */
  public update(
    data: Partial<DeviceInformation>
  ): DeviceInformation {

    this.info = {

      ...this.info,

      ...data

    };

    return this.get();

  }

  /**
   * Get Device Information
   */
  public get():
    DeviceInformation {

    return {

      ...this.info

    };

  }

  /**
   * Android Version
   */
  public getAndroidVersion():
    string {

    return this.info.androidVersion;

  }

  /**
   * SDK Version
   */
  public getSdkVersion():
    number {

    return this.info.sdkVersion;

  }

  /**
   * Reset
   */
  public reset():
    void {

    this.info = {

      manufacturer: "Unknown",

      brand: "Unknown",

      model: "Unknown",

      device: "Unknown",

      product: "Unknown",

      hardware: "Unknown",

      androidVersion: "Unknown",

      sdkVersion: 0,

      securityPatch: "Unknown",

      fingerprint: "Unknown"

    };

  }

}

const deviceInfo =
  new DeviceInfo();

export default deviceInfo;
