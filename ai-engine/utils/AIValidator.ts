/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIValidator.ts
 * -------------------------------------------------------------
 */

import {
  AIRequest,
  AIResponse
} from "../providers/AIProvider";

export class AIValidator {

  /**
   * Validate AI Request
   */
  public validateRequest(
    request: AIRequest
  ): boolean {

    if (!request) {
      return false;
    }

    if (
      typeof request.prompt !== "string"
    ) {
      return false;
    }

    if (
      request.prompt.trim().length === 0
    ) {
      return false;
    }

    return true;

  }

  /**
   * Validate AI Response
   */
  public validateResponse(
    response: AIResponse
  ): boolean {

    if (!response) {
      return false;
    }

    if (
      typeof response.success !== "boolean"
    ) {
      return false;
    }

    if (
      typeof response.timestamp !== "number"
    ) {
      return false;
    }

    return true;

  }

  /**
   * Validate API Key
   */
  public validateApiKey(
    apiKey: string
  ): boolean {

    return (
      typeof apiKey === "string" &&
      apiKey.trim().length > 10
    );

  }

  /**
   * Validate Model Name
   */
  public validateModel(
    model: string
  ): boolean {

    return (
      typeof model === "string" &&
      model.trim().length > 0
    );

  }

  /**
   * Validate Provider Name
   */
  public validateProvider(
    provider: string
  ): boolean {

    return (
      typeof provider === "string" &&
      provider.trim().length > 0
    );

  }

  /**
   * Validate Token Limit
   */
  public validateTokenLimit(
    limit: number
  ): boolean {

    return (
      Number.isInteger(limit) &&
      limit > 0
    );

  }

  /**
   * Validate Temperature
   */
  public validateTemperature(
    temperature: number
  ): boolean {

    return (
      temperature >= 0 &&
      temperature <= 2
    );

  }

  /**
   * Validate Max Tokens
   */
  public validateMaxTokens(
    tokens: number
  ): boolean {

    return (
      Number.isInteger(tokens) &&
      tokens > 0
    );

  }

  /**
   * Generic Validation
   */
  public isValid(): boolean {

    return true;

  }

}

const aiValidator =
  new AIValidator();

export default aiValidator;
