/* global Tabulator */
import TaskSupervisionService from './TaskSupervisionService';
import DateTimeValidator from '../../../common/validation/DateTimeValidator';
import DateTimeHelper from '../../../common/util/DateTimeHelper';

export default class TaskSupervisionController {

   constructor(parms) {
      this.userId = parms.userId;

      if (!this.userId) {
         throw new Error('userId is mandatory');
      }

      this.crewsFieldId = parms.crewsFieldId;

      if (!this.crewsFieldId) {
         throw new Error('crewsFieldId is mandatory');
      }

      let crewsField = document.getElementById(this.crewsFieldId);
      if (!crewsField || crewsField.tagName != 'SELECT') {
         throw new Error('crewsFieldId must be a SELECT element');
      }

      this.service = parms.TaskSupervisionService || new TaskSupervisionService();
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

   getServiceInstance() {
      return this.service;
   }

   init() {
      return new Promise((resolve, reject) => {
         this.initShowCompleteTasksWidget();
         this.initResultsTable();
         this.initSearchButton();

         Promise.all([this.initCrewsWidget(), this.initStartAndEndWidgets()]).then((results) => {
            this.populateCrewsWidget(results[0]);
            this.setStartAndEndWidgets(results[1]);
            this.performSearch().then(() => resolve());
         }).catch((error) => {
            throw new Error(error);
         });
      });
   }

   initCrewsWidget() {
      return this.service.getCrewsForUser(this.userId);
   }

   initStartAndEndWidgets() {
      if (!this.userId) {
         throw new Error('userId is mandatory');
      }

      try {
         this.validateStartEndWidgetIds();
         let startFieldIds = this.buildFieldIdsForDateTimeWidget(this.startDateWidgetId);
         let endFieldIds = this.buildFieldIdsForDateTimeWidget(this.endDateWidgetId);
         this.setStartEndElemAttrs(startFieldIds, endFieldIds);
         this.validateStartEndElems();
      }
      catch (exception) {
         console.error("initStartAndEndWidgets", exception);
      }
      // The date fields for the DateTime widgets
      // do not provide sufficient validation so we will disable them.
      this.startDateElem.disabled = true;
      this.endDateElem.disabled = true;

      return this.service.getDefaultStartAndEndDates(this.userId);
   }

   initShowCompleteTasksWidget() {
      document.getElementById(this.showCompleteId).checked = this.defaultShowComplete;
   }


   initResultsTable() {
      // The field names match those in:
      //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
      const listOfLabourAttrs = ['technician', 'labourSkill', 'labourStatus', 'jobStopReason', 'elapsedHoursMinutes',
         'scheduledHours', 'actualHours'
      ];

      // Note: it appears that Tabulator has difficulty if visible:false fields are after other fields,
      // so configure them first.	  
      this.table = new Tabulator("#" + this.searchResultsId, {
         columns: [
            { title: 'Task Id', field: 'taskId', visible: false },
            { title: 'Labour Row Id', field: 'labourRowId', visible: false },
            { title: 'From Job Stop', field: 'isFromJobStop', visible: false },
            { title: 'Line No', field: 'lineNo', sorter: 'number', align: 'center' },
            { title: 'Task', field: 'taskName', sorter: 'string', align: 'center' },
            { title: 'Task Status', field: 'taskStatus', sorter: 'string', align: 'center' },
            { title: 'Task Class - Subclass', field: 'taskClassSubclass', sorter: 'string', align: 'center' },
            { title: 'Task Priority', field: 'taskPriority', sorter: 'string', align: 'center' },
            { title: 'Aircraft', field: 'aircraft', sorter: 'string', align: 'center' },
            { title: 'Work Package', field: 'workpackage', sorter: 'string', align: 'center' },
            { title: 'Work Location', field: 'workLocation', sorter: 'string', align: 'center' },
            { title: 'Work Area', field: 'workArea', sorter: 'string', align: 'center' },
            { title: 'Scheduled Start Date', field: 'scheduledStartDate', sorter: 'string', align: 'center' },
            { title: 'Actual Start Date', field: 'actualStartDate', sorter: 'string', align: 'center' },
            { field: 'Selected', align: 'center', width: 50, headerSort: false, formatter: () => { return '<input id="checkBox" type="checkbox">'; } },
            { title: 'Technician', field: 'technician', sorter: 'string', align: 'center' },
            { title: 'Skill', field: 'labourSkill', sorter: 'string', align: 'center' },
            { title: 'Labour Row Status', field: 'labourStatus', sorter: 'string', align: 'center' },
            { title: 'Job Stop Reason', field: 'jobStopReason', sorter: 'string', align: 'center' },
            { title: 'Elapsed Time', field: 'elapsedHoursMinutes', sorter: 'string', align: 'center', formatter: this.isElapsedTimeGreaterThanThreshold.bind(this) },
            {
               title: 'Sched. Hours',
               field: 'scheduledHours',
               sorter: 'string',
               align: 'center',
               editor: 'input',
               validator: ['min: 0', this.validateHours],
               editable: this.isScheduledHoursCellEditable,
               cellEdited: this.handleScheduleHoursEdit
            },
            {
               title: 'Actual Hours',
               field: 'actualHours',
               sorter: 'string',
               align: 'center',
               editor: 'input',
               validator: ['min: 0', this.validateHours],
               editable: this.isActualHoursCellEditable,
               cellEdited: this.handleActualHoursEdit,
               formatter: this.actualHourCellFormatter
            }
         ],
         dataSorted: (sorters, rows) => {
            // This check is done as the callback is called before the table has been completely instantiated
            // As a result, an undefined object error message will occur as the setGroupBy is being called on an undefined table
            if (this.table) {
               if (sorters.some((attr) => listOfLabourAttrs.indexOf(attr.field) >= 0)) {
                  this.table.setGroupBy();
               }
               else {
                  this.table.setGroupBy("taskId");
               }
            }
         },
         groupHeader: (value, count, data, group) => {
            return data[0].taskName + "<span style='color:#000; margin-left:10px;'>(" + count + " items)</span>";
         },
         groupToggleElement: "header",
         placeholder: this.noSearchResultsMessage
      });
   }


   actualHourCellFormatter(cell) {

      if (!cell) {
         return cell;
      }

      if (this.actualHourGreaterThanScheduledHours(cell)) {
         //format cell background to yellow
         cell.getElement().classList.add("highlightActualHoursCell");
      }

      let time = cell.getValue();
      // Return empty string if Actual Hour value is blank
      // otherwise return Actual Hours value.
      return (time ? time : '');
   }

   actualHourGreaterThanScheduledHours(cell) {

      let actualHours = cell.getValue();
      if (!actualHours) {
         return actualHours;
      }

      let scheduleHours = cell.getRow().getData().scheduledHours;
      if (!scheduleHours) {
         return scheduleHours;
      }

      return parseInt(actualHours) > parseInt(scheduleHours);
   }

   initSearchButton() {
      let $button = $('#' + this.searchButtonId);
      if (this.isAllowedToSearch) {
         $button.show();
         $button.click((event) => {
            event.preventDefault();
            this.performSearch();
         });
      }
      else {
         $button.hide();
      }
   }

   performSearch() {
      return new Promise((resolve, reject) => {
         if (this.isAllowedToSearch) {
            let args = {
               'crewId': document.getElementById(this.crewsFieldId).value,
               'startDateTime': this.formatDateTime(this.startDateWidgetId),
               'endDateTime': this.formatDateTime(this.endDateWidgetId),
               'showCompleteTasks': document.getElementById(this.showCompleteId).checked
            };
            
            return this.service.performSearch(args).then(response => {
               this.updateResultsTable(response);
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
   populateCrewsWidget(crews) {
      // Clear existing options.
      $('#' + this.crewsFieldId).find('option').remove();

      // Sort the crews.
      crews.sort(this.compareCrewAlphanumerically);

      // Add provided crews as options, if provided.
      if (crews) {
         let select = document.getElementById(this.crewsFieldId);
         let selectOptions = select.options;
         crews.forEach((crew, index) => {
            let option = document.createElement("option");
            option.text = crew.label;
            option.value = crew.id;
            selectOptions.add(option);
         });

         // Set the first crew as the default.
         select.selectedIndex = 0;
      }
   }

   compareCrewAlphanumerically(a, b) {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
   }

   // Expect message to be a string
   handleFailureToGetCrewsForUser(message) {
      throw new Error(message);
   }

   validateStartEndWidgetIds() {
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

   buildFieldIdsForDateTimeWidget(widgetId) {
      // These ids were determined by looking at the custom tag DateTimeField
      return {
         dateFieldId: widgetId + '_$DATE$',
         timeFieldId: widgetId + '_$TIME$',
         timeZoneFieldId: widgetId + '_$TIMEZONE_DISPLAY$',
         startPickerId: widgetId + '_SelectBtn'
      };
   }

   setStartEndElemAttrs(startDateWidgetIds, endDateWidgetIds) {
      this.startDateElem = document.getElementById(startDateWidgetIds.dateFieldId);
      this.startTimeElem = document.getElementById(startDateWidgetIds.timeFieldId);
      this.startTimeZoneElem = document.getElementById(startDateWidgetIds.timeZoneFieldId);
      this.startPickerElem = document.getElementById(startDateWidgetIds.startPickerId);

      this.endDateElem = document.getElementById(endDateWidgetIds.dateFieldId);
      this.endTimeElem = document.getElementById(endDateWidgetIds.timeFieldId);
      this.endTimeZoneElem = document.getElementById(endDateWidgetIds.timeZoneFieldId);
      this.endPickerElem = document.getElementById(endDateWidgetIds.startPickerId);
   }

   validateStartEndElems() {
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

   setStartAndEndWidgets(defaultStartEndValues) {
      this.startDateElem.value = defaultStartEndValues.startDate;
      this.startTimeElem.value = defaultStartEndValues.startTime;
      this.startTimeZoneElem.value = defaultStartEndValues.startTimeZone;

      this.endDateElem.value = defaultStartEndValues.endDate;
      this.endTimeElem.value = defaultStartEndValues.endTime;
      this.endTimeZoneElem.value = defaultStartEndValues.endTimeZone;
   }


   updateResultsTable(response) {
      // The response is a json list of objects generated from:
      //    com.mxi.mx.web.rest.task.CrewTaskLabourResponse
      let addToTop = true;
      this.table.clearData();
      this.table.addData(response, addToTop);
      this.table.setSort([{ column: 'lineNo', dir: 'asc' }]);
   }


   // Format the date and time to that expected by com.mxi.mx.common.utils.DataTypeUtils
   formatDateTime(dateTimeWidgetId) {
      let fieldIds = this.buildFieldIdsForDateTimeWidget(dateTimeWidgetId);

      let dateValue = document.getElementById(fieldIds.dateFieldId).value;
      let timeValue = document.getElementById(fieldIds.timeFieldId).value;

      return dateValue + ' ' + timeValue;
   }

   isScheduledHoursCellEditable(cell) {
      if (this.isAllowedToEditSchedledHours) {
         let rowData = cell.getRow().getData();
         if (rowData.isFromJobStop && rowData.labourStatus == 'ACTV') {
            return true;
         }
      }
      return false;
   }

   isActualHoursCellEditable(cell) {
      if (this.isAllowedToEditActualHours) {
         let rowData = cell.getRow().getData();
         if (rowData.labourStatus == 'COMPLETE') {
            return true;
         }
      }
      return false;
   }

   isElapsedTimeGreaterThanThreshold(cell) {
      let time = cell.getValue();
      if (time) {
         let decimalTime = DateTimeValidator.convertTimeToDecimal(time);
         if (decimalTime > parseFloat(this.laborRowElaspedTimeThreshold)) {
            return "<span class='elapsedTimeExceedsThreshold'>" + time + "</span>";
         }
      }

      return time;
   }

   validateHours(cell, value) {
      return DateTimeValidator.validateHours(value);
   }

   handleScheduleHoursEdit(cell) {
      let rowData = cell.getRow().getData();
      this.service.updateScheduledHours(
         rowData.taskId,
         rowData.labourRowId,
         cell.getValue());
   }

   handleActualHoursEdit(cell) {
      let rowData = cell.getRow().getData();
      this.service.updateActualHours(
         rowData.taskId,
         rowData.labourRowId,
         cell.getValue());
   }
}
