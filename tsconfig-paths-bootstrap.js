/* eslint-disable @typescript-eslint/no-var-requires */
//@es
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist';
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});