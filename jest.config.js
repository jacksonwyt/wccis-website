// jest.config.js
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // adjust if using different alias
    },
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  };
  