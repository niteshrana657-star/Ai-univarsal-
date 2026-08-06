/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: Runtime.test.ts
 * -------------------------------------------------------------
 */

import RuntimeEngine
  from "../runtime/RuntimeEngine";

describe("RuntimeEngine", () => {

  beforeEach(() => {

    RuntimeEngine.stop();

  });

  afterEach(() => {

    RuntimeEngine.stop();

  });

  test(
    "should start runtime",
    () => {

      RuntimeEngine.start();

      expect(
        RuntimeEngine.isRunning()
      ).toBe(true);

    }
  );

  test(
    "should stop runtime",
    () => {

      RuntimeEngine.start();

      RuntimeEngine.stop();

      expect(
        RuntimeEngine.isRunning()
      ).toBe(false);

    }
  );

  test(
    "should restart runtime",
    () => {

      RuntimeEngine.start();

      RuntimeEngine.restart();

      expect(
        RuntimeEngine.isRunning()
      ).toBe(true);

    }
  );

  test(
    "should return current model",
    () => {

      expect(
        RuntimeEngine.getCurrentModel()
      ).toBeDefined();

    }
  );

  test(
    "should report runtime status",
    () => {

      expect(
        typeof RuntimeEngine.isRunning()
      ).toBe("boolean");

    }
  );

});
