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
/******/ 		"basemaintenance/task/tasksupervision": 0
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
/******/ 	deferredModules.push(["./src/basemaintenance/task/tasksupervision/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js":
/*!*******************************************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskSupervisionController; });
/* harmony import */ var tabulator_tables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tabulator-tables */ "./node_modules/tabulator-tables/dist/js/tabulator.js");
/* harmony import */ var tabulator_tables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tabulator_tables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TaskSupervisionService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskSupervisionService */ "./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js");
/* harmony import */ var _common_validation_DateTimeValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/validation/DateTimeValidator */ "./src/common/validation/DateTimeValidator.js");
/* harmony import */ var _common_util_DateTimeHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/util/DateTimeHelper */ "./src/common/util/DateTimeHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var TaskSupervisionController =
/*#__PURE__*/
function () {
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

    this.service = parms.TaskSupervisionService || new _TaskSupervisionService__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
    key: "getServiceInstance",
    value: function getServiceInstance() {
      return this.service;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          _this.initShowCompleteTasksWidget();

          _this.initResultsTable();
        } catch (e) {
          console.error(e);
        }

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
    key: "initCrewsWidget",
    value: function initCrewsWidget() {
      return this.service.getCrewsForUser(this.userId);
    }
  }, {
    key: "initStartAndEndWidgets",
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
      } // The date fields for the DateTime widgets
      // do not provide sufficient validation so we will disable them.


      this.startDateElem.disabled = true;
      this.endDateElem.disabled = true;
      return this.service.getDefaultStartAndEndDates(this.userId);
    }
  }, {
    key: "initShowCompleteTasksWidget",
    value: function initShowCompleteTasksWidget() {
      document.getElementById(this.showCompleteId).checked = this.defaultShowComplete;
    }
  }, {
    key: "initResultsTable",
    value: function initResultsTable() {
      var _this2 = this;

      // The field names match those in:
      //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
      var listOfLabourAttrs = ['technician', 'labourSkill', 'labourStatus', 'jobStopReason', 'elapsedHoursMinutes', 'scheduledHours', 'actualHours']; // Note: it appears that Tabulator has difficulty if visible:false fields are after other fields,
      // so configure them first.	  

      this.table = new tabulator_tables__WEBPACK_IMPORTED_MODULE_0___default.a("#" + this.searchResultsId, {
        columns: [{
          title: 'Task Id',
          field: 'taskId',
          visible: false
        }, {
          title: 'Labour Row Id',
          field: 'labourRowId',
          visible: false
        }, {
          title: 'From Job Stop',
          field: 'isFromJobStop',
          visible: false
        }, {
          title: 'Line No',
          field: 'lineNo',
          sorter: 'number',
          align: 'center'
        }, {
          title: 'Task',
          field: 'taskName',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Task Status',
          field: 'taskStatus',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Task Class - Subclass',
          field: 'taskClassSubclass',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Task Priority',
          field: 'taskPriority',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Aircraft',
          field: 'aircraft',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Work Package',
          field: 'workpackage',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Work Location',
          field: 'workLocation',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Work Area',
          field: 'workArea',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Scheduled Start Date',
          field: 'scheduledStartDate',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Actual Start Date',
          field: 'actualStartDate',
          sorter: 'string',
          align: 'center'
        }, {
          field: 'Selected',
          align: 'center',
          width: 50,
          headerSort: false,
          formatter: function formatter() {
            return '<input id="checkBox" type="checkbox">';
          }
        }, {
          title: 'Technician',
          field: 'technician',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Skill',
          field: 'labourSkill',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Labour Row Status',
          field: 'labourStatus',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Job Stop Reason',
          field: 'jobStopReason',
          sorter: 'string',
          align: 'center'
        }, {
          title: 'Elapsed Time',
          field: 'elapsedHoursMinutes',
          sorter: 'string',
          align: 'center',
          formatter: this.isElapsedTimeGreaterThanThreshold.bind(this)
        }, {
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
    key: "actualHourCellFormatter",
    value: function actualHourCellFormatter(cell) {
      if (!cell) {
        return cell;
      }

      if (this.actualHourGreaterThanScheduledHours(cell)) {
        //format cell background to yellow
        cell.getElement().classList.add("highlightActualHoursCell");
      }

      var time = cell.getValue(); // Return empty string if Actual Hour value is blank
      // otherwise return Actual Hours value.

      return time ? time : '';
    }
  }, {
    key: "actualHourGreaterThanScheduledHours",
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
    key: "initSearchButton",
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
    key: "performSearch",
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
    } //
    // private methods
    //
    // Expect crews to be: [{code,name,id}]

  }, {
    key: "populateCrewsWidget",
    value: function populateCrewsWidget(crews) {
      // Clear existing options.
      $('#' + this.crewsFieldId).find('option').remove(); // Sort the crews.

      crews.sort(this.compareCrewAlphanumerically); // Add provided crews as options, if provided.

      if (crews) {
        var select = document.getElementById(this.crewsFieldId);
        var selectOptions = select.options;
        crews.forEach(function (crew, index) {
          var option = document.createElement("option");
          option.text = crew.label;
          option.value = crew.id;
          selectOptions.add(option);
        }); // Set the first crew as the default.

        select.selectedIndex = 0;
      }
    }
  }, {
    key: "compareCrewAlphanumerically",
    value: function compareCrewAlphanumerically(a, b) {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    } // Expect message to be a string

  }, {
    key: "handleFailureToGetCrewsForUser",
    value: function handleFailureToGetCrewsForUser(message) {
      throw new Error(message);
    }
  }, {
    key: "validateStartEndWidgetIds",
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
    key: "buildFieldIdsForDateTimeWidget",
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
    key: "setStartEndElemAttrs",
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
    key: "validateStartEndElems",
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
    key: "setStartAndEndWidgets",
    value: function setStartAndEndWidgets(defaultStartEndValues) {
      this.startDateElem.value = defaultStartEndValues.startDate;
      this.startTimeElem.value = defaultStartEndValues.startTime;
      this.startTimeZoneElem.value = defaultStartEndValues.startTimeZone;
      this.endDateElem.value = defaultStartEndValues.endDate;
      this.endTimeElem.value = defaultStartEndValues.endTime;
      this.endTimeZoneElem.value = defaultStartEndValues.endTimeZone;
    }
  }, {
    key: "updateResultsTable",
    value: function updateResultsTable(response) {
      // The response is a json list of objects generated from:
      //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
      var addToTop = true;
      this.table.clearData();
      this.table.addData(response, addToTop);
      this.table.setSort([{
        column: 'lineNo',
        dir: 'asc'
      }]);
    } // Format the date and time to that expected by com.mxi.mx.common.utils.DataTypeUtils

  }, {
    key: "formatDateTime",
    value: function formatDateTime(dateTimeWidgetId) {
      var fieldIds = this.buildFieldIdsForDateTimeWidget(dateTimeWidgetId);
      var dateValue = document.getElementById(fieldIds.dateFieldId).value;
      var timeValue = document.getElementById(fieldIds.timeFieldId).value;
      return dateValue + ' ' + timeValue;
    }
  }, {
    key: "isScheduledHoursCellEditable",
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
    key: "isActualHoursCellEditable",
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
    key: "isElapsedTimeGreaterThanThreshold",
    value: function isElapsedTimeGreaterThanThreshold(cell) {
      var time = cell.getValue();

      if (time) {
        var decimalTime = _common_validation_DateTimeValidator__WEBPACK_IMPORTED_MODULE_2__["default"].convertTimeToDecimal(time);

        if (decimalTime > parseFloat(this.laborRowElaspedTimeThreshold)) {
          return "<span class='elapsedTimeExceedsThreshold'>" + time + "</span>";
        }
      }

      return time;
    }
  }, {
    key: "validateHours",
    value: function validateHours(cell, value) {
      return _common_validation_DateTimeValidator__WEBPACK_IMPORTED_MODULE_2__["default"].validateHours(value);
    }
  }, {
    key: "handleScheduleHoursEdit",
    value: function handleScheduleHoursEdit(cell) {
      var rowData = cell.getRow().getData();
      this.service.updateScheduledHours(rowData.taskId, rowData.labourRowId, cell.getValue());
    }
  }, {
    key: "handleActualHoursEdit",
    value: function handleActualHoursEdit(cell) {
      var rowData = cell.getRow().getData();
      this.service.updateActualHours(rowData.taskId, rowData.labourRowId, cell.getValue());
    }
  }]);

  return TaskSupervisionController;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js":
/*!****************************************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/TaskSupervisionService.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskSupervisionService; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_util_DateTimeHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/util/DateTimeHelper */ "./src/common/util/DateTimeHelper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TaskSupervisionService =
/*#__PURE__*/
function () {
  function TaskSupervisionService() {
    _classCallCheck(this, TaskSupervisionService);

    this.errorMsgPrefix = 'Error code =  ';
  }

  _createClass(TaskSupervisionService, [{
    key: "getCrewsForUser",
    value: function getCrewsForUser(userId) {
      var _this = this;

      if (!userId) {
        throw new Error('userId is mandatory');
      }

      var crewListRestEndpoint = '/maintenix/rest/crews';
      var args = {
        'userId': userId
      };
      return new Promise(function (resolve, reject) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
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
    key: "getDefaultStartAndEndDates",
    value: function getDefaultStartAndEndDates(userId) {
      var _this2 = this;

      if (!userId) {
        throw new Error('userId is mandatory');
      }

      var currentDateTimeRestEndpoint = '/maintenix/rest/datetime/getCurrent';
      var args = {
        'userId': userId
      };
      return new Promise(function (resolve, reject) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
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
    key: "performSearch",
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
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
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
    } // validateHours(value) {
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
    key: "updateScheduledHours",
    value: function updateScheduledHours(taskId, labourRowId, newValue) {
      var _this4 = this;

      var data = {
        scheduledHours: newValue
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
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
    key: "updateActualHours",
    value: function updateActualHours(taskId, labourRowId, newValue) {
      var _this5 = this;

      var data = {
        actualHours: newValue
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        url: '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function error(jqXHR, textStatus, errorThrown) {
          var message = _this5.errorMsgPrefix + jqXHR.status;
          new Error(message);
        }
      });
    } //
    // private methods
    //

  }, {
    key: "validateDateFormat",
    value: function validateDateFormat(dateStr) {
      if (!dateStr) {
        throw new Error('dateStr is mandatory.');
      }

      if (typeof dateStr !== 'string') {
        throw new Error('dateStr is not a string');
      } // regex example: dd-MMM-yyyy


      var dateFormat = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/;
      var matchArray = dateStr.match(dateFormat);

      if (matchArray == null) {
        throw new Error('dateStr has invalid format.');
      }

      return true;
    }
  }, {
    key: "validateTimeFormat",
    value: function validateTimeFormat(timeStr) {
      if (!timeStr) {
        throw new Error('timeStr is mandatory.');
      }

      if (typeof timeStr !== 'string') {
        throw new Error('timeStr is not a string.');
      } // regex example: hh:mm


      var timeFormat = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
      var matchArray = timeStr.match(timeFormat);

      if (matchArray == null) {
        throw new Error('timeStr has invalid format.');
      }

      return true;
    }
  }, {
    key: "addHours",
    value: function addHours(date, hours) {
      return new Date(date.getTime() + hours * 60 * 60 * 1000);
    }
  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var str = (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + this.getMonthShortStr(date.getMonth() + 1) + '-' + date.getFullYear();
      return str;
    }
  }, {
    key: "formatTime",
    value: function formatTime(date) {
      var str = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      return str;
    }
  }, {
    key: "getMonthShortStr",
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



/***/ }),

/***/ "./src/basemaintenance/task/tasksupervision/index.js":
/*!***********************************************************!*\
  !*** ./src/basemaintenance/task/tasksupervision/index.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TaskSupervisionController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskSupervisionController */ "./src/basemaintenance/task/tasksupervision/TaskSupervisionController.js");

var controllerParms = {
  userId: document.getElementById('idUser').value,
  crewsFieldId: 'idCrewList',
  startFieldId: 'idStartDateTime'
};
var controller = new _TaskSupervisionController__WEBPACK_IMPORTED_MODULE_0__["default"](controllerParms);
controller.init();

/***/ }),

/***/ "./src/common/util/DateTimeHelper.js":
/*!*******************************************!*\
  !*** ./src/common/util/DateTimeHelper.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimeHelper; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateTimeHelper =
/*#__PURE__*/
function () {
  function DateTimeHelper() {
    _classCallCheck(this, DateTimeHelper);
  }

  _createClass(DateTimeHelper, null, [{
    key: "addHours",
    value: function addHours(date, hours) {
      return new Date(date.getTime() + hours * 60 * 60 * 1000);
    }
  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var str = (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + this.getMonthShortStr(date.getMonth() + 1) + '-' + date.getFullYear();
      return str;
    }
  }, {
    key: "formatTime",
    value: function formatTime(date) {
      var str = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      return str;
    } // Converts a time in the format hh:mm into its corresponding decimal value

  }, {
    key: "convertTimeToDecimal",
    value: function convertTimeToDecimal(time) {
      var hoursMinutes = time.split(/[.:]/);
      var hours = parseInt(hoursMinutes[0], 10);
      var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    }
  }, {
    key: "getMonthShortStr",
    value: function getMonthShortStr(month) {
      if (month === 1) return 'JAN';else if (month === 2) return 'FEB';else if (month === 3) return 'MAR';else if (month === 4) return 'APR';else if (month === 5) return 'MAY';else if (month === 6) return 'JUN';else if (month === 7) return 'JUL';else if (month === 8) return 'AUG';else if (month === 9) return 'SEP';else if (month === 10) return 'OCT';else if (month === 11) return 'NOV';else if (month === 12) return 'DEC';else return "";
    }
  }]);

  return DateTimeHelper;
}();



/***/ }),

/***/ "./src/common/validation/DateTimeValidator.js":
/*!****************************************************!*\
  !*** ./src/common/validation/DateTimeValidator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimeValidator; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateTimeValidator =
/*#__PURE__*/
function () {
  function DateTimeValidator() {
    _classCallCheck(this, DateTimeValidator);
  }

  _createClass(DateTimeValidator, null, [{
    key: "validateHours",
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
    } //
    // private methods
    //

  }, {
    key: "validateDateFormat",
    value: function validateDateFormat(dateStr) {
      if (!dateStr) {
        throw new Error('dateStr is mandatory.');
      }

      if (typeof dateStr !== 'string') {
        throw new Error('dateStr is not a string');
      } // regex example: dd-MMM-yyyy


      var dateFormat = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/;
      var matchArray = dateStr.match(dateFormat);

      if (matchArray == null) {
        throw new Error('dateStr has invalid format.');
      }

      return true;
    }
  }, {
    key: "validateTimeFormat",
    value: function validateTimeFormat(timeStr) {
      if (!timeStr) {
        throw new Error('timeStr is mandatory.');
      }

      if (typeof timeStr !== 'string') {
        throw new Error('timeStr is not a string.');
      } // regex example: hh:mm


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
//# sourceMappingURL=tasksupervision.js.map