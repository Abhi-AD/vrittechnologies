import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@test/(.*)": "<rootDir>/src/test/$1",
    "@types/(.*)": "<rootDir>/src/type/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
