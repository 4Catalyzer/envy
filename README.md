# @4c/env

```js
import * as Env from '@4c/env'

Env.get('NODE_ENV') // 'production'

Env.get('NOT_SET_VAR') // Error
Env.get('NOT_SET_VAR', 'default_value') // 'default_value'

Env.load('test') // adds variables-test.env to process.env

Env.define('test') // returns variables-test.env mapped to an object keyed by process.env.[foo] for use in webpack
```
