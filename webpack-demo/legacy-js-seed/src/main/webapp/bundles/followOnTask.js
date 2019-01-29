(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["followOnTask"],{

/***/ "./node_modules/es6-promise-promise/index.js":
/*!***************************************************!*\
  !*** ./node_modules/es6-promise-promise/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise-promise/node_modules/es6-promise/dist/es6-promise.js").Promise;

/***/ }),

/***/ "./node_modules/es6-promise-promise/node_modules/es6-promise/dist/es6-promise.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/es6-promise-promise/node_modules/es6-promise/dist/es6-promise.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */

(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(undefined, function () {
  'use strict';

  function objectOrFunction(x) {
    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
  }

  function isFunction(x) {
    return typeof x === 'function';
  }

  var _isArray = undefined;
  if (!Array.isArray) {
    _isArray = function _isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
  }

  var isArray = _isArray;

  var len = 0;
  var vertxNext = undefined;
  var customSchedulerFn = undefined;

  var asap = function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 2, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      if (customSchedulerFn) {
        customSchedulerFn(flush);
      } else {
        scheduleFlush();
      }
    }
  };

  function setScheduler(scheduleFn) {
    customSchedulerFn = scheduleFn;
  }

  function setAsap(asapFn) {
    asap = asapFn;
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // see https://github.com/cujojs/when/issues/410 for details
    return function () {
      return process.nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    return function () {
      vertxNext(flush);
    };
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    // Store setTimeout reference so es6-promise will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var globalSetTimeout = setTimeout;
    return function () {
      return globalSetTimeout(flush, 1);
    };
  }

  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];

      callback(arg);

      queue[i] = undefined;
      queue[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertx() {
    try {
      var r = require;
      var vertx = __webpack_require__(/*! vertx */ 0);
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush = undefined;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && "function" === 'function') {
    scheduleFlush = attemptVertx();
  } else {
    scheduleFlush = useSetTimeout();
  }

  function then(onFulfillment, onRejection) {
    var _arguments = arguments;

    var parent = this;

    var child = new this.constructor(noop);

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    var _state = parent._state;

    if (_state) {
      (function () {
        var callback = _arguments[_state - 1];
        asap(function () {
          return invokeCallback(_state, child, callback, parent._result);
        });
      })();
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  }

  /**
    `Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      resolve(1);
    });
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.resolve(1);
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    @method resolve
    @static
    @param {Any} value value that the returned promise will be resolved with
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve(object) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop);
    _resolve(promise, object);
    return promise;
  }

  var PROMISE_ID = Math.random().toString(36).substring(16);

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var GET_THEN_ERROR = new ErrorObject();

  function selfFulfillment() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function cannotReturnOwn() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      GET_THEN_ERROR.error = error;
      return GET_THEN_ERROR;
    }
  }

  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
    try {
      then.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
      return e;
    }
  }

  function handleForeignThenable(promise, thenable, then) {
    asap(function (promise) {
      var sealed = false;
      var error = tryThen(then, thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable !== value) {
          _resolve(promise, value);
        } else {
          fulfill(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        _reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && error) {
        sealed = true;
        _reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      _reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        return _resolve(promise, value);
      }, function (reason) {
        return _reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$) {
    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
      handleOwnThenable(promise, maybeThenable);
    } else {
      if (then$$ === GET_THEN_ERROR) {
        _reject(promise, GET_THEN_ERROR.error);
      } else if (then$$ === undefined) {
        fulfill(promise, maybeThenable);
      } else if (isFunction(then$$)) {
        handleForeignThenable(promise, maybeThenable, then$$);
      } else {
        fulfill(promise, maybeThenable);
      }
    }
  }

  function _resolve(promise, value) {
    if (promise === value) {
      _reject(promise, selfFulfillment());
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onerror) {
      promise._onerror(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length !== 0) {
      asap(publish, promise);
    }
  }

  function _reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;

    asap(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var _subscribers = parent._subscribers;
    var length = _subscribers.length;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      asap(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (subscribers.length === 0) {
      return;
    }

    var child = undefined,
        callback = undefined,
        detail = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, detail);
      } else {
        callback(detail);
      }
    }

    promise._subscribers.length = 0;
  }

  function ErrorObject() {
    this.error = null;
  }

  var TRY_CATCH_ERROR = new ErrorObject();

  function tryCatch(callback, detail) {
    try {
      return callback(detail);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function invokeCallback(settled, promise, callback, detail) {
    var hasCallback = isFunction(callback),
        value = undefined,
        error = undefined,
        succeeded = undefined,
        failed = undefined;

    if (hasCallback) {
      value = tryCatch(callback, detail);

      if (value === TRY_CATCH_ERROR) {
        failed = true;
        error = value.error;
        value = null;
      } else {
        succeeded = true;
      }

      if (promise === value) {
        _reject(promise, cannotReturnOwn());
        return;
      }
    } else {
      value = detail;
      succeeded = true;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    try {
      resolver(function resolvePromise(value) {
        _resolve(promise, value);
      }, function rejectPromise(reason) {
        _reject(promise, reason);
      });
    } catch (e) {
      _reject(promise, e);
    }
  }

  var id = 0;
  function nextId() {
    return id++;
  }

  function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
  }

  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this._input = input;
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate();
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      _reject(this.promise, validationError());
    }
  }

  function validationError() {
    return new Error('Array Methods must be provided an Array');
  };

  Enumerator.prototype._enumerate = function () {
    var length = this.length;
    var _input = this._input;

    for (var i = 0; this._state === PENDING && i < length; i++) {
      this._eachEntry(_input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function (entry, i) {
    var c = this._instanceConstructor;
    var resolve$$ = c.resolve;

    if (resolve$$ === resolve) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$) {
          return resolve$$(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function (state, i, value) {
    var promise = this.promise;

    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        _reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function (promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  /**
    `Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```
  
    If any of the `promises` given to `all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = reject(new Error("2"));
    let promise3 = reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```
  
    @method all
    @static
    @param {Array} entries array of promises
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries) {
    return new Enumerator(this, entries).promise;
  }

  /**
    `Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.
  
    Example:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```
  
    `Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```
  
    An example real-world use case is implementing timeouts:
  
    ```javascript
    Promise.race([ajax('foo.json'), timeout(5000)])
    ```
  
    @method race
    @static
    @param {Array} promises array of promises to observe
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries) {
    /*jshint validthis:true */
    var Constructor = this;

    if (!isArray(entries)) {
      return new Constructor(function (_, reject) {
        return reject(new TypeError('You must pass an array to race.'));
      });
    } else {
      return new Constructor(function (resolve, reject) {
        var length = entries.length;
        for (var i = 0; i < length; i++) {
          Constructor.resolve(entries[i]).then(resolve, reject);
        }
      });
    }
  }

  /**
    `Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.reject(new Error('WHOOPS'));
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    @method reject
    @static
    @param {Any} reason value that the returned promise will be rejected with.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject(reason) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop);
    _reject(promise, reason);
    return promise;
  }

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise's eventual value or the reason
    why the promise cannot be fulfilled.
  
    Terminology
    -----------
  
    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
  
    A promise can be in one of three states: pending, fulfilled, or rejected.
  
    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
  
    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
  
  
    Basic Usage:
    ------------
  
    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
  
      // on failure
      reject(reason);
    });
  
    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Advanced Usage:
    ---------------
  
    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
  
    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
  
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
  
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
  
    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Unlike callbacks, promises are great composable primitives.
  
    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
  
      return values;
    });
    ```
  
    @class Promise
    @param {function} resolver
    Useful for tooling.
    @constructor
  */
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve;
  Promise.reject = reject;
  Promise._setScheduler = setScheduler;
  Promise._setAsap = setAsap;
  Promise._asap = asap;

  Promise.prototype = {
    constructor: Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
    
      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
    
      Chaining
      --------
    
      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
    
      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
    
      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
    
      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
    
      Assimilation
      ------------
    
      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
    
      If the assimliated promise rejects, then the downstream promise will also reject.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
    
      Simple Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let result;
    
      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
    
      Advanced Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let author, books;
    
      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
    
      function foundBooks(books) {
    
      }
    
      function failure(reason) {
    
      }
    
      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
    
      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
    then: then,

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
    
      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }
    
      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
    
      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
    
      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
    'catch': function _catch(onRejection) {
      return this.then(null, onRejection);
    }
  };

  function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
      local = global;
    } else if (typeof self !== 'undefined') {
      local = self;
    } else {
      try {
        local = Function('return this')();
      } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
      }
    }

    var P = local.Promise;

    if (P) {
      var promiseToString = null;
      try {
        promiseToString = Object.prototype.toString.call(P.resolve());
      } catch (e) {
        // silently ignored
      }

      if (promiseToString === '[object Promise]' && !P.cast) {
        return;
      }
    }

    local.Promise = Promise;
  }

  polyfill();
  // Strange compat..
  Promise.polyfill = polyfill;
  Promise.Promise = Promise;

  return Promise;
});
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/followOnTask/followOnTaskDefinitionSearchConfig.js":
/*!****************************************************************!*\
  !*** ./src/followOnTask/followOnTaskDefinitionSearchConfig.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
      }
}

/* global $ */
/**
 * It contains all configurations for the type ahead search widget
 */
