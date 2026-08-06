/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Network Module
 * File: NetworkSecurity.ts
 * -------------------------------------------------------------
 */

export interface SecurityConfig {

  allowHTTP: boolean;

  allowHTTPS: boolean;

  allowedDomains: string[];

  blockedDomains: string[];

}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {

  allowHTTP: false,

  allowHTTPS: true,

  allowedDomains: [],

  blockedDomains: []

};

export class NetworkSecurity {

  private config: SecurityConfig =
    { ...DEFAULT_SECURITY_CONFIG };

  /**
   * Update Configuration
   */
  public configure(
    config: Partial<SecurityConfig>
  ): void {

    this.config = {

      ...this.config,

      ...config

    };

  }

  /**
   * Validate URL
   */
  public validate(
    url: string
  ): boolean {

    try {

      const parsed =
        new URL(url);

      if (
        parsed.protocol === "http:" &&
        !this.config.allowHTTP
      ) {

        return false;

      }

      if (
        parsed.protocol === "https:" &&
        !this.config.allowHTTPS
      ) {

        return false;

      }

      if (
        this.config.blockedDomains.includes(
          parsed.hostname
        )
      ) {

        return false;

      }

      if (
        this.config.allowedDomains.length >
          0 &&
        !this.config.allowedDomains.includes(
          parsed.hostname
        )
      ) {

        return false;

      }

      return true;

    } catch {

      return false;

    }

  }

  /**
   * Add Allowed Domain
   */
  public allowDomain(
    domain: string
  ): void {

    if (
      !this.config.allowedDomains.includes(
        domain
      )
    ) {

      this.config.allowedDomains.push(
        domain
      );

    }

  }

  /**
   * Block Domain
   */
  public blockDomain(
    domain: string
  ): void {

    if (
      !this.config.blockedDomains.includes(
        domain
      )
    ) {

      this.config.blockedDomains.push(
        domain
      );

    }

  }

  /**
   * Get Configuration
   */
  public getConfiguration():
    SecurityConfig {

    return {

      ...this.config

    };

  }

  /**
   * Reset Configuration
   */
  public reset(): void {

    this.config = {

      ...DEFAULT_SECURITY_CONFIG

    };

  }

}

const networkSecurity =
  new NetworkSecurity();

export default networkSecurity;
