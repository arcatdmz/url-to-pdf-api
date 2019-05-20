/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  ALLOW_HTTP: process.env.ALLOW_HTTP === 'true',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  API_TOKENS: [],
  PUBLIC_DIR: process.env.PUBLIC_DIR,
  FILES: process.env.FILES,
  OUT_DIR: process.env.OUT_DIR,
  FLATTEN_OUT_PATHS: process.env.FLATTEN_OUT_PATHS === 'true',
  EXTRA_PARAMS: process.env.EXTRA_PARAMS,
};

if (process.env.API_TOKENS) {
  config.API_TOKENS = process.env.API_TOKENS.split(',');
}

module.exports = config;
