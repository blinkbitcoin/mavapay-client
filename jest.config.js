module.exports = {
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePaths: ["<rootDir>/__tests__"],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  fakeTimers: {
    enableGlobally: true,
  },
}