var FollowOnTaskDefinitionSearchConfig = function FollowOnTaskDefinitionSearchConfig(data) {
      _classCallCheck(this, FollowOnTaskDefinitionSearchConfig);

      if (!data || !(data instanceof Array)) {
            throw new Error("The response data suppose to be in array form");
      }

      this.data = data;

      // The name of the dataset.
      // This will be appended to the class name of the filtered result <div>.
      this.name = 'followOnTaskDefnSearch';

      // The max number of suggestions to be displayed.
      this.limit = 50;

      // The minimum character length needed before suggestions start getting rendered.
      this.minLength = 1;
};

exports.default = FollowOnTaskDefinitionSearchConfig;

/***/ }),

/***/ "./src/followOnTask/followOnTaskDefinitionSearchController.js":
/*!********************************************************************!*\
  !*** ./src/followOnTask/followOnTaskDefinitionSearchController.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () {
   function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
         var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
   }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
   };
}();
// import Typeahead from "typeahead.js";
// import Bloodhound from "bloodhound-js";

var _jquery = __webpack_require__(/*! jquery */ "jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _followOnTaskDefinitionSearchConfig = __webpack_require__(/*! ./followOnTaskDefinitionSearchConfig.js */ "./src/followOnTask/followOnTaskDefinitionSearchConfig.js");

var _followOnTaskDefinitionSearchConfig2 = _interopRequireDefault(_followOnTaskDefinitionSearchConfig);

var _followOnTaskDefinitionSearchService = __webpack_require__(/*! ./followOnTaskDefinitionSearchService.js */ "./src/followOnTask/followOnTaskDefinitionSearchService.js");

var _followOnTaskDefinitionSearchService2 = _interopRequireDefault(_followOnTaskDefinitionSearchService);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

/**
 * The button controller that handles ui interactions.
 */
var FollowOnTaskDefinitionSearchController = function () {
   function FollowOnTaskDefinitionSearchController(typeAheadId, okButtonId, notFoundMsgId, followOnTaskDefnUuidOuputId, apiUrlId) {
      _classCallCheck(this, FollowOnTaskDefinitionSearchController);

      var scope = this;
      this.notFoundMsgEl = (0, _jquery2.default)("#" + notFoundMsgId);
      this.okBtnEl = (0, _jquery2.default)('#' + okButtonId);
      this.typeAheadSearchInputEl = (0, _jquery2.default)('#' + typeAheadId);
      this.followOnTaskDefnUuidOuputEl = (0, _jquery2.default)('#' + followOnTaskDefnUuidOuputId);
      var apiUrlEl = (0, _jquery2.default)("#" + apiUrlId);

      if (!this.notFoundMsgEl.length > 0) {
         throw new Error("Not found message element required");
      }

      if (!this.okBtnEl.length > 0) {
         throw new Error("Ok button element required");
      }

      if (!this.typeAheadSearchInputEl.length > 0) {
         throw new Error("Typeahead input element required");
      }

      if (!this.followOnTaskDefnUuidOuputEl.length > 0) {
         throw new Error("Output followOn task definition UUI input element required");
      }

      if (!apiUrlEl.length > 0) {
         throw new Error("REST api url element is required");
      }

      this.apiUrl = apiUrlEl.val();
      this.selectedOption = '';

      this.typeAheadSearchInputEl.keydown(function () {
         setTimeout(function () {
            if (scope.typeAheadSearchInputEl.val() != scope.selectedOption) {
               scope.disableOkBtn();
               scope.clearSelectedTaskDefinition();
            }
         });
      });

      // bind sibling methods to class instance.
      this.initialize = this.initialize.bind(this);
   }

   /**
    * set the id value of the selected task definition to our html input element
    */

   _createClass(FollowOnTaskDefinitionSearchController, [{
      key: 'setSelectedTaskDefinition',
      value: function setSelectedTaskDefinition(suggestion) {
         if (suggestion) {
            this.typeAheadSearchInputEl.val(this.displayFollowOn(null, suggestion));
            this.selectedOption = this.typeAheadSearchInputEl.val();
            this.followOnTaskDefnUuidOuputEl.attr('value', suggestion.id);
         }
      }

      /**
       * clear any selected task definition value in our html input element
       */

   }, {
      key: 'clearSelectedTaskDefinition',
      value: function clearSelectedTaskDefinition() {
         this.followOnTaskDefnUuidOuputEl.attr('value', '');
      }

      /**
       * setup UI elements, fetch task definitions and configure type ahead
       */

   }, {
      key: 'initialize',
      value: function initialize() {
         var _this = this;

         this.disableOkBtn();

         try {
            _followOnTaskDefinitionSearchService2.default.getFollowOnTaskDefinitions(this.apiUrl).then(function (taskDefinitions) {
               return _this.configureTypeAhead(taskDefinitions);
            });

            // once the typeahead input is initialized, the type field will lost focus, have to
            // manually focus it again.
            this.typeAheadSearchInputEl.focus();
         } catch (error) {
            throw new Error("Error while trying to fetch task definitions.", error);
         }
      }

      /**
       * configure type ahead with data source and default configuration.
       */

   }, {
      key: 'configureTypeAhead',
      value: function configureTypeAhead(taskDefinitions) {
         var scope = this;
         var config = new _followOnTaskDefinitionSearchConfig2.default(taskDefinitions);

         // create a display value that will allow full text search on full value.
         _jquery2.default.each(config.data, function (index, data) {
            data.displayValue = scope.displayFollowOn(null, data);
         });

         _jquery2.default.typeahead({
            input: scope.typeAheadSearchInputEl,
            highlight: true,
            name: config.name,
            limit: config.limit,
            minLength: config.minLength,
            display: ["displayValue"],
            emptyTemplate: '<div class="mx-typeahead-msg-notfound">' + scope.notFoundMsgEl.val() + '</div>',
            source: {
               data: config.data
            },
            callback: {
               onClick: function onClick(typeAheadInputEl, selectionEl, selectedRecord, event) {
                  event.preventDefault();
                  scope.enableOkBtn();

                  // save user selection from the search result.
                  scope.setSelectedTaskDefinition(selectedRecord);
                  this.hideLayout();
               }
            }
         });
      }

      // Define how the result is displayed in the dropdown.
      // It will display the result in the format of: task code - configslot code - task name

   }, {
      key: 'displayFollowOn',
      value: function displayFollowOn(query, suggestionObj) {
         if (suggestionObj) {
            return suggestionObj.code + " - " + suggestionObj.configSlotCode + " - " + suggestionObj.name;
         }
      }

      /**
       * Wrapper to enable our OK button
       */

   }, {
      key: 'enableOkBtn',
      value: function enableOkBtn() {
         if (this.okBtnEl) {
            if (this.okBtnEl.attr('originOnClickEvent')) {
               this.okBtnEl.attr('onclick', this.okBtnEl.attr('originOnClickEvent'));
            }

            if (this.okBtnEl.attr('originTitle')) {
               this.okBtnEl.attr('title', this.okBtnEl.attr('originTitle'));
            }

            this.okBtnEl.removeClass('disabled');
            this.okBtnEl.removeAttr('disabled');
            this.okBtnEl.removeAttr('originOnClickEvent');
            this.okBtnEl.removeAttr('originTitle');
         }
      }

      /**
       * Wrapper to disable our OK button
       */

   }, {
      key: 'disableOkBtn',
      value: function disableOkBtn() {
         if (this.okBtnEl) {
            // store the button onclick handler and title for future restore
            if (!this.okBtnEl.attr('originOnClickEvent')) {
               this.okBtnEl.attr('originOnClickEvent', this.okBtnEl.attr('onclick'));
            }

            if (!this.okBtnEl.attr('originTitle')) {
               this.okBtnEl.attr('originTitle', this.okBtnEl.attr('title'));
            }

            this.okBtnEl.addClass('disabled');
            this.okBtnEl.attr('disabled', 'disabled');
            this.okBtnEl.attr('onclick', false);
            this.okBtnEl.attr('title', '');
         }
      }
   }]);

   return FollowOnTaskDefinitionSearchController;
}();

exports.default = FollowOnTaskDefinitionSearchController;

/***/ }),

/***/ "./src/followOnTask/followOnTaskDefinitionSearchService.js":
/*!*****************************************************************!*\
  !*** ./src/followOnTask/followOnTaskDefinitionSearchService.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () {
   function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
         var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
   }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
   };
}();

var _jquery = __webpack_require__(/*! jquery */ "jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

/**
 * The service layer, it sends REST API call and pass the response data to controller
 */
var FollowOnTaskDefinitionSearchService = function () {
   function FollowOnTaskDefinitionSearchService() {
      _classCallCheck(this, FollowOnTaskDefinitionSearchService);
   }

   _createClass(FollowOnTaskDefinitionSearchService, null, [{
      key: "sortTaskDefinitions",
      value: function sortTaskDefinitions(taskDefinitions) {
         if (!taskDefinitions || !(taskDefinitions instanceof Array)) {
            throw new Error("taskDefinitions expected to be an Array");
         }

         return taskDefinitions.sort(function (a, b) {
            var compareResult = a.code > b.code ? 1 : a.code < b.code ? -1 : 0;

            if (compareResult == 0) {
               compareResult = a.configSlotCode > b.configSlotCode ? 1 : a.configSlotCode < b.configSlotCode ? -1 : 0;
            }

            if (compareResult == 0) {
               compareResult = a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            }
            return compareResult;
         });
      }
   }, {
      key: "getFollowOnTaskDefinitions",
      value: function getFollowOnTaskDefinitions(apiUrl) {
         var scope = this;
         return new Promise(function (resolve, reject) {
            return _jquery2.default.ajax({
               type: "GET",
               url: apiUrl,
               success: function success(taskDefinitionsResponse) {
                  // nice to have: postProcessor hook
                  var sortedTaskDefinitions = scope.sortTaskDefinitions(taskDefinitionsResponse);
                  resolve(sortedTaskDefinitions);
               },
               error: function error(err) {
                  // if error happens with the API call, initialize the widget with an empty array.
                  resolve([]);
               }
            });
         });
      }
   }]);

   return FollowOnTaskDefinitionSearchService;
}();

exports.default = FollowOnTaskDefinitionSearchService;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js")))

/***/ }),

