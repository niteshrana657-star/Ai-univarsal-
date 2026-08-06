/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: Utils.test.ts
 * -------------------------------------------------------------
 */

import TokenCounter
  from "../utils/TokenCounter";

import PromptFormatter
  from "../utils/PromptFormatter";

import ResponseParser
  from "../utils/ResponseParser";

import AIValidator
  from "../utils/AIValidator";

describe("AI Engine Utils", () => {

  test(
    "TokenCounter should estimate tokens",
    () => {

      expect(
        TokenCounter.estimate(
          "Hello World"
        )
      ).toBeGreaterThan(0);

    }
  );

  test(
    "PromptFormatter should trim prompt",
    () => {

      expect(
        PromptFormatter.format(
          "  Hello AI  "
        )
      ).toBe("Hello AI");

    }
  );

  test(
    "ResponseParser should parse string",
    () => {

      const result =
        ResponseParser.parse(
          "Hello"
        );

      expect(
        result.success
      ).toBe(true);

      expect(
        result.text
      ).toBe("Hello");

    }
  );

  test(
    "AIValidator should validate request",
    () => {

      expect(
        AIValidator.validateRequest({

          prompt: "Hello AI"

        } as any)
      ).toBe(true);

    }
  );

  test(
    "AIValidator should validate api key",
    () => {

      expect(
        AIValidator.validateApiKey(
          "abcdefghijklmnopqrstuvwxyz"
        )
      ).toBe(true);

    }
  );

});
