import dotenv from 'dotenv';
import getenv from 'getenv';

function loadFromFile(env = 'test') {
  const path = `variables-${env.trim()}.env`;
  const { parsed, error } = dotenv.load({ path });

  if (error) {
    const msg = error.message || 'EnvError: could not parse .env file';
    error.message = `${msg}\n\n  attempted path: ${path}\n`;
    throw error;
  }
  return parsed!; // if error is undefined, then parse is defined
}

export default {
  get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  },

  get isProduction() {
    return this.NODE_ENV === 'production';
  },

  has(key: string) {
    return Object.prototype.hasOwnProperty.call(process.env, key);
  },

  get: getenv,

  unset(key: string) {
    delete process.env[key];
  },

  loadFromFile,

  load(env?: string, { force = true } = {}) {
    const config = loadFromFile(env);

    Object.entries(config).forEach(([key, value]) => {
      if (force || !this.has(key)) process.env[key] = value;
    });
  },

  define(env?: string, path = 'process.env') {
    const config = loadFromFile(env) || {};
    const result = Object.create(null);
    Object.entries(config).forEach(([key, value]) => {
      result[`${path}.${key}`] = JSON.stringify(value);
    });
    return result;
  },
};
