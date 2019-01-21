# @4c/env

A small set of utils for working with environment variables in node and webpack projects. Wraps the excellent [`getEnv`](https://github.com/ctavan/node-getenv/blob/master/README.md) as well

## Usage

```js
import * as Env from '@4c/env';
```

### Getting and parsing variables

`env` wraps and reexports [`getEnv`](https://github.com/ctavan/node-getenv/blob/master/README.md) as `get()`.

```js
Env.get('NODE_ENV'); // 'production'

// Fails hard on missing variables
Env.get('NOT_SET_VAR'); // Error

// Fall back to a default if needed
Env.get('NOT_SET_VAR', 'default_value'); // 'default_value'

// Parsing
Env.get.int('MAX_SUBSCRIPTIONS', 4);

process.env.BOOLISH = 1;
Env.get.boolish('BOOLISH'); // true
```

### Loading `.env` files

`env` will load and parse `.env` files, by environment. We use the naming convention `variables-{ENV}.env` to split out variables by different environment. The default is `dev`.

```js
Env.load(); // adds variables-dev.env to process.env
Env.load('test'); // adds variables-test.env to process.env
```

There is also a utility for passing enviroment variables to webpack's `DefinePlugin` allowing instances of `process.env.FOO` in front-end code to be replaced with a specific compile-time value.

```js
// returns variables-test.env mapped to an object keyed by process.env.[foo] for use in webpack
new webpack.DefinePlugin(Env.define('test'));
```
