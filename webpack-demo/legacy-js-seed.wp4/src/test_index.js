// test_index.js
var testsContext = require.context(".", true, /spec.js$/);
testsContext.keys().forEach(testsContext);