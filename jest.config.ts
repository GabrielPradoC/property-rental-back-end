import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  // rootDir: '__tests__',
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,ts}",
    "!./src/**/*.{module,entity,guard,strategy}.{js,ts}",
    "!./src/{migrations,declarations}/**/*",
    "!./src/**/index.{ts,js}",
    "!./src/main.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
  },
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  roots: ['__tests__', 'src']
}

export default config;