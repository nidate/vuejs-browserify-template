# Project Template for Vue.js and Browserify

## How to use this.

```
git clone [this repository]
rm -fr .git
```

Rename project name in package.json

```
npm install
npm run start # or ./node_modules/.bin/gulp watch
```

Open http://localhost:8080

Write code ./index.js

## Client test

```
./node_modules/.bin/gulp client-test
```

Run test/client/**_test.js code with mocha on PhantomJS.
