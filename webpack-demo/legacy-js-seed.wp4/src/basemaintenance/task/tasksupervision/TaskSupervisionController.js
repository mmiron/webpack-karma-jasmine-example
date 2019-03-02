import "@babel/polyfill";
import $ from 'jquery';
import Tabulator from 'tabulator-tables';
import TaskSupervisionService from './TaskSupervisionService';
import DateTimeUtils from './DateTimeUtils';


export default class TaskSupervisionController {

   constructor(parms) {
      this.service = parms.TaskSupervisionService || new TaskSupervisionService();

      this.user = parms.user;
      this.isAllowedToEditActualHours = parms.isAllowedToEditActualHours;
      this.isAllowedToEditSchedledHours = parms.isAllowedToEditSchedledHours;
      this.isAllowedToJobStop = parms.isAllowedToJobStop;
      this.isAllowedToSearch = parms.isAllowedToSearch;
      this.isAllowedToUnassignSelected = parms.isAllowedToUnassignSelected;

      this.crewsFieldId = parms.crewsFieldId;
      this.startDateWidgetId = parms.startFieldId;
      this.endDateWidgetId = parms.endFieldId;
      this.showCompleteId = parms.showCompleteId;
      this.searchButtonId = parms.searchButtonId;
      this.jobStopButtonId = parms.jobStopButtonId;
      this.unassignButtonId = parms.unassignButtonId;
      this.searchResultsId = parms.searchResultsId;
      this.noSearchResultsMessage = parms.noSearchResultsMessage;
      this.unassignedLabel = parms.unassignedLabel;
      this.laborRowElaspedHoursThreshold = parms.laborRowElaspedHoursThreshold;

      this.contextPath = parms.contextPath;
      this.trackerImagePath = parms.trackerImagePath;
      this.currentUrlHash = parms.currentUrlHash;
      //Task Details info
      this.taskDetailsPagePath = parms.taskDetailsPagePath;
      this.taskDetailsPageTaskParm = parms.taskDetailsPageTaskParm;
      //Inventory Details info
      this.inventoryDetailsPagePath = parms.inventoryDetailsPagePath;
      this.inventoryDetailsPageParm = parms.inventoryDetailsPageParm;
      //Work pacakage Details info
      this.checkDetailsPagePath = parms.checkDetailsPagePath;
      this.checkDetailsPageParm = parms.checkDetailsPageParm;
      //labour Details info
      this.labourDetailsPagePath = parms.labourDetailsPagePath;
      this.labourDetailsPageParm = parms.labourDetailsPageParm;

      this.defaultShowComplete = true;
      this.pencilImageSrc = this.trackerImagePath + '/pencil.gif';

      // Provided for testing.
      this.table = parms.fakeTable;
   }

   init() {
      this.initShowCompleteTasksWidget();
      this.initResultsTable();
      this.initSearchButton();
      this.initJobStopButton();
      this.initUnassignSelectedButton();

      Promise.all([this.initCrewsWidget(), this.initStartAndEndWidgets()]).then((results) => {
         this.populateCrewsWidget(results[0]);
         this.setStartAndEndWidgets(results[1]);
         this.performSearch();
      }).catch((error) => {
         throw new Error(error);
      });
   }


   initCrewsWidget() {
      if ( ! this.user ) {
         throw new Error('userId is mandatory');
      }
      if ( ! this.crewsFieldId ) {
         throw new Error('crewsFieldId is mandatory');
      }
      let crewsField = document.getElementById(this.crewsFieldId);
      if ( ! crewsField || crewsField.tagName != 'SELECT' ) {
         throw new Error('crewsFieldId must be a SELECT element');
      }

      return this.service.getCrewsForUser(this.user);
   }

