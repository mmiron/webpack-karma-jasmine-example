(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["engineering/requirementdefinition/followOnTask"],{

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

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js":
/*!**************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js ***!
  \**************************************************************************************************/
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

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js":
/*!******************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js ***!
  \******************************************************************************************************/
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

var _followOnTaskDefinitionSearchConfig = __webpack_require__(/*! ./followOnTaskDefinitionSearchConfig.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js");

var _followOnTaskDefinitionSearchConfig2 = _interopRequireDefault(_followOnTaskDefinitionSearchConfig);

var _followOnTaskDefinitionSearchService = __webpack_require__(/*! ./followOnTaskDefinitionSearchService.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js");

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
            return _followOnTaskDefinitionSearchService2.default.getFollowOnTaskDefinitions(this.apiUrl).then(function (taskDefinitions) {
               _this.configureTypeAhead(taskDefinitions);
               // once the typeahead input is initialized, the type field will lost focus, have to
               // manually focus it again.
               _this.typeAheadSearchInputEl.focus();
            });
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

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js":
/*!***************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js ***!
  \***************************************************************************************************/
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

/***/ "./src/engineering/requirementdefinition/followOnTask/index.js":
/*!*********************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _followOnTaskDefinitionSearchController = __webpack_require__(/*! ./followOnTaskDefinitionSearchController.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js");

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

},[["./src/engineering/requirementdefinition/followOnTask/index.js","common-runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UtcHJvbWlzZS9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZWVyaW5nL3JlcXVpcmVtZW50ZGVmaW5pdGlvbi9mb2xsb3dPblRhc2svZm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lZXJpbmcvcmVxdWlyZW1lbnRkZWZpbml0aW9uL2ZvbGxvd09uVGFzay9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lZXJpbmcvcmVxdWlyZW1lbnRkZWZpbml0aW9uL2ZvbGxvd09uVGFzay9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lZXJpbmcvcmVxdWlyZW1lbnRkZWZpbml0aW9uL2ZvbGxvd09uVGFzay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiUHJvbWlzZSIsImdsb2JhbCIsImZhY3RvcnkiLCJvYmplY3RPckZ1bmN0aW9uIiwieCIsImlzRnVuY3Rpb24iLCJfaXNBcnJheSIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImxlbiIsInZlcnR4TmV4dCIsImN1c3RvbVNjaGVkdWxlckZuIiwiYXNhcCIsImNhbGxiYWNrIiwiYXJnIiwicXVldWUiLCJmbHVzaCIsInNjaGVkdWxlRmx1c2giLCJzZXRTY2hlZHVsZXIiLCJzY2hlZHVsZUZuIiwic2V0QXNhcCIsImFzYXBGbiIsImJyb3dzZXJXaW5kb3ciLCJ3aW5kb3ciLCJicm93c2VyR2xvYmFsIiwiQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsImlzTm9kZSIsInNlbGYiLCJwcm9jZXNzIiwiaXNXb3JrZXIiLCJVaW50OENsYW1wZWRBcnJheSIsImltcG9ydFNjcmlwdHMiLCJNZXNzYWdlQ2hhbm5lbCIsInVzZU5leHRUaWNrIiwibmV4dFRpY2siLCJ1c2VWZXJ0eFRpbWVyIiwidXNlTXV0YXRpb25PYnNlcnZlciIsIml0ZXJhdGlvbnMiLCJvYnNlcnZlciIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwib2JzZXJ2ZSIsImNoYXJhY3RlckRhdGEiLCJkYXRhIiwidXNlTWVzc2FnZUNoYW5uZWwiLCJjaGFubmVsIiwicG9ydDEiLCJvbm1lc3NhZ2UiLCJwb3J0MiIsInBvc3RNZXNzYWdlIiwidXNlU2V0VGltZW91dCIsImdsb2JhbFNldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaSIsImF0dGVtcHRWZXJ0eCIsInIiLCJ2ZXJ0eCIsInJ1bk9uTG9vcCIsInJ1bk9uQ29udGV4dCIsImUiLCJ0aGVuIiwib25GdWxmaWxsbWVudCIsIm9uUmVqZWN0aW9uIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsInBhcmVudCIsImNoaWxkIiwiY29uc3RydWN0b3IiLCJub29wIiwiUFJPTUlTRV9JRCIsIm1ha2VQcm9taXNlIiwiX3N0YXRlIiwiaW52b2tlQ2FsbGJhY2siLCJfcmVzdWx0Iiwic3Vic2NyaWJlIiwicmVzb2x2ZSIsIm9iamVjdCIsIkNvbnN0cnVjdG9yIiwicHJvbWlzZSIsIl9yZXNvbHZlIiwiTWF0aCIsInJhbmRvbSIsInN1YnN0cmluZyIsIlBFTkRJTkciLCJGVUxGSUxMRUQiLCJSRUpFQ1RFRCIsIkdFVF9USEVOX0VSUk9SIiwiRXJyb3JPYmplY3QiLCJzZWxmRnVsZmlsbG1lbnQiLCJUeXBlRXJyb3IiLCJjYW5ub3RSZXR1cm5Pd24iLCJnZXRUaGVuIiwiZXJyb3IiLCJ0cnlUaGVuIiwidmFsdWUiLCJmdWxmaWxsbWVudEhhbmRsZXIiLCJyZWplY3Rpb25IYW5kbGVyIiwiaGFuZGxlRm9yZWlnblRoZW5hYmxlIiwidGhlbmFibGUiLCJzZWFsZWQiLCJmdWxmaWxsIiwicmVhc29uIiwiX3JlamVjdCIsIl9sYWJlbCIsImhhbmRsZU93blRoZW5hYmxlIiwiaGFuZGxlTWF5YmVUaGVuYWJsZSIsIm1heWJlVGhlbmFibGUiLCJ0aGVuJCQiLCJwdWJsaXNoUmVqZWN0aW9uIiwiX29uZXJyb3IiLCJwdWJsaXNoIiwiX3N1YnNjcmliZXJzIiwibGVuZ3RoIiwic3Vic2NyaWJlcnMiLCJzZXR0bGVkIiwiZGV0YWlsIiwiVFJZX0NBVENIX0VSUk9SIiwidHJ5Q2F0Y2giLCJoYXNDYWxsYmFjayIsInN1Y2NlZWRlZCIsImZhaWxlZCIsImluaXRpYWxpemVQcm9taXNlIiwicmVzb2x2ZXIiLCJyZXNvbHZlUHJvbWlzZSIsInJlamVjdFByb21pc2UiLCJpZCIsIm5leHRJZCIsIkVudW1lcmF0b3IiLCJpbnB1dCIsIl9pbnN0YW5jZUNvbnN0cnVjdG9yIiwiX2lucHV0IiwiX3JlbWFpbmluZyIsIl9lbnVtZXJhdGUiLCJ2YWxpZGF0aW9uRXJyb3IiLCJFcnJvciIsIl9lYWNoRW50cnkiLCJlbnRyeSIsImMiLCJyZXNvbHZlJCQiLCJfdGhlbiIsIl9zZXR0bGVkQXQiLCJfd2lsbFNldHRsZUF0Iiwic3RhdGUiLCJlbnVtZXJhdG9yIiwiYWxsIiwiZW50cmllcyIsInJhY2UiLCJfIiwicmVqZWN0IiwibmVlZHNSZXNvbHZlciIsIm5lZWRzTmV3IiwiX3NldFNjaGVkdWxlciIsIl9zZXRBc2FwIiwiX2FzYXAiLCJfY2F0Y2giLCJwb2x5ZmlsbCIsImxvY2FsIiwiRnVuY3Rpb24iLCJQIiwicHJvbWlzZVRvU3RyaW5nIiwiY2FzdCIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiZGVmYXVsdENsZWFyVGltZW91dCIsImNsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJkcmFpbmluZyIsImN1cnJlbnRRdWV1ZSIsInF1ZXVlSW5kZXgiLCJjbGVhblVwTmV4dFRpY2siLCJjb25jYXQiLCJkcmFpblF1ZXVlIiwidGltZW91dCIsInJ1biIsImFyZ3MiLCJwdXNoIiwiSXRlbSIsImFycmF5IiwiYXBwbHkiLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwib24iLCJhZGRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImVtaXQiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdGVuZXJzIiwibmFtZSIsImJpbmRpbmciLCJjd2QiLCJjaGRpciIsImRpciIsInVtYXNrIiwiZyIsImV2YWwiLCJGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29uZmlnIiwiRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbnRyb2xsZXIiLCJzY29wZSIsImFwaVVybEVsIiwic3VnZ2VzdGlvbiIsInRhc2tEZWZpbml0aW9ucyIsImNvbmZpZyIsIiQiLCJoaWdobGlnaHQiLCJsaW1pdCIsIm1pbkxlbmd0aCIsImRpc3BsYXkiLCJlbXB0eVRlbXBsYXRlIiwic291cmNlIiwib25DbGljayIsImV2ZW50IiwicXVlcnkiLCJzdWdnZXN0aW9uT2JqIiwiRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UiLCJjb21wYXJlUmVzdWx0IiwiYSIsImIiLCJhcGlVcmwiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsInNvcnRlZFRhc2tEZWZpbml0aW9ucyIsImNvbnRyb2xsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCLG1CQUFBQyxDQUFRLG9HQUFSLEVBQXVCQyxPQUF4QyxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7O0FBUUMsV0FBVUMsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkI7QUFDeEIsZ0NBQU9KLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsT0FBT0QsTUFBUCxLQUFrQixXQUFqRCxHQUErREEsT0FBT0MsT0FBUCxHQUFpQkksU0FBaEYsR0FDQSxRQUE2QyxvQ0FBT0EsT0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBLG9HQUE3QyxHQUNDLFNBRkQ7QUFHSCxDQUpBLGFBSVEsWUFBWTtBQUFFOztBQUV2QixXQUFTQyxnQkFBVCxDQUEwQkMsQ0FBMUIsRUFBNkI7QUFDM0IsV0FBTyxPQUFPQSxDQUFQLEtBQWEsVUFBYixJQUEyQixRQUFPQSxDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBYixJQUF5QkEsTUFBTSxJQUFqRTtBQUNEOztBQUVELFdBQVNDLFVBQVQsQ0FBb0JELENBQXBCLEVBQXVCO0FBQ3JCLFdBQU8sT0FBT0EsQ0FBUCxLQUFhLFVBQXBCO0FBQ0Q7O0FBRUQsTUFBSUUsV0FBV0MsU0FBZjtBQUNBLE1BQUksQ0FBQ0MsTUFBTUMsT0FBWCxFQUFvQjtBQUNsQkgsZUFBVyxrQkFBVUYsQ0FBVixFQUFhO0FBQ3RCLGFBQU9NLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQlQsQ0FBL0IsTUFBc0MsZ0JBQTdDO0FBQ0QsS0FGRDtBQUdELEdBSkQsTUFJTztBQUNMRSxlQUFXRSxNQUFNQyxPQUFqQjtBQUNEOztBQUVELE1BQUlBLFVBQVVILFFBQWQ7O0FBRUEsTUFBSVEsTUFBTSxDQUFWO0FBQ0EsTUFBSUMsWUFBWVIsU0FBaEI7QUFDQSxNQUFJUyxvQkFBb0JULFNBQXhC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Q0FBQ0EsR0FBeUJBLFNBQVNDLEVBQVYsSUFBQ0QsR0FBbUIsQ0FBcEIsQ0FBQ0EsR0FBOUM7O0FBRUEsZ0JBQUlELGlCQUFKLEdBQXdCO0FBQ3JCQSwrQkFBaUJDLG1CQUFtQkMsRUFBcEIsY0FBQ0QsR0FBRCxDQUFDQSxHQUE2Q0EsbUJBQW1CQyxFQUFwQixjQUFDRCxHQUF1QyxDQUF4QyxDQUFDQSxHQUE5REQ7QUFDRjs7QUFFRCxnQkFBSUEsaUJBQUosR0FBd0I7QUFDckJBLCtCQUFpQkMsU0FBU0MsRUFBVixJQUFDRCxHQUFELENBQUNBLEdBQXlCQSxTQUFTQyxFQUFWLElBQUNELEdBQW1CLENBQXBCLENBQUNBLEdBQTFDRDtBQUNGO0FBQ0Q7QUFWSCxVQUFPLENBQVA7QUFZRjs7O2lEQUVpQ0csTSxFQUFRO0FBQ3ZDLGFBQUlwQixRQUFKO0FBQ0EsZ0JBQU8sWUFBWSwyQkFBMEI7QUFDMUMsbUJBQU8sc0JBQU87QUFDWHFCLHFCQURXO0FBRVhDLG9CQUZXO0FBR1hDLHdCQUFTLDBDQUFrQztBQUN4QztBQUNBLHNCQUFJQyx3QkFBd0J4QiwwQkFBNUIsdUJBQTRCQSxDQUE1QjtBQUNBdEk7QUFOUTtBQVFYaUIsc0JBQU8sb0JBQWM7QUFDbEI7QUFDQWpCO0FBQ0Y7QUFYVSxhQUFQLENBQVA7QUFESCxVQUFPLENBQVA7QUFlRjs7Ozs7O2tCQXRDaUJzSixtQzs7Ozs7Ozs7Ozs7Ozs7O0FDTHJCOzs7Ozs7OztBQUVBLElBQUlTLGFBQ0EsSUFBSTFCLHlDQUFKLHlIQURKLGlDQUNJLENBREo7QUFNQTBCLHdCOzs7Ozs7Ozs7OztBQ1JBLGU7Ozs7Ozs7Ozs7O0FDQUEsd0IiLCJmaWxlIjoic3JjL21haW4vd2ViYXBwL2J1bmRsZXMvZW5naW5lZXJpbmcvcmVxdWlyZW1lbnRkZWZpbml0aW9uL2ZvbGxvd09uVGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKS5Qcm9taXNlO1xuIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICAzLjMuMVxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbC5FUzZQcm9taXNlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG52YXIgX2lzQXJyYXkgPSB1bmRlZmluZWQ7XG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59XG5cbnZhciBpc0FycmF5ID0gX2lzQXJyYXk7XG5cbnZhciBsZW4gPSAwO1xudmFyIHZlcnR4TmV4dCA9IHVuZGVmaW5lZDtcbnZhciBjdXN0b21TY2hlZHVsZXJGbiA9IHVuZGVmaW5lZDtcblxudmFyIGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgbGVuICs9IDI7XG4gIGlmIChsZW4gPT09IDIpIHtcbiAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgaWYgKGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICBjdXN0b21TY2hlZHVsZXJGbihmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gIGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbn1cblxuZnVuY3Rpb24gc2V0QXNhcChhc2FwRm4pIHtcbiAgYXNhcCA9IGFzYXBGbjtcbn1cblxudmFyIGJyb3dzZXJXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbnZhciBicm93c2VyR2xvYmFsID0gYnJvd3NlcldpbmRvdyB8fCB7fTtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAoe30pLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG5vZGUuZGF0YSA9IGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyO1xuICB9O1xufVxuXG4vLyB3ZWIgd29ya2VyXG5mdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgZ2xvYmFsU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICB9O1xufVxuXG52YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdFZlcnR4KCkge1xuICB0cnkge1xuICAgIHZhciByID0gcmVxdWlyZTtcbiAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB1bmRlZmluZWQ7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgaWYgKF9zdGF0ZSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBfYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhfc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxudmFyIEdFVF9USEVOX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW4ocHJvbWlzZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICByZXR1cm4gR0VUX1RIRU5fRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKSB7XG4gIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmIHRoZW4kJCA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUpIHtcbiAgICBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhlbiQkID09PSBHRVRfVEhFTl9FUlJPUikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGVuJCQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gRXJyb3JPYmplY3QoKSB7XG4gIHRoaXMuZXJyb3IgPSBudWxsO1xufVxuXG52YXIgVFJZX0NBVENIX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICBlcnJvciA9IHVuZGVmaW5lZCxcbiAgICAgIHN1Y2NlZWRlZCA9IHVuZGVmaW5lZCxcbiAgICAgIGZhaWxlZCA9IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICB2YWx1ZSA9IHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgaWYgKHZhbHVlID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgdmFsdWUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gRlVMRklMTEVEKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG52YXIgaWQgPSAwO1xuZnVuY3Rpb24gbmV4dElkKCkge1xuICByZXR1cm4gaWQrKztcbn1cblxuZnVuY3Rpb24gbWFrZVByb21pc2UocHJvbWlzZSkge1xuICBwcm9taXNlW1BST01JU0VfSURdID0gaWQrKztcbiAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICBtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBfcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIHZhciBfaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fZWFjaEVudHJ5KF9pbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICB2YXIgcmVzb2x2ZSQkID0gYy5yZXNvbHZlO1xuXG4gIGlmIChyZXNvbHZlJCQgPT09IHJlc29sdmUpIHtcbiAgICB2YXIgX3RoZW4gPSBnZXRUaGVuKGVudHJ5KTtcblxuICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIF90aGVuKTtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJChlbnRyeSk7XG4gICAgICB9KSwgaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQoZW50cnkpLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFByb21pc2UuYWxsYCBhY2NlcHRzIGFuIGFycmF5IG9mIHByb21pc2VzLCBhbmQgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoXG4gIGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBwcm9taXNlcywgb3JcbiAgcmVqZWN0ZWQgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBiZSByZWplY3RlZC4gSXQgY2FzdHMgYWxsXG4gIGVsZW1lbnRzIG9mIHRoZSBwYXNzZWQgaXRlcmFibGUgdG8gcHJvbWlzZXMgYXMgaXQgcnVucyB0aGlzIGFsZ29yaXRobS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIFRoZSBhcnJheSBoZXJlIHdvdWxkIGJlIFsgMSwgMiwgMyBdO1xuICB9KTtcbiAgYGBgXG5cbiAgSWYgYW55IG9mIHRoZSBgcHJvbWlzZXNgIGdpdmVuIHRvIGBhbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVqZWN0KG5ldyBFcnJvcihcIjJcIikpO1xuICBsZXQgcHJvbWlzZTMgPSByZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAvLyBlcnJvci5tZXNzYWdlID09PSBcIjJcIlxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBhbGxcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cbiAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBhbGwoZW50cmllcykge1xuICByZXR1cm4gbmV3IEVudW1lcmF0b3IodGhpcywgZW50cmllcykucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJhY2VgIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaCBpcyBzZXR0bGVkIGluIHRoZSBzYW1lIHdheSBhcyB0aGVcbiAgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gc2V0dGxlLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0ID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIGl0IHdhcyByZXNvbHZlZCBiZWZvcmUgcHJvbWlzZTFcbiAgICAvLyB3YXMgcmVzb2x2ZWQuXG4gIH0pO1xuICBgYGBcblxuICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XG4gIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcbiAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xuICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdwcm9taXNlIDInKSk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxuICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXG4gIH0pO1xuICBgYGBcblxuICBBbiBleGFtcGxlIHJlYWwtd29ybGQgdXNlIGNhc2UgaXMgaW1wbGVtZW50aW5nIHRpbWVvdXRzOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXG4gIHByb21pc2UgdG8gc2V0dGxlLlxuKi9cbmZ1bmN0aW9uIHJhY2UoZW50cmllcykge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAgYFByb21pc2UucmVqZWN0YCByZXR1cm5zIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgYHJlYXNvbmAuXG4gIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlamVjdFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIGdpdmVuIGByZWFzb25gLlxuKi9cbmZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UgPyBpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBuZWVkc05ldygpO1xuICB9XG59XG5cblByb21pc2UuYWxsID0gYWxsO1xuUHJvbWlzZS5yYWNlID0gcmFjZTtcblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5Qcm9taXNlLnJlamVjdCA9IHJlamVjdDtcblByb21pc2UuX3NldFNjaGVkdWxlciA9IHNldFNjaGVkdWxlcjtcblByb21pc2UuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZS5fYXNhcCA9IGFzYXA7XG5cblByb21pc2UucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUHJvbWlzZSxcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICB9KTtcbiAgICBgYGBcbiAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQXNzaW1pbGF0aW9uXG4gICAgLS0tLS0tLS0tLS0tXG4gIFxuICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IHJlc3VsdDtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IGF1dGhvciwgYm9va3M7XG4gIFxuICAgIHRyeSB7XG4gICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgXG4gICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICBcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kQXV0aG9yKCkuXG4gICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIHRoZW5cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgdGhlbjogdGhlbixcblxuICAvKipcbiAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cbiAgXG4gICAgYGBganNcbiAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gICAgdmFyIGxvY2FsID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgaWYgKFApIHtcbiAgICAgICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2U7XG59XG5cbnBvbHlmaWxsKCk7XG4vLyBTdHJhbmdlIGNvbXBhdC4uXG5Qcm9taXNlLnBvbHlmaWxsID0gcG9seWZpbGw7XG5Qcm9taXNlLlByb21pc2UgPSBQcm9taXNlO1xuXG5yZXR1cm4gUHJvbWlzZTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVzNi1wcm9taXNlLm1hcCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIi8qIGdsb2JhbCAkICovXHJcbi8qKlxyXG4gKiBJdCBjb250YWlucyBhbGwgY29uZmlndXJhdGlvbnMgZm9yIHRoZSB0eXBlIGFoZWFkIHNlYXJjaCB3aWRnZXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcge1xyXG5cclxuICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICBpZiAoIWRhdGEgfHwgIShkYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSByZXNwb25zZSBkYXRhIHN1cHBvc2UgdG8gYmUgaW4gYXJyYXkgZm9ybVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0LlxyXG4gICAgICAvLyBUaGlzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGZpbHRlcmVkIHJlc3VsdCA8ZGl2Pi5cclxuICAgICAgdGhpcy5uYW1lID0gJ2ZvbGxvd09uVGFza0RlZm5TZWFyY2gnO1xyXG5cclxuICAgICAgLy8gVGhlIG1heCBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAgICB0aGlzLmxpbWl0ID0gNTA7XHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBjaGFyYWN0ZXIgbGVuZ3RoIG5lZWRlZCBiZWZvcmUgc3VnZ2VzdGlvbnMgc3RhcnQgZ2V0dGluZyByZW5kZXJlZC5cclxuICAgICAgdGhpcy5taW5MZW5ndGggPSAxO1xyXG4gICB9XHJcbn1cclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuLy8gaW1wb3J0IFR5cGVhaGVhZCBmcm9tIFwidHlwZWFoZWFkLmpzXCI7XHJcbi8vIGltcG9ydCBCbG9vZGhvdW5kIGZyb20gXCJibG9vZGhvdW5kLWpzXCI7XHJcblxyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZyBmcm9tICcuL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcuanMnO1xyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UgZnJvbSAnLi9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyB1aSBpbnRlcmFjdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciB7XHJcblxyXG4gICBjb25zdHJ1Y3Rvcih0eXBlQWhlYWRJZCwgb2tCdXR0b25JZCwgbm90Rm91bmRNc2dJZCwgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkLCBhcGlVcmxJZCkge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICB0aGlzLm5vdEZvdW5kTXNnRWwgPSAkKFwiI1wiICsgbm90Rm91bmRNc2dJZCk7XHJcbiAgICAgIHRoaXMub2tCdG5FbCA9ICQoJyMnICsgb2tCdXR0b25JZCk7XHJcbiAgICAgIHRoaXMudHlwZUFoZWFkU2VhcmNoSW5wdXRFbCA9ICQoJyMnICsgdHlwZUFoZWFkSWQpO1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbCA9ICQoJyMnICsgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkKTtcclxuICAgICAgbGV0IGFwaVVybEVsID0gJChcIiNcIiArIGFwaVVybElkKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5ub3RGb3VuZE1zZ0VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGZvdW5kIG1lc3NhZ2UgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLm9rQnRuRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPayBidXR0b24gZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUeXBlYWhlYWQgaW5wdXQgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk91dHB1dCBmb2xsb3dPbiB0YXNrIGRlZmluaXRpb24gVVVJIGlucHV0IGVsZW1lbnQgcmVxdWlyZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXBpVXJsRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSRVNUIGFwaSB1cmwgZWxlbWVudCBpcyByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmxFbC52YWwoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9ICcnO1xyXG5cclxuICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICBpZiAoc2NvcGUudHlwZUFoZWFkU2VhcmNoSW5wdXRFbC52YWwoKSAhPSBzY29wZS5zZWxlY3RlZE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICBzY29wZS5kaXNhYmxlT2tCdG4oKTtcclxuICAgICAgICAgICAgICAgICAgc2NvcGUuY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gYmluZCBzaWJsaW5nIG1ldGhvZHMgdG8gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSA9IHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldCB0aGUgaWQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIHRhc2sgZGVmaW5pdGlvbiB0byBvdXIgaHRtbCBpbnB1dCBlbGVtZW50XHJcbiAgICAqL1xyXG4gICBzZXRTZWxlY3RlZFRhc2tEZWZpbml0aW9uKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgaWYgKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLnZhbCh0aGlzLmRpc3BsYXlGb2xsb3dPbihudWxsLCBzdWdnZXN0aW9uKSk7XHJcbiAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwudmFsKCk7XHJcbiAgICAgICAgIHRoaXMuZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dEVsLmF0dHIoJ3ZhbHVlJywgc3VnZ2VzdGlvbi5pZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGNsZWFyIGFueSBzZWxlY3RlZCB0YXNrIGRlZmluaXRpb24gdmFsdWUgaW4gb3VyIGh0bWwgaW5wdXQgZWxlbWVudFxyXG4gICAgKi9cclxuICAgY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCkge1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5hdHRyKCd2YWx1ZScsICcnKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldHVwIFVJIGVsZW1lbnRzLCBmZXRjaCB0YXNrIGRlZmluaXRpb25zIGFuZCBjb25maWd1cmUgdHlwZSBhaGVhZFxyXG4gICAgKi9cclxuICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlT2tCdG4oKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgIHJldHVybiBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5nZXRGb2xsb3dPblRhc2tEZWZpbml0aW9ucyh0aGlzLmFwaVVybCkudGhlbigodGFza0RlZmluaXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlVHlwZUFoZWFkKHRhc2tEZWZpbml0aW9ucyk7XHJcbiAgICAgICAgICAgIC8vIG9uY2UgdGhlIHR5cGVhaGVhZCBpbnB1dCBpcyBpbml0aWFsaXplZCwgdGhlIHR5cGUgZmllbGQgd2lsbCBsb3N0IGZvY3VzLCBoYXZlIHRvXHJcbiAgICAgICAgICAgIC8vIG1hbnVhbGx5IGZvY3VzIGl0IGFnYWluLlxyXG4gICAgICAgICAgICB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwuZm9jdXMoKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGFzayBkZWZpbml0aW9ucy5cIiwgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBjb25maWd1cmUgdHlwZSBhaGVhZCB3aXRoIGRhdGEgc291cmNlIGFuZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXHJcbiAgICAqL1xyXG4gICBjb25maWd1cmVUeXBlQWhlYWQodGFza0RlZmluaXRpb25zKSB7XHJcbiAgICAgIGxldCBzY29wZSA9IHRoaXM7XHJcbiAgICAgIGxldCBjb25maWcgPSBuZXcgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZyh0YXNrRGVmaW5pdGlvbnMpO1xyXG5cclxuICAgICAgLy8gY3JlYXRlIGEgZGlzcGxheSB2YWx1ZSB0aGF0IHdpbGwgYWxsb3cgZnVsbCB0ZXh0IHNlYXJjaCBvbiBmdWxsIHZhbHVlLlxyXG4gICAgICAkLmVhY2goY29uZmlnLmRhdGEsIGZ1bmN0aW9uKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgIGRhdGEuZGlzcGxheVZhbHVlID0gc2NvcGUuZGlzcGxheUZvbGxvd09uKG51bGwsIGRhdGEpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQudHlwZWFoZWFkKHtcclxuICAgICAgICAgaW5wdXQ6IHNjb3BlLnR5cGVBaGVhZFNlYXJjaElucHV0RWwsXHJcbiAgICAgICAgIGhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgICAgbmFtZTogY29uZmlnLm5hbWUsXHJcbiAgICAgICAgIGxpbWl0OiBjb25maWcubGltaXQsXHJcbiAgICAgICAgIG1pbkxlbmd0aDogY29uZmlnLm1pbkxlbmd0aCxcclxuICAgICAgICAgZGlzcGxheTogW1wiZGlzcGxheVZhbHVlXCJdLFxyXG4gICAgICAgICBlbXB0eVRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm14LXR5cGVhaGVhZC1tc2ctbm90Zm91bmRcIj4nICsgc2NvcGUubm90Rm91bmRNc2dFbC52YWwoKSArICc8L2Rpdj4nLFxyXG4gICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgZGF0YTogY29uZmlnLmRhdGEsXHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIGNhbGxiYWNrOiB7XHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKHR5cGVBaGVhZElucHV0RWwsIHNlbGVjdGlvbkVsLCBzZWxlY3RlZFJlY29yZCwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgc2NvcGUuZW5hYmxlT2tCdG4oKTtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIHNhdmUgdXNlciBzZWxlY3Rpb24gZnJvbSB0aGUgc2VhcmNoIHJlc3VsdC5cclxuICAgICAgICAgICAgICAgc2NvcGUuc2V0U2VsZWN0ZWRUYXNrRGVmaW5pdGlvbihzZWxlY3RlZFJlY29yZCk7XHJcbiAgICAgICAgICAgICAgIHRoaXMuaGlkZUxheW91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIC8vIERlZmluZSBob3cgdGhlIHJlc3VsdCBpcyBkaXNwbGF5ZWQgaW4gdGhlIGRyb3Bkb3duLlxyXG4gICAvLyBJdCB3aWxsIGRpc3BsYXkgdGhlIHJlc3VsdCBpbiB0aGUgZm9ybWF0IG9mOiB0YXNrIGNvZGUgLSBjb25maWdzbG90IGNvZGUgLSB0YXNrIG5hbWVcclxuICAgZGlzcGxheUZvbGxvd09uKHF1ZXJ5LCBzdWdnZXN0aW9uT2JqKSB7XHJcbiAgICAgIGlmIChzdWdnZXN0aW9uT2JqKSB7XHJcbiAgICAgICAgIHJldHVybiBzdWdnZXN0aW9uT2JqLmNvZGUgKyBcIiAtIFwiICsgc3VnZ2VzdGlvbk9iai5jb25maWdTbG90Q29kZSArIFwiIC0gXCIgKyBzdWdnZXN0aW9uT2JqLm5hbWU7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFdyYXBwZXIgdG8gZW5hYmxlIG91ciBPSyBidXR0b25cclxuICAgICovXHJcbiAgIGVuYWJsZU9rQnRuKCkge1xyXG4gICAgICBpZiAodGhpcy5va0J0bkVsKSB7XHJcbiAgICAgICAgIGlmICh0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luT25DbGlja0V2ZW50JykpIHtcclxuICAgICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ29uY2xpY2snLCB0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luT25DbGlja0V2ZW50JykpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAodGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpblRpdGxlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ3RpdGxlJywgdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpblRpdGxlJykpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB0aGlzLm9rQnRuRWwucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwucmVtb3ZlQXR0cignb3JpZ2luT25DbGlja0V2ZW50Jyk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5yZW1vdmVBdHRyKCdvcmlnaW5UaXRsZScpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBXcmFwcGVyIHRvIGRpc2FibGUgb3VyIE9LIGJ1dHRvblxyXG4gICAgKi9cclxuICAgZGlzYWJsZU9rQnRuKCkge1xyXG4gICAgICBpZiAodGhpcy5va0J0bkVsKSB7XHJcbiAgICAgICAgIC8vIHN0b3JlIHRoZSBidXR0b24gb25jbGljayBoYW5kbGVyIGFuZCB0aXRsZSBmb3IgZnV0dXJlIHJlc3RvcmVcclxuICAgICAgICAgaWYgKCF0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luT25DbGlja0V2ZW50JykpIHtcclxuICAgICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpbk9uQ2xpY2tFdmVudCcsIHRoaXMub2tCdG5FbC5hdHRyKCdvbmNsaWNrJykpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoIXRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5UaXRsZScpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5UaXRsZScsIHRoaXMub2tCdG5FbC5hdHRyKCd0aXRsZScpKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdGhpcy5va0J0bkVsLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ29uY2xpY2snLCBmYWxzZSk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCd0aXRsZScsICcnKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG59XHJcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG4vKipcclxuICogVGhlIHNlcnZpY2UgbGF5ZXIsIGl0IHNlbmRzIFJFU1QgQVBJIGNhbGwgYW5kIHBhc3MgdGhlIHJlc3BvbnNlIGRhdGEgdG8gY29udHJvbGxlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2Uge1xyXG5cclxuICAgc3RhdGljIHNvcnRUYXNrRGVmaW5pdGlvbnModGFza0RlZmluaXRpb25zKSB7XHJcbiAgICAgIGlmICghdGFza0RlZmluaXRpb25zIHx8ICEodGFza0RlZmluaXRpb25zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2tEZWZpbml0aW9ucyBleHBlY3RlZCB0byBiZSBhbiBBcnJheVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRhc2tEZWZpbml0aW9ucy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgbGV0IGNvbXBhcmVSZXN1bHQgPSAoYS5jb2RlID4gYi5jb2RlKSA/IDEgOiAoKGEuY29kZSA8IGIuY29kZSkgPyAtMSA6IDApO1xyXG5cclxuICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb21wYXJlUmVzdWx0ID0gKGEuY29uZmlnU2xvdENvZGUgPiBiLmNvbmZpZ1Nsb3RDb2RlKSA/IDEgOiAoKGEuY29uZmlnU2xvdENvZGUgPCBiLmNvbmZpZ1Nsb3RDb2RlKSA/IC0xIDogMCk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgY29tcGFyZVJlc3VsdCA9IChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYS5uYW1lIDwgYi5uYW1lKSA/IC0xIDogMCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIGNvbXBhcmVSZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBzdGF0aWMgZ2V0Rm9sbG93T25UYXNrRGVmaW5pdGlvbnMoYXBpVXJsKSB7XHJcbiAgICAgIGxldCBzY29wZSA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYXBpVXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbih0YXNrRGVmaW5pdGlvbnNSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAvLyBuaWNlIHRvIGhhdmU6IHBvc3RQcm9jZXNzb3IgaG9va1xyXG4gICAgICAgICAgICAgICBsZXQgc29ydGVkVGFza0RlZmluaXRpb25zID0gc2NvcGUuc29ydFRhc2tEZWZpbml0aW9ucyh0YXNrRGVmaW5pdGlvbnNSZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgIHJlc29sdmUoc29ydGVkVGFza0RlZmluaXRpb25zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAvLyBpZiBlcnJvciBoYXBwZW5zIHdpdGggdGhlIEFQSSBjYWxsLCBpbml0aWFsaXplIHRoZSB3aWRnZXQgd2l0aCBhbiBlbXB0eSBhcnJheS5cclxuICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciBmcm9tICcuL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb250cm9sbGVyLmpzJztcblxubGV0IGNvbnRyb2xsZXIgPSBcbiAgICBuZXcgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbnRyb2xsZXIoJ2lkSW5wdXRUeXBlYWhlYWRGb2xsb3dPblRhc2tTZWFyY2gnLCBcbiAgICAgICAgJ2lkQnV0dG9uT2snLCBcbiAgICAgICAgJ2lkVHlwZWFoZWFkTm90Rm91bmRNZXNzYWdlJyxcbiAgICAgICAgJ2lkRmllbGRGb2xsb3dPblRhc2tEZWZuVXVpZCcsXG4gICAgICAgICdpZGZvbGxvd09uVGFza0RlZmluaXRpb25SZXN0QVBJJyk7XG5jb250cm9sbGVyLmluaXRpYWxpemUoKTtcbiIsIi8qIChpZ25vcmVkKSAqLyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=