import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  globalSetup: './.jest/setup.ts',
  setupFilesAfterEnv: ['./.jest/setupFilesAfterEnv.ts'],
  // globalTeardown: './.jest/teardown.js',
  // testEnvironment: './.jest/environment.js',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: ['./.jest/setEnvVars.js'],
  globals: {
    localPath: 'global.localPath',
  },
};
console.log('jest.config.ts');
console.log(config);
export default config;
