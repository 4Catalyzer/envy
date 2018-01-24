# @4c/envy

```js
import * as Envy from '@4c/envy`

Envy.get('NODE_ENV') // 'production'

Envy.get('NOT_SET_VAR') // Error
Envy.get('NOT_SET_VAR', 'default_value') // 'default_value'

Envy.load('test') // adds variables-test.env to process.env

Envy.define('test') // returns variables-test.env mapped to an object keyed by process.env.[foo] for use in webpack
```