   initStartAndEndWidgets() {
      if ( ! this.user ) {
         throw new Error('userId is mandatory');
      }
      this.validateStartEndWidgetIds();
      let startFieldIds = this.buildFieldIdsForDateTimeWidget(this.startDateWidgetId);
      let endFieldIds = this.buildFieldIdsForDateTimeWidget(this.endDateWidgetId);
      this.setStartEndElemAttrs(startFieldIds, endFieldIds);
      this.validateStartEndElems();

      // The date fields for the DateTime widgets
      // do not provide sufficient validation so we will disable them.
      this.startDateElem.disabled = true;
      this.endDateElem.disabled = true;

      return this.service.getDefaultStartAndEndDates(this.user);
   }

   initShowCompleteTasksWidget() {
      document.getElementById(this.showCompleteId).checked = this.defaultShowComplete;
   }

   initResultsTable() {

      // The field names match those in:
      //    com.mxi.mx.web.rest.task.TasksResponse

      const listOfLabourAttrs = [ 'technician', 'labourSkill', 'labourRoleStatus', 'jobStopReason', 'elapsedHoursMinutes',
         'scheduledHours', 'actualHours'];

      this.table = new Tabulator("#idSearchResults", {
         columns: [
            {title: 'Line No', field: 'lineNo', sorter: 'number', align: 'center', width: 60},
            {title: 'Task', sorter: 'string', align: 'center', formatter: this.formatTaskCell.bind(this), width: 80},
            {title: 'Task Status', field: 'taskStatus', sorter: 'string', align: 'center', width: 80},
            {title: 'Task Class - Subclass', field: 'taskClassSubclass', sorter: 'string', align: 'center', width: 90},
            {title: 'Task Priority', field: 'taskPriority', sorter: 'string', align: 'center', width: 85},
            {title: 'Aircraft', sorter: 'string', align: 'center', formatter: this.formatAircraftCell.bind(this)},
            {title: 'Work Package',   sorter: 'string', align: 'center',  formatter: this.formatWorkpackageCell.bind(this), width: 130},
            {title: 'Work Location', field: 'workLocation', sorter: 'string', align: 'center', width: 90},
            {title: 'Work Area', field: 'workArea', sorter: 'string', align: 'center', width: 90},
            {title: 'Scheduled Start Date', field: 'simpleFormatScheduledStartDate', sorter: 'string', align: 'center', width: 140},
            {title: 'Actual Start Date', field: 'simpleFormatActualStartDate', sorter: 'string', align: 'center', width: 140},
            {title: 'Technician', field: 'technician', sorter: 'string', align: 'center', width: 105,
               mutator: this.mutateTechnicianCell.bind(this),
               formatter: this.formatTechnicianCell.bind(this)
            },
            {title: 'Skill', field: 'labourSkill', sorter: 'string', align: 'center'},
            {title: 'Labor Row Stage', field: 'labourRoleStatus', sorter: 'string', align: 'center', width: 80},
            {title: 'Job Stop Reason', field: 'jobStopReason', sorter: 'string', align: 'center', width: 80},
            {title: 'Elapsed Time', field: 'elapsedHoursMinutes', sorter: 'string', align: 'center', formatter: this.formatElapsedTimeCell.bind(this), width: 85},
            {title: 'Sched. Hours', field: 'scheduledHours', sorter: 'string', align: 'center', editor: 'input', width: 80,
               validator: ['min: 0', this.validateHours.bind(this)],
               editable: this.isScheduledHoursCellEditable.bind(this),
               cellEdited: this.handleScheduledHoursEdit.bind(this),
               mutator: this.mutateHoursCell.bind(this),
               formatter: this.formatScheduledHoursCell.bind(this)
            },
            {title: 'Actual Hours', field: 'actualHours', sorter: 'string', align: 'center', editor: 'input', width: 80,
               validator: ['min: 0', this.validateHours.bind(this)],
               editable: this.isActualHoursCellEditable.bind(this),
               cellEdited: this.handleActualHoursEdit.bind(this),
               mutator: this.mutateHoursCell.bind(this),
               formatter: this.formatActualHoursCell.bind(this)
            }
         ],
         selectable:true,
         dataSorted: (sorters, rows) => {
            // This check is done as the callback is called before the table has been completely instantiated
            // As a result, an undefined object error message will occur as the setGroupBy is being called on an undefined table
            if (this.table) {
               if(sorters.some((attr) => listOfLabourAttrs.indexOf(attr.field) >= 0)) {
                  this.table.setGroupBy();
               }  else{
                  this.table.setGroupBy("taskId");
               }
            }
         },
         groupHeader: (value, count, data, group) => {
            return data[0].taskName + "<span style='color:#000; margin-left:10px;'>(" + count + " items)</span>";
         },
         rowSelectionChanged: (data, rows) => {
            var i;
            var inWorkCount = 0;
            let unassignSelectedCount = 0 ;
            for (i in data) {
               if ( data[i].labourRoleStatus === "IN WORK") {
                  inWorkCount++;
               }

               if( (data[i].labourRoleStatus == "IN WORK" || data[i].labourRoleStatus == "ACTV")  &&
                     data[i].technician != "Unassigned" && data[i].actualHours == null){
                     unassignSelectedCount++;
               }
            }
            let $unassignSelectedButton = $('#' + this.unassignButtonId);
            let $button = $('#'+this.jobStopButtonId);

            $button[0].disabled = !(data.length > 0 && (inWorkCount === data.length));
            $unassignSelectedButton[0].disabled = !(data.length > 0 && (unassignSelectedCount === data.length));
         },
         groupToggleElement: "header",
         placeholder: this.noSearchResultsMessage
      });
   }

   buildTaskDetailsPageLink(cell) {
      let rowData = cell.getRow().getData();
      return this.createURL(
               this.taskDetailsPagePath,
               this.taskDetailsPageTaskParm,
               rowData.encryptedTaskKey,
               rowData.taskName
            );
   }

   buildInventoryDetailsPageLink(cell) {
      let rowData = cell.getRow().getData();
      return this.createURL(
                this.inventoryDetailsPagePath,
                this.inventoryDetailsPageParm,
                rowData.encryptedAircraftKey,
                rowData.aircraft
            );
   }

   buildCheckDetailsPageLink(cell) {
      let rowData = cell.getRow().getData();
      return this.createURL(
               this.checkDetailsPagePath,
               this.checkDetailsPageParm,
               rowData.encryptedWorkpackageKey,
               rowData.workpackage
            );
   }

   createURL(path, parm, encryptedKey, label) {
      let url = this.contextPath + path + '?' + parm + '=' +
      encodeURIComponent(encryptedKey) + '&aReturnToPage=' + this.currentUrlHash;
      return  '<a href="' + url + '">' + label + '</a>';
   }

   formatScheduledHoursCell(cell) {
      if ( !cell ) {
         return undefined;
      }
      let value = cell.getValue();
      return (this.isScheduledHoursCellEditable(cell)) ? this.addPencilImgage(value) : value;
   }

   formatActualHoursCell(cell) {
      if ( !cell ) {
         return undefined;
      }
      if (this.isActualHourGreaterThanScheduledHours(cell)) {
         cell.getElement().classList.add("highlightActualHoursCell");
      }
      let value = cell.getValue();
      return (this.isActualHoursCellEditable(cell)) ? this.addPencilImgage(value) : value;
   }

   addPencilImgage(value) {
      return '<div><span>' + value + '</span>&nbsp<img src="' + this.pencilImageSrc + '"></div>';
   }

   mutateHoursCell(value) {
      // Convert to duration format if not already (but leave blank alone).	  
      if ( value && !value.includes(':') ) {
         return DateTimeUtils.decimalHoursToDuration( value );
      }
	  
      return value;
   }

   mutateTechnicianCell(value) {
      if ( ! value ) {
         return this.unassignedLabel;
      }
      return value;
   }

   isActualHourGreaterThanScheduledHours(cell) {
      let actualHours = cell.getValue();
      if(!actualHours){
         return actualHours;
      }
      let scheduleHours = cell.getRow().getData().scheduledHours;
      if(!scheduleHours){
         return undefined;
      }
     return parseInt(actualHours) > parseInt(scheduleHours) ;
   }

   initSearchButton() {
      let $button = $('#'+this.searchButtonId);
      if (this.isAllowedToSearch) {
         $button.show();
         $button.click((event) => {
            event.preventDefault();
            this.performSearch();
            });
      } else {
         $button.hide();
      }
   }

   initJobStopButton() {
      let $button = $('#'+this.jobStopButtonId);
      if (this.isAllowedToJobStop) {
         $button.show();
         $button.click((event) => {
            event.preventDefault();
            this.performJobStop();
            });
      } else {
         $button.hide();
      }
   }

   initUnassignSelectedButton(){
      let $button = $('#' + this.unassignButtonId);
      if(this.isAllowedToUnassignSelected){
         $button[0].disabled = 1 ;
         $button.click((event) => {
            this.performUnassign();
            });
      } else {
         $button.hide();
      }
   }

   performSearch() {
      if (this.isAllowedToSearch) {
         let args = {
               'crewId': document.getElementById(this.crewsFieldId).value,
               'startDateTime': this.formatDateTime(this.startDateWidgetId),
               'endDateTime': this.formatDateTime(this.endDateWidgetId),
               'showCompleteTasks': document.getElementById(this.showCompleteId).checked,
               'taskKeyEncryptionName': this.taskDetailsPageTaskParm,
               'workpackageKeyEncryptionName': this.checkDetailsPageParm,
               'aircraftKeyEncryptionName': this.inventoryDetailsPageParm,
               "labourKeyEncryptionName": this.labourDetailsPageParm
               };

         this.service.performSearch(
               args,
               this.updateResultsTable.bind(this),
               (msg)=> {throw new Error(msg);}
               );
      }
   }

   performJobStop() {
      if (this.isAllowedToJobStop) {
         var selectedRows = this.table.getSelectedRows();
         var selectedIds= new Array(selectedRows.length);
         for (var i in selectedRows) {
            selectedIds[i]=selectedRows[i]._row.data.labourRowId;
         }
         this.service.performJobStop(
               selectedIds,
               this.handleJobStopResult.bind(this),
               (msg)=> {throw new Error(msg);}
               );
      }
   }

   performUnassign(){

      if (this.isAllowedToUnassignSelected) {
         var selectedRows = this.table.getSelectedRows();
         var selectedIds= new Array(selectedRows.length);
         for (var i in selectedRows) {
            selectedIds[i]=selectedRows[i]._row.data.labourRowId;
         }
        this.service.performUnassign(
               selectedIds,
               this.handleJobStopResult.bind(this),
               (msg)=> {throw new Error(msg);}
               );
      }
   }

   //
   // private methods
   //

   // Expect crews to be: [{code,name,id}]
   populateCrewsWidget(crews) {
      // Clear existing options.
      $('#'+this.crewsFieldId).find('option').remove();

      // Sort the crews.
      crews.sort(this.compareCrewAlphanumerically);

      // Add provided crews as options, if provided.
      if (crews) {
         let select = document.getElementById(this.crewsFieldId);
         let selectOptions = select.options;
         crews.forEach( (crew, index) => {
            let option = document.createElement("option");
            option.text = crew.label;
            option.value = crew.id;
            selectOptions.add(option);
         });

         // Set the first crew as the default.
         select.selectedIndex = 0;
      }
   }

   compareCrewAlphanumerically(a,b) {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
   }

   // Expect message to be a string
   handleFailureToGetCrewsForUser(message) {
      throw new Error(message);
   }

   validateStartEndWidgetIds() {
      if ( ! this.startDateWidgetId )  {
         throw new Error('startFieldId is mandatory');
      }
      if (typeof this.startDateWidgetId !== 'string')  {
         throw new Error('startFieldId is not a string');
      }
      if ( ! this.endDateWidgetId )  {
         throw new Error('endFieldId is mandatory');
      }
      if (typeof this.endDateWidgetId !== 'string')  {
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
      if( ! this.startDateElem ){
         throw new Error('start date field does not exist in the DOM.');
      }
      if( ! this.startTimeElem ){
         throw new Error('start time field does not exist in the DOM.');
      }
      if( ! this.startTimeZoneElem ){
         throw new Error('start time zone field does not exist in the DOM.');
      }
      if( ! this.startPickerElem ){
         throw new Error('start date picker field does not exist in the DOM.');
      }

      if( ! this.endDateElem ){
         throw new Error('end date field does not exist in the DOM.');
      }
      if( ! this.endTimeElem ){
         throw new Error('end time field does not exist in the DOM.');
      }
      if( ! this.endTimeZoneElem ){
         throw new Error('end time zone field does not exist in the DOM.');
      }
      if( ! this.endPickerElem ){
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
      this.table.setSort([{column: 'lineNo', dir: 'asc'}]);
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
         if (rowData.isFromJobStop && rowData.labourRoleStatus == 'ACTV') {
            return true;
         }
      }
      return false;
   }

   handleJobStopResult(response) {
      var selectedRows = this.table.getSelectedRows();
      for (var i in selectedRows) {
         selectedRows[i].deselect();
      }
      this.performSearch();
   }

   isActualHoursCellEditable(cell) {
      if (this.isAllowedToEditActualHours) {
         let rowData = cell.getRow().getData();
         if (rowData.labourRoleStatus == 'COMPLETE' ||
               (rowData.labourRoleStatus == 'IN WORK' && rowData.actualHours  != null ) ) {
            return true;
         }
      }
      return false;
   }

   formatTaskCell(cell) {
      return this.buildTaskDetailsPageLink(cell);
   }

   formatAircraftCell(cell) {
      return this.buildInventoryDetailsPageLink(cell);
   }

   formatWorkpackageCell(cell) {
      return this.buildCheckDetailsPageLink(cell);
   }

   formatTechnicianCell(cell) {
      if (this.isTechnicianToBeHyperlinked(cell)) {
         return this.buildLabourDetailsPageLink(cell);
      }
      return cell.getValue();
   }

   isTechnicianToBeHyperlinked(cell) {
      let rowData = cell.getRow().getData();
      if (cell.getValue() == this.unassignedLabel) {
         //When unassigned and historic
         if(rowData.labourStage == 'COMPLETE' ||
               rowData.labourStage == 'CANCEL') {
            return false;
         }
      } else {
         //When assigned and non ACTV
         if (rowData.labourRoleStatus != 'ACTV' ) {
            return false;
         }
      }
      return true;
   }

   buildLabourDetailsPageLink(cell) {
      let rowData = cell.getRow().getData();
      return this.createURL(
                this.labourDetailsPagePath,
                this.labourDetailsPageParm,
                rowData.encryptedLabourKey,
                cell.getValue());
   }


   formatElapsedTimeCell(cell) {
      let value = cell.getValue();
      if (value) {
         let decimalTime = DateTimeUtils.durationToHoursDecimal(value);
         if (decimalTime > parseFloat(this.laborRowElaspedHoursThreshold)) {
            return "<span class='elapsedTimeExceedsThreshold'>" + value + "</span>";
         }
      }
      return value;
   }

   validateHours(cell, value) {
      if ( value === undefined || value.length > 7 ) {
         return false;
      }
      // Verify that it can be successfully converted to a decimal.
      return ( ! isNaN(DateTimeUtils.durationToHoursDecimal(value)) );
   }

   handleScheduledHoursEdit(cell) {
      let rowData = cell.getRow().getData();
      let newValue = DateTimeUtils.durationToHoursDecimal(cell.getValue());
      this.service.updateScheduledHours(
            rowData.taskId,
            rowData.labourRowId,
            newValue);
   }

   handleActualHoursEdit(cell) {
      let rowData = cell.getRow().getData();
      let newValue = DateTimeUtils.durationToHoursDecimal(cell.getValue());
      this.service.updateActualHours(
            rowData.taskId,
            rowData.labourRowId,
            newValue);
   }
}