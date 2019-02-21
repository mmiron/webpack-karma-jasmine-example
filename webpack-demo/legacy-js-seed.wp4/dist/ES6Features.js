/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ES6Features": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/ES6Features/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ES6Features/index.js":
/*!**********************************!*\
  !*** ./src/ES6Features/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return foo; });
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(generator);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var str = "Hello world, welcome to the universe.";
var n = str.includes("world");
console.log("n", n);
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('foo');
  }, 300);
});
promise1.then(function (value) {
  console.log(value); // expected output: "foo"
});
console.log(promise1); // expected output: [object Promise]

var materials = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium'];
console.log(materials.map(function (material) {
  return material.length;
})); // expected output: Array [8, 6, 7, 9]

function sum() {
  for (var _len = arguments.length, theArgs = new Array(_len), _key = 0; _key < _len; _key++) {
    theArgs[_key] = arguments[_key];
  }

  return theArgs.reduce(function (previous, current) {
    return previous + current;
  });
}

console.log(sum(1, 2, 3)); // expected output: 6

console.log(sum(1, 2, 3, 4)); // expected output: 10

var numbers = [1, 2, 3];
console.log(sum.apply(void 0, numbers)); // expected output: 6

console.log(sum.apply(null, numbers)); // expected output: 6

var list = [8, 3, 11, 9, 6],
    length = list.length,
    i;

for (i = 0; i < length; i++) {
  console.log(list[i]);
}

list.forEach(function (value, i) {
  console.log(value);
});

for (var _i = 0; _i < list.length; _i++) {
  var value = list[_i];
  console.log(value);
}

var a, b, rest;
a = 10;
b = 20;
console.log(a); // expected output: 10

console.log(b); // expected output: 20

a = 10;
b = 20;
rest = [30, 40, 50];
console.log(rest); // expected output: [30,40,50]

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var s;
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return bar();

          case 2:
            s = _context2.sent;
            console.log(s);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  }));
  return _foo.apply(this, arguments);
}

function bar() {
  return "bar";
}

new foo();

function generator(i) {
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return i;

        case 2:
          _context.next = 4;
          return i + 10;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var gen = generator(10);
console.log(gen.next().value); // expected output: 10

console.log(gen.next().value); // expected output: 20
// create a TypedArray with a size in bytes

var typedArray1 = new Int8Array(8);
typedArray1[0] = 32;
var typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;
console.log(typedArray1); // expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2); // expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]

var myMap = new Map();

var keyString = 'a string',
    keyObj = {},
    keyFunc = function keyFunc() {}; // setting the values


myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, 'value associated with keyObj');
myMap.set(keyFunc, 'value associated with keyFunc');
myMap.size; // 3
// getting the values

myMap.get(keyString); // "value associated with 'a string'"

myMap.get(keyObj); // "value associated with keyObj"

myMap.get(keyFunc); // "value associated with keyFunc"

myMap.get('a string'); // "value associated with 'a string'"
// because keyString === 'a string'

myMap.get({}); // undefined, because keyObj !== {}

myMap.get(function () {}); // undefined, because keyFunc !== function () {}

var wm1 = new WeakMap(),
    wm2 = new WeakMap(),
    wm3 = new WeakMap();

var o1 = {},
    o2 = function o2() {},
    o3 = window;

wm1.set(o1, 37);
wm1.set(o2, 'azerty');
wm2.set(o1, o2); // a value can be anything, including an object or a function

wm2.set(o3, undefined);
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

wm1.get(o2); // "azerty"

wm2.get(o2); // undefined, because there is no key for o2 on wm2

wm2.get(o3); // undefined, because that is the set value

wm1.has(o2); // true

wm2.has(o2); // false

wm2.has(o3); // true (even if the value itself is 'undefined')

wm3.set(o1, 37);
wm3.get(o1); // 37

wm1.has(o1); // true

wm1.delete(o1);
wm1.has(o1); // false

var target = {
  foo: 'bar',
  baz: 'wat'
};
Reflect.deleteProperty(target, 'foo');
console.log(target);
var symbol1 = Symbol();
var symbol3 = Symbol('foo');
console.log(_typeof(symbol1)); // expected output: "symbol"

console.log(symbol3.toString()); // expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo')); // expected output: false

/***/ })

/******/ });
//# sourceMappingURL=ES6Features.js.map