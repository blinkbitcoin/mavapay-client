module.exports = {
  roots: ["<rootDir>/__TEST__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePaths: ["<rootDir>/__TEST__"],
  testPathIgnorePatterns: ["/node_modules/"],
  fakeTimers: {
    enableGlobally: true,
  },
}
