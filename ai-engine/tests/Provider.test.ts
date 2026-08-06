/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: Provider.test.ts
 * -------------------------------------------------------------
 */

import ProviderManager
  from "../providers/ProviderManager";

describe("ProviderManager", () => {

  beforeEach(() => {

    ProviderManager.clear();

  });

  afterEach(() => {

    ProviderManager.clear();

  });

  test(
    "should start with no providers",
    () => {

      expect(
        ProviderManager.getAll().length
      ).toBe(0);

    }
  );

  test(
    "should have no active provider",
    () => {

      expect(
        ProviderManager.getActive()
      ).toBeNull();

    }
  );

  test(
    "should clear providers",
    () => {

      ProviderManager.clear();

      expect(
        ProviderManager.getAll().length
      ).toBe(0);

    }
  );

  test(
    "should return provider count",
    () => {

      expect(
        typeof ProviderManager.count()
      ).toBe("number");

    }
  );

});
