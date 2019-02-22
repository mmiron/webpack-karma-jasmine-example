/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/engineering/requirementdefinition/followOnTask/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js":
/*!**************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FollowOnTaskDefinitionSearchConfig; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

/**
 * It contains all configurations for the type ahead search widget
 */
var FollowOnTaskDefinitionSearchConfig = function FollowOnTaskDefinitionSearchConfig(data) {
  _classCallCheck(this, FollowOnTaskDefinitionSearchConfig);

  if (!data || !(data instanceof Array)) {
    throw new Error("The response data suppose to be in array form");
  }

  this.data = data; // The name of the dataset.
  // This will be appended to the class name of the filtered result <div>.

  this.name = 'followOnTaskDefnSearch'; // The max number of suggestions to be displayed.

  this.limit = 50; // The minimum character length needed before suggestions start getting rendered.

  this.minLength = 1;
};



/***/ }),

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js":
/*!******************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FollowOnTaskDefinitionSearchController; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _followOnTaskDefinitionSearchConfig_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./followOnTaskDefinitionSearchConfig.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchConfig.js");
/* harmony import */ var _followOnTaskDefinitionSearchService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./followOnTaskDefinitionSearchService.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * The button controller that handles ui interactions.
 */

var FollowOnTaskDefinitionSearchController =
/*#__PURE__*/
function () {
  function FollowOnTaskDefinitionSearchController(typeAheadId, okButtonId, notFoundMsgId, followOnTaskDefnUuidOuputId, apiUrlId) {
    _classCallCheck(this, FollowOnTaskDefinitionSearchController);

    var scope = this;
    this.notFoundMsgEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + notFoundMsgId);
    this.okBtnEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + okButtonId);
    this.typeAheadSearchInputEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + typeAheadId);
    this.followOnTaskDefnUuidOuputEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + followOnTaskDefnUuidOuputId);
    var apiUrlEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + apiUrlId);

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
    }); // bind sibling methods to class instance.

    this.initialize = this.initialize.bind(this);
  }
  /**
   * set the id value of the selected task definition to our html input element
   */


  _createClass(FollowOnTaskDefinitionSearchController, [{
    key: "setSelectedTaskDefinition",
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
    key: "clearSelectedTaskDefinition",
    value: function clearSelectedTaskDefinition() {
      this.followOnTaskDefnUuidOuputEl.attr('value', '');
    }
    /**
     * setup UI elements, fetch task definitions and configure type ahead
     */

  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;

      this.disableOkBtn();

      try {
        return _followOnTaskDefinitionSearchService_js__WEBPACK_IMPORTED_MODULE_2__["default"].getFollowOnTaskDefinitions(this.apiUrl).then(function (taskDefinitions) {
          _this.configureTypeAhead(taskDefinitions); // once the typeahead input is initialized, the type field will lost focus, have to
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
    key: "configureTypeAhead",
    value: function configureTypeAhead(taskDefinitions) {
      var scope = this;
      var config = new _followOnTaskDefinitionSearchConfig_js__WEBPACK_IMPORTED_MODULE_1__["default"](taskDefinitions); // create a display value that will allow full text search on full value.

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(config.data, function (index, data) {
        data.displayValue = scope.displayFollowOn(null, data);
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.typeahead({
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
            scope.enableOkBtn(); // save user selection from the search result.

            scope.setSelectedTaskDefinition(selectedRecord);
            this.hideLayout();
          }
        }
      });
    } // Define how the result is displayed in the dropdown.
    // It will display the result in the format of: task code - configslot code - task name

  }, {
    key: "displayFollowOn",
    value: function displayFollowOn(query, suggestionObj) {
      if (suggestionObj) {
        return suggestionObj.code + " - " + suggestionObj.configSlotCode + " - " + suggestionObj.name;
      }
    }
    /**
     * Wrapper to enable our OK button
     */

  }, {
    key: "enableOkBtn",
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
    key: "disableOkBtn",
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



/***/ }),

/***/ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js":
/*!***************************************************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchService.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FollowOnTaskDefinitionSearchService; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * The service layer, it sends REST API call and pass the response data to controller
 */

var FollowOnTaskDefinitionSearchService =
/*#__PURE__*/
function () {
  function FollowOnTaskDefinitionSearchService() {
    _classCallCheck(this, FollowOnTaskDefinitionSearchService);
  }

  _createClass(FollowOnTaskDefinitionSearchService, null, [{
    key: "sortTaskDefinitions",
    value: function sortTaskDefinitions(taskDefinitions) {
      if (!taskDefinitions || !(taskDefinitions instanceof Array)) {
        console.error("taskDefinitions expected to be an Array");
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
        return jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
          type: "GET",
          url: apiUrl,
          success: function success(taskDefinitionsResponse) {
            // nice to have: postProcessor hook
            console.log("back from ajax");
            var sortedTaskDefinitions = scope.sortTaskDefinitions(taskDefinitionsResponse);
            console.log("back from sortedTaskDefinitions... resolving");
            return resolve(sortedTaskDefinitions);
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



/***/ }),

/***/ "./src/engineering/requirementdefinition/followOnTask/index.js":
/*!*********************************************************************!*\
  !*** ./src/engineering/requirementdefinition/followOnTask/index.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _followOnTaskDefinitionSearchController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./followOnTaskDefinitionSearchController.js */ "./src/engineering/requirementdefinition/followOnTask/followOnTaskDefinitionSearchController.js");

var controller = new _followOnTaskDefinitionSearchController_js__WEBPACK_IMPORTED_MODULE_0__["default"]('idInputTypeaheadFollowOnTaskSearch', 'idButtonOk', 'idTypeaheadNotFoundMessage', 'idFieldFollowOnTaskDefnUuid', 'idfollowOnTaskDefinitionRestAPI');
controller.initialize();

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=followOnTask.js.map