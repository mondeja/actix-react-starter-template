module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token that Jest substitutes
  roots: ["<rootDir>/src"],

  // Jest transformations
  // Adds support for TypeScript using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Test spec file resolution pattern
  testRegex: "test.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // https://jestjs.io/docs/configuration#testenvironment-string
  testEnvironment: "jsdom",
};
