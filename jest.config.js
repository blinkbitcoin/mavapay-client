module.exports = {
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePaths: ["<rootDir>/__tests__"],
  testPathIgnorePatterns: ["/node_modules/"],
  fakeTimers: {
    enableGlobally: true,
  },
}
