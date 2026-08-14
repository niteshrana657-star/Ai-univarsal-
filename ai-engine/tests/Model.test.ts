/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: Model.test.ts
 * -------------------------------------------------------------
 */

import ModelManager
  from "../Models/ModelManager";

import {
  createAIModel
} from "../Models/AIModel";

describe("ModelManager", () => {

  beforeEach(() => {

    ModelManager.reset();

  });

  afterEach(() => {

    ModelManager.reset();

  });

  test(
    "should register model",
    () => {

      const model =
        createAIModel({

          id: "test-model",

          name: "Test Model",

          provider: "CUSTOM",

          version: "1.0.0",

          description:
            "Unit Test Model",

          enabled: true,

          priority: 1

        });

      ModelManager.register(
        model
      );

      expect(
        ModelManager.getModels()
          .length
      ).toBe(1);

    }
  );

  test(
    "should set active model",
    () => {

      const model =
        createAIModel({

          id: "active-model",

          name: "Active",

          provider: "CUSTOM",

          version: "1.0.0",

          description: "Test",

          enabled: true,

          priority: 1

        });

      ModelManager.register(
        model
      );

      expect(
        ModelManager.setActiveModel(
          model.id
        )
      ).toBe(true);

    }
  );

  test(
    "should return active model",
    () => {

      expect(
        ModelManager.getActiveModel()
      ).toBeNull();

    }
  );

  test(
    "should remove model",
    () => {

      const model =
        createAIModel({

          id: "remove-model",

          name: "Remove",

          provider: "CUSTOM",

          version: "1.0.0",

          description: "Remove",

          enabled: true,

          priority: 1

        });

      ModelManager.register(
        model
      );

      expect(
        ModelManager.removeModel(
          model.id
        )
      ).toBe(true);

    }
  );

});
