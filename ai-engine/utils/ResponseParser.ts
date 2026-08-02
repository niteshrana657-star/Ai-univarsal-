/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: ResponseParser.ts
 * -------------------------------------------------------------
 */

export interface ParsedResponse {

  text: string;

  success: boolean;

  metadata: Record<string, unknown>;

  timestamp: number;

}

export class ResponseParser {

  /**
   * Parse AI Response
   */
  public parse(
    response: unknown
  ): ParsedResponse {

    if (
      response === null ||
      response === undefined
    ) {

      return {

        text: "",

        success: false,

        metadata: {},

        timestamp: Date.now()

      };

    }

    if (
      typeof response === "string"
    ) {

      return {

        text: response,

        success: true,

        metadata: {},

        timestamp: Date.now()

      };

    }

    if (
      typeof response === "object"
    ) {

      const data =
        response as Record<
          string,
          unknown
        >;

      return {

        text:
          typeof data.text === "string"
            ? data.text
            : "",

        success:
          typeof data.success === "boolean"
            ? data.success
            : true,

        metadata:
          typeof data.metadata === "object" &&
          data.metadata !== null
            ? (data.metadata as Record<string, unknown>)
            : {},

        timestamp:
          typeof data.timestamp === "number"
            ? data.timestamp
            : Date.now()

      };

    }

    return {

      text: String(response),

      success: true,

      metadata: {},

      timestamp: Date.now()

    };

  }

  /**
   * Convert Response To JSON
   */
  public toJSON(
    response: ParsedResponse
  ): string {

    return JSON.stringify(
      response,
      null,
      2
    );

  }

  /**
   * Check Valid Response
   */
  public isValid(
    response: ParsedResponse
  ): boolean {

    return response.success;

  }

  /**
   * Extract Text
   */
  public getText(
    response: ParsedResponse
  ): string {

    return response.text;

  }

  /**
   * Reset Parser
   */
  public reset(): void {

    // Reserved for future implementation

  }

}

const responseParser =
  new ResponseParser();

export default responseParser;
