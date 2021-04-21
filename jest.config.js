module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: ["/node_modules/", "/dist/"],
  roots: ["./app"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "./tsconfig.json"
    },
  },
};
