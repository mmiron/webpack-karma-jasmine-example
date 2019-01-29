(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["basemaintenance/task/tasksupervision"],{

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

/***/ "./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js":
/*!*******************************************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise, $) {

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
}(); /* global Tabulator */

var _TaskSupervisionService = __webpack_require__(/*! ./TaskSupervisionService */ "./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js");

var _TaskSupervisionService2 = _interopRequireDefault(_TaskSupervisionService);

var _DateTimeValidator = __webpack_require__(/*! ../../../common/validation/DateTimeValidator */ "./src/common/validation/DateTimeValidator.js");

var _DateTimeValidator2 = _interopRequireDefault(_DateTimeValidator);

var _DateTimeHelper = __webpack_require__(/*! ../../../common/util/DateTimeHelper */ "./src/common/util/DateTimeHelper.js");

var _DateTimeHelper2 = _interopRequireDefault(_DateTimeHelper);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

var TaskSupervisionController = function () {
   function TaskSupervisionController(parms) {
      _classCallCheck(this, TaskSupervisionController);

      this.userId = parms.userId;

      if (!this.userId) {
         throw new Error('userId is mandatory');
      }

      this.crewsFieldId = parms.crewsFieldId;

      if (!this.crewsFieldId) {
         throw new Error('crewsFieldId is mandatory');
      }

      var crewsField = document.getElementById(this.crewsFieldId);
      if (!crewsField || crewsField.tagName != 'SELECT') {
         throw new Error('crewsFieldId must be a SELECT element');
      }

      this.service = parms.TaskSupervisionService || new _TaskSupervisionService2.default();
      this.isAllowedToSearch = parms.isAllowedToSearch === 'true';
      this.isAllowedToEditSchedledHours = parms.isAllowedToEditSchedledHours === 'true';
      this.isAllowedToEditActualHours = parms.isAllowedToEditActualHours === 'true';
      this.startDateWidgetId = parms.startFieldId;
      this.endDateWidgetId = parms.endFieldId;
      this.showCompleteId = parms.showCompleteId;
      this.searchButtonId = parms.searchButtonId;
      this.searchResultsId = parms.searchResultsId;
      this.noSearchResultsMessage = parms.noSearchResultsMessage;
      this.laborRowElaspedTimeThreshold = parms.laborRowElaspedTimeThreshold;

      this.defaultShowComplete = true;
      this.isScheduledHoursCellEditable.bind(this);
      this.handleScheduleHoursEdit.bind(this);
      this.handleActualHoursEdit.bind(this);
      this.actualHourCellFormatter.bind(this);
   }

   _createClass(TaskSupervisionController, [{
      key: 'getServiceInstance',
      value: function getServiceInstance() {
         return this.service;
      }
   }, {
      key: 'init',
      value: function init() {
         var _this = this;

         return new Promise(function (resolve, reject) {
            _this.initShowCompleteTasksWidget();
            _this.initResultsTable();
            _this.initSearchButton();

            Promise.all([_this.initCrewsWidget(), _this.initStartAndEndWidgets()]).then(function (results) {
               _this.populateCrewsWidget(results[0]);
               _this.setStartAndEndWidgets(results[1]);
               _this.performSearch().then(function () {
                  return resolve();
               });
            }).catch(function (error) {
               throw new Error(error);
            });
         });
      }
   }, {
      key: 'initCrewsWidget',
      value: function initCrewsWidget() {
         return this.service.getCrewsForUser(this.userId);
      }
   }, {
      key: 'initStartAndEndWidgets',
      value: function initStartAndEndWidgets() {
         if (!this.userId) {
            throw new Error('userId is mandatory');
         }

         try {
            this.validateStartEndWidgetIds();
            var startFieldIds = this.buildFieldIdsForDateTimeWidget(this.startDateWidgetId);
            var endFieldIds = this.buildFieldIdsForDateTimeWidget(this.endDateWidgetId);
            this.setStartEndElemAttrs(startFieldIds, endFieldIds);
            this.validateStartEndElems();
         } catch (exception) {
            console.error("initStartAndEndWidgets", exception);
         }
         // The date fields for the DateTime widgets
         // do not provide sufficient validation so we will disable them.
         this.startDateElem.disabled = true;
         this.endDateElem.disabled = true;

         return this.service.getDefaultStartAndEndDates(this.userId);
      }
   }, {
      key: 'initShowCompleteTasksWidget',
      value: function initShowCompleteTasksWidget() {
         document.getElementById(this.showCompleteId).checked = this.defaultShowComplete;
      }
   }, {
      key: 'initResultsTable',
      value: function initResultsTable() {
         var _this2 = this;

         // The field names match those in:
         //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
         var listOfLabourAttrs = ['technician', 'labourSkill', 'labourStatus', 'jobStopReason', 'elapsedHoursMinutes', 'scheduledHours', 'actualHours'];

         // Note: it appears that Tabulator has difficulty if visible:false fields are after other fields,
         // so configure them first.	  
         this.table = new Tabulator("#" + this.searchResultsId, {
            columns: [{ title: 'Task Id', field: 'taskId', visible: false }, { title: 'Labour Row Id', field: 'labourRowId', visible: false }, { title: 'From Job Stop', field: 'isFromJobStop', visible: false }, { title: 'Line No', field: 'lineNo', sorter: 'number', align: 'center' }, { title: 'Task', field: 'taskName', sorter: 'string', align: 'center' }, { title: 'Task Status', field: 'taskStatus', sorter: 'string', align: 'center' }, { title: 'Task Class - Subclass', field: 'taskClassSubclass', sorter: 'string', align: 'center' }, { title: 'Task Priority', field: 'taskPriority', sorter: 'string', align: 'center' }, { title: 'Aircraft', field: 'aircraft', sorter: 'string', align: 'center' }, { title: 'Work Package', field: 'workpackage', sorter: 'string', align: 'center' }, { title: 'Work Location', field: 'workLocation', sorter: 'string', align: 'center' }, { title: 'Work Area', field: 'workArea', sorter: 'string', align: 'center' }, { title: 'Scheduled Start Date', field: 'scheduledStartDate', sorter: 'string', align: 'center' }, { title: 'Actual Start Date', field: 'actualStartDate', sorter: 'string', align: 'center' }, { field: 'Selected', align: 'center', width: 50, headerSort: false, formatter: function formatter() {
                  return '<input id="checkBox" type="checkbox">';
               } }, { title: 'Technician', field: 'technician', sorter: 'string', align: 'center' }, { title: 'Skill', field: 'labourSkill', sorter: 'string', align: 'center' }, { title: 'Labour Row Status', field: 'labourStatus', sorter: 'string', align: 'center' }, { title: 'Job Stop Reason', field: 'jobStopReason', sorter: 'string', align: 'center' }, { title: 'Elapsed Time', field: 'elapsedHoursMinutes', sorter: 'string', align: 'center', formatter: this.isElapsedTimeGreaterThanThreshold.bind(this) }, {
               title: 'Sched. Hours',
               field: 'scheduledHours',
               sorter: 'string',
               align: 'center',
               editor: 'input',
               validator: ['min: 0', this.validateHours],
               editable: this.isScheduledHoursCellEditable,
               cellEdited: this.handleScheduleHoursEdit
            }, {
               title: 'Actual Hours',
               field: 'actualHours',
               sorter: 'string',
               align: 'center',
               editor: 'input',
               validator: ['min: 0', this.validateHours],
               editable: this.isActualHoursCellEditable,
               cellEdited: this.handleActualHoursEdit,
               formatter: this.actualHourCellFormatter
            }],
            dataSorted: function dataSorted(sorters, rows) {
               // This check is done as the callback is called before the table has been completely instantiated
               // As a result, an undefined object error message will occur as the setGroupBy is being called on an undefined table
               if (_this2.table) {
                  if (sorters.some(function (attr) {
                     return listOfLabourAttrs.indexOf(attr.field) >= 0;
                  })) {
                     _this2.table.setGroupBy();
                  } else {
                     _this2.table.setGroupBy("taskId");
                  }
               }
            },
            groupHeader: function groupHeader(value, count, data, group) {
               return data[0].taskName + "<span style='color:#000; margin-left:10px;'>(" + count + " items)</span>";
            },
            groupToggleElement: "header",
            placeholder: this.noSearchResultsMessage
         });
      }
   }, {
      key: 'actualHourCellFormatter',
      value: function actualHourCellFormatter(cell) {

         if (!cell) {
            return cell;
         }

         if (this.actualHourGreaterThanScheduledHours(cell)) {
            //format cell background to yellow
            cell.getElement().classList.add("highlightActualHoursCell");
         }

         var time = cell.getValue();
         // Return empty string if Actual Hour value is blank
         // otherwise return Actual Hours value.
         return time ? time : '';
      }
   }, {
      key: 'actualHourGreaterThanScheduledHours',
      value: function actualHourGreaterThanScheduledHours(cell) {

         var actualHours = cell.getValue();
         if (!actualHours) {
            return actualHours;
         }

         var scheduleHours = cell.getRow().getData().scheduledHours;
         if (!scheduleHours) {
            return scheduleHours;
         }

         return parseInt(actualHours) > parseInt(scheduleHours);
      }
   }, {
      key: 'initSearchButton',
      value: function initSearchButton() {
         var _this3 = this;

         var $button = $('#' + this.searchButtonId);
         if (this.isAllowedToSearch) {
            $button.show();
            $button.click(function (event) {
               event.preventDefault();
               _this3.performSearch();
            });
         } else {
            $button.hide();
         }
      }
   }, {
      key: 'performSearch',
      value: function performSearch() {
         var _this4 = this;

         return new Promise(function (resolve, reject) {
            if (_this4.isAllowedToSearch) {
               var args = {
                  'crewId': document.getElementById(_this4.crewsFieldId).value,
                  'startDateTime': _this4.formatDateTime(_this4.startDateWidgetId),
                  'endDateTime': _this4.formatDateTime(_this4.endDateWidgetId),
                  'showCompleteTasks': document.getElementById(_this4.showCompleteId).checked
               };

               return _this4.service.performSearch(args).then(function (response) {
                  _this4.updateResultsTable(response);
               });
            } else {
               resolve();
            }
         });
      }

      //
      // private methods
      //

      // Expect crews to be: [{code,name,id}]

   }, {
      key: 'populateCrewsWidget',
      value: function populateCrewsWidget(crews) {
         // Clear existing options.
         $('#' + this.crewsFieldId).find('option').remove();

         // Sort the crews.
         crews.sort(this.compareCrewAlphanumerically);

         // Add provided crews as options, if provided.
         if (crews) {
            var select = document.getElementById(this.crewsFieldId);
            var selectOptions = select.options;
            crews.forEach(function (crew, index) {
               var option = document.createElement("option");
               option.text = crew.label;
               option.value = crew.id;
               selectOptions.add(option);
            });

            // Set the first crew as the default.
            select.selectedIndex = 0;
         }
      }
   }, {
      key: 'compareCrewAlphanumerically',
      value: function compareCrewAlphanumerically(a, b) {
         if (a.label < b.label) return -1;
         if (a.label > b.label) return 1;
         return 0;
      }

      // Expect message to be a string

   }, {
      key: 'handleFailureToGetCrewsForUser',
      value: function handleFailureToGetCrewsForUser(message) {
         throw new Error(message);
      }
   }, {
      key: 'validateStartEndWidgetIds',
      value: function validateStartEndWidgetIds() {
         if (!this.startDateWidgetId) {
            throw new Error('startFieldId is mandatory');
         }
         if (typeof this.startDateWidgetId !== 'string') {
            throw new Error('startFieldId is not a string');
         }
         if (!this.endDateWidgetId) {
            throw new Error('endFieldId is mandatory');
         }
         if (typeof this.endDateWidgetId !== 'string') {
            throw new Error('endFieldId is not a string');
         }
      }
   }, {
      key: 'buildFieldIdsForDateTimeWidget',
      value: function buildFieldIdsForDateTimeWidget(widgetId) {
         // These ids were determined by looking at the custom tag DateTimeField
         return {
            dateFieldId: widgetId + '_$DATE$',
            timeFieldId: widgetId + '_$TIME$',
            timeZoneFieldId: widgetId + '_$TIMEZONE_DISPLAY$',
            startPickerId: widgetId + '_SelectBtn'
         };
      }
   }, {
      key: 'setStartEndElemAttrs',
      value: function setStartEndElemAttrs(startDateWidgetIds, endDateWidgetIds) {
         this.startDateElem = document.getElementById(startDateWidgetIds.dateFieldId);
         this.startTimeElem = document.getElementById(startDateWidgetIds.timeFieldId);
         this.startTimeZoneElem = document.getElementById(startDateWidgetIds.timeZoneFieldId);
         this.startPickerElem = document.getElementById(startDateWidgetIds.startPickerId);

         this.endDateElem = document.getElementById(endDateWidgetIds.dateFieldId);
         this.endTimeElem = document.getElementById(endDateWidgetIds.timeFieldId);
         this.endTimeZoneElem = document.getElementById(endDateWidgetIds.timeZoneFieldId);
         this.endPickerElem = document.getElementById(endDateWidgetIds.startPickerId);
      }
   }, {
      key: 'validateStartEndElems',
      value: function validateStartEndElems() {
         if (!this.startDateElem) {
            throw new Error('start date field does not exist in the DOM.');
         }
         if (!this.startTimeElem) {
            throw new Error('start time field does not exist in the DOM.');
         }
         if (!this.startTimeZoneElem) {
            throw new Error('start time zone field does not exist in the DOM.');
         }
         if (!this.startPickerElem) {
            throw new Error('start date picker field does not exist in the DOM.');
         }

         if (!this.endDateElem) {
            throw new Error('end date field does not exist in the DOM.');
         }
         if (!this.endTimeElem) {
            throw new Error('end time field does not exist in the DOM.');
         }
         if (!this.endTimeZoneElem) {
            throw new Error('end time zone field does not exist in the DOM.');
         }
         if (!this.endPickerElem) {
            throw new Error('end date picker field does not exist in the DOM.');
         }
      }
   }, {
      key: 'setStartAndEndWidgets',
      value: function setStartAndEndWidgets(defaultStartEndValues) {
         this.startDateElem.value = defaultStartEndValues.startDate;
         this.startTimeElem.value = defaultStartEndValues.startTime;
         this.startTimeZoneElem.value = defaultStartEndValues.startTimeZone;

         this.endDateElem.value = defaultStartEndValues.endDate;
         this.endTimeElem.value = defaultStartEndValues.endTime;
         this.endTimeZoneElem.value = defaultStartEndValues.endTimeZone;
      }
   }, {
      key: 'updateResultsTable',
      value: function updateResultsTable(response) {
         // The response is a json list of objects generated from:
         //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
         var addToTop = true;
         this.table.clearData();
         this.table.addData(response, addToTop);
         this.table.setSort([{ column: 'lineNo', dir: 'asc' }]);
      }

      // Format the date and time to that expected by com.mxi.mx.common.utils.DataTypeUtils

   }, {
      key: 'formatDateTime',
      value: function formatDateTime(dateTimeWidgetId) {
         var fieldIds = this.buildFieldIdsForDateTimeWidget(dateTimeWidgetId);

         var dateValue = document.getElementById(fieldIds.dateFieldId).value;
         var timeValue = document.getElementById(fieldIds.timeFieldId).value;

         return dateValue + ' ' + timeValue;
      }
   }, {
      key: 'isScheduledHoursCellEditable',
      value: function isScheduledHoursCellEditable(cell) {
         if (this.isAllowedToEditSchedledHours) {
            var rowData = cell.getRow().getData();
            if (rowData.isFromJobStop && rowData.labourStatus == 'ACTV') {
               return true;
            }
         }
         return false;
      }
   }, {
      key: 'isActualHoursCellEditable',
      value: function isActualHoursCellEditable(cell) {
         if (this.isAllowedToEditActualHours) {
            var rowData = cell.getRow().getData();
            if (rowData.labourStatus == 'COMPLETE') {
               return true;
            }
         }
         return false;
      }
   }, {
      key: 'isElapsedTimeGreaterThanThreshold',
      value: function isElapsedTimeGreaterThanThreshold(cell) {
         var time = cell.getValue();
         if (time) {
            var decimalTime = _DateTimeValidator2.default.convertTimeToDecimal(time);
            if (decimalTime > parseFloat(this.laborRowElaspedTimeThreshold)) {
               return "<span class='elapsedTimeExceedsThreshold'>" + time + "</span>";
            }
         }

         return time;
      }
   }, {
      key: 'validateHours',
      value: function validateHours(cell, value) {
         return _DateTimeValidator2.default.validateHours(value);
      }
   }, {
      key: 'handleScheduleHoursEdit',
      value: function handleScheduleHoursEdit(cell) {
         var rowData = cell.getRow().getData();
         this.service.updateScheduledHours(rowData.taskId, rowData.labourRowId, cell.getValue());
      }
   }, {
      key: 'handleActualHoursEdit',
      value: function handleActualHoursEdit(cell) {
         var rowData = cell.getRow().getData();
         this.service.updateActualHours(rowData.taskId, rowData.labourRowId, cell.getValue());
      }
   }]);

   return TaskSupervisionController;
}();

exports.default = TaskSupervisionController;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js"), __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js":
/*!****************************************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js ***!
  \****************************************************************************/
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

var _DateTimeHelper = __webpack_require__(/*! ../../../common/util/DateTimeHelper */ "./src/common/util/DateTimeHelper.js");

var _DateTimeHelper2 = _interopRequireDefault(_DateTimeHelper);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

var TaskSupervisionService = function () {
   function TaskSupervisionService() {
      _classCallCheck(this, TaskSupervisionService);

      this.errorMsgPrefix = 'Error code =  ';
   }

   _createClass(TaskSupervisionService, [{
      key: 'getCrewsForUser',
      value: function getCrewsForUser(userId) {
         var _this = this;

         if (!userId) {
            throw new Error('userId is mandatory');
         }

         var crewListRestEndpoint = '/maintenix/rest/crews';
         var args = { 'userId': userId };
         return new Promise(function (resolve, reject) {
            _jquery2.default.ajax({
               url: crewListRestEndpoint,
               type: "GET",
               data: args,
               success: function success(crewResponseList, textStatus, jqXHR) {
                  resolve(crewResponseList);
               },
               error: function error(jqXHR, textStatus, errorThrown) {
                  var message = _this.errorMsgPrefix + jqXHR.status;
                  reject(message);
               }
            });
         });
      }
   }, {
      key: 'getDefaultStartAndEndDates',
      value: function getDefaultStartAndEndDates(userId) {
         var _this2 = this;

         if (!userId) {
            throw new Error('userId is mandatory');
         }

         var currentDateTimeRestEndpoint = '/maintenix/rest/datetime/getCurrent';
         var args = { 'userId': userId };

         return new Promise(function (resolve, reject) {
            _jquery2.default.ajax({
               url: currentDateTimeRestEndpoint,
               type: "GET",
               data: args,
               success: function success(response, textStatus, jqXHR) {
                  var defaultStart = new Date(response.startYear, response.startMonth - 1, response.startDayOfMonth, response.startHourInDay, response.startMinute);
                  var defaultEnd = new Date(response.endYear, response.endMonth - 1, response.endDayOfMonth, response.endHourInDay, response.endMinute);

                  var defaultStartEndValues = {};
                  defaultStartEndValues.startDate = _this2.formatDate(defaultStart);
                  defaultStartEndValues.startTime = _this2.formatTime(defaultStart);
                  defaultStartEndValues.startTimeZone = response.startTimezone;
                  try {
                     _this2.validateDateFormat(defaultStartEndValues.startDate);
                  } catch (error) {
                     reject('default startDate failed validation: ' + error.message);
                  }

                  try {
                     _this2.validateTimeFormat(defaultStartEndValues.startTime);
                  } catch (error) {
                     reject('default startTime failed validation: ' + error.message);
                  }

                  defaultStartEndValues.endDate = _this2.formatDate(defaultEnd);
                  defaultStartEndValues.endTime = _this2.formatTime(defaultEnd);
                  defaultStartEndValues.endTimeZone = response.endTimezone;
                  try {
                     _this2.validateDateFormat(defaultStartEndValues.endDate);
                  } catch (error) {
                     reject('default endDate failed validation: ' + error.message);
                  }
                  try {
                     _this2.validateTimeFormat(defaultStartEndValues.endTime);
                  } catch (error) {
                     reject('default endTime failed validation: ' + error.message);
                  }

                  resolve(defaultStartEndValues);
               },
               error: function error(jqXHR, textStatus, errorThrown) {
                  var message = _this2.errorMsgPrefix + jqXHR.status;
                  reject(message);
               }
            });
         });
      }
   }, {
      key: 'performSearch',
      value: function performSearch(args) {
         var _this3 = this;

         return new Promise(function (resolve, reject) {
            var excludeComplete = args.showCompleteTasks == true ? false : true;

            var searchData = {
               onlyWorkscoped: true,
               onlyContainingLabour: true,
               assignedToCrewId: args.crewId,
               minScheduledStartDateTime: args.startDateTime,
               maxScheduledStartDateTime: args.endDateTime,
               excludeCompleted: excludeComplete
            };

            var listCrewTaskLabourEndpoint = '/maintenix/rest/tasks';

            _jquery2.default.ajax({
               url: listCrewTaskLabourEndpoint,
               data: searchData,
               type: "GET",
               success: function success(response, textStatus, jqXHR) {
                  // The response is a json list of objects generated from:
                  //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
                  resolve(response);
               },
               error: function error(jqXHR, textStatus, errorThrown) {
                  var message = _this3.errorMsgPrefix + jqXHR.status;
                  reject(message);
               }
            });
         });
      }

      // validateHours(value) {
      //    // This is based on the NUMBER(9,5) constraint for
      //    // sched_labour_role.sched_hr and sched_labour_role.actual_hr
      //    let split = value.split('.');
      //    if ( split.length > 0 ) {
      //       if ( split[0].length > 4 ) {
      //          return false;
      //       }
      //       if ( split.length == 2 ) {
      //          if ( split[1].length > 5 ) {
      //             return false;
      //          }
      //       } else if (split.length > 2 ) {
      //          return false;
      //       }
      //    }
      //    return true;
      // }

   }, {
      key: 'updateScheduledHours',
      value: function updateScheduledHours(taskId, labourRowId, newValue) {
         var _this4 = this;

         var data = {
            scheduledHours: newValue
         };
         _jquery2.default.ajax({
            url: '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: function error(jqXHR, textStatus, errorThrown) {
               var message = _this4.errorMsgPrefix + jqXHR.status;
               new Error(message);
            }
         });
      }
   }, {
      key: 'updateActualHours',
      value: function updateActualHours(taskId, labourRowId, newValue) {
         var _this5 = this;

         var data = {
            actualHours: newValue
         };
         _jquery2.default.ajax({
            url: '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: function error(jqXHR, textStatus, errorThrown) {
               var message = _this5.errorMsgPrefix + jqXHR.status;
               new Error(message);
            }
         });
      }

      //
      // private methods
      //

   }, {
      key: 'validateDateFormat',
      value: function validateDateFormat(dateStr) {
         if (!dateStr) {
            throw new Error('dateStr is mandatory.');
         }
         if (typeof dateStr !== 'string') {
            throw new Error('dateStr is not a string');
         }

         // regex example: dd-MMM-yyyy
         var dateFormat = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/;
         var matchArray = dateStr.match(dateFormat);

         if (matchArray == null) {
            throw new Error('dateStr has invalid format.');
         }

         return true;
      }
   }, {
      key: 'validateTimeFormat',
      value: function validateTimeFormat(timeStr) {
         if (!timeStr) {
            throw new Error('timeStr is mandatory.');
         }
         if (typeof timeStr !== 'string') {
            throw new Error('timeStr is not a string.');
         }

         // regex example: hh:mm
         var timeFormat = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
         var matchArray = timeStr.match(timeFormat);

         if (matchArray == null) {
            throw new Error('timeStr has invalid format.');
         }

         return true;
      }
   }, {
      key: 'addHours',
      value: function addHours(date, hours) {
         return new Date(date.getTime() + hours * 60 * 60 * 1000);
      }
   }, {
      key: 'formatDate',
      value: function formatDate(date) {
         var str = (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + this.getMonthShortStr(date.getMonth() + 1) + '-' + date.getFullYear();
         return str;
      }
   }, {
      key: 'formatTime',
      value: function formatTime(date) {
         var str = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
         return str;
      }
   }, {
      key: 'getMonthShortStr',
      value: function getMonthShortStr(month) {
         if (month === 1) return 'JAN';
         if (month === 2) return 'FEB';
         if (month === 3) return 'MAR';
         if (month === 4) return 'APR';
         if (month === 5) return 'MAY';
         if (month === 6) return 'JUN';
         if (month === 7) return 'JUL';
         if (month === 8) return 'AUG';
         if (month === 9) return 'SEP';
         if (month === 10) return 'OCT';
         if (month === 11) return 'NOV';
         if (month === 12) return 'DEC';
         return "";
      }
   }]);

   return TaskSupervisionService;
}();

exports.default = TaskSupervisionService;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! es6-promise-promise */ "./node_modules/es6-promise-promise/index.js")))

/***/ }),

/***/ "./src/basemaintenance/task/tasksupervision/index.js":
/*!***********************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _TaskSupervisionController = __webpack_require__(/*! ./TaskSupervisionController */ "./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js");

var _TaskSupervisionController2 = _interopRequireDefault(_TaskSupervisionController);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

var controllerParms = {
   userId: document.getElementById('idUser').value,
   crewsFieldId: 'idCrewList',
   startFieldId: 'idStartDateTime'
};

var controller = new _TaskSupervisionController2.default(controllerParms);
controller.init();

/***/ }),

/***/ "./src/common/util/DateTimeHelper.js":
/*!*******************************************!*\
  !*** ./src/common/util/DateTimeHelper.js ***!
  \*******************************************/
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

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

var DateTimeHelper = function () {
   function DateTimeHelper() {
      _classCallCheck(this, DateTimeHelper);
   }

   _createClass(DateTimeHelper, null, [{
      key: 'addHours',
      value: function addHours(date, hours) {
         return new Date(date.getTime() + hours * 60 * 60 * 1000);
      }
   }, {
      key: 'formatDate',
      value: function formatDate(date) {
         var str = (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + this.getMonthShortStr(date.getMonth() + 1) + '-' + date.getFullYear();
         return str;
      }
   }, {
      key: 'formatTime',
      value: function formatTime(date) {
         var str = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
         return str;
      }

      // Converts a time in the format hh:mm into its corresponding decimal value

   }, {
      key: 'convertTimeToDecimal',
      value: function convertTimeToDecimal(time) {
         var hoursMinutes = time.split(/[.:]/);
         var hours = parseInt(hoursMinutes[0], 10);
         var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
         return hours + minutes / 60;
      }
   }, {
      key: 'getMonthShortStr',
      value: function getMonthShortStr(month) {
         if (month === 1) return 'JAN';else if (month === 2) return 'FEB';else if (month === 3) return 'MAR';else if (month === 4) return 'APR';else if (month === 5) return 'MAY';else if (month === 6) return 'JUN';else if (month === 7) return 'JUL';else if (month === 8) return 'AUG';else if (month === 9) return 'SEP';else if (month === 10) return 'OCT';else if (month === 11) return 'NOV';else if (month === 12) return 'DEC';else return "";
      }
   }]);

   return DateTimeHelper;
}();

exports.default = DateTimeHelper;

/***/ }),

/***/ "./src/common/validation/DateTimeValidator.js":
/*!****************************************************!*\
  !*** ./src/common/validation/DateTimeValidator.js ***!
  \****************************************************/
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

function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
   }
}

var DateTimeValidator = function () {
   function DateTimeValidator() {
      _classCallCheck(this, DateTimeValidator);
   }

   _createClass(DateTimeValidator, null, [{
      key: 'validateHours',
      value: function validateHours(value) {
         // This is based on the NUMBER(9,5) constraint for
         // sched_labour_role.sched_hr and sched_labour_role.actual_hr
         var split = value.split('.');
         if (split.length > 0) {
            if (split[0].length > 4) {
               return false;
            }
            if (split.length == 2) {
               if (split[1].length > 5) {
                  return false;
               }
            } else if (split.length > 2) {
               return false;
            }
         }
         return true;
      }

      //
      // private methods
      //

   }, {
      key: 'validateDateFormat',
      value: function validateDateFormat(dateStr) {
         if (!dateStr) {
            throw new Error('dateStr is mandatory.');
         }
         if (typeof dateStr !== 'string') {
            throw new Error('dateStr is not a string');
         }

         // regex example: dd-MMM-yyyy
         var dateFormat = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/;
         var matchArray = dateStr.match(dateFormat);

         if (matchArray == null) {
            throw new Error('dateStr has invalid format.');
         }

         return true;
      }
   }, {
      key: 'validateTimeFormat',
      value: function validateTimeFormat(timeStr) {
         if (!timeStr) {
            throw new Error('timeStr is mandatory.');
         }
         if (typeof timeStr !== 'string') {
            throw new Error('timeStr is not a string.');
         }

         // regex example: hh:mm
         var timeFormat = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
         var matchArray = timeStr.match(timeFormat);

         if (matchArray == null) {
            throw new Error('timeStr has invalid format.');
         }

         return true;
      }
   }]);

   return DateTimeValidator;
}();

exports.default = DateTimeValidator;

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

},[["./src/basemaintenance/task/tasksupervision/index.js","common-runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2VtYWludGVuYW5jZS90YXNrL3Rhc2tzdXBlcnZpc2lvbi9UYXNrU3VwZXJ2aXNpb25Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlbWFpbnRlbmFuY2UvdGFzay90YXNrc3VwZXJ2aXNpb24vVGFza1N1cGVydmlzaW9uU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZW1haW50ZW5hbmNlL3Rhc2svdGFza3N1cGVydmlzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbC9EYXRlVGltZUhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3ZhbGlkYXRpb24vRGF0ZVRpbWVWYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlByb21pc2UiLCJnbG9iYWwiLCJmYWN0b3J5Iiwib2JqZWN0T3JGdW5jdGlvbiIsIngiLCJpc0Z1bmN0aW9uIiwiX2lzQXJyYXkiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJsZW4iLCJ2ZXJ0eE5leHQiLCJjdXN0b21TY2hlZHVsZXJGbiIsImFzYXAiLCJjYWxsYmFjayIsImFyZyIsInF1ZXVlIiwiZmx1c2giLCJzY2hlZHVsZUZsdXNoIiwic2V0U2NoZWR1bGVyIiwic2NoZWR1bGVGbiIsInNldEFzYXAiLCJhc2FwRm4iLCJicm93c2VyV2luZG93Iiwid2luZG93IiwiYnJvd3Nlckdsb2JhbCIsIkJyb3dzZXJNdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJpc05vZGUiLCJzZWxmIiwicHJvY2VzcyIsImlzV29ya2VyIiwiVWludDhDbGFtcGVkQXJyYXkiLCJpbXBvcnRTY3JpcHRzIiwiTWVzc2FnZUNoYW5uZWwiLCJ1c2VOZXh0VGljayIsIm5leHRUaWNrIiwidXNlVmVydHhUaW1lciIsInVzZU11dGF0aW9uT2JzZXJ2ZXIiLCJpdGVyYXRpb25zIiwib2JzZXJ2ZXIiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsIm9ic2VydmUiLCJjaGFyYWN0ZXJEYXRhIiwiZGF0YSIsInVzZU1lc3NhZ2VDaGFubmVsIiwiY2hhbm5lbCIsInBvcnQxIiwib25tZXNzYWdlIiwicG9ydDIiLCJwb3N0TWVzc2FnZSIsInVzZVNldFRpbWVvdXQiLCJnbG9iYWxTZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsImkiLCJhdHRlbXB0VmVydHgiLCJyIiwidmVydHgiLCJydW5Pbkxvb3AiLCJydW5PbkNvbnRleHQiLCJlIiwidGhlbiIsIm9uRnVsZmlsbG1lbnQiLCJvblJlamVjdGlvbiIsIl9hcmd1bWVudHMiLCJhcmd1bWVudHMiLCJwYXJlbnQiLCJjaGlsZCIsImNvbnN0cnVjdG9yIiwibm9vcCIsIlBST01JU0VfSUQiLCJtYWtlUHJvbWlzZSIsIl9zdGF0ZSIsImludm9rZUNhbGxiYWNrIiwiX3Jlc3VsdCIsInN1YnNjcmliZSIsInJlc29sdmUiLCJvYmplY3QiLCJDb25zdHJ1Y3RvciIsInByb21pc2UiLCJfcmVzb2x2ZSIsIk1hdGgiLCJyYW5kb20iLCJzdWJzdHJpbmciLCJQRU5ESU5HIiwiRlVMRklMTEVEIiwiUkVKRUNURUQiLCJHRVRfVEhFTl9FUlJPUiIsIkVycm9yT2JqZWN0Iiwic2VsZkZ1bGZpbGxtZW50IiwiVHlwZUVycm9yIiwiY2Fubm90UmV0dXJuT3duIiwiZ2V0VGhlbiIsImVycm9yIiwidHJ5VGhlbiIsInZhbHVlIiwiZnVsZmlsbG1lbnRIYW5kbGVyIiwicmVqZWN0aW9uSGFuZGxlciIsImhhbmRsZUZvcmVpZ25UaGVuYWJsZSIsInRoZW5hYmxlIiwic2VhbGVkIiwiZnVsZmlsbCIsInJlYXNvbiIsIl9yZWplY3QiLCJfbGFiZWwiLCJoYW5kbGVPd25UaGVuYWJsZSIsImhhbmRsZU1heWJlVGhlbmFibGUiLCJtYXliZVRoZW5hYmxlIiwidGhlbiQkIiwicHVibGlzaFJlamVjdGlvbiIsIl9vbmVycm9yIiwicHVibGlzaCIsIl9zdWJzY3JpYmVycyIsImxlbmd0aCIsInN1YnNjcmliZXJzIiwic2V0dGxlZCIsImRldGFpbCIsIlRSWV9DQVRDSF9FUlJPUiIsInRyeUNhdGNoIiwiaGFzQ2FsbGJhY2siLCJzdWNjZWVkZWQiLCJmYWlsZWQiLCJpbml0aWFsaXplUHJvbWlzZSIsInJlc29sdmVyIiwicmVzb2x2ZVByb21pc2UiLCJyZWplY3RQcm9taXNlIiwiaWQiLCJuZXh0SWQiLCJFbnVtZXJhdG9yIiwiaW5wdXQiLCJfaW5zdGFuY2VDb25zdHJ1Y3RvciIsIl9pbnB1dCIsIl9yZW1haW5pbmciLCJfZW51bWVyYXRlIiwidmFsaWRhdGlvbkVycm9yIiwiRXJyb3IiLCJfZWFjaEVudHJ5IiwiZW50cnkiLCJjIiwicmVzb2x2ZSQkIiwiX3RoZW4iLCJfc2V0dGxlZEF0IiwiX3dpbGxTZXR0bGVBdCIsInN0YXRlIiwiZW51bWVyYXRvciIsImFsbCIsImVudHJpZXMiLCJyYWNlIiwiXyIsInJlamVjdCIsIm5lZWRzUmVzb2x2ZXIiLCJuZWVkc05ldyIsIl9zZXRTY2hlZHVsZXIiLCJfc2V0QXNhcCIsIl9hc2FwIiwiX2NhdGNoIiwicG9seWZpbGwiLCJsb2NhbCIsIkZ1bmN0aW9uIiwiUCIsInByb21pc2VUb1N0cmluZyIsImNhc3QiLCJjYWNoZWRTZXRUaW1lb3V0IiwiY2FjaGVkQ2xlYXJUaW1lb3V0IiwiZGVmYXVsdFNldFRpbW91dCIsImRlZmF1bHRDbGVhclRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwicnVuQ2xlYXJUaW1lb3V0IiwibWFya2VyIiwiZHJhaW5pbmciLCJjdXJyZW50UXVldWUiLCJxdWV1ZUluZGV4IiwiY2xlYW5VcE5leHRUaWNrIiwiY29uY2F0IiwiZHJhaW5RdWV1ZSIsInRpbWVvdXQiLCJydW4iLCJhcmdzIiwicHVzaCIsIkl0ZW0iLCJhcnJheSIsImFwcGx5IiwidGl0bGUiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsIm9uIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwicHJlcGVuZExpc3RlbmVyIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3RlbmVycyIsIm5hbWUiLCJiaW5kaW5nIiwiY3dkIiwiY2hkaXIiLCJkaXIiLCJ1bWFzayIsImciLCJldmFsIiwiVGFza1N1cGVydmlzaW9uQ29udHJvbGxlciIsInBhcm1zIiwiY3Jld3NGaWVsZCIsIlRhc2tTdXBlcnZpc2lvblNlcnZpY2UiLCJyZXN1bHRzIiwic3RhcnRGaWVsZElkcyIsImVuZEZpZWxkSWRzIiwiY29uc29sZSIsImxpc3RPZkxhYm91ckF0dHJzIiwiY29sdW1ucyIsImZpZWxkIiwidmlzaWJsZSIsInNvcnRlciIsImFsaWduIiwid2lkdGgiLCJoZWFkZXJTb3J0IiwiZm9ybWF0dGVyIiwiZWRpdG9yIiwidmFsaWRhdG9yIiwiZWRpdGFibGUiLCJjZWxsRWRpdGVkIiwiaGFuZGxlU2NoZWR1bGVIb3Vyc0VkaXQiLCJhY3R1YWxIb3VyQ2VsbEZvcm1hdHRlciIsImRhdGFTb3J0ZWQiLCJhdHRyIiwiZ3JvdXBIZWFkZXIiLCJncm91cFRvZ2dsZUVsZW1lbnQiLCJwbGFjZWhvbGRlciIsIm5vU2VhcmNoUmVzdWx0c01lc3NhZ2UiLCJjZWxsIiwidGltZSIsImFjdHVhbEhvdXJzIiwic2NoZWR1bGVIb3VycyIsInBhcnNlSW50IiwiJGJ1dHRvbiIsIiQiLCJldmVudCIsImNoZWNrZWQiLCJjcmV3cyIsInNlbGVjdCIsInNlbGVjdE9wdGlvbnMiLCJvcHRpb24iLCJjcmV3IiwiYSIsImIiLCJtZXNzYWdlIiwid2lkZ2V0SWQiLCJkYXRlRmllbGRJZCIsInRpbWVGaWVsZElkIiwidGltZVpvbmVGaWVsZElkIiwic3RhcnRQaWNrZXJJZCIsInN0YXJ0RGF0ZVdpZGdldElkcyIsImVuZERhdGVXaWRnZXRJZHMiLCJkZWZhdWx0U3RhcnRFbmRWYWx1ZXMiLCJyZXNwb25zZSIsImFkZFRvVG9wIiwiY29sdW1uIiwiZGF0ZVRpbWVXaWRnZXRJZCIsImZpZWxkSWRzIiwiZGF0ZVZhbHVlIiwidGltZVZhbHVlIiwicm93RGF0YSIsImRlY2ltYWxUaW1lIiwiRGF0ZVRpbWVWYWxpZGF0b3IiLCJwYXJzZUZsb2F0IiwidXNlcklkIiwiY3Jld0xpc3RSZXN0RW5kcG9pbnQiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsImpxWEhSIiwiY3VycmVudERhdGVUaW1lUmVzdEVuZHBvaW50IiwiZGVmYXVsdFN0YXJ0IiwiZGVmYXVsdEVuZCIsImV4Y2x1ZGVDb21wbGV0ZSIsInNlYXJjaERhdGEiLCJvbmx5V29ya3Njb3BlZCIsIm9ubHlDb250YWluaW5nTGFib3VyIiwiYXNzaWduZWRUb0NyZXdJZCIsIm1pblNjaGVkdWxlZFN0YXJ0RGF0ZVRpbWUiLCJtYXhTY2hlZHVsZWRTdGFydERhdGVUaW1lIiwiZXhjbHVkZUNvbXBsZXRlZCIsImxpc3RDcmV3VGFza0xhYm91ckVuZHBvaW50IiwidGFza0lkIiwibGFib3VyUm93SWQiLCJuZXdWYWx1ZSIsInNjaGVkdWxlZEhvdXJzIiwiY29udGVudFR5cGUiLCJKU09OIiwiZGF0ZVN0ciIsImRhdGVGb3JtYXQiLCJtYXRjaEFycmF5IiwidGltZVN0ciIsInRpbWVGb3JtYXQiLCJkYXRlIiwiaG91cnMiLCJzdHIiLCJtb250aCIsImNvbnRyb2xsZXJQYXJtcyIsImNyZXdzRmllbGRJZCIsInN0YXJ0RmllbGRJZCIsImNvbnRyb2xsZXIiLCJEYXRlVGltZUhlbHBlciIsImhvdXJzTWludXRlcyIsIm1pbnV0ZXMiLCJzcGxpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUIsbUJBQUFDLENBQVEsb0dBQVIsRUFBdUJDLE9BQXhDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFRQyxXQUFVQyxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQjtBQUN4QixnQ0FBT0osT0FBUCxPQUFtQixRQUFuQixJQUErQixPQUFPRCxNQUFQLEtBQWtCLFdBQWpELEdBQStEQSxPQUFPQyxPQUFQLEdBQWlCSSxTQUFoRixHQUNBLFFBQTZDLG9DQUFPQSxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0dBQTdDLEdBQ0MsU0FGRDtBQUdILENBSkEsYUFJUSxZQUFZO0FBQUU7O0FBRXZCLFdBQVNDLGdCQUFULENBQTBCQyxDQUExQixFQUE2QjtBQUMzQixXQUFPLE9BQU9BLENBQVAsS0FBYSxVQUFiLElBQTJCLFFBQU9BLENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCQSxNQUFNLElBQWpFO0FBQ0Q7O0FBRUQsV0FBU0MsVUFBVCxDQUFvQkQsQ0FBcEIsRUFBdUI7QUFDckIsV0FBTyxPQUFPQSxDQUFQLEtBQWEsVUFBcEI7QUFDRDs7QUFFRCxNQUFJRSxXQUFXQyxTQUFmO0FBQ0EsTUFBSSxDQUFDQyxNQUFNQyxPQUFYLEVBQW9CO0FBQ2xCSCxlQUFXLGtCQUFVRixDQUFWLEVBQWE7QUFDdEIsYUFBT00sT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCVCxDQUEvQixNQUFzQyxnQkFBN0M7QUFDRCxLQUZEO0FBR0QsR0FKRCxNQUlPO0FBQ0xFLGVBQVdFLE1BQU1DLE9BQWpC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QUFDekI7QUFDQTtBQUNBLGFBQUkwTixRQUFRMU4sWUFBWixHQUFZQSxDQUFaO0FBQ0EsYUFBSzBOLGVBQUwsR0FBd0I7QUFDckIsZ0JBQUtBLGtCQUFMLEdBQTJCO0FBQ3hCO0FBQ0Y7QUFDRCxnQkFBS0EsZ0JBQUwsR0FBeUI7QUFDdEIsbUJBQUtBLGtCQUFMLEdBQTJCO0FBQ3hCO0FBQ0Y7QUFISixtQkFJTyxJQUFJQSxlQUFKLEdBQXVCO0FBQzNCO0FBQ0Y7QUFDSDtBQUNEO0FBQ0Y7O0FBR0Q7QUFDQTtBQUNBOzs7O3lDQUUwQmhCLE8sRUFBUztBQUNoQyxhQUFJLENBQUosU0FBZ0I7QUFDYixrQkFBTSxVQUFOLHVCQUFNLENBQU47QUFDRjtBQUNELGFBQUksbUJBQUosVUFBa0M7QUFDL0Isa0JBQU0sVUFBTix5QkFBTSxDQUFOO0FBQ0Y7O0FBRUQ7QUFDQSxhQUFNQyxhQUFOO0FBQ0EsYUFBTUMsYUFBYUYsY0FBbkIsVUFBbUJBLENBQW5COztBQUVBLGFBQUlFLGNBQUosTUFBeUI7QUFDckIsa0JBQU0sVUFBTiw2QkFBTSxDQUFOO0FBQ0g7O0FBRUQ7QUFDSDs7O3lDQUUwQkMsTyxFQUFTO0FBQ2hDLGFBQUksQ0FBSixTQUFlO0FBQ1osa0JBQU0sVUFBTix1QkFBTSxDQUFOO0FBQ0Y7QUFDRCxhQUFJLG1CQUFKLFVBQWtDO0FBQy9CLGtCQUFNLFVBQU4sMEJBQU0sQ0FBTjtBQUNGOztBQUVEO0FBQ0EsYUFBTUMsYUFBTjtBQUNBLGFBQU1GLGFBQWFDLGNBQW5CLFVBQW1CQSxDQUFuQjs7QUFFQSxhQUFJRCxjQUFKLE1BQXlCO0FBQ3JCLGtCQUFNLFVBQU4sNkJBQU0sQ0FBTjtBQUNIOztBQUVEO0FBQ0Y7Ozs7OztrQkFsRWlCNUIsaUI7Ozs7Ozs7Ozs7O0FDQXJCLGU7Ozs7Ozs7Ozs7O0FDQUEsd0IiLCJmaWxlIjoic3JjL21haW4vd2ViYXBwL2J1bmRsZXMvYmFzZW1haW50ZW5hbmNlL3Rhc2svdGFza3N1cGVydmlzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpLlByb21pc2U7XG4iLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vc3RlZmFucGVubmVyL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDMuMy4xXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsLkVTNlByb21pc2UgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbnZhciBfaXNBcnJheSA9IHVuZGVmaW5lZDtcbmlmICghQXJyYXkuaXNBcnJheSkge1xuICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn0gZWxzZSB7XG4gIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbn1cblxudmFyIGlzQXJyYXkgPSBfaXNBcnJheTtcblxudmFyIGxlbiA9IDA7XG52YXIgdmVydHhOZXh0ID0gdW5kZWZpbmVkO1xudmFyIGN1c3RvbVNjaGVkdWxlckZuID0gdW5kZWZpbmVkO1xuXG52YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICBsZW4gKz0gMjtcbiAgaWYgKGxlbiA9PT0gMikge1xuICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRBc2FwKGFzYXBGbikge1xuICBhc2FwID0gYXNhcEZuO1xufVxuXG52YXIgYnJvd3NlcldpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xudmFyIGJyb3dzZXJHbG9iYWwgPSBicm93c2VyV2luZG93IHx8IHt9O1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICh7fSkudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4vLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxudmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuLy8gbm9kZVxuZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG59XG5cbi8vIHZlcnR4XG5mdW5jdGlvbiB1c2VWZXJ0eFRpbWVyKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZlcnR4TmV4dChmbHVzaCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBlczYtcHJvbWlzZSB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBnbG9iYWxTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU2V0VGltZW91dChmbHVzaCwgMSk7XG4gIH07XG59XG5cbnZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcblxuICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0VmVydHgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHIgPSByZXF1aXJlO1xuICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICByZXR1cm4gdXNlVmVydHhUaW1lcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG52YXIgc2NoZWR1bGVGbHVzaCA9IHVuZGVmaW5lZDtcbi8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG5pZiAoaXNOb2RlKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xufSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xufSBlbHNlIGlmIChpc1dvcmtlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbn0gZWxzZSBpZiAoYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSBhdHRlbXB0VmVydHgoKTtcbn0gZWxzZSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKGNoaWxkW1BST01JU0VfSURdID09PSB1bmRlZmluZWQpIHtcbiAgICBtYWtlUHJvbWlzZShjaGlsZCk7XG4gIH1cblxuICB2YXIgX3N0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICBpZiAoX3N0YXRlKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IF9hcmd1bWVudHNbX3N0YXRlIC0gMV07XG4gICAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gIH1cblxuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZXNvbHZlYCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlXG4gIHBhc3NlZCBgdmFsdWVgLiBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVzb2x2ZSgxKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoMSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZXNvbHZlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHZhbHVlIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgZnVsZmlsbGVkIHdpdGggdGhlIGdpdmVuXG4gIGB2YWx1ZWBcbiovXG5mdW5jdGlvbiByZXNvbHZlKG9iamVjdCkge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgX3Jlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbnZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDE2KTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBQRU5ESU5HID0gdm9pZCAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xuXG52YXIgR0VUX1RIRU5fRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gc2VsZkZ1bGZpbGxtZW50KCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG59XG5cbmZ1bmN0aW9uIGNhbm5vdFJldHVybk93bigpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbihwcm9taXNlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgIHJldHVybiBHRVRfVEhFTl9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgdHJ5IHtcbiAgICB0aGVuLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgYXNhcChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3IgPSB0cnlUaGVuKHRoZW4sIHRoZW5hYmxlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGVuYWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgX3JlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfVxuICB9LCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gRlVMRklMTEVEKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQpIHtcbiAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiYgdGhlbiQkID09PSB0aGVuICYmIG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSkge1xuICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGVuJCQgPT09IEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIEdFVF9USEVOX0VSUk9SLmVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHRoZW4kJCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGVuJCQpKSB7XG4gICAgICBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBzZWxmRnVsZmlsbG1lbnQoKSk7XG4gIH0gZWxzZSBpZiAob2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBnZXRUaGVuKHZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICB9XG5cbiAgcHVibGlzaChwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fc3RhdGUgPSBGVUxGSUxMRUQ7XG5cbiAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgIGFzYXAocHVibGlzaCwgcHJvbWlzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3JlamVjdChwcm9taXNlLCByZWFzb24pIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHByb21pc2UuX3N0YXRlID0gUkVKRUNURUQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICBhc2FwKHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9zdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gIHZhciBsZW5ndGggPSBfc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gIHBhcmVudC5fb25lcnJvciA9IG51bGw7XG5cbiAgX3N1YnNjcmliZXJzW2xlbmd0aF0gPSBjaGlsZDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgUkVKRUNURURdID0gb25SZWplY3Rpb247XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwYXJlbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xuICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgdmFyIHNldHRsZWQgPSBwcm9taXNlLl9zdGF0ZTtcblxuICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQsXG4gICAgICBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9XG4gIH1cblxuICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBFcnJvck9iamVjdCgpIHtcbiAgdGhpcy5lcnJvciA9IG51bGw7XG59XG5cbnZhciBUUllfQ0FUQ0hfRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICB0cnkge1xuICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICByZXR1cm4gVFJZX0NBVENIX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdmFyIGhhc0NhbGxiYWNrID0gaXNGdW5jdGlvbihjYWxsYmFjayksXG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yID0gdW5kZWZpbmVkLFxuICAgICAgc3VjY2VlZGVkID0gdW5kZWZpbmVkLFxuICAgICAgZmFpbGVkID0gdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHZhbHVlID0gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XG5cbiAgICBpZiAodmFsdWUgPT09IFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XG4gICAgICB2YWx1ZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIC8vIG5vb3BcbiAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBGVUxGSUxMRUQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gUkVKRUNURUQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgdHJ5IHtcbiAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xuICAgICAgX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBfcmVqZWN0KHByb21pc2UsIGUpO1xuICB9XG59XG5cbnZhciBpZCA9IDA7XG5mdW5jdGlvbiBuZXh0SWQoKSB7XG4gIHJldHVybiBpZCsrO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gIHByb21pc2VbUFJPTUlTRV9JRF0gPSBpZCsrO1xuICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xufVxuXG5mdW5jdGlvbiBFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcblxuICBpZiAoIXRoaXMucHJvbWlzZVtQUk9NSVNFX0lEXSkge1xuICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gIH1cblxuICBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMubGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICB0aGlzLl9lbnVtZXJhdGUoKTtcbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIF9yZWplY3QodGhpcy5wcm9taXNlLCB2YWxpZGF0aW9uRXJyb3IoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGlvbkVycm9yKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgdmFyIF9pbnB1dCA9IHRoaXMuX2lucHV0O1xuXG4gIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLl9lYWNoRW50cnkoX2lucHV0W2ldLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gIHZhciByZXNvbHZlJCQgPSBjLnJlc29sdmU7XG5cbiAgaWYgKHJlc29sdmUkJCA9PT0gcmVzb2x2ZSkge1xuICAgIHZhciBfdGhlbiA9IGdldFRoZW4oZW50cnkpO1xuXG4gICAgaWYgKF90aGVuID09PSB0aGVuICYmIGVudHJ5Ll9zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgfSBlbHNlIGlmIChjID09PSBQcm9taXNlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBjKG5vb3ApO1xuICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24gKHJlc29sdmUkJCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSQkKGVudHJ5KTtcbiAgICAgIH0pLCBpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fd2lsbFNldHRsZUF0KHJlc29sdmUkJChlbnRyeSksIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24gKHN0YXRlLCBpLCB2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgIGlmIChzdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gKHByb21pc2UsIGkpIHtcbiAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gIHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KFJFSkVDVEVELCBpLCByZWFzb24pO1xuICB9KTtcbn07XG5cbi8qKlxuICBgUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSByZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gVGhlIGFycmF5IGhlcmUgd291bGQgYmUgWyAxLCAyLCAzIF07XG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxuICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZWplY3QobmV3IEVycm9yKFwiMlwiKSk7XG4gIGxldCBwcm9taXNlMyA9IHJlamVjdChuZXcgRXJyb3IoXCIzXCIpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbChlbnRyaWVzKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xufVxuXG4vKipcbiAgYFByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDInKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBQcm9taXNlLnJhY2VgIGlzIGRldGVybWluaXN0aWMgaW4gdGhhdCBvbmx5IHRoZSBzdGF0ZSBvZiB0aGUgZmlyc3RcbiAgc2V0dGxlZCBwcm9taXNlIG1hdHRlcnMuIEZvciBleGFtcGxlLCBldmVuIGlmIG90aGVyIHByb21pc2VzIGdpdmVuIHRvIHRoZVxuICBgcHJvbWlzZXNgIGFycmF5IGFyZ3VtZW50IGFyZSByZXNvbHZlZCwgYnV0IHRoZSBmaXJzdCBzZXR0bGVkIHByb21pc2UgaGFzXG4gIGJlY29tZSByZWplY3RlZCBiZWZvcmUgdGhlIG90aGVyIHByb21pc2VzIGJlY2FtZSBmdWxmaWxsZWQsIHRoZSByZXR1cm5lZFxuICBwcm9taXNlIHdpbGwgYmVjb21lIHJlamVjdGVkOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVuc1xuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIHByb21pc2UgMiBiZWNhbWUgcmVqZWN0ZWQgYmVmb3JlXG4gICAgLy8gcHJvbWlzZSAxIGJlY2FtZSBmdWxmaWxsZWRcbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGV4YW1wbGUgcmVhbC13b3JsZCB1c2UgY2FzZSBpcyBpbXBsZW1lbnRpbmcgdGltZW91dHM6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxuICBgYGBcblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZShlbnRyaWVzKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cbiAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gbmVlZHNSZXNvbHZlcigpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xufVxuXG5mdW5jdGlvbiBuZWVkc05ldygpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbn1cblxuLyoqXG4gIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXG4gIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gIFRlcm1pbm9sb2d5XG4gIC0tLS0tLS0tLS0tXG5cbiAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAtIGB2YWx1ZWAgaXMgYW55IGxlZ2FsIEphdmFTY3JpcHQgdmFsdWUgKGluY2x1ZGluZyB1bmRlZmluZWQsIGEgdGhlbmFibGUsIG9yIGEgcHJvbWlzZSkuXG4gIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gIC0gYHNldHRsZWRgIHRoZSBmaW5hbCByZXN0aW5nIHN0YXRlIG9mIGEgcHJvbWlzZSwgZnVsZmlsbGVkIG9yIHJlamVjdGVkLlxuXG4gIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICBzdGF0ZS4gIFByb21pc2VzIHRoYXQgYXJlIHJlamVjdGVkIGhhdmUgYSByZWplY3Rpb24gcmVhc29uIGFuZCBhcmUgaW4gdGhlXG4gIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICBwcm9taXNlLCB0aGVuIHRoZSBvcmlnaW5hbCBwcm9taXNlJ3Mgc2V0dGxlZCBzdGF0ZSB3aWxsIG1hdGNoIHRoZSB2YWx1ZSdzXG4gIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gIGl0c2VsZiBmdWxmaWxsLlxuXG5cbiAgQmFzaWMgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLVxuXG4gIGBgYGpzXG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgLy8gb24gc3VjY2Vzc1xuICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgLy8gb24gZmFpbHVyZVxuICAgIHJlamVjdChyZWFzb24pO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIEFkdmFuY2VkIFVzYWdlOlxuICAtLS0tLS0tLS0tLS0tLS1cblxuICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXG4gIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gIGBgYGpzXG4gIGZ1bmN0aW9uIGdldEpTT04odXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICBgYGBqc1xuICBQcm9taXNlLmFsbChbXG4gICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xuICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9KTtcbiAgYGBgXG5cbiAgQGNsYXNzIFByb21pc2VcbiAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAY29uc3RydWN0b3JcbiovXG5mdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gIHRoaXNbUFJPTUlTRV9JRF0gPSBuZXh0SWQoKTtcbiAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgaWYgKG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcbiAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSA/IGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IG5lZWRzTmV3KCk7XG4gIH1cbn1cblxuUHJvbWlzZS5hbGwgPSBhbGw7XG5Qcm9taXNlLnJhY2UgPSByYWNlO1xuUHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcblByb21pc2UucmVqZWN0ID0gcmVqZWN0O1xuUHJvbWlzZS5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xuUHJvbWlzZS5fc2V0QXNhcCA9IHNldEFzYXA7XG5Qcm9taXNlLl9hc2FwID0gYXNhcDtcblxuUHJvbWlzZS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBQcm9taXNlLFxuXG4gIC8qKlxuICAgIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIENoYWluaW5nXG4gICAgLS0tLS0tLS1cbiAgXG4gICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gICAgfSk7XG4gIFxuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknLlxuICAgIH0pO1xuICAgIGBgYFxuICAgIElmIHRoZSBkb3duc3RyZWFtIHByb21pc2UgZG9lcyBub3Qgc3BlY2lmeSBhIHJlamVjdGlvbiBoYW5kbGVyLCByZWplY3Rpb24gcmVhc29ucyB3aWxsIGJlIHByb3BhZ2F0ZWQgZnVydGhlciBkb3duc3RyZWFtLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBc3NpbWlsYXRpb25cbiAgICAtLS0tLS0tLS0tLS1cbiAgXG4gICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICByZXRyaWV2ZWQgYXN5bmNocm9ub3VzbHkuIFRoaXMgY2FuIGJlIGFjaGlldmVkIGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gdGhlXG4gICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCBmdWxmaWxscywgd2UnbGwgaGF2ZSB0aGUgdmFsdWUgaGVyZVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgU2ltcGxlIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgcmVzdWx0O1xuICBcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgYXV0aG9yLCBib29rcztcbiAgXG4gICAgdHJ5IHtcbiAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgIGJvb2tzICA9IGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcik7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICBcbiAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcbiAgXG4gICAgfVxuICBcbiAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRBdXRob3IoKS5cbiAgICAgIHRoZW4oZmluZEJvb2tzQnlBdXRob3IpLlxuICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgdGhlblxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICB0aGVuOiB0aGVuLFxuXG4gIC8qKlxuICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuICBcbiAgICBgYGBqc1xuICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgIH1cbiAgXG4gICAgLy8gc3luY2hyb25vdXNcbiAgICB0cnkge1xuICAgICAgZmluZEF1dGhvcigpO1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH1cbiAgXG4gICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCBjYXRjaFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gICdjYXRjaCc6IGZ1bmN0aW9uIF9jYXRjaChvblJlamVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgICB2YXIgbG9jYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICBpZiAoUCkge1xuICAgICAgICB2YXIgcHJvbWlzZVRvU3RyaW5nID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb21pc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlVG9TdHJpbmcgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NhbC5Qcm9taXNlID0gUHJvbWlzZTtcbn1cblxucG9seWZpbGwoKTtcbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UucG9seWZpbGwgPSBwb2x5ZmlsbDtcblByb21pc2UuUHJvbWlzZSA9IFByb21pc2U7XG5cbnJldHVybiBQcm9taXNlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXM2LXByb21pc2UubWFwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuIiwiLyogZ2xvYmFsIFRhYnVsYXRvciAqL1xyXG5pbXBvcnQgVGFza1N1cGVydmlzaW9uU2VydmljZSBmcm9tICcuL1Rhc2tTdXBlcnZpc2lvblNlcnZpY2UnO1xyXG5pbXBvcnQgRGF0ZVRpbWVWYWxpZGF0b3IgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3ZhbGlkYXRpb24vRGF0ZVRpbWVWYWxpZGF0b3InO1xyXG5pbXBvcnQgRGF0ZVRpbWVIZWxwZXIgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWwvRGF0ZVRpbWVIZWxwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza1N1cGVydmlzaW9uQ29udHJvbGxlciB7XHJcblxyXG4gICBjb25zdHJ1Y3RvcihwYXJtcykge1xyXG4gICAgICB0aGlzLnVzZXJJZCA9IHBhcm1zLnVzZXJJZDtcclxuXHJcbiAgICAgIGlmICghdGhpcy51c2VySWQpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2VySWQgaXMgbWFuZGF0b3J5Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY3Jld3NGaWVsZElkID0gcGFybXMuY3Jld3NGaWVsZElkO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmNyZXdzRmllbGRJZCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyZXdzRmllbGRJZCBpcyBtYW5kYXRvcnknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGNyZXdzRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNyZXdzRmllbGRJZCk7XHJcbiAgICAgIGlmICghY3Jld3NGaWVsZCB8fCBjcmV3c0ZpZWxkLnRhZ05hbWUgIT0gJ1NFTEVDVCcpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcmV3c0ZpZWxkSWQgbXVzdCBiZSBhIFNFTEVDVCBlbGVtZW50Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2VydmljZSA9IHBhcm1zLlRhc2tTdXBlcnZpc2lvblNlcnZpY2UgfHwgbmV3IFRhc2tTdXBlcnZpc2lvblNlcnZpY2UoKTtcclxuICAgICAgdGhpcy5pc0FsbG93ZWRUb1NlYXJjaCA9IHBhcm1zLmlzQWxsb3dlZFRvU2VhcmNoID09PSAndHJ1ZSc7XHJcbiAgICAgIHRoaXMuaXNBbGxvd2VkVG9FZGl0U2NoZWRsZWRIb3VycyA9IHBhcm1zLmlzQWxsb3dlZFRvRWRpdFNjaGVkbGVkSG91cnMgPT09ICd0cnVlJztcclxuICAgICAgdGhpcy5pc0FsbG93ZWRUb0VkaXRBY3R1YWxIb3VycyA9IHBhcm1zLmlzQWxsb3dlZFRvRWRpdEFjdHVhbEhvdXJzID09PSAndHJ1ZSc7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlV2lkZ2V0SWQgPSBwYXJtcy5zdGFydEZpZWxkSWQ7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZVdpZGdldElkID0gcGFybXMuZW5kRmllbGRJZDtcclxuICAgICAgdGhpcy5zaG93Q29tcGxldGVJZCA9IHBhcm1zLnNob3dDb21wbGV0ZUlkO1xyXG4gICAgICB0aGlzLnNlYXJjaEJ1dHRvbklkID0gcGFybXMuc2VhcmNoQnV0dG9uSWQ7XHJcbiAgICAgIHRoaXMuc2VhcmNoUmVzdWx0c0lkID0gcGFybXMuc2VhcmNoUmVzdWx0c0lkO1xyXG4gICAgICB0aGlzLm5vU2VhcmNoUmVzdWx0c01lc3NhZ2UgPSBwYXJtcy5ub1NlYXJjaFJlc3VsdHNNZXNzYWdlO1xyXG4gICAgICB0aGlzLmxhYm9yUm93RWxhc3BlZFRpbWVUaHJlc2hvbGQgPSBwYXJtcy5sYWJvclJvd0VsYXNwZWRUaW1lVGhyZXNob2xkO1xyXG5cclxuICAgICAgdGhpcy5kZWZhdWx0U2hvd0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pc1NjaGVkdWxlZEhvdXJzQ2VsbEVkaXRhYmxlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuaGFuZGxlU2NoZWR1bGVIb3Vyc0VkaXQuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5oYW5kbGVBY3R1YWxIb3Vyc0VkaXQuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5hY3R1YWxIb3VyQ2VsbEZvcm1hdHRlci5iaW5kKHRoaXMpO1xyXG4gICB9XHJcblxyXG4gICBnZXRTZXJ2aWNlSW5zdGFuY2UoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2U7XHJcbiAgIH1cclxuXHJcbiAgIGluaXQoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgIHRoaXMuaW5pdFNob3dDb21wbGV0ZVRhc2tzV2lkZ2V0KCk7XHJcbiAgICAgICAgIHRoaXMuaW5pdFJlc3VsdHNUYWJsZSgpO1xyXG4gICAgICAgICB0aGlzLmluaXRTZWFyY2hCdXR0b24oKTtcclxuXHJcbiAgICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmluaXRDcmV3c1dpZGdldCgpLCB0aGlzLmluaXRTdGFydEFuZEVuZFdpZGdldHMoKV0pLnRoZW4oKHJlc3VsdHMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUNyZXdzV2lkZ2V0KHJlc3VsdHNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0QW5kRW5kV2lkZ2V0cyhyZXN1bHRzWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJmb3JtU2VhcmNoKCkudGhlbigoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBpbml0Q3Jld3NXaWRnZXQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0Q3Jld3NGb3JVc2VyKHRoaXMudXNlcklkKTtcclxuICAgfVxyXG5cclxuICAgaW5pdFN0YXJ0QW5kRW5kV2lkZ2V0cygpIHtcclxuICAgICAgaWYgKCF0aGlzLnVzZXJJZCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJJZCBpcyBtYW5kYXRvcnknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICAgdGhpcy52YWxpZGF0ZVN0YXJ0RW5kV2lkZ2V0SWRzKCk7XHJcbiAgICAgICAgIGxldCBzdGFydEZpZWxkSWRzID0gdGhpcy5idWlsZEZpZWxkSWRzRm9yRGF0ZVRpbWVXaWRnZXQodGhpcy5zdGFydERhdGVXaWRnZXRJZCk7XHJcbiAgICAgICAgIGxldCBlbmRGaWVsZElkcyA9IHRoaXMuYnVpbGRGaWVsZElkc0ZvckRhdGVUaW1lV2lkZ2V0KHRoaXMuZW5kRGF0ZVdpZGdldElkKTtcclxuICAgICAgICAgdGhpcy5zZXRTdGFydEVuZEVsZW1BdHRycyhzdGFydEZpZWxkSWRzLCBlbmRGaWVsZElkcyk7XHJcbiAgICAgICAgIHRoaXMudmFsaWRhdGVTdGFydEVuZEVsZW1zKCk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xyXG4gICAgICAgICBjb25zb2xlLmVycm9yKFwiaW5pdFN0YXJ0QW5kRW5kV2lkZ2V0c1wiLCBleGNlcHRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRoZSBkYXRlIGZpZWxkcyBmb3IgdGhlIERhdGVUaW1lIHdpZGdldHNcclxuICAgICAgLy8gZG8gbm90IHByb3ZpZGUgc3VmZmljaWVudCB2YWxpZGF0aW9uIHNvIHdlIHdpbGwgZGlzYWJsZSB0aGVtLlxyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZUVsZW0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVuZERhdGVFbGVtLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0RGVmYXVsdFN0YXJ0QW5kRW5kRGF0ZXModGhpcy51c2VySWQpO1xyXG4gICB9XHJcblxyXG4gICBpbml0U2hvd0NvbXBsZXRlVGFza3NXaWRnZXQoKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2hvd0NvbXBsZXRlSWQpLmNoZWNrZWQgPSB0aGlzLmRlZmF1bHRTaG93Q29tcGxldGU7XHJcbiAgIH1cclxuXHJcblxyXG4gICBpbml0UmVzdWx0c1RhYmxlKCkge1xyXG4gICAgICAvLyBUaGUgZmllbGQgbmFtZXMgbWF0Y2ggdGhvc2UgaW46XHJcbiAgICAgIC8vICAgIGNvbS5teGkubXgud2ViLnJlc3QudGFzay5DcmV3VGFza0xhYm91clJlc3BvbnNlXHJcbiAgICAgIGNvbnN0IGxpc3RPZkxhYm91ckF0dHJzID0gWyd0ZWNobmljaWFuJywgJ2xhYm91clNraWxsJywgJ2xhYm91clN0YXR1cycsICdqb2JTdG9wUmVhc29uJywgJ2VsYXBzZWRIb3Vyc01pbnV0ZXMnLFxyXG4gICAgICAgICAnc2NoZWR1bGVkSG91cnMnLCAnYWN0dWFsSG91cnMnXHJcbiAgICAgIF07XHJcblxyXG4gICAgICAvLyBOb3RlOiBpdCBhcHBlYXJzIHRoYXQgVGFidWxhdG9yIGhhcyBkaWZmaWN1bHR5IGlmIHZpc2libGU6ZmFsc2UgZmllbGRzIGFyZSBhZnRlciBvdGhlciBmaWVsZHMsXHJcbiAgICAgIC8vIHNvIGNvbmZpZ3VyZSB0aGVtIGZpcnN0Llx0ICBcclxuICAgICAgdGhpcy50YWJsZSA9IG5ldyBUYWJ1bGF0b3IoXCIjXCIgKyB0aGlzLnNlYXJjaFJlc3VsdHNJZCwge1xyXG4gICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdUYXNrIElkJywgZmllbGQ6ICd0YXNrSWQnLCB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnTGFib3VyIFJvdyBJZCcsIGZpZWxkOiAnbGFib3VyUm93SWQnLCB2aXNpYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnRnJvbSBKb2IgU3RvcCcsIGZpZWxkOiAnaXNGcm9tSm9iU3RvcCcsIHZpc2libGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdMaW5lIE5vJywgZmllbGQ6ICdsaW5lTm8nLCBzb3J0ZXI6ICdudW1iZXInLCBhbGlnbjogJ2NlbnRlcicgfSxcclxuICAgICAgICAgICAgeyB0aXRsZTogJ1Rhc2snLCBmaWVsZDogJ3Rhc2tOYW1lJywgc29ydGVyOiAnc3RyaW5nJywgYWxpZ246ICdjZW50ZXInIH0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdUYXNrIFN0YXR1cycsIGZpZWxkOiAndGFza1N0YXR1cycsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnVGFzayBDbGFzcyAtIFN1YmNsYXNzJywgZmllbGQ6ICd0YXNrQ2xhc3NTdWJjbGFzcycsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnVGFzayBQcmlvcml0eScsIGZpZWxkOiAndGFza1ByaW9yaXR5Jywgc29ydGVyOiAnc3RyaW5nJywgYWxpZ246ICdjZW50ZXInIH0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdBaXJjcmFmdCcsIGZpZWxkOiAnYWlyY3JhZnQnLCBzb3J0ZXI6ICdzdHJpbmcnLCBhbGlnbjogJ2NlbnRlcicgfSxcclxuICAgICAgICAgICAgeyB0aXRsZTogJ1dvcmsgUGFja2FnZScsIGZpZWxkOiAnd29ya3BhY2thZ2UnLCBzb3J0ZXI6ICdzdHJpbmcnLCBhbGlnbjogJ2NlbnRlcicgfSxcclxuICAgICAgICAgICAgeyB0aXRsZTogJ1dvcmsgTG9jYXRpb24nLCBmaWVsZDogJ3dvcmtMb2NhdGlvbicsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnV29yayBBcmVhJywgZmllbGQ6ICd3b3JrQXJlYScsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnU2NoZWR1bGVkIFN0YXJ0IERhdGUnLCBmaWVsZDogJ3NjaGVkdWxlZFN0YXJ0RGF0ZScsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnQWN0dWFsIFN0YXJ0IERhdGUnLCBmaWVsZDogJ2FjdHVhbFN0YXJ0RGF0ZScsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiAnU2VsZWN0ZWQnLCBhbGlnbjogJ2NlbnRlcicsIHdpZHRoOiA1MCwgaGVhZGVyU29ydDogZmFsc2UsIGZvcm1hdHRlcjogKCkgPT4geyByZXR1cm4gJzxpbnB1dCBpZD1cImNoZWNrQm94XCIgdHlwZT1cImNoZWNrYm94XCI+JzsgfSB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnVGVjaG5pY2lhbicsIGZpZWxkOiAndGVjaG5pY2lhbicsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJyB9LFxyXG4gICAgICAgICAgICB7IHRpdGxlOiAnU2tpbGwnLCBmaWVsZDogJ2xhYm91clNraWxsJywgc29ydGVyOiAnc3RyaW5nJywgYWxpZ246ICdjZW50ZXInIH0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdMYWJvdXIgUm93IFN0YXR1cycsIGZpZWxkOiAnbGFib3VyU3RhdHVzJywgc29ydGVyOiAnc3RyaW5nJywgYWxpZ246ICdjZW50ZXInIH0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6ICdKb2IgU3RvcCBSZWFzb24nLCBmaWVsZDogJ2pvYlN0b3BSZWFzb24nLCBzb3J0ZXI6ICdzdHJpbmcnLCBhbGlnbjogJ2NlbnRlcicgfSxcclxuICAgICAgICAgICAgeyB0aXRsZTogJ0VsYXBzZWQgVGltZScsIGZpZWxkOiAnZWxhcHNlZEhvdXJzTWludXRlcycsIHNvcnRlcjogJ3N0cmluZycsIGFsaWduOiAnY2VudGVyJywgZm9ybWF0dGVyOiB0aGlzLmlzRWxhcHNlZFRpbWVHcmVhdGVyVGhhblRocmVzaG9sZC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGl0bGU6ICdTY2hlZC4gSG91cnMnLFxyXG4gICAgICAgICAgICAgICBmaWVsZDogJ3NjaGVkdWxlZEhvdXJzJyxcclxuICAgICAgICAgICAgICAgc29ydGVyOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICBlZGl0b3I6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICAgIHZhbGlkYXRvcjogWydtaW46IDAnLCB0aGlzLnZhbGlkYXRlSG91cnNdLFxyXG4gICAgICAgICAgICAgICBlZGl0YWJsZTogdGhpcy5pc1NjaGVkdWxlZEhvdXJzQ2VsbEVkaXRhYmxlLFxyXG4gICAgICAgICAgICAgICBjZWxsRWRpdGVkOiB0aGlzLmhhbmRsZVNjaGVkdWxlSG91cnNFZGl0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGl0bGU6ICdBY3R1YWwgSG91cnMnLFxyXG4gICAgICAgICAgICAgICBmaWVsZDogJ2FjdHVhbEhvdXJzJyxcclxuICAgICAgICAgICAgICAgc29ydGVyOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICBlZGl0b3I6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICAgIHZhbGlkYXRvcjogWydtaW46IDAnLCB0aGlzLnZhbGlkYXRlSG91cnNdLFxyXG4gICAgICAgICAgICAgICBlZGl0YWJsZTogdGhpcy5pc0FjdHVhbEhvdXJzQ2VsbEVkaXRhYmxlLFxyXG4gICAgICAgICAgICAgICBjZWxsRWRpdGVkOiB0aGlzLmhhbmRsZUFjdHVhbEhvdXJzRWRpdCxcclxuICAgICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLmFjdHVhbEhvdXJDZWxsRm9ybWF0dGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgXSxcclxuICAgICAgICAgZGF0YVNvcnRlZDogKHNvcnRlcnMsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgLy8gVGhpcyBjaGVjayBpcyBkb25lIGFzIHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgYmVmb3JlIHRoZSB0YWJsZSBoYXMgYmVlbiBjb21wbGV0ZWx5IGluc3RhbnRpYXRlZFxyXG4gICAgICAgICAgICAvLyBBcyBhIHJlc3VsdCwgYW4gdW5kZWZpbmVkIG9iamVjdCBlcnJvciBtZXNzYWdlIHdpbGwgb2NjdXIgYXMgdGhlIHNldEdyb3VwQnkgaXMgYmVpbmcgY2FsbGVkIG9uIGFuIHVuZGVmaW5lZCB0YWJsZVxyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJsZSkge1xyXG4gICAgICAgICAgICAgICBpZiAoc29ydGVycy5zb21lKChhdHRyKSA9PiBsaXN0T2ZMYWJvdXJBdHRycy5pbmRleE9mKGF0dHIuZmllbGQpID49IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFibGUuc2V0R3JvdXBCeSgpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlLnNldEdyb3VwQnkoXCJ0YXNrSWRcIik7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBncm91cEhlYWRlcjogKHZhbHVlLCBjb3VudCwgZGF0YSwgZ3JvdXApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0udGFza05hbWUgKyBcIjxzcGFuIHN0eWxlPSdjb2xvcjojMDAwOyBtYXJnaW4tbGVmdDoxMHB4Oyc+KFwiICsgY291bnQgKyBcIiBpdGVtcyk8L3NwYW4+XCI7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIGdyb3VwVG9nZ2xlRWxlbWVudDogXCJoZWFkZXJcIixcclxuICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMubm9TZWFyY2hSZXN1bHRzTWVzc2FnZVxyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuXHJcbiAgIGFjdHVhbEhvdXJDZWxsRm9ybWF0dGVyKGNlbGwpIHtcclxuXHJcbiAgICAgIGlmICghY2VsbCkge1xyXG4gICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuYWN0dWFsSG91ckdyZWF0ZXJUaGFuU2NoZWR1bGVkSG91cnMoY2VsbCkpIHtcclxuICAgICAgICAgLy9mb3JtYXQgY2VsbCBiYWNrZ3JvdW5kIHRvIHllbGxvd1xyXG4gICAgICAgICBjZWxsLmdldEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0QWN0dWFsSG91cnNDZWxsXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgdGltZSA9IGNlbGwuZ2V0VmFsdWUoKTtcclxuICAgICAgLy8gUmV0dXJuIGVtcHR5IHN0cmluZyBpZiBBY3R1YWwgSG91ciB2YWx1ZSBpcyBibGFua1xyXG4gICAgICAvLyBvdGhlcndpc2UgcmV0dXJuIEFjdHVhbCBIb3VycyB2YWx1ZS5cclxuICAgICAgcmV0dXJuICh0aW1lID8gdGltZSA6ICcnKTtcclxuICAgfVxyXG5cclxuICAgYWN0dWFsSG91ckdyZWF0ZXJUaGFuU2NoZWR1bGVkSG91cnMoY2VsbCkge1xyXG5cclxuICAgICAgbGV0IGFjdHVhbEhvdXJzID0gY2VsbC5nZXRWYWx1ZSgpO1xyXG4gICAgICBpZiAoIWFjdHVhbEhvdXJzKSB7XHJcbiAgICAgICAgIHJldHVybiBhY3R1YWxIb3VycztcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHNjaGVkdWxlSG91cnMgPSBjZWxsLmdldFJvdygpLmdldERhdGEoKS5zY2hlZHVsZWRIb3VycztcclxuICAgICAgaWYgKCFzY2hlZHVsZUhvdXJzKSB7XHJcbiAgICAgICAgIHJldHVybiBzY2hlZHVsZUhvdXJzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGFyc2VJbnQoYWN0dWFsSG91cnMpID4gcGFyc2VJbnQoc2NoZWR1bGVIb3Vycyk7XHJcbiAgIH1cclxuXHJcbiAgIGluaXRTZWFyY2hCdXR0b24oKSB7XHJcbiAgICAgIGxldCAkYnV0dG9uID0gJCgnIycgKyB0aGlzLnNlYXJjaEJ1dHRvbklkKTtcclxuICAgICAgaWYgKHRoaXMuaXNBbGxvd2VkVG9TZWFyY2gpIHtcclxuICAgICAgICAgJGJ1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgICRidXR0b24uY2xpY2soKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVNlYXJjaCgpO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgJGJ1dHRvbi5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgcGVyZm9ybVNlYXJjaCgpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgaWYgKHRoaXMuaXNBbGxvd2VkVG9TZWFyY2gpIHtcclxuICAgICAgICAgICAgbGV0IGFyZ3MgPSB7XHJcbiAgICAgICAgICAgICAgICdjcmV3SWQnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNyZXdzRmllbGRJZCkudmFsdWUsXHJcbiAgICAgICAgICAgICAgICdzdGFydERhdGVUaW1lJzogdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnN0YXJ0RGF0ZVdpZGdldElkKSxcclxuICAgICAgICAgICAgICAgJ2VuZERhdGVUaW1lJzogdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLmVuZERhdGVXaWRnZXRJZCksXHJcbiAgICAgICAgICAgICAgICdzaG93Q29tcGxldGVUYXNrcyc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2hvd0NvbXBsZXRlSWQpLmNoZWNrZWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UucGVyZm9ybVNlYXJjaChhcmdzKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSZXN1bHRzVGFibGUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvL1xyXG4gICAvLyBwcml2YXRlIG1ldGhvZHNcclxuICAgLy9cclxuXHJcbiAgIC8vIEV4cGVjdCBjcmV3cyB0byBiZTogW3tjb2RlLG5hbWUsaWR9XVxyXG4gICBwb3B1bGF0ZUNyZXdzV2lkZ2V0KGNyZXdzKSB7XHJcbiAgICAgIC8vIENsZWFyIGV4aXN0aW5nIG9wdGlvbnMuXHJcbiAgICAgICQoJyMnICsgdGhpcy5jcmV3c0ZpZWxkSWQpLmZpbmQoJ29wdGlvbicpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgLy8gU29ydCB0aGUgY3Jld3MuXHJcbiAgICAgIGNyZXdzLnNvcnQodGhpcy5jb21wYXJlQ3Jld0FscGhhbnVtZXJpY2FsbHkpO1xyXG5cclxuICAgICAgLy8gQWRkIHByb3ZpZGVkIGNyZXdzIGFzIG9wdGlvbnMsIGlmIHByb3ZpZGVkLlxyXG4gICAgICBpZiAoY3Jld3MpIHtcclxuICAgICAgICAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuY3Jld3NGaWVsZElkKTtcclxuICAgICAgICAgbGV0IHNlbGVjdE9wdGlvbnMgPSBzZWxlY3Qub3B0aW9ucztcclxuICAgICAgICAgY3Jld3MuZm9yRWFjaCgoY3JldywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gY3Jldy5sYWJlbDtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gY3Jldy5pZDtcclxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucy5hZGQob3B0aW9uKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBTZXQgdGhlIGZpcnN0IGNyZXcgYXMgdGhlIGRlZmF1bHQuXHJcbiAgICAgICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBjb21wYXJlQ3Jld0FscGhhbnVtZXJpY2FsbHkoYSwgYikge1xyXG4gICAgICBpZiAoYS5sYWJlbCA8IGIubGFiZWwpIHJldHVybiAtMTtcclxuICAgICAgaWYgKGEubGFiZWwgPiBiLmxhYmVsKSByZXR1cm4gMTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgIH1cclxuXHJcbiAgIC8vIEV4cGVjdCBtZXNzYWdlIHRvIGJlIGEgc3RyaW5nXHJcbiAgIGhhbmRsZUZhaWx1cmVUb0dldENyZXdzRm9yVXNlcihtZXNzYWdlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgfVxyXG5cclxuICAgdmFsaWRhdGVTdGFydEVuZFdpZGdldElkcygpIHtcclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0RGF0ZVdpZGdldElkKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnRGaWVsZElkIGlzIG1hbmRhdG9yeScpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zdGFydERhdGVXaWRnZXRJZCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydEZpZWxkSWQgaXMgbm90IGEgc3RyaW5nJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmVuZERhdGVXaWRnZXRJZCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VuZEZpZWxkSWQgaXMgbWFuZGF0b3J5Jyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmVuZERhdGVXaWRnZXRJZCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbmRGaWVsZElkIGlzIG5vdCBhIHN0cmluZycpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGJ1aWxkRmllbGRJZHNGb3JEYXRlVGltZVdpZGdldCh3aWRnZXRJZCkge1xyXG4gICAgICAvLyBUaGVzZSBpZHMgd2VyZSBkZXRlcm1pbmVkIGJ5IGxvb2tpbmcgYXQgdGhlIGN1c3RvbSB0YWcgRGF0ZVRpbWVGaWVsZFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICBkYXRlRmllbGRJZDogd2lkZ2V0SWQgKyAnXyREQVRFJCcsXHJcbiAgICAgICAgIHRpbWVGaWVsZElkOiB3aWRnZXRJZCArICdfJFRJTUUkJyxcclxuICAgICAgICAgdGltZVpvbmVGaWVsZElkOiB3aWRnZXRJZCArICdfJFRJTUVaT05FX0RJU1BMQVkkJyxcclxuICAgICAgICAgc3RhcnRQaWNrZXJJZDogd2lkZ2V0SWQgKyAnX1NlbGVjdEJ0bidcclxuICAgICAgfTtcclxuICAgfVxyXG5cclxuICAgc2V0U3RhcnRFbmRFbGVtQXR0cnMoc3RhcnREYXRlV2lkZ2V0SWRzLCBlbmREYXRlV2lkZ2V0SWRzKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0YXJ0RGF0ZVdpZGdldElkcy5kYXRlRmllbGRJZCk7XHJcbiAgICAgIHRoaXMuc3RhcnRUaW1lRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0YXJ0RGF0ZVdpZGdldElkcy50aW1lRmllbGRJZCk7XHJcbiAgICAgIHRoaXMuc3RhcnRUaW1lWm9uZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdGFydERhdGVXaWRnZXRJZHMudGltZVpvbmVGaWVsZElkKTtcclxuICAgICAgdGhpcy5zdGFydFBpY2tlckVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdGFydERhdGVXaWRnZXRJZHMuc3RhcnRQaWNrZXJJZCk7XHJcblxyXG4gICAgICB0aGlzLmVuZERhdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZW5kRGF0ZVdpZGdldElkcy5kYXRlRmllbGRJZCk7XHJcbiAgICAgIHRoaXMuZW5kVGltZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbmREYXRlV2lkZ2V0SWRzLnRpbWVGaWVsZElkKTtcclxuICAgICAgdGhpcy5lbmRUaW1lWm9uZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbmREYXRlV2lkZ2V0SWRzLnRpbWVab25lRmllbGRJZCk7XHJcbiAgICAgIHRoaXMuZW5kUGlja2VyRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVuZERhdGVXaWRnZXRJZHMuc3RhcnRQaWNrZXJJZCk7XHJcbiAgIH1cclxuXHJcbiAgIHZhbGlkYXRlU3RhcnRFbmRFbGVtcygpIHtcclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0RGF0ZUVsZW0pIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBkYXRlIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0VGltZUVsZW0pIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCB0aW1lIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0VGltZVpvbmVFbGVtKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnQgdGltZSB6b25lIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0UGlja2VyRWxlbSkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXJ0IGRhdGUgcGlja2VyIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5lbmREYXRlRWxlbSkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VuZCBkYXRlIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmVuZFRpbWVFbGVtKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW5kIHRpbWUgZmllbGQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIERPTS4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuZW5kVGltZVpvbmVFbGVtKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW5kIHRpbWUgem9uZSBmaWVsZCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgRE9NLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5lbmRQaWNrZXJFbGVtKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW5kIGRhdGUgcGlja2VyIGZpZWxkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBET00uJyk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgc2V0U3RhcnRBbmRFbmRXaWRnZXRzKGRlZmF1bHRTdGFydEVuZFZhbHVlcykge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZUVsZW0udmFsdWUgPSBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuc3RhcnREYXRlO1xyXG4gICAgICB0aGlzLnN0YXJ0VGltZUVsZW0udmFsdWUgPSBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuc3RhcnRUaW1lO1xyXG4gICAgICB0aGlzLnN0YXJ0VGltZVpvbmVFbGVtLnZhbHVlID0gZGVmYXVsdFN0YXJ0RW5kVmFsdWVzLnN0YXJ0VGltZVpvbmU7XHJcblxyXG4gICAgICB0aGlzLmVuZERhdGVFbGVtLnZhbHVlID0gZGVmYXVsdFN0YXJ0RW5kVmFsdWVzLmVuZERhdGU7XHJcbiAgICAgIHRoaXMuZW5kVGltZUVsZW0udmFsdWUgPSBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuZW5kVGltZTtcclxuICAgICAgdGhpcy5lbmRUaW1lWm9uZUVsZW0udmFsdWUgPSBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuZW5kVGltZVpvbmU7XHJcbiAgIH1cclxuXHJcblxyXG4gICB1cGRhdGVSZXN1bHRzVGFibGUocmVzcG9uc2UpIHtcclxuICAgICAgLy8gVGhlIHJlc3BvbnNlIGlzIGEganNvbiBsaXN0IG9mIG9iamVjdHMgZ2VuZXJhdGVkIGZyb206XHJcbiAgICAgIC8vICAgIGNvbS5teGkubXgud2ViLnJlc3QudGFzay5DcmV3VGFza0xhYm91clJlc3BvbnNlXHJcbiAgICAgIGxldCBhZGRUb1RvcCA9IHRydWU7XHJcbiAgICAgIHRoaXMudGFibGUuY2xlYXJEYXRhKCk7XHJcbiAgICAgIHRoaXMudGFibGUuYWRkRGF0YShyZXNwb25zZSwgYWRkVG9Ub3ApO1xyXG4gICAgICB0aGlzLnRhYmxlLnNldFNvcnQoW3sgY29sdW1uOiAnbGluZU5vJywgZGlyOiAnYXNjJyB9XSk7XHJcbiAgIH1cclxuXHJcblxyXG4gICAvLyBGb3JtYXQgdGhlIGRhdGUgYW5kIHRpbWUgdG8gdGhhdCBleHBlY3RlZCBieSBjb20ubXhpLm14LmNvbW1vbi51dGlscy5EYXRhVHlwZVV0aWxzXHJcbiAgIGZvcm1hdERhdGVUaW1lKGRhdGVUaW1lV2lkZ2V0SWQpIHtcclxuICAgICAgbGV0IGZpZWxkSWRzID0gdGhpcy5idWlsZEZpZWxkSWRzRm9yRGF0ZVRpbWVXaWRnZXQoZGF0ZVRpbWVXaWRnZXRJZCk7XHJcblxyXG4gICAgICBsZXQgZGF0ZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRJZHMuZGF0ZUZpZWxkSWQpLnZhbHVlO1xyXG4gICAgICBsZXQgdGltZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZmllbGRJZHMudGltZUZpZWxkSWQpLnZhbHVlO1xyXG5cclxuICAgICAgcmV0dXJuIGRhdGVWYWx1ZSArICcgJyArIHRpbWVWYWx1ZTtcclxuICAgfVxyXG5cclxuICAgaXNTY2hlZHVsZWRIb3Vyc0NlbGxFZGl0YWJsZShjZWxsKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzQWxsb3dlZFRvRWRpdFNjaGVkbGVkSG91cnMpIHtcclxuICAgICAgICAgbGV0IHJvd0RhdGEgPSBjZWxsLmdldFJvdygpLmdldERhdGEoKTtcclxuICAgICAgICAgaWYgKHJvd0RhdGEuaXNGcm9tSm9iU3RvcCAmJiByb3dEYXRhLmxhYm91clN0YXR1cyA9PSAnQUNUVicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgIH1cclxuXHJcbiAgIGlzQWN0dWFsSG91cnNDZWxsRWRpdGFibGUoY2VsbCkge1xyXG4gICAgICBpZiAodGhpcy5pc0FsbG93ZWRUb0VkaXRBY3R1YWxIb3Vycykge1xyXG4gICAgICAgICBsZXQgcm93RGF0YSA9IGNlbGwuZ2V0Um93KCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICBpZiAocm93RGF0YS5sYWJvdXJTdGF0dXMgPT0gJ0NPTVBMRVRFJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgfVxyXG5cclxuICAgaXNFbGFwc2VkVGltZUdyZWF0ZXJUaGFuVGhyZXNob2xkKGNlbGwpIHtcclxuICAgICAgbGV0IHRpbWUgPSBjZWxsLmdldFZhbHVlKCk7XHJcbiAgICAgIGlmICh0aW1lKSB7XHJcbiAgICAgICAgIGxldCBkZWNpbWFsVGltZSA9IERhdGVUaW1lVmFsaWRhdG9yLmNvbnZlcnRUaW1lVG9EZWNpbWFsKHRpbWUpO1xyXG4gICAgICAgICBpZiAoZGVjaW1hbFRpbWUgPiBwYXJzZUZsb2F0KHRoaXMubGFib3JSb3dFbGFzcGVkVGltZVRocmVzaG9sZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gY2xhc3M9J2VsYXBzZWRUaW1lRXhjZWVkc1RocmVzaG9sZCc+XCIgKyB0aW1lICsgXCI8L3NwYW4+XCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgIH1cclxuXHJcbiAgIHZhbGlkYXRlSG91cnMoY2VsbCwgdmFsdWUpIHtcclxuICAgICAgcmV0dXJuIERhdGVUaW1lVmFsaWRhdG9yLnZhbGlkYXRlSG91cnModmFsdWUpO1xyXG4gICB9XHJcblxyXG4gICBoYW5kbGVTY2hlZHVsZUhvdXJzRWRpdChjZWxsKSB7XHJcbiAgICAgIGxldCByb3dEYXRhID0gY2VsbC5nZXRSb3coKS5nZXREYXRhKCk7XHJcbiAgICAgIHRoaXMuc2VydmljZS51cGRhdGVTY2hlZHVsZWRIb3VycyhcclxuICAgICAgICAgcm93RGF0YS50YXNrSWQsXHJcbiAgICAgICAgIHJvd0RhdGEubGFib3VyUm93SWQsXHJcbiAgICAgICAgIGNlbGwuZ2V0VmFsdWUoKSk7XHJcbiAgIH1cclxuXHJcbiAgIGhhbmRsZUFjdHVhbEhvdXJzRWRpdChjZWxsKSB7XHJcbiAgICAgIGxldCByb3dEYXRhID0gY2VsbC5nZXRSb3coKS5nZXREYXRhKCk7XHJcbiAgICAgIHRoaXMuc2VydmljZS51cGRhdGVBY3R1YWxIb3VycyhcclxuICAgICAgICAgcm93RGF0YS50YXNrSWQsXHJcbiAgICAgICAgIHJvd0RhdGEubGFib3VyUm93SWQsXHJcbiAgICAgICAgIGNlbGwuZ2V0VmFsdWUoKSk7XHJcbiAgIH1cclxufVxyXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgRGF0ZVRpbWVIZWxwZXIgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWwvRGF0ZVRpbWVIZWxwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza1N1cGVydmlzaW9uU2VydmljZSB7XHJcblxyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5lcnJvck1zZ1ByZWZpeCA9ICdFcnJvciBjb2RlID0gICc7XHJcbiAgIH1cclxuXHJcbiAgIGdldENyZXdzRm9yVXNlcih1c2VySWQpIHtcclxuXHJcbiAgICAgIGlmICghdXNlcklkKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlcklkIGlzIG1hbmRhdG9yeScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjcmV3TGlzdFJlc3RFbmRwb2ludCA9ICcvbWFpbnRlbml4L3Jlc3QvY3Jld3MnO1xyXG4gICAgICBjb25zdCBhcmdzID0geyAndXNlcklkJzogdXNlcklkIH07XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogY3Jld0xpc3RSZXN0RW5kcG9pbnQsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChjcmV3UmVzcG9uc2VMaXN0LCB0ZXh0U3RhdHVzLCBqcVhIUikgPT4ge1xyXG4gICAgICAgICAgICAgICByZXNvbHZlKGNyZXdSZXNwb25zZUxpc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xyXG4gICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuZXJyb3JNc2dQcmVmaXggKyBqcVhIUi5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIGdldERlZmF1bHRTdGFydEFuZEVuZERhdGVzKHVzZXJJZCkge1xyXG4gICAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJJZCBpcyBtYW5kYXRvcnknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudERhdGVUaW1lUmVzdEVuZHBvaW50ID0gJy9tYWludGVuaXgvcmVzdC9kYXRldGltZS9nZXRDdXJyZW50JztcclxuICAgICAgY29uc3QgYXJncyA9IHsgJ3VzZXJJZCc6IHVzZXJJZCB9O1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBjdXJyZW50RGF0ZVRpbWVSZXN0RW5kcG9pbnQsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSwgdGV4dFN0YXR1cywganFYSFIpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTdGFydCA9IG5ldyBEYXRlKFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zZS5zdGFydFllYXIsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXJ0TW9udGggLSAxLFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zZS5zdGFydERheU9mTW9udGgsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXJ0SG91ckluRGF5LFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zZS5zdGFydE1pbnV0ZVxyXG4gICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICBsZXQgZGVmYXVsdEVuZCA9IG5ldyBEYXRlKFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zZS5lbmRZZWFyLFxyXG4gICAgICAgICAgICAgICAgICByZXNwb25zZS5lbmRNb250aCAtIDEsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVuZERheU9mTW9udGgsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVuZEhvdXJJbkRheSxcclxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZW5kTWludXRlXHJcbiAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICBsZXQgZGVmYXVsdFN0YXJ0RW5kVmFsdWVzID0ge307XHJcbiAgICAgICAgICAgICAgIGRlZmF1bHRTdGFydEVuZFZhbHVlcy5zdGFydERhdGUgPSB0aGlzLmZvcm1hdERhdGUoZGVmYXVsdFN0YXJ0KTtcclxuICAgICAgICAgICAgICAgZGVmYXVsdFN0YXJ0RW5kVmFsdWVzLnN0YXJ0VGltZSA9IHRoaXMuZm9ybWF0VGltZShkZWZhdWx0U3RhcnQpO1xyXG4gICAgICAgICAgICAgICBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuc3RhcnRUaW1lWm9uZSA9IHJlc3BvbnNlLnN0YXJ0VGltZXpvbmU7XHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KGRlZmF1bHRTdGFydEVuZFZhbHVlcy5zdGFydERhdGUpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICByZWplY3QoJ2RlZmF1bHQgc3RhcnREYXRlIGZhaWxlZCB2YWxpZGF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVUaW1lRm9ybWF0KGRlZmF1bHRTdGFydEVuZFZhbHVlcy5zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICByZWplY3QoJ2RlZmF1bHQgc3RhcnRUaW1lIGZhaWxlZCB2YWxpZGF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHRTdGFydEVuZFZhbHVlcy5lbmREYXRlID0gdGhpcy5mb3JtYXREYXRlKGRlZmF1bHRFbmQpO1xyXG4gICAgICAgICAgICAgICBkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuZW5kVGltZSA9IHRoaXMuZm9ybWF0VGltZShkZWZhdWx0RW5kKTtcclxuICAgICAgICAgICAgICAgZGVmYXVsdFN0YXJ0RW5kVmFsdWVzLmVuZFRpbWVab25lID0gcmVzcG9uc2UuZW5kVGltZXpvbmU7XHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KGRlZmF1bHRTdGFydEVuZFZhbHVlcy5lbmREYXRlKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgcmVqZWN0KCdkZWZhdWx0IGVuZERhdGUgZmFpbGVkIHZhbGlkYXRpb246ICcgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlVGltZUZvcm1hdChkZWZhdWx0U3RhcnRFbmRWYWx1ZXMuZW5kVGltZSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlamVjdCgnZGVmYXVsdCBlbmRUaW1lIGZhaWxlZCB2YWxpZGF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIHJlc29sdmUoZGVmYXVsdFN0YXJ0RW5kVmFsdWVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmVycm9yTXNnUHJlZml4ICsganFYSFIuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICByZWplY3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBwZXJmb3JtU2VhcmNoKGFyZ3MpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgbGV0IGV4Y2x1ZGVDb21wbGV0ZSA9ICgoYXJncy5zaG93Q29tcGxldGVUYXNrcyA9PSB0cnVlKSA/IGZhbHNlIDogdHJ1ZSk7XHJcblxyXG4gICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IHtcclxuICAgICAgICAgICAgb25seVdvcmtzY29wZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG9ubHlDb250YWluaW5nTGFib3VyOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3NpZ25lZFRvQ3Jld0lkOiBhcmdzLmNyZXdJZCxcclxuICAgICAgICAgICAgbWluU2NoZWR1bGVkU3RhcnREYXRlVGltZTogYXJncy5zdGFydERhdGVUaW1lLFxyXG4gICAgICAgICAgICBtYXhTY2hlZHVsZWRTdGFydERhdGVUaW1lOiBhcmdzLmVuZERhdGVUaW1lLFxyXG4gICAgICAgICAgICBleGNsdWRlQ29tcGxldGVkOiBleGNsdWRlQ29tcGxldGVcclxuICAgICAgICAgfTtcclxuICAgICAgICAgXHJcbiAgICAgICAgIGxldCBsaXN0Q3Jld1Rhc2tMYWJvdXJFbmRwb2ludCA9ICcvbWFpbnRlbml4L3Jlc3QvdGFza3MnO1xyXG5cclxuICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBsaXN0Q3Jld1Rhc2tMYWJvdXJFbmRwb2ludCxcclxuICAgICAgICAgICAgZGF0YTogc2VhcmNoRGF0YSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlLCB0ZXh0U3RhdHVzLCBqcVhIUikgPT4ge1xyXG4gICAgICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2UgaXMgYSBqc29uIGxpc3Qgb2Ygb2JqZWN0cyBnZW5lcmF0ZWQgZnJvbTpcclxuICAgICAgICAgICAgICAgLy8gICAgY29tLm14aS5teC53ZWIucmVzdC50YXNrLkNyZXdUYXNrTGFib3VyUmVzcG9uc2VcclxuICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5lcnJvck1zZ1ByZWZpeCArIGpxWEhSLnN0YXR1cztcclxuICAgICAgICAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgLy8gdmFsaWRhdGVIb3Vycyh2YWx1ZSkge1xyXG4gICAvLyAgICAvLyBUaGlzIGlzIGJhc2VkIG9uIHRoZSBOVU1CRVIoOSw1KSBjb25zdHJhaW50IGZvclxyXG4gICAvLyAgICAvLyBzY2hlZF9sYWJvdXJfcm9sZS5zY2hlZF9ociBhbmQgc2NoZWRfbGFib3VyX3JvbGUuYWN0dWFsX2hyXHJcbiAgIC8vICAgIGxldCBzcGxpdCA9IHZhbHVlLnNwbGl0KCcuJyk7XHJcbiAgIC8vICAgIGlmICggc3BsaXQubGVuZ3RoID4gMCApIHtcclxuICAgLy8gICAgICAgaWYgKCBzcGxpdFswXS5sZW5ndGggPiA0ICkge1xyXG4gICAvLyAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgIC8vICAgICAgIH1cclxuICAgLy8gICAgICAgaWYgKCBzcGxpdC5sZW5ndGggPT0gMiApIHtcclxuICAgLy8gICAgICAgICAgaWYgKCBzcGxpdFsxXS5sZW5ndGggPiA1ICkge1xyXG4gICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgIC8vICAgICAgICAgIH1cclxuICAgLy8gICAgICAgfSBlbHNlIGlmIChzcGxpdC5sZW5ndGggPiAyICkge1xyXG4gICAvLyAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgIC8vICAgICAgIH1cclxuICAgLy8gICAgfVxyXG4gICAvLyAgICByZXR1cm4gdHJ1ZTtcclxuICAgLy8gfVxyXG5cclxuICAgdXBkYXRlU2NoZWR1bGVkSG91cnModGFza0lkLCBsYWJvdXJSb3dJZCwgbmV3VmFsdWUpIHtcclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgIHNjaGVkdWxlZEhvdXJzOiBuZXdWYWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICB1cmw6ICcvbWFpbnRlbml4L3Jlc3QvdGFza3MvJyArIHRhc2tJZCArICcvbGFib3Vycy8nICsgbGFib3VyUm93SWQsXHJcbiAgICAgICAgIHR5cGU6IFwiUFVUXCIsXHJcbiAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICBlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuZXJyb3JNc2dQcmVmaXggKyBqcVhIUi5zdGF0dXM7XHJcbiAgICAgICAgICAgIG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgdXBkYXRlQWN0dWFsSG91cnModGFza0lkLCBsYWJvdXJSb3dJZCwgbmV3VmFsdWUpIHtcclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgIGFjdHVhbEhvdXJzOiBuZXdWYWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICB1cmw6ICcvbWFpbnRlbml4L3Jlc3QvdGFza3MvJyArIHRhc2tJZCArICcvbGFib3Vycy8nICsgbGFib3VyUm93SWQsXHJcbiAgICAgICAgIHR5cGU6IFwiUFVUXCIsXHJcbiAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICBlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuZXJyb3JNc2dQcmVmaXggKyBqcVhIUi5zdGF0dXM7XHJcbiAgICAgICAgICAgIG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuXHJcbiAgIC8vXHJcbiAgIC8vIHByaXZhdGUgbWV0aG9kc1xyXG4gICAvL1xyXG5cclxuICAgdmFsaWRhdGVEYXRlRm9ybWF0KGRhdGVTdHIpIHtcclxuICAgICAgaWYgKCFkYXRlU3RyKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0ZVN0ciBpcyBtYW5kYXRvcnkuJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBkYXRlU3RyICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGVTdHIgaXMgbm90IGEgc3RyaW5nJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlZ2V4IGV4YW1wbGU6IGRkLU1NTS15eXl5XHJcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSAvXigoWzAtOV0pfChbMC0yXVswLTldKXwoWzNdWzAtMV0pKVxcLShKQU58RkVCfE1BUnxBUFJ8TUFZfEpVTnxKVUx8QVVHfFNFUHxPQ1R8Tk9WfERFQylcXC1cXGR7NH0kLztcclxuICAgICAgY29uc3QgbWF0Y2hBcnJheSA9IGRhdGVTdHIubWF0Y2goZGF0ZUZvcm1hdCk7XHJcblxyXG4gICAgICBpZiAobWF0Y2hBcnJheSA9PSBudWxsKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0ZVN0ciBoYXMgaW52YWxpZCBmb3JtYXQuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9XHJcblxyXG4gICB2YWxpZGF0ZVRpbWVGb3JtYXQodGltZVN0cikge1xyXG4gICAgICBpZiAoIXRpbWVTdHIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aW1lU3RyIGlzIG1hbmRhdG9yeS4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIHRpbWVTdHIgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGltZVN0ciBpcyBub3QgYSBzdHJpbmcuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlZ2V4IGV4YW1wbGU6IGhoOm1tXHJcbiAgICAgIGNvbnN0IHRpbWVGb3JtYXQgPSAvXiR8XigoWzAxXVswLTldKXwoMlswLTNdKSk6WzAtNV1bMC05XSQvO1xyXG4gICAgICBjb25zdCBtYXRjaEFycmF5ID0gdGltZVN0ci5tYXRjaCh0aW1lRm9ybWF0KTtcclxuXHJcbiAgICAgIGlmIChtYXRjaEFycmF5ID09IG51bGwpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aW1lU3RyIGhhcyBpbnZhbGlkIGZvcm1hdC4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH1cclxuXHJcbiAgIGFkZEhvdXJzKGRhdGUsIGhvdXJzKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIChob3VycyAqIDYwICogNjAgKiAxMDAwKSk7XHJcbiAgIH1cclxuXHJcbiAgIGZvcm1hdERhdGUoZGF0ZSkge1xyXG4gICAgICBsZXQgc3RyID1cclxuICAgICAgICAgKChkYXRlLmdldERhdGUoKSA8IDEwKSA/ICcwJyA6ICcnKSArIGRhdGUuZ2V0RGF0ZSgpICsgJy0nICtcclxuICAgICAgICAgdGhpcy5nZXRNb250aFNob3J0U3RyKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgJy0nICtcclxuICAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICB9XHJcblxyXG4gICBmb3JtYXRUaW1lKGRhdGUpIHtcclxuICAgICAgbGV0IHN0ciA9XHJcbiAgICAgICAgICgoZGF0ZS5nZXRIb3VycygpIDwgMTApID8gJzAnIDogJycpICsgZGF0ZS5nZXRIb3VycygpICsgJzonICtcclxuICAgICAgICAgKChkYXRlLmdldE1pbnV0ZXMoKSA8IDEwKSA/ICcwJyA6ICcnKSArIGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICB9XHJcblxyXG4gICBnZXRNb250aFNob3J0U3RyKG1vbnRoKSB7XHJcbiAgICAgIGlmIChtb250aCA9PT0gMSkgcmV0dXJuICdKQU4nO1xyXG4gICAgICBpZiAobW9udGggPT09IDIpIHJldHVybiAnRkVCJztcclxuICAgICAgaWYgKG1vbnRoID09PSAzKSByZXR1cm4gJ01BUic7XHJcbiAgICAgIGlmIChtb250aCA9PT0gNCkgcmV0dXJuICdBUFInO1xyXG4gICAgICBpZiAobW9udGggPT09IDUpIHJldHVybiAnTUFZJztcclxuICAgICAgaWYgKG1vbnRoID09PSA2KSByZXR1cm4gJ0pVTic7XHJcbiAgICAgIGlmIChtb250aCA9PT0gNykgcmV0dXJuICdKVUwnO1xyXG4gICAgICBpZiAobW9udGggPT09IDgpIHJldHVybiAnQVVHJztcclxuICAgICAgaWYgKG1vbnRoID09PSA5KSByZXR1cm4gJ1NFUCc7XHJcbiAgICAgIGlmIChtb250aCA9PT0gMTApIHJldHVybiAnT0NUJztcclxuICAgICAgaWYgKG1vbnRoID09PSAxMSkgcmV0dXJuICdOT1YnO1xyXG4gICAgICBpZiAobW9udGggPT09IDEyKSByZXR1cm4gJ0RFQyc7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBUYXNrU3VwZXJ2aXNpb25Db250cm9sbGVyIGZyb20gJy4vVGFza1N1cGVydmlzaW9uQ29udHJvbGxlcic7XHJcblxyXG5sZXQgY29udHJvbGxlclBhcm1zID0ge1xyXG4gICB1c2VySWQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZFVzZXInKS52YWx1ZSxcclxuICAgY3Jld3NGaWVsZElkOiAnaWRDcmV3TGlzdCcsXHJcbiAgIHN0YXJ0RmllbGRJZDogJ2lkU3RhcnREYXRlVGltZScsXHJcbn07XHJcblxyXG5sZXQgY29udHJvbGxlciA9IG5ldyBUYXNrU3VwZXJ2aXNpb25Db250cm9sbGVyKGNvbnRyb2xsZXJQYXJtcyk7XHJcbmNvbnRyb2xsZXIuaW5pdCgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lSGVscGVyIHtcblxuICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICBzdGF0aWMgYWRkSG91cnMoZGF0ZSwgaG91cnMpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIChob3VycyAqIDYwICogNjAgKiAxMDAwKSk7XG4gICB9XG5cbiAgIHN0YXRpYyBmb3JtYXREYXRlKGRhdGUpIHtcbiAgICAgIGxldCBzdHIgPVxuICAgICAgICAgKChkYXRlLmdldERhdGUoKSA8IDEwKSA/ICcwJyA6ICcnKSArIGRhdGUuZ2V0RGF0ZSgpICsgJy0nICtcbiAgICAgICAgIHRoaXMuZ2V0TW9udGhTaG9ydFN0cihkYXRlLmdldE1vbnRoKCkgKyAxKSArICctJyArXG4gICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICByZXR1cm4gc3RyO1xuICAgfVxuXG4gICBzdGF0aWMgZm9ybWF0VGltZShkYXRlKSB7XG4gICAgICBsZXQgc3RyID1cbiAgICAgICAgICgoZGF0ZS5nZXRIb3VycygpIDwgMTApID8gJzAnIDogJycpICsgZGF0ZS5nZXRIb3VycygpICsgJzonICtcbiAgICAgICAgICgoZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCkgPyAnMCcgOiAnJykgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgIHJldHVybiBzdHI7XG4gICB9XG5cbiAgIC8vIENvbnZlcnRzIGEgdGltZSBpbiB0aGUgZm9ybWF0IGhoOm1tIGludG8gaXRzIGNvcnJlc3BvbmRpbmcgZGVjaW1hbCB2YWx1ZVxuICAgc3RhdGljIGNvbnZlcnRUaW1lVG9EZWNpbWFsKHRpbWUpIHtcbiAgICAgIGxldCBob3Vyc01pbnV0ZXMgPSB0aW1lLnNwbGl0KC9bLjpdLyk7XG4gICAgICBsZXQgaG91cnMgPSBwYXJzZUludChob3Vyc01pbnV0ZXNbMF0sIDEwKTtcbiAgICAgIGxldCBtaW51dGVzID0gaG91cnNNaW51dGVzWzFdID8gcGFyc2VJbnQoaG91cnNNaW51dGVzWzFdLCAxMCkgOiAwO1xuICAgICAgcmV0dXJuIGhvdXJzICsgbWludXRlcyAvIDYwO1xuICAgfVxuXG4gICBzdGF0aWMgZ2V0TW9udGhTaG9ydFN0cihtb250aCkge1xuICAgICAgaWYgKG1vbnRoID09PSAxKSByZXR1cm4gJ0pBTic7XG4gICAgICBlbHNlIGlmIChtb250aCA9PT0gMikgcmV0dXJuICdGRUInO1xuICAgICAgZWxzZSBpZiAobW9udGggPT09IDMpIHJldHVybiAnTUFSJztcbiAgICAgIGVsc2UgaWYgKG1vbnRoID09PSA0KSByZXR1cm4gJ0FQUic7XG4gICAgICBlbHNlIGlmIChtb250aCA9PT0gNSkgcmV0dXJuICdNQVknO1xuICAgICAgZWxzZSBpZiAobW9udGggPT09IDYpIHJldHVybiAnSlVOJztcbiAgICAgIGVsc2UgaWYgKG1vbnRoID09PSA3KSByZXR1cm4gJ0pVTCc7XG4gICAgICBlbHNlIGlmIChtb250aCA9PT0gOCkgcmV0dXJuICdBVUcnO1xuICAgICAgZWxzZSBpZiAobW9udGggPT09IDkpIHJldHVybiAnU0VQJztcbiAgICAgIGVsc2UgaWYgKG1vbnRoID09PSAxMCkgcmV0dXJuICdPQ1QnO1xuICAgICAgZWxzZSBpZiAobW9udGggPT09IDExKSByZXR1cm4gJ05PVic7XG4gICAgICBlbHNlIGlmIChtb250aCA9PT0gMTIpIHJldHVybiAnREVDJztcbiAgICAgIGVsc2UgcmV0dXJuIFwiXCI7XG4gICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lVmFsaWRhdG9yIHtcblxuICAgY29uc3RydWN0b3IoKSB7XG4gICB9XG5cbiAgIFxuICAgc3RhdGljIHZhbGlkYXRlSG91cnModmFsdWUpIHtcbiAgICAgIC8vIFRoaXMgaXMgYmFzZWQgb24gdGhlIE5VTUJFUig5LDUpIGNvbnN0cmFpbnQgZm9yXG4gICAgICAvLyBzY2hlZF9sYWJvdXJfcm9sZS5zY2hlZF9ociBhbmQgc2NoZWRfbGFib3VyX3JvbGUuYWN0dWFsX2hyXG4gICAgICBsZXQgc3BsaXQgPSB2YWx1ZS5zcGxpdCgnLicpO1xuICAgICAgaWYgKCBzcGxpdC5sZW5ndGggPiAwICkge1xuICAgICAgICAgaWYgKCBzcGxpdFswXS5sZW5ndGggPiA0ICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKCBzcGxpdC5sZW5ndGggPT0gMiApIHtcbiAgICAgICAgICAgIGlmICggc3BsaXRbMV0ubGVuZ3RoID4gNSApIHtcbiAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0gZWxzZSBpZiAoc3BsaXQubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgfVxuXG4gIFxuICAgLy9cbiAgIC8vIHByaXZhdGUgbWV0aG9kc1xuICAgLy9cblxuICAgc3RhdGljIHZhbGlkYXRlRGF0ZUZvcm1hdChkYXRlU3RyKSB7XG4gICAgICBpZiggISBkYXRlU3RyICkge1xuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRlU3RyIGlzIG1hbmRhdG9yeS4nKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZGF0ZVN0ciAhPT0gJ3N0cmluZycpICB7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGVTdHIgaXMgbm90IGEgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlZ2V4IGV4YW1wbGU6IGRkLU1NTS15eXl5XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gL14oKFswLTldKXwoWzAtMl1bMC05XSl8KFszXVswLTFdKSlcXC0oSkFOfEZFQnxNQVJ8QVBSfE1BWXxKVU58SlVMfEFVR3xTRVB8T0NUfE5PVnxERUMpXFwtXFxkezR9JC87XG4gICAgICBjb25zdCBtYXRjaEFycmF5ID0gZGF0ZVN0ci5tYXRjaChkYXRlRm9ybWF0KTtcblxuICAgICAgaWYoIG1hdGNoQXJyYXkgPT0gbnVsbCApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGVTdHIgaGFzIGludmFsaWQgZm9ybWF0LicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gICBzdGF0aWMgdmFsaWRhdGVUaW1lRm9ybWF0KHRpbWVTdHIpIHtcbiAgICAgIGlmKCAhIHRpbWVTdHIgKXtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGltZVN0ciBpcyBtYW5kYXRvcnkuJyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRpbWVTdHIgIT09ICdzdHJpbmcnKSAge1xuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aW1lU3RyIGlzIG5vdCBhIHN0cmluZy4nKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVnZXggZXhhbXBsZTogaGg6bW1cbiAgICAgIGNvbnN0IHRpbWVGb3JtYXQgPSAvXiR8XigoWzAxXVswLTldKXwoMlswLTNdKSk6WzAtNV1bMC05XSQvO1xuICAgICAgY29uc3QgbWF0Y2hBcnJheSA9IHRpbWVTdHIubWF0Y2godGltZUZvcm1hdCk7XG5cbiAgICAgIGlmKCBtYXRjaEFycmF5ID09IG51bGwgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aW1lU3RyIGhhcyBpbnZhbGlkIGZvcm1hdC4nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICB9XG5cbn0iLCIvKiAoaWdub3JlZCkgKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9