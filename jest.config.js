/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Jest Configuration
 * File: jest.config.js
 * -------------------------------------------------------------
 */

module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: [
    "<rootDir>/ai-engine/tests"
  ],

  testMatch: [
    "**/*.test.ts"
  ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json"
      }
    ]
  },

  clearMocks: true,

  collectCoverage: false
};
