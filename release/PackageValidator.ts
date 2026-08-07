/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Release Module
 * File: PackageValidator.ts
 * -------------------------------------------------------------
 */

export interface ValidationIssue {

  code: string;

  message: string;

  severity: "INFO" | "WARNING" | "ERROR";

}

export interface ValidationResult {

  valid: boolean;

  issues: ValidationIssue[];

  checkedAt: number;

}

export class PackageValidator {

  /**
   * Validate Package
   */
  public validate(
    packageName: string,
    version: string,
    files: string[]
  ): ValidationResult {

    const issues: ValidationIssue[] = [];

    if (!packageName.trim()) {

      issues.push({

        code: "PACKAGE_NAME",

        message:
          "Package name is required",

        severity: "ERROR"

      });

    }

    if (!version.trim()) {

      issues.push({

        code: "VERSION",

        message:
          "Version is required",

        severity: "ERROR"

      });

    }

    if (files.length === 0) {

      issues.push({

        code: "FILES",

        message:
          "No package files found",

        severity: "ERROR"

      });

    }

    return {

      valid:
        !issues.some(

          issue =>

            issue.severity ===
            "ERROR"

        ),

      issues,

      checkedAt:
        Date.now()

    };

  }

}

const packageValidator =
  new PackageValidator();

export default packageValidator;
