module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: ["/node_modules/", "/dist/"],
  roots: ["./app"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "./tsconfig.json",
    },
  },
  setupFiles: ["./app/__tests__/setup.ts"],
  globalSetup: "./app/__tests__/setup.ts",
  globalTeardown: "./app/__tests__/teardown.ts",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "<rootDir>/app/__tests__/setup.ts",
    "<rootDir>/app/__tests__/teardown.ts",
  ],
};
