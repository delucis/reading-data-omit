# @delucis/reading-data-omit

[![Build Status](https://travis-ci.org/delucis/reading-data-omit.svg?branch=master)](https://travis-ci.org/delucis/reading-data-omit)
[![Coverage Status](https://coveralls.io/repos/github/delucis/reading-data-omit/badge.svg?branch=master)](https://coveralls.io/github/delucis/reading-data-omit?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/@delucis/reading-data-omit.svg)](https://www.npmjs.com/package/@delucis/reading-data-omit)

A plugin for [`@delucis/reading-data`](https://github.com/delucis/reading-data)
that allows easy use of [`lodash.omit`][592bfd42].

  [592bfd42]: https://www.npmjs.com/package/lodash.omit "lodas.omit NPM package"


## Installation

```sh
npm install --save @delucis/reading-data-omit
```


## Usage

```js
const RD = require('@delucis/reading-data')
const OMIT = require('@delucis/reading-data-omit')

RD.preloadData({
  myArticle: {
    text: 'This is a short article that is well worth reading.',
    meta: 'This is some superfluous metadata we’d rather not include'
  }
})

RD.use(OMIT, {
  scope: 'myArticle',
  omit: 'meta'
})

RD.run().then((res) => {
  console.log(res.data.myArticle)
  // logs: { text: 'This is a short article that is well worth reading.' }
})
```


## Options

name        | type               | default       | description
------------|--------------------|---------------|------------------------------
`hooks`     | `String`, `Object` | `'process'`   | The `reading-data` hook that should load the YAML file. Can be scoped by passing an object with scopes as keys, hooks as values.
`omit`      | `String`, `Array`  |               | The property/properties to be omitted from the original data.
`scope`     | `String`, `Array`  | `'textStats'` | The scope under which `reading-data` will store this plugin’s data. Can be an array to return multiple filepaths/URLs, to multiple scopes.
