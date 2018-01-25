const dotenv = require('dotenv');
const getenv = require('getenv');

function getFromFile(env = 'test') {
  const { parsed } = dotenv.load({ path: `variables-${env}.env` });
  return parsed;
}

module.exports = {
  get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  },

  get isProduction() {
    return this.NODE_ENV === 'production';
  },

  has(key) {
    return Object.prototype.hasOwnProperty.call(process.env, key);
  },

  get: getenv,

  unset(key) {
    delete process.env[key];
  },

  load(env, { force = true } = {}) {
    const config = getFromFile(env);

    Object.entries(config).forEach(([key, value]) => {
      if (force || !this.has(key)) process.env[key] = value;
    });
  },

  define(env, path = 'process.env') {
    const config = getFromFile(env);
    const result = Object.create(null);
    Object.entries(config).forEach(([key, value]) => {
      result[`${path}.${key}`] = JSON.stringify(value);
    });
  },
};