/***/ "./src/followOnTask/index.js":
/*!***********************************!*\
  !*** ./src/followOnTask/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _followOnTaskDefinitionSearchController = __webpack_require__(/*! ./followOnTaskDefinitionSearchController.js */ "./src/followOnTask/followOnTaskDefinitionSearchController.js");

var _followOnTaskDefinitionSearchController2 = _interopRequireDefault(_followOnTaskDefinitionSearchController);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var controller = new _followOnTaskDefinitionSearchController2.default('idInputTypeaheadFollowOnTaskSearch', 'idButtonOk', 'idTypeaheadNotFoundMessage', 'idFieldFollowOnTaskDefnUuid', 'idfollowOnTaskDefinitionRestAPI');
controller.initialize();

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

},[["./src/followOnTask/index.js","common-runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZvbGxvd09uVGFzay9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9mb2xsb3dPblRhc2svZm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZvbGxvd09uVGFzay9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9sbG93T25UYXNrL2luZGV4LmpzIiwid2VicGFjazovLy92ZXJ0eCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQcm9taXNlIiwiZ2xvYmFsIiwiZmFjdG9yeSIsIm9iamVjdE9yRnVuY3Rpb24iLCJ4IiwiaXNGdW5jdGlvbiIsIl9pc0FycmF5IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibGVuIiwidmVydHhOZXh0IiwiY3VzdG9tU2NoZWR1bGVyRm4iLCJhc2FwIiwiY2FsbGJhY2siLCJhcmciLCJxdWV1ZSIsImZsdXNoIiwic2NoZWR1bGVGbHVzaCIsInNldFNjaGVkdWxlciIsInNjaGVkdWxlRm4iLCJzZXRBc2FwIiwiYXNhcEZuIiwiYnJvd3NlcldpbmRvdyIsIndpbmRvdyIsImJyb3dzZXJHbG9iYWwiLCJCcm93c2VyTXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJXZWJLaXRNdXRhdGlvbk9ic2VydmVyIiwiaXNOb2RlIiwic2VsZiIsInByb2Nlc3MiLCJpc1dvcmtlciIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiaW1wb3J0U2NyaXB0cyIsIk1lc3NhZ2VDaGFubmVsIiwidXNlTmV4dFRpY2siLCJuZXh0VGljayIsInVzZVZlcnR4VGltZXIiLCJ1c2VNdXRhdGlvbk9ic2VydmVyIiwiaXRlcmF0aW9ucyIsIm9ic2VydmVyIiwibm9kZSIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJvYnNlcnZlIiwiY2hhcmFjdGVyRGF0YSIsImRhdGEiLCJ1c2VNZXNzYWdlQ2hhbm5lbCIsImNoYW5uZWwiLCJwb3J0MSIsIm9ubWVzc2FnZSIsInBvcnQyIiwicG9zdE1lc3NhZ2UiLCJ1c2VTZXRUaW1lb3V0IiwiZ2xvYmFsU2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJpIiwiYXR0ZW1wdFZlcnR4IiwiciIsInZlcnR4IiwicnVuT25Mb29wIiwicnVuT25Db250ZXh0IiwiZSIsInRoZW4iLCJvbkZ1bGZpbGxtZW50Iiwib25SZWplY3Rpb24iLCJfYXJndW1lbnRzIiwiYXJndW1lbnRzIiwicGFyZW50IiwiY2hpbGQiLCJjb25zdHJ1Y3RvciIsIm5vb3AiLCJQUk9NSVNFX0lEIiwibWFrZVByb21pc2UiLCJfc3RhdGUiLCJpbnZva2VDYWxsYmFjayIsIl9yZXN1bHQiLCJzdWJzY3JpYmUiLCJyZXNvbHZlIiwib2JqZWN0IiwiQ29uc3RydWN0b3IiLCJwcm9taXNlIiwiX3Jlc29sdmUiLCJNYXRoIiwicmFuZG9tIiwic3Vic3RyaW5nIiwiUEVORElORyIsIkZVTEZJTExFRCIsIlJFSkVDVEVEIiwiR0VUX1RIRU5fRVJST1IiLCJFcnJvck9iamVjdCIsInNlbGZGdWxmaWxsbWVudCIsIlR5cGVFcnJvciIsImNhbm5vdFJldHVybk93biIsImdldFRoZW4iLCJlcnJvciIsInRyeVRoZW4iLCJ2YWx1ZSIsImZ1bGZpbGxtZW50SGFuZGxlciIsInJlamVjdGlvbkhhbmRsZXIiLCJoYW5kbGVGb3JlaWduVGhlbmFibGUiLCJ0aGVuYWJsZSIsInNlYWxlZCIsImZ1bGZpbGwiLCJyZWFzb24iLCJfcmVqZWN0IiwiX2xhYmVsIiwiaGFuZGxlT3duVGhlbmFibGUiLCJoYW5kbGVNYXliZVRoZW5hYmxlIiwibWF5YmVUaGVuYWJsZSIsInRoZW4kJCIsInB1Ymxpc2hSZWplY3Rpb24iLCJfb25lcnJvciIsInB1Ymxpc2giLCJfc3Vic2NyaWJlcnMiLCJsZW5ndGgiLCJzdWJzY3JpYmVycyIsInNldHRsZWQiLCJkZXRhaWwiLCJUUllfQ0FUQ0hfRVJST1IiLCJ0cnlDYXRjaCIsImhhc0NhbGxiYWNrIiwic3VjY2VlZGVkIiwiZmFpbGVkIiwiaW5pdGlhbGl6ZVByb21pc2UiLCJyZXNvbHZlciIsInJlc29sdmVQcm9taXNlIiwicmVqZWN0UHJvbWlzZSIsImlkIiwibmV4dElkIiwiRW51bWVyYXRvciIsImlucHV0IiwiX2luc3RhbmNlQ29uc3RydWN0b3IiLCJfaW5wdXQiLCJfcmVtYWluaW5nIiwiX2VudW1lcmF0ZSIsInZhbGlkYXRpb25FcnJvciIsIkVycm9yIiwiX2VhY2hFbnRyeSIsImVudHJ5IiwiYyIsInJlc29sdmUkJCIsIl90aGVuIiwiX3NldHRsZWRBdCIsIl93aWxsU2V0dGxlQXQiLCJzdGF0ZSIsImVudW1lcmF0b3IiLCJhbGwiLCJlbnRyaWVzIiwicmFjZSIsIl8iLCJyZWplY3QiLCJuZWVkc1Jlc29sdmVyIiwibmVlZHNOZXciLCJfc2V0U2NoZWR1bGVyIiwiX3NldEFzYXAiLCJfYXNhcCIsIl9jYXRjaCIsInBvbHlmaWxsIiwibG9jYWwiLCJGdW5jdGlvbiIsIlAiLCJwcm9taXNlVG9TdHJpbmciLCJjYXN0IiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsInJ1bkNsZWFyVGltZW91dCIsIm1hcmtlciIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImNvbmNhdCIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwicnVuIiwiYXJncyIsInB1c2giLCJJdGVtIiwiYXJyYXkiLCJhcHBseSIsInRpdGxlIiwiYnJvd3NlciIsImVudiIsImFyZ3YiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJvbiIsImFkZExpc3RlbmVyIiwib25jZSIsIm9mZiIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW1pdCIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJuYW1lIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJnIiwiZXZhbCIsIkZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWciLCJGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciIsInNjb3BlIiwiYXBpVXJsRWwiLCJzdWdnZXN0aW9uIiwiRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UiLCJ0YXNrRGVmaW5pdGlvbnMiLCJjb25maWciLCIkIiwiaGlnaGxpZ2h0IiwibGltaXQiLCJtaW5MZW5ndGgiLCJkaXNwbGF5IiwiZW1wdHlUZW1wbGF0ZSIsInNvdXJjZSIsIm9uQ2xpY2siLCJldmVudCIsInF1ZXJ5Iiwic3VnZ2VzdGlvbk9iaiIsImNvbXBhcmVSZXN1bHQiLCJhIiwiYiIsImFwaVVybCIsInR5cGUiLCJ1cmwiLCJzdWNjZXNzIiwic29ydGVkVGFza0RlZmluaXRpb25zIiwiY29udHJvbGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUIsbUJBQUFDLENBQVEsb0dBQVIs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bUJBQW1CQyxFQUFwQixjQUFDRCxHQUF1QyxDQUF4QyxDQUFDQSxHQUE5REQ7QUFDRjs7QUFFRCxnQkFBSUEsaUJBQUosR0FBd0I7QUFDckJBLCtCQUFpQkMsU0FBU0MsRUFBVixJQUFDRCxHQUFELENBQUNBLEdBQXlCQSxTQUFTQyxFQUFWLElBQUNELEdBQW1CLENBQXBCLENBQUNBLEdBQTFDRDtBQUNGO0FBQ0Q7QUFWSCxVQUFPLENBQVA7QUFZRjs7O2lEQUVpQ0csTSxFQUFRO0FBQ3ZDLGFBQUlwQixRQUFKO0FBQ0EsZ0JBQU8sWUFBWSwyQkFBMEI7QUFDMUMsbUJBQU8sc0JBQU87QUFDWHFCLHFCQURXO0FBRVhDLG9CQUZXO0FBR1hDLHdCQUFTLDBDQUFrQztBQUN4QztBQUNBLHNCQUFJQyx3QkFBd0J4QiwwQkFBNUIsdUJBQTRCQSxDQUE1QjtBQUNBdEk7QUFOUTtBQVFYaUIsc0JBQU8sb0JBQWM7QUFDbEI7QUFDQWpCO0FBQ0Y7QUFYVSxhQUFQLENBQVA7QUFESCxVQUFPLENBQVA7QUFlRjs7Ozs7O2tCQXRDaUJ5SSxtQzs7Ozs7Ozs7Ozs7Ozs7O0FDTHJCOzs7Ozs7OztBQUVBLElBQUlzQixhQUNBLElBQUkxQix5Q0FBSix5SEFESixpQ0FDSSxDQURKO0FBTUEwQix3Qjs7Ozs7Ozs7Ozs7QUNSQSxlOzs7Ozs7Ozs7OztBQ0FBLHdCIiwiZmlsZSI6InNyYy9tYWluL3dlYmFwcC9idW5kbGVzL2ZvbGxvd09uVGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKS5Qcm9taXNlO1xuIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICAzLjMuMVxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbC5FUzZQcm9taXNlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG52YXIgX2lzQXJyYXkgPSB1bmRlZmluZWQ7XG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59XG5cbnZhciBpc0FycmF5ID0gX2lzQXJyYXk7XG5cbnZhciBsZW4gPSAwO1xudmFyIHZlcnR4TmV4dCA9IHVuZGVmaW5lZDtcbnZhciBjdXN0b21TY2hlZHVsZXJGbiA9IHVuZGVmaW5lZDtcblxudmFyIGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgbGVuICs9IDI7XG4gIGlmIChsZW4gPT09IDIpIHtcbiAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgaWYgKGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICBjdXN0b21TY2hlZHVsZXJGbihmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gIGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbn1cblxuZnVuY3Rpb24gc2V0QXNhcChhc2FwRm4pIHtcbiAgYXNhcCA9IGFzYXBGbjtcbn1cblxudmFyIGJyb3dzZXJXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbnZhciBicm93c2VyR2xvYmFsID0gYnJvd3NlcldpbmRvdyB8fCB7fTtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAoe30pLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG5vZGUuZGF0YSA9IGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyO1xuICB9O1xufVxuXG4vLyB3ZWIgd29ya2VyXG5mdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgZ2xvYmFsU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICB9O1xufVxuXG52YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdFZlcnR4KCkge1xuICB0cnkge1xuICAgIHZhciByID0gcmVxdWlyZTtcbiAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB1bmRlZmluZWQ7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgaWYgKF9zdGF0ZSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBfYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhfc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxudmFyIEdFVF9USEVOX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW4ocHJvbWlzZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICByZXR1cm4gR0VUX1RIRU5fRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKSB7XG4gIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmIHRoZW4kJCA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUpIHtcbiAgICBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhlbiQkID09PSBHRVRfVEhFTl9FUlJPUikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGVuJCQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gRXJyb3JPYmplY3QoKSB7XG4gIHRoaXMuZXJyb3IgPSBudWxsO1xufVxuXG52YXIgVFJZX0NBVENIX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICBlcnJvciA9IHVuZGVmaW5lZCxcbiAgICAgIHN1Y2NlZWRlZCA9IHVuZGVmaW5lZCxcbiAgICAgIGZhaWxlZCA9IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICB2YWx1ZSA9IHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgaWYgKHZhbHVlID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgdmFsdWUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gRlVMRklMTEVEKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG52YXIgaWQgPSAwO1xuZnVuY3Rpb24gbmV4dElkKCkge1xuICByZXR1cm4gaWQrKztcbn1cblxuZnVuY3Rpb24gbWFrZVByb21pc2UocHJvbWlzZSkge1xuICBwcm9taXNlW1BST01JU0VfSURdID0gaWQrKztcbiAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICBtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBfcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIHZhciBfaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fZWFjaEVudHJ5KF9pbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICB2YXIgcmVzb2x2ZSQkID0gYy5yZXNvbHZlO1xuXG4gIGlmIChyZXNvbHZlJCQgPT09IHJlc29sdmUpIHtcbiAgICB2YXIgX3RoZW4gPSBnZXRUaGVuKGVudHJ5KTtcblxuICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIF90aGVuKTtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJChlbnRyeSk7XG4gICAgICB9KSwgaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQoZW50cnkpLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFByb21pc2UuYWxsYCBhY2NlcHRzIGFuIGFycmF5IG9mIHByb21pc2VzLCBhbmQgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoXG4gIGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBwcm9taXNlcywgb3JcbiAgcmVqZWN0ZWQgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBiZSByZWplY3RlZC4gSXQgY2FzdHMgYWxsXG4gIGVsZW1lbnRzIG9mIHRoZSBwYXNzZWQgaXRlcmFibGUgdG8gcHJvbWlzZXMgYXMgaXQgcnVucyB0aGlzIGFsZ29yaXRobS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIFRoZSBhcnJheSBoZXJlIHdvdWxkIGJlIFsgMSwgMiwgMyBdO1xuICB9KTtcbiAgYGBgXG5cbiAgSWYgYW55IG9mIHRoZSBgcHJvbWlzZXNgIGdpdmVuIHRvIGBhbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVqZWN0KG5ldyBFcnJvcihcIjJcIikpO1xuICBsZXQgcHJvbWlzZTMgPSByZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAvLyBlcnJvci5tZXNzYWdlID09PSBcIjJcIlxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBhbGxcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cbiAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBhbGwoZW50cmllcykge1xuICByZXR1cm4gbmV3IEVudW1lcmF0b3IodGhpcywgZW50cmllcykucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJhY2VgIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaCBpcyBzZXR0bGVkIGluIHRoZSBzYW1lIHdheSBhcyB0aGVcbiAgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gc2V0dGxlLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0ID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIGl0IHdhcyByZXNvbHZlZCBiZWZvcmUgcHJvbWlzZTFcbiAgICAvLyB3YXMgcmVzb2x2ZWQuXG4gIH0pO1xuICBgYGBcblxuICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XG4gIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcbiAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xuICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdwcm9taXNlIDInKSk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxuICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXG4gIH0pO1xuICBgYGBcblxuICBBbiBleGFtcGxlIHJlYWwtd29ybGQgdXNlIGNhc2UgaXMgaW1wbGVtZW50aW5nIHRpbWVvdXRzOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXG4gIHByb21pc2UgdG8gc2V0dGxlLlxuKi9cbmZ1bmN0aW9uIHJhY2UoZW50cmllcykge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAgYFByb21pc2UucmVqZWN0YCByZXR1cm5zIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgYHJlYXNvbmAuXG4gIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlamVjdFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIGdpdmVuIGByZWFzb25gLlxuKi9cbmZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UgPyBpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBuZWVkc05ldygpO1xuICB9XG59XG5cblByb21pc2UuYWxsID0gYWxsO1xuUHJvbWlzZS5yYWNlID0gcmFjZTtcblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5Qcm9taXNlLnJlamVjdCA9IHJlamVjdDtcblByb21pc2UuX3NldFNjaGVkdWxlciA9IHNldFNjaGVkdWxlcjtcblByb21pc2UuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZS5fYXNhcCA9IGFzYXA7XG5cblByb21pc2UucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUHJvbWlzZSxcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICB9KTtcbiAgICBgYGBcbiAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQXNzaW1pbGF0aW9uXG4gICAgLS0tLS0tLS0tLS0tXG4gIFxuICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IHJlc3VsdDtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IGF1dGhvciwgYm9va3M7XG4gIFxuICAgIHRyeSB7XG4gICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgXG4gICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICBcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kQXV0aG9yKCkuXG4gICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIHRoZW5cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgdGhlbjogdGhlbixcblxuICAvKipcbiAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cbiAgXG4gICAgYGBganNcbiAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gICAgdmFyIGxvY2FsID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgaWYgKFApIHtcbiAgICAgICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2U7XG59XG5cbnBvbHlmaWxsKCk7XG4vLyBTdHJhbmdlIGNvbXBhdC4uXG5Qcm9taXNlLnBvbHlmaWxsID0gcG9seWZpbGw7XG5Qcm9taXNlLlByb21pc2UgPSBQcm9taXNlO1xuXG5yZXR1cm4gUHJvbWlzZTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVzNi1wcm9taXNlLm1hcCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIi8qIGdsb2JhbCAkICovXHJcbi8qKlxyXG4gKiBJdCBjb250YWlucyBhbGwgY29uZmlndXJhdGlvbnMgZm9yIHRoZSB0eXBlIGFoZWFkIHNlYXJjaCB3aWRnZXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcge1xyXG5cclxuICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICBpZiAoIWRhdGEgfHwgIShkYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSByZXNwb25zZSBkYXRhIHN1cHBvc2UgdG8gYmUgaW4gYXJyYXkgZm9ybVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0LlxyXG4gICAgICAvLyBUaGlzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGZpbHRlcmVkIHJlc3VsdCA8ZGl2Pi5cclxuICAgICAgdGhpcy5uYW1lID0gJ2ZvbGxvd09uVGFza0RlZm5TZWFyY2gnO1xyXG5cclxuICAgICAgLy8gVGhlIG1heCBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAgICB0aGlzLmxpbWl0ID0gNTA7XHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBjaGFyYWN0ZXIgbGVuZ3RoIG5lZWRlZCBiZWZvcmUgc3VnZ2VzdGlvbnMgc3RhcnQgZ2V0dGluZyByZW5kZXJlZC5cclxuICAgICAgdGhpcy5taW5MZW5ndGggPSAxO1xyXG4gICB9XHJcbn1cclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuLy8gaW1wb3J0IFR5cGVhaGVhZCBmcm9tIFwidHlwZWFoZWFkLmpzXCI7XHJcbi8vIGltcG9ydCBCbG9vZGhvdW5kIGZyb20gXCJibG9vZGhvdW5kLWpzXCI7XHJcblxyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZyBmcm9tICcuL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcuanMnO1xyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UgZnJvbSAnLi9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyB1aSBpbnRlcmFjdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciB7XHJcblxyXG4gICBjb25zdHJ1Y3Rvcih0eXBlQWhlYWRJZCwgb2tCdXR0b25JZCwgbm90Rm91bmRNc2dJZCwgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkLCBhcGlVcmxJZCkge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICB0aGlzLm5vdEZvdW5kTXNnRWwgPSAkKFwiI1wiICsgbm90Rm91bmRNc2dJZCk7XHJcbiAgICAgIHRoaXMub2tCdG5FbCA9ICQoJyMnICsgb2tCdXR0b25JZCk7XHJcbiAgICAgIHRoaXMudHlwZUFoZWFkU2VhcmNoSW5wdXRFbCA9ICQoJyMnICsgdHlwZUFoZWFkSWQpO1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbCA9ICQoJyMnICsgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkKTtcclxuICAgICAgbGV0IGFwaVVybEVsID0gJChcIiNcIiArIGFwaVVybElkKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5ub3RGb3VuZE1zZ0VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGZvdW5kIG1lc3NhZ2UgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLm9rQnRuRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPayBidXR0b24gZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUeXBlYWhlYWQgaW5wdXQgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk91dHB1dCBmb2xsb3dPbiB0YXNrIGRlZmluaXRpb24gVVVJIGlucHV0IGVsZW1lbnQgcmVxdWlyZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXBpVXJsRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSRVNUIGFwaSB1cmwgZWxlbWVudCBpcyByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmxFbC52YWwoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9ICcnO1xyXG5cclxuICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICBpZiAoc2NvcGUudHlwZUFoZWFkU2VhcmNoSW5wdXRFbC52YWwoKSAhPSBzY29wZS5zZWxlY3RlZE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICBzY29wZS5kaXNhYmxlT2tCdG4oKTtcclxuICAgICAgICAgICAgICAgICAgc2NvcGUuY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gYmluZCBzaWJsaW5nIG1ldGhvZHMgdG8gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSA9IHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldCB0aGUgaWQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIHRhc2sgZGVmaW5pdGlvbiB0byBvdXIgaHRtbCBpbnB1dCBlbGVtZW50XHJcbiAgICAqL1xyXG4gICBzZXRTZWxlY3RlZFRhc2tEZWZpbml0aW9uKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgaWYgKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLnZhbCh0aGlzLmRpc3BsYXlGb2xsb3dPbihudWxsLCBzdWdnZXN0aW9uKSk7XHJcbiAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwudmFsKCk7XHJcbiAgICAgICAgIHRoaXMuZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dEVsLmF0dHIoJ3ZhbHVlJywgc3VnZ2VzdGlvbi5pZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGNsZWFyIGFueSBzZWxlY3RlZCB0YXNrIGRlZmluaXRpb24gdmFsdWUgaW4gb3VyIGh0bWwgaW5wdXQgZWxlbWVudFxyXG4gICAgKi9cclxuICAgY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCkge1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5hdHRyKCd2YWx1ZScsICcnKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldHVwIFVJIGVsZW1lbnRzLCBmZXRjaCB0YXNrIGRlZmluaXRpb25zIGFuZCBjb25maWd1cmUgdHlwZSBhaGVhZFxyXG4gICAgKi9cclxuICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlT2tCdG4oKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hTZXJ2aWNlLmdldEZvbGxvd09uVGFza0RlZmluaXRpb25zKFxyXG4gICAgICAgICAgICB0aGlzLmFwaVVybCkudGhlbigodGFza0RlZmluaXRpb25zKSA9PiB0aGlzLmNvbmZpZ3VyZVR5cGVBaGVhZCh0YXNrRGVmaW5pdGlvbnMpKTtcclxuXHJcbiAgICAgICAgIC8vIG9uY2UgdGhlIHR5cGVhaGVhZCBpbnB1dCBpcyBpbml0aWFsaXplZCwgdGhlIHR5cGUgZmllbGQgd2lsbCBsb3N0IGZvY3VzLCBoYXZlIHRvXHJcbiAgICAgICAgIC8vIG1hbnVhbGx5IGZvY3VzIGl0IGFnYWluLlxyXG4gICAgICAgICB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRhc2sgZGVmaW5pdGlvbnMuXCIsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogY29uZmlndXJlIHR5cGUgYWhlYWQgd2l0aCBkYXRhIHNvdXJjZSBhbmQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxyXG4gICAgKi9cclxuICAgY29uZmlndXJlVHlwZUFoZWFkKHRhc2tEZWZpbml0aW9ucykge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICBsZXQgY29uZmlnID0gbmV3IEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcodGFza0RlZmluaXRpb25zKTtcclxuICAgICAgXHJcbiAgICAgIC8vIGNyZWF0ZSBhIGRpc3BsYXkgdmFsdWUgdGhhdCB3aWxsIGFsbG93IGZ1bGwgdGV4dCBzZWFyY2ggb24gZnVsbCB2YWx1ZS5cclxuICAgICAgJC5lYWNoKGNvbmZpZy5kYXRhLCBmdW5jdGlvbihpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICBkYXRhLmRpc3BsYXlWYWx1ZSA9IHNjb3BlLmRpc3BsYXlGb2xsb3dPbihudWxsLCBkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAkLnR5cGVhaGVhZCh7XHJcbiAgICAgICAgIGlucHV0OiBzY29wZS50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLFxyXG4gICAgICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxyXG4gICAgICAgICBsaW1pdDogY29uZmlnLmxpbWl0LFxyXG4gICAgICAgICBtaW5MZW5ndGg6IGNvbmZpZy5taW5MZW5ndGgsXHJcbiAgICAgICAgIGRpc3BsYXk6IFtcImRpc3BsYXlWYWx1ZVwiXSxcclxuICAgICAgICAgZW1wdHlUZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJteC10eXBlYWhlYWQtbXNnLW5vdGZvdW5kXCI+JyArIHNjb3BlLm5vdEZvdW5kTXNnRWwudmFsKCkgKyAnPC9kaXY+JyxcclxuICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBjYWxsYmFjazoge1xyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbih0eXBlQWhlYWRJbnB1dEVsLCBzZWxlY3Rpb25FbCwgc2VsZWN0ZWRSZWNvcmQsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHNjb3BlLmVuYWJsZU9rQnRuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAvLyBzYXZlIHVzZXIgc2VsZWN0aW9uIGZyb20gdGhlIHNlYXJjaCByZXN1bHQuXHJcbiAgICAgICAgICAgICAgIHNjb3BlLnNldFNlbGVjdGVkVGFza0RlZmluaXRpb24oc2VsZWN0ZWRSZWNvcmQpO1xyXG4gICAgICAgICAgICAgICB0aGlzLmhpZGVMYXlvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvLyBEZWZpbmUgaG93IHRoZSByZXN1bHQgaXMgZGlzcGxheWVkIGluIHRoZSBkcm9wZG93bi5cclxuICAgLy8gSXQgd2lsbCBkaXNwbGF5IHRoZSByZXN1bHQgaW4gdGhlIGZvcm1hdCBvZjogdGFzayBjb2RlIC0gY29uZmlnc2xvdCBjb2RlIC0gdGFzayBuYW1lXHJcbiAgIGRpc3BsYXlGb2xsb3dPbihxdWVyeSwgc3VnZ2VzdGlvbk9iaikge1xyXG4gICAgICBpZiAoc3VnZ2VzdGlvbk9iaikge1xyXG4gICAgICAgICByZXR1cm4gc3VnZ2VzdGlvbk9iai5jb2RlICsgXCIgLSBcIiArIHN1Z2dlc3Rpb25PYmouY29uZmlnU2xvdENvZGUgKyBcIiAtIFwiICsgc3VnZ2VzdGlvbk9iai5uYW1lO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBXcmFwcGVyIHRvIGVuYWJsZSBvdXIgT0sgYnV0dG9uXHJcbiAgICAqL1xyXG4gICBlbmFibGVPa0J0bigpIHtcclxuICAgICAgaWYgKHRoaXMub2tCdG5FbCkge1xyXG4gICAgICAgICBpZiAodGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpbk9uQ2xpY2tFdmVudCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCdvbmNsaWNrJywgdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpbk9uQ2xpY2tFdmVudCcpKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5UaXRsZScpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCd0aXRsZScsIHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5UaXRsZScpKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGhpcy5va0J0bkVsLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLnJlbW92ZUF0dHIoJ29yaWdpbk9uQ2xpY2tFdmVudCcpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwucmVtb3ZlQXR0cignb3JpZ2luVGl0bGUnKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogV3JhcHBlciB0byBkaXNhYmxlIG91ciBPSyBidXR0b25cclxuICAgICovXHJcbiAgIGRpc2FibGVPa0J0bigpIHtcclxuICAgICAgaWYgKHRoaXMub2tCdG5FbCkge1xyXG4gICAgICAgICAvLyBzdG9yZSB0aGUgYnV0dG9uIG9uY2xpY2sgaGFuZGxlciBhbmQgdGl0bGUgZm9yIGZ1dHVyZSByZXN0b3JlXHJcbiAgICAgICAgIGlmICghdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpbk9uQ2xpY2tFdmVudCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5PbkNsaWNrRXZlbnQnLCB0aGlzLm9rQnRuRWwuYXR0cignb25jbGljaycpKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKCF0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luVGl0bGUnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luVGl0bGUnLCB0aGlzLm9rQnRuRWwuYXR0cigndGl0bGUnKSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCdvbmNsaWNrJywgZmFsc2UpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cigndGl0bGUnLCAnJyk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBzZXJ2aWNlIGxheWVyLCBpdCBzZW5kcyBSRVNUIEFQSSBjYWxsIGFuZCBwYXNzIHRoZSByZXNwb25zZSBkYXRhIHRvIGNvbnRyb2xsZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hTZXJ2aWNlIHtcclxuXHJcbiAgIHN0YXRpYyBzb3J0VGFza0RlZmluaXRpb25zKHRhc2tEZWZpbml0aW9ucykge1xyXG4gICAgICBpZiAoIXRhc2tEZWZpbml0aW9ucyB8fCAhKHRhc2tEZWZpbml0aW9ucyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0YXNrRGVmaW5pdGlvbnMgZXhwZWN0ZWQgdG8gYmUgYW4gQXJyYXlcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0YXNrRGVmaW5pdGlvbnMuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgIGxldCBjb21wYXJlUmVzdWx0ID0gKGEuY29kZSA+IGIuY29kZSkgPyAxIDogKChhLmNvZGUgPCBiLmNvZGUpID8gLTEgOiAwKTtcclxuXHJcbiAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgY29tcGFyZVJlc3VsdCA9IChhLmNvbmZpZ1Nsb3RDb2RlID4gYi5jb25maWdTbG90Q29kZSkgPyAxIDogKChhLmNvbmZpZ1Nsb3RDb2RlIDwgYi5jb25maWdTbG90Q29kZSkgPyAtMSA6IDApO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoY29tcGFyZVJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbXBhcmVSZXN1bHQgPSAoYS5uYW1lID4gYi5uYW1lKSA/IDEgOiAoKGEubmFtZSA8IGIubmFtZSkgPyAtMSA6IDApO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiBjb21wYXJlUmVzdWx0O1xyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgc3RhdGljIGdldEZvbGxvd09uVGFza0RlZmluaXRpb25zKGFwaVVybCkge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGFwaVVybCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24odGFza0RlZmluaXRpb25zUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgLy8gbmljZSB0byBoYXZlOiBwb3N0UHJvY2Vzc29yIGhvb2tcclxuICAgICAgICAgICAgICAgbGV0IHNvcnRlZFRhc2tEZWZpbml0aW9ucyA9IHNjb3BlLnNvcnRUYXNrRGVmaW5pdGlvbnModGFza0RlZmluaXRpb25zUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICByZXNvbHZlKHNvcnRlZFRhc2tEZWZpbml0aW9ucyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgLy8gaWYgZXJyb3IgaGFwcGVucyB3aXRoIHRoZSBBUEkgY2FsbCwgaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0IHdpdGggYW4gZW1wdHkgYXJyYXkuXHJcbiAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbnRyb2xsZXIgZnJvbSAnLi9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlci5qcyc7XG5cbmxldCBjb250cm9sbGVyID0gXG4gICAgbmV3IEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb250cm9sbGVyKCdpZElucHV0VHlwZWFoZWFkRm9sbG93T25UYXNrU2VhcmNoJywgXG4gICAgICAgICdpZEJ1dHRvbk9rJywgXG4gICAgICAgICdpZFR5cGVhaGVhZE5vdEZvdW5kTWVzc2FnZScsXG4gICAgICAgICdpZEZpZWxkRm9sbG93T25UYXNrRGVmblV1aWQnLFxuICAgICAgICAnaWRmb2xsb3dPblRhc2tEZWZpbml0aW9uUmVzdEFQSScpO1xuY29udHJvbGxlci5pbml0aWFsaXplKCk7XG4iLCIvKiAoaWdub3JlZCkgKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9