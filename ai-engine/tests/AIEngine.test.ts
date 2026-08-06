/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: AIEngine.test.ts
 * -------------------------------------------------------------
 */

import AIEngineManager
  from "../services/AIEngineManager";

describe("AIEngineManager", () => {

  beforeEach(async () => {

    await AIEngineManager.initialize();

  });

  afterEach(() => {

    AIEngineManager.shutdown();

  });

  test(
    "should initialize successfully",
    () => {

      expect(
        AIEngineManager.isInitialized()
      ).toBe(true);

    }
  );

  test(
    "should report ready status",
    () => {

      expect(
        typeof AIEngineManager.isReady()
      ).toBe("boolean");

    }
  );

  test(
    "should shutdown correctly",
    () => {

      AIEngineManager.shutdown();

      expect(
        AIEngineManager.isInitialized()
      ).toBe(false);

    }
  );

  test(
    "should restart correctly",
    async () => {

      await AIEngineManager.restart();

      expect(
        AIEngineManager.isInitialized()
      ).toBe(true);

    }
  );

});
