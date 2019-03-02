/* global expect, jasmine, spyOn, setFixtures */
import $ from 'jquery';
import TaskSupervisionController from './TaskSupervisionController';
import TaskSupervisionService from './TaskSupervisionService';

describe('TaskSupervisionController', function() {

   let controller = new TaskSupervisionController({});
   let fakeService = new TaskSupervisionService();

   let buildFakeCell = (cellValue, cellData)=>{
      let cellRow = {
         getData: ()=>{ return cellData; }
      };
      let cell = {
         getRow: ()=>{ return cellRow; },
         getValue: ()=>{ return cellValue; }
      };
      return cell;
   };


   describe('formatElapsedTimeCell', ()=>{

      it('returns a span when the value is in hours and minutes format and greater than threshold', ()=>{
         let threshold = '2';
         let cellValue='3:00';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toMatch(/^<span/);
      });

      it('returns a span with css class when the value is in hours and minutes format and greater than the threshold', ()=>{
         let threshold = '4';
         let cellValue='5:00';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toMatch(/^<span.*class='elapsedTimeExceedsThreshold'/);
      });

      it('returns a span containing the cell value when the value is in hours and minutes format and greater than threshold', ()=>{
         let threshold = '6';
         let cellValue='7:00';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         let regex = new RegExp('^<span.*>' + cellValue + '</span>');
         expect(result).toMatch(regex);
      });

      it('returns the cell value when the value is in hours and minutes format and equal to the threshold', ()=>{
         let threshold = '8.5';
         let cellValue='8:30';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toEqual(cellValue);
      });

      it('returns the cell value when the value is in hours and minutes format and less than the threshold', ()=>{
         let threshold = '9.1';
         let cellValue='9:00';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toEqual(cellValue);
      });


      it('returns a span when the value is in decimal format and greater than threshold', ()=>{
         let threshold = '2.3';
         let cellValue='4.5';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toMatch(/^<span/);
      });

      it('returns a span with css class when the value is in decimal format and greater than the threshold', ()=>{
         let threshold = '4';
         let cellValue='4.01';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toMatch(/^<span.*class='elapsedTimeExceedsThreshold'/);
      });

      it('returns a span containing the cell value when the value is in decimal format and greater than threshold', ()=>{
         let threshold = '6.01';
         let cellValue='6.1';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         let regex = new RegExp('^<span.*>' + cellValue + '</span>');
         expect(result).toMatch(regex);
      });

      it('returns the cell value when the value is in decimal format and equal to the threshold', ()=>{
         let threshold = '8.5';
         let cellValue='8.5';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toEqual(cellValue);
      });

      it('returns the cell value when the value is in decimal format and less than the threshold', ()=>{
         let threshold = '9.1';
         let cellValue='9.0';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = new TaskSupervisionController({laborRowElaspedHoursThreshold: threshold}).formatElapsedTimeCell(fakeCell);
         expect(result).toEqual(cellValue);
      });


      it('returns undefined when the cell value is undefined', ()=>{
         let cellValue = undefined;
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = controller.formatElapsedTimeCell(fakeCell);
         expect(result).toEqual(undefined);
      });

      it('returns an empty string when the cell value is an empty string', ()=>{
         let cellValue = '';
         let fakeCell = {
               getValue: () => { return cellValue }
         };
         let result = controller.formatElapsedTimeCell(fakeCell);
         expect(result).toEqual('');
      });

   });


   describe('formatActualHoursCell', ()=>{

      it('returns the cell value when isAllowedToEditActualHours is false', ()=>{
         let isAllowedToEditActualHours = false;
         let cellData = {
               labourRoleStatus: 'COMPLETE'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: isAllowedToEditActualHours
         });
         expect(controller.formatActualHoursCell(fakeCell)).toEqual(cellValue);
      });

      it('returns the cell value when isAllowedToEditActualHours is true and labourRoleStatus is not COMPLETE', ()=>{
         let isAllowedToEditActualHours = true;
         let cellData = {
               labourRoleStatus: 'somethingelse'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: isAllowedToEditActualHours
         });
         expect(controller.formatActualHoursCell(fakeCell)).toEqual(cellValue);
      });

      it('returns the cell value within a span when isAllowedToEditActualHours is true and labourRoleStatus is COMPLETE', ()=>{
         let trackerImagePath = 'trackerImagePath';
         let isAllowedToEditActualHours = true;
         let cellData = {
               labourRoleStatus: 'COMPLETE'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: isAllowedToEditActualHours,
            trackerImagePath: trackerImagePath
         });
         let regex = new RegExp('<span.*>' + cellValue + '</span>');
         expect(controller.formatActualHoursCell(fakeCell)).toMatch(regex);
      });

      it('returns the tracker image path and pencil image when isAllowedToEditActualHours is true and labourRoleStatus is COMPLETE', ()=>{
         let trackerImagePath = 'trackerImagePath';
         let pencilImage = 'pencil.gif';
         let isAllowedToEditActualHours = true;
         let cellData = {
               labourRoleStatus: 'COMPLETE'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: isAllowedToEditActualHours,
            trackerImagePath: trackerImagePath
         });
         let regex = new RegExp(trackerImagePath + '/' + pencilImage);
         expect(controller.formatActualHoursCell(fakeCell)).toMatch(regex);
      });

      it('returns undefined when cell is undefined', ()=>{
         expect(controller.formatActualHoursCell(undefined)).toEqual(undefined);
      });

      it('returns empty string when cell is an empty string', ()=>{
         let cellValue = '';
         let cellData = {};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.formatActualHoursCell(fakeCell)).toEqual('');
      });

   });

   describe('formatScheduledHoursCell', ()=>{

      it('returns the cell value when isAllowedToEditSchedledHours is false', ()=>{
         let isAllowedToEditSchedledHours = false;
         let cellData = {
               isFromJobStop: true,
               labourRoleStatus: 'ACTV'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({isAllowedToEditSchedledHours: isAllowedToEditSchedledHours});
         expect(controller.formatScheduledHoursCell(fakeCell)).toEqual(cellValue);
      });

      it('returns the cell value when isAllowedToEditSchedledHours is true but isFromJobStop is false', ()=>{
         let isAllowedToEditSchedledHours = true;
         let cellData = {
               isFromJobStop: false,
               labourRoleStatus: 'ACTV'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({isAllowedToEditSchedledHours: isAllowedToEditSchedledHours});
         expect(controller.formatScheduledHoursCell(fakeCell)).toEqual(cellValue);
      });

      it('returns the cell value when isAllowedToEditSchedledHours is true and isFromJobStop is true and labourRoleStatus is not ACTV', ()=>{
         let isAllowedToEditSchedledHours = true;
         let cellData = {
               isFromJobStop: true,
               labourRoleStatus: 'something else'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({isAllowedToEditSchedledHours: isAllowedToEditSchedledHours});
         expect(controller.formatScheduledHoursCell(fakeCell)).toEqual(cellValue);
      });

      it('returns the cell value within a span when isAllowedToEditSchedledHours is true and isFromJobStop is true and labourRoleStatus is ACTV', ()=>{
         let isAllowedToEditSchedledHours = true;
         let cellData = {
               isFromJobStop: true,
               labourRoleStatus: 'ACTV'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({isAllowedToEditSchedledHours: isAllowedToEditSchedledHours});
         let regex = new RegExp('<span.*>' + cellValue + '</span>');
         expect(controller.formatScheduledHoursCell(fakeCell)).toMatch(regex);
      });

      it('returns the tracker image path and pencil image when isAllowedToEditSchedledHours is true and isFromJobStop is true and labourRoleStatus is ACTV', ()=>{
         let trackerImagePath = 'trackerImagePath';
         let isAllowedToEditSchedledHours = true;
         let pencilImage = 'pencil.gif';
         let cellData = {
               isFromJobStop: true,
               labourRoleStatus: 'ACTV'
         };
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            isAllowedToEditSchedledHours: isAllowedToEditSchedledHours,
            trackerImagePath: trackerImagePath
         });
         let regex = new RegExp(trackerImagePath + '/' + pencilImage);
         expect(controller.formatScheduledHoursCell(fakeCell)).toMatch(regex);
      });

      it('returns undefined when cell is undefined', ()=>{
         expect(controller.formatScheduledHoursCell(undefined)).toEqual(undefined);
      });

      it('returns empty string when cell is an empty string', ()=>{
         let cellValue = '';
         let cellData = {};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.formatScheduledHoursCell(fakeCell)).toEqual('');
      });

   });

   describe('formatTechnicianCell', ()=>{

      it('returns the cell value when that value is the reserved "unassigned" label and the labour stage is COMPLETE', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = unassignedLabel;
         let labourStage = 'COMPLETE';
         let cellData = {
            labourStage: labourStage
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         expect(controller.formatTechnicianCell(fakeCell)).toEqual(unassignedLabel);
      });

      it('returns the cell value when that value is the reserved "unassigned" label and the labour stage is CANCEL', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = unassignedLabel;
         let labourStage = 'CANCEL';
         let cellData = {
            labourStage: labourStage
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         expect(controller.formatTechnicianCell(fakeCell)).toEqual(unassignedLabel);
      });

      it('returns the cell value when that value is not the reserved "unassigned" label and the labour role status is not ACTV', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = 'hello';
         let labourRowStatus = 'world';
         let cellData = {
            labourRoleStatus: labourRowStatus
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         expect(controller.formatTechnicianCell(fakeCell)).toEqual(cellValue);
      });


      it('returns a hyperlink when the cell value is the reserved "unassigned" label and the labour stage is neither COMPLETE nor CANCEL', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = unassignedLabel;
         let labourStage = 'hello';
         let cellData = {
            labourStage: labourStage
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         expect(controller.formatTechnicianCell(fakeCell)).toMatch(/^<a href/);
      });

      it('returns a hyperlink when the cell value is not the reserved "unassigned" label and the labour role status is ACTV', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = 'hello';
         let labourRowStatus = 'ACTV';
         let cellData = {
            labourRoleStatus: labourRowStatus
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         expect(controller.formatTechnicianCell(fakeCell)).toMatch(/^<a href/);
      });

      it('returns a hyperlink with its label set to the cell value', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = 'hello';
         let labourRowStatus = 'ACTV';
         let cellData = {
            labourRoleStatus: labourRowStatus
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({unassignedLabel: unassignedLabel});
         let hyperlinkWithLabel = '^<a href.*>' + cellValue + '</a>';
         let regex = new RegExp(hyperlinkWithLabel);
         expect(controller.formatTechnicianCell(fakeCell)).toMatch(regex);
      });

      it('returns a hyperlink with the provided context and labour details page paths', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = 'hello';
         let labourRowStatus = 'ACTV';
         let cellData = {
            labourRoleStatus: labourRowStatus
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let contextPath = 'somecontextpath';
         let labourDetailsPagePath = 'somepath';
         let controller = new TaskSupervisionController({
            contextPath: contextPath,
            labourDetailsPagePath: labourDetailsPagePath,
            unassignedLabel: unassignedLabel
         });
         let hyperlinkWithLabel = '^<a href="' + contextPath + labourDetailsPagePath;
         let regex = new RegExp(hyperlinkWithLabel);
         expect(controller.formatTechnicianCell(fakeCell)).toMatch(regex);
      });

      it('returns a hyperlink with the provided labour details page parameter set to the encoded, encrypted, labour key', ()=>{
         let unassignedLabel = 'unassignedLabel';
         let cellValue = 'hello';
         let labourRowStatus = 'ACTV';
         let labourDetailsPageParm = 'labourDetailsPageParm';
         let encryptedLabourKeyWithSpecialChars = 'hello?world@';
         let cellData = {
            labourRoleStatus: labourRowStatus,
            encryptedLabourKey: encryptedLabourKeyWithSpecialChars
         };
         let fakeCell = buildFakeCell(cellValue, cellData);
         let controller = new TaskSupervisionController({
            labourDetailsPageParm: labourDetailsPageParm,
            unassignedLabel: unassignedLabel
         });
         let hyperlinkWithLabel = '^<a href.*' + labourDetailsPageParm + '=' + encodeURIComponent(encryptedLabourKeyWithSpecialChars) ;
         let regex = new RegExp(hyperlinkWithLabel);
         expect(controller.formatTechnicianCell(fakeCell)).toMatch(regex);
      });

   });

   describe('handleScheduledHoursEdit', ()=>{

      it('calls the service to update the scheduled hours', ()=>{
         let spy = spyOn(fakeService, 'updateScheduledHours');
         let controller = new TaskSupervisionController({
            TaskSupervisionService: fakeService
         });
         let cellData = {};
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         controller.handleScheduledHoursEdit(fakeCell);
         expect(spy).toHaveBeenCalled();
      });

   });

   describe('handleActualHoursEdit', ()=>{

      it('calls the service to update the actual hours', ()=>{
         let spy = spyOn(fakeService, 'updateActualHours');
         let controller = new TaskSupervisionController({
            TaskSupervisionService: fakeService
         });
         let cellData = {};
         let cellValue = 'hello';
         let fakeCell = buildFakeCell(cellValue, cellData);
         controller.handleActualHoursEdit(fakeCell);
         expect(spy).toHaveBeenCalled();
      });

   });

   describe('initCrewsWidget', ()=>{

      beforeEach( ()=>{
         setFixtures('<select id="id1"></select>');
      });

      it('calls the services getCrewsForUser() with its user', ()=>{
         spyOn(fakeService, 'getCrewsForUser');
         new TaskSupervisionController({
            user: 'a',
            crewsFieldId: 'id1',
            TaskSupervisionService: fakeService
         }).initCrewsWidget();
         expect(fakeService.getCrewsForUser).toHaveBeenCalledWith('a');
      });

      it('throws error when user is undefined', ()=>{
         let controller = new TaskSupervisionController({
            user: undefined,
            crewsFieldId: 'id1',
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

      it('throws error when user is blank', ()=>{
         let controller = new TaskSupervisionController({
            user: '',
            crewsFieldId: 'id1',
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

      it('throws error when crewsFieldId is undefined', ()=>{
         let controller = new TaskSupervisionController({
            user: 'a',
            crewsFieldId: undefined,
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

      it('throws error when crewsFieldId is blank', ()=>{
         let controller = new TaskSupervisionController({
            user: 'a',
            crewsFieldId: '',
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

      it('throws error when no element exists for the crewsFieldId', ()=>{
         setFixtures('');
         let controller = new TaskSupervisionController({
            user: 'a',
            crewsFieldId: 'id1',
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

      it('throws error when crewsFieldId is the id of a non-select element', ()=>{
         setFixtures('<div id="id1"></div>');
         let controller = new TaskSupervisionController({
            user: 'a',
            crewsFieldId: 'id1',
            TaskSupervisionService: fakeService
         });
         expect( ()=>{ controller.initCrewsWidget(); } ).toThrowError();
      });

   });

   describe('initJobStopButton', ()=>{

      let jobStopButtonId = 'id1';

      beforeEach( ()=>{
         setFixtures('<button id="' + jobStopButtonId + '">');
      });

      it('hides the job stop button when not allowed to job stop', ()=>{
         let isAllowedToJobStop = false;
         let controller = new TaskSupervisionController({
            jobStopButtonId: jobStopButtonId,
            isAllowedToJobStop: isAllowedToJobStop
         });
         controller.initJobStopButton();
         expect( $('#'+jobStopButtonId).is(':visible') ).toEqual(false);
      });

      it('shows the job stop button when allowed to search', ()=>{
         let isAllowedToJobStop = true;
         let controller = new TaskSupervisionController({
            jobStopButtonId: jobStopButtonId,
            isAllowedToJobStop: isAllowedToJobStop
         });
         controller.initJobStopButton();
         expect( $('#'+jobStopButtonId).is(':visible') ).toEqual(true);
      });

      it('adds a click handler to the job stop button when allowed to search', ()=>{
         let isAllowedToJobStop = true;
         let controller = new TaskSupervisionController({
            jobStopButtonId: jobStopButtonId,
            isAllowedToJobStop: isAllowedToJobStop
         });
         controller.initJobStopButton();
         let eventHandlers = $._data($('#'+jobStopButtonId).get(0), "events");
         expect(eventHandlers.click).toEqual(jasmine.any(Object));
      });

      it('performs a job stop when the job stop button is clicked', ()=>{
         let isAllowedToJobStop = true;
         let controller = new TaskSupervisionController({
            jobStopButtonId: jobStopButtonId,
            isAllowedToJobStop: isAllowedToJobStop
         });
         controller.initJobStopButton();
         let spy = spyOn(controller, 'performJobStop');
         $('#'+jobStopButtonId).click();
         expect(spy).toHaveBeenCalled();
      });

   });

   describe('initShowCompleteTasksWidget', ()=>{

      it('initializes the show complete checkbox with the provided default value', ()=>{
         let showCompleteId = 'id1';
         let defaultShowComplete = true;
         setFixtures('<input id="' + showCompleteId + '" type="checkbox"></div>');
         let controller = new TaskSupervisionController({
            showCompleteId: showCompleteId,
            defaultShowComplete: defaultShowComplete
         });
         controller.initShowCompleteTasksWidget();
         expect( $('#'+showCompleteId) ).toBeChecked();
      });

   });

   describe('initStartAndEndWidgets', ()=>{
      let goodParms = {
            user: 'user',
            TaskSupervisionService: fakeService,
            startFieldId: 'startFieldId',
            endFieldId: 'endFieldId'};
      let goodFixtures =
         '<input id="startFieldId_$DATE$">' +
         '<input id="startFieldId_$TIME$">' +
         '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
         '<input id="startFieldId_SelectBtn">' +
         '<input id="endFieldId_$DATE$">' +
         '<input id="endFieldId_$TIME$">' +
         '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
         '<input id="endFieldId_SelectBtn">';

      beforeEach( ()=>{
         setFixtures(goodFixtures);
      });

      it('call the service to get the default start and end dates for the provided user', ()=>{
         let controller = new TaskSupervisionController(goodParms);
         let spy = spyOn(fakeService, 'getDefaultStartAndEndDates');
         controller.initStartAndEndWidgets();
         expect(spy).toHaveBeenCalledWith(goodParms.user);
      });

      it('disables the start date element', ()=>{
         new TaskSupervisionController(goodParms).initStartAndEndWidgets();
         let elem = document.getElementById('startFieldId_$DATE$');
         expect( $(elem).is(':disabled') ).toEqual(true);
      });

      it('disables the end date element', ()=>{
         new TaskSupervisionController(goodParms).initStartAndEndWidgets();
         let elem = document.getElementById('endFieldId_$DATE$');
         expect( $(elem).is(':disabled') ).toEqual(true);
      });

      it('throws error when user is not provided', ()=>{
         let parms = JSON.parse(JSON.stringify(goodParms));
         parms.user = undefined;
         expect( ()=>{ new TaskSupervisionController(parms).initStartAndEndWidgets(); } ).toThrowError('userId is mandatory');
      });

      it('throws error when start field id is not provided', ()=>{
         let parms = JSON.parse(JSON.stringify(goodParms));
         parms.startFieldId = undefined;
         expect( ()=>{ new TaskSupervisionController(parms).initStartAndEndWidgets(); } ).toThrowError('startFieldId is mandatory');
      });

      it('throws error when start field id is not a string', ()=>{
         let parms = JSON.parse(JSON.stringify(goodParms));
         parms.startFieldId = 1;
         expect( ()=>{ new TaskSupervisionController(parms).initStartAndEndWidgets(); } ).toThrowError('startFieldId is not a string');
      });

      it('throws error when end field id is not provided', ()=>{
         let parms = JSON.parse(JSON.stringify(goodParms));
         parms.endFieldId = undefined;
         expect( ()=>{ new TaskSupervisionController(parms).initStartAndEndWidgets(); } ).toThrowError('endFieldId is mandatory');
      });

      it('throws error when end field id is not a string', ()=>{
         let parms = JSON.parse(JSON.stringify(goodParms));
         parms.endFieldId = ()=>{};
         expect( ()=>{ new TaskSupervisionController(parms).initStartAndEndWidgets(); } ).toThrowError('endFieldId is not a string');
      });

      it('throws error when start date field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('start date field does not exist in the DOM.');
      });

      it('throws error when start time field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('start time field does not exist in the DOM.');
      });

      it('throws error when start time zone field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('start time zone field does not exist in the DOM.');
      });

      it('throws error when start date picker field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('start date picker field does not exist in the DOM.');
      });

      it('throws error when end date field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('end date field does not exist in the DOM.');
      });

      it('throws error when end time field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('end time field does not exist in the DOM.');
      });

      it('throws error when end time zone field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_SelectBtn">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('end time zone field does not exist in the DOM.');
      });

      it('throws error when start date picker field does not exist', ()=>{
         setFixtures(
               '<input id="startFieldId_$DATE$">' +
               '<input id="startFieldId_$TIME$">' +
               '<input id="startFieldId_$TIMEZONE_DISPLAY$">' +
               '<input id="startFieldId_SelectBtn">' +
               '<input id="endFieldId_$DATE$">' +
               '<input id="endFieldId_$TIME$">' +
               '<input id="endFieldId_$TIMEZONE_DISPLAY$">');
         expect( ()=>{ new TaskSupervisionController(goodParms).initStartAndEndWidgets(); } ).toThrowError('end date picker field does not exist in the DOM.');
      });

   });

   describe('initSearchButton', ()=>{

      let searchButtonId = 'id1';

      beforeEach( ()=>{
         setFixtures('<button id="' + searchButtonId + '">');
      });

      it('hides the search button when not allowed to search', ()=>{
         let isAllowedToSearch = false;
         let controller = new TaskSupervisionController({
            searchButtonId: searchButtonId,
            isAllowedToSearch: isAllowedToSearch
         });
         controller.initSearchButton();
         expect( $('#'+searchButtonId).is(':visible') ).toEqual(false);
      });

      it('shows the search button when allowed to search', ()=>{
         let isAllowedToSearch = true;
         let controller = new TaskSupervisionController({
            searchButtonId: searchButtonId,
            isAllowedToSearch: isAllowedToSearch
         });
         controller.initSearchButton();
         expect( $('#'+searchButtonId).is(':visible') ).toEqual(true);
      });

      it('adds a click handler to the search button when allowed to search', ()=>{
         let isAllowedToSearch = true;
         let controller = new TaskSupervisionController({
            searchButtonId: searchButtonId,
            isAllowedToSearch: isAllowedToSearch
         });
         controller.initSearchButton();
         let eventHandlers = $._data($('#'+searchButtonId).get(0), "events");
         expect(eventHandlers.click).toEqual(jasmine.any(Object));
      });

      it('performs a search when the search button is clicked', ()=>{
         let isAllowedToSearch = true;
         let controller = new TaskSupervisionController({
            searchButtonId: searchButtonId,
            isAllowedToSearch: isAllowedToSearch
         });
         controller.initSearchButton();
         let spy = spyOn(controller, 'performSearch');
         $('#'+searchButtonId).click();
         expect(spy).toHaveBeenCalled();
      });

   });

   describe('initUnassignSelectedButton', ()=>{

      let unassignButtonId = 'id1';

      beforeEach( ()=>{
         setFixtures('<button id="' + unassignButtonId + '">');
      });


      it('hides the unassign selected button when not allowed to unassign selected', ()=>{
         let isAllowedToUnassignSelected = false;
         let controller = new TaskSupervisionController({
            unassignButtonId: unassignButtonId,
            isAllowedToUnassignSelected: isAllowedToUnassignSelected
         });
         controller.initUnassignSelectedButton();
         expect( $('#'+unassignButtonId).is(':visible') ).toEqual(false);
      });

      it('shows the unassign selected button when allowed to unassign selected', ()=>{
         let isAllowedToUnassignSelected = true;
         let controller = new TaskSupervisionController({
            unassignButtonId: unassignButtonId,
            isAllowedToUnassignSelected: isAllowedToUnassignSelected
         });
         controller.initUnassignSelectedButton();
         expect( $('#'+unassignButtonId).is(':visible') ).toEqual(true);
      });

      it('disables the unassign selected button when allowed to unassign selected', ()=>{
         let isAllowedToUnassignSelected = true;
         let controller = new TaskSupervisionController({
            unassignButtonId: unassignButtonId,
            isAllowedToUnassignSelected: isAllowedToUnassignSelected
         });
         controller.initUnassignSelectedButton();
         expect( $('#'+unassignButtonId).is(':disabled') ).toEqual(true);
      });

      it('adds a click handler to the unassign selected button when allowed to unassign selected', ()=>{
         let isAllowedToUnassignSelected = true;
         let controller = new TaskSupervisionController({
            unassignButtonId: unassignButtonId,
            isAllowedToUnassignSelected: isAllowedToUnassignSelected
         });
         controller.initUnassignSelectedButton();
         let eventHandlers = $._data($('#'+unassignButtonId).get(0), "events");
         expect(eventHandlers.click).toEqual(jasmine.any(Object));
      });

      it('performs an unassign when the unassign button is clicked', ()=>{
         let isAllowedToUnassignSelected = true;
         let controller = new TaskSupervisionController({
            unassignButtonId: unassignButtonId,
            isAllowedToUnassignSelected: isAllowedToUnassignSelected
         });
         controller.initUnassignSelectedButton();
         let spy = spyOn(controller, 'performUnassign');
         $('#'+unassignButtonId).click();
         expect(spy).toHaveBeenCalled();
      });

   });

   describe('isActualHoursCellEditable', ()=>{

      it('returns true if allowed to edit actual hours and labour role status is complete', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: true
         });
         let cellData = {labourRoleStatus: 'COMPLETE', actualHours: 5};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isActualHoursCellEditable(fakeCell)).toEqual(true);
      });

      it('returns true if allowed to edit actual hours and labour role status is in-work and actual hours is set', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: true
         });
         let cellData = {labourRoleStatus: 'IN WORK', actualHours: 5};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isActualHoursCellEditable(fakeCell)).toEqual(true);
      });

      it('returns false if not allowed to edit actual hours', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: false
         });
         let cellData = {labourRoleStatus: 'COMPLETE', actualHours: 5};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isActualHoursCellEditable(fakeCell)).toEqual(false);
      });

      it('returns false if allowed to edit actual hours but labour role status is neither complete nor in work', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: true
         });
         let cellData = {labourRoleStatus: 'hello', actualHours: 5};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isActualHoursCellEditable(fakeCell)).toEqual(false);
      });

      it('returns false if allowed to edit actual hours and the labour role status is in work but the actual hours is null', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditActualHours: true
         });
         let cellData = {labourRoleStatus: 'IN WORK', actualHours: null};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isActualHoursCellEditable(fakeCell)).toEqual(false);
      });

   });

   describe('isScheduledHoursCellEditable', ()=>{

      it('returns true if allowed to edit scheduled hours and row is from a job stop and labour role status is active', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditSchedledHours: true
         });
         let cellData = {isFromJobStop: true, labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isScheduledHoursCellEditable(fakeCell)).toEqual(true);
      });

      it('returns false if not allowed to edit scheduled hours', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditSchedledHours: false
         });
         let cellData = {isFromJobStop: true, labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isScheduledHoursCellEditable(fakeCell)).toEqual(false);
      });

      it('returns false if allowed to edit scheduled hours but row is not from a job stop', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditSchedledHours: true
         });
         let cellData = {isFromJobStop: false, labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isScheduledHoursCellEditable(fakeCell)).toEqual(false);
      });

      it('returns false if allowed to edit scheduled hours and row is from a job stop but labour role status is not active', ()=>{
         let controller = new TaskSupervisionController({
            isAllowedToEditSchedledHours: true
         });
         let cellData = {isFromJobStop: true, labourRoleStatus: 'hello'};
         let fakeCell = buildFakeCell(undefined, cellData);
         expect(controller.isScheduledHoursCellEditable(fakeCell)).toEqual(false);
      });

   });

   describe('isTechnicianToBeHyperlinked', ()=>{

      it('returns true if cell value is the unassigned label and the labour stage is neither complete nor cancel', ()=>{
         let unassignedLabel = 'unassigned';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassignedLabel
         });
         let cellValue = unassignedLabel;
         let cellData = {labourStage: 'hello', labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.isTechnicianToBeHyperlinked(fakeCell)).toEqual(true);
      });

      it('returns true if cell value is not the unassigned label and the labour role status is active', ()=>{
         let unassignedLabel = 'unassigned';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassignedLabel
         });
         let cellValue = 'hello';
         let cellData = {labourStage: 'COMPLETE', labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.isTechnicianToBeHyperlinked(fakeCell)).toEqual(true);
      });

      it('returns false if cell value is the unassigned label and the labour stage is complete', ()=>{
         let unassignedLabel = 'unassigned';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassignedLabel
         });
         let cellValue = unassignedLabel;
         let cellData = {labourStage: 'COMPLETE', labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.isTechnicianToBeHyperlinked(fakeCell)).toEqual(false);
      });

      it('returns false if cell value is the unassigned label and the labour stage is cancel', ()=>{
         let unassignedLabel = 'unassigned';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassignedLabel
         });
         let cellValue = unassignedLabel;
         let cellData = {labourStage: 'CANCEL', labourRoleStatus: 'ACTV'};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.isTechnicianToBeHyperlinked(fakeCell)).toEqual(false);
      });

      it('returns false if cell value is not the unassigned label and the labour role status is not active', ()=>{
         let unassignedLabel = 'unassigned';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassignedLabel
         });
         let cellValue = 'hello';
         let cellData = {labourStage: 'COMPLETE', labourRoleStatus: 'world'};
         let fakeCell = buildFakeCell(cellValue, cellData);
         expect(controller.isTechnicianToBeHyperlinked(fakeCell)).toEqual(false);
      });

   });

   describe('mutateHoursCell', ()=>{

      it('returns the value in duration format when it is in decimal format', ()=>{
         let value = '123.75';
         expect(controller.mutateHoursCell(value)).toEqual('123:45');
      });

      it('returns the value when it contains a colon', ()=>{
         let value = '12:30';
         expect(controller.mutateHoursCell(value)).toEqual(value);
      });

      it('returns undefined when the value is underfined', ()=>{
         let value = undefined;
         expect(controller.mutateHoursCell(value)).toEqual(value);
      });

      it('returns an empty string when the value is an empty string', ()=>{
         let value = '';
         expect(controller.mutateHoursCell(value)).toEqual(value);
      });

   });


   describe('mutateTechnicianCell', ()=>{

      it('returns the unassigned label when the value is undefined', ()=>{
         let value = undefined;
         let unassingedLabel = 'hello';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassingedLabel
         });
         expect(controller.mutateTechnicianCell(value)).toEqual(unassingedLabel);
      });

      it('returns the unassigned label when the value is an empty string', ()=>{
         let value = '';
         let unassingedLabel = 'hello';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassingedLabel
         });
         expect(controller.mutateTechnicianCell(value)).toEqual(unassingedLabel);
      });

      it('returns the value when the value is provided', ()=>{
         let value = 'hello';
         let unassingedLabel = 'world';
         let controller = new TaskSupervisionController({
            unassignedLabel: unassingedLabel
         });
         expect(controller.mutateTechnicianCell(value)).toEqual(value);
      });

   });

   describe('performJobStop', ()=>{

      it('calls the service to perform job stop when isAllowedToJobStop is true', ()=>{
         spyOn(fakeService, 'performJobStop');
         let fakeTable = { getSelectedRows: ()=>{ return []; } };
         let controller = new TaskSupervisionController({
            isAllowedToJobStop: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performJobStop();
         expect(fakeService.performJobStop).toHaveBeenCalled();
      });

      it('calls the service to perform job stop with selected row ids when isAllowedToJobStop is true', ()=>{
         let selectedRowIds = [
            {_row: {data: {labourRowId: 9}}},
            {_row: {data: {labourRowId: 8}}},
            {_row: {data: {labourRowId: 7}}}
         ];
         let expectedIds = [9,8,7];
         spyOn(fakeService, 'performJobStop');
         let fakeTable = { getSelectedRows: ()=>{ return selectedRowIds; } };
         let controller = new TaskSupervisionController({
            isAllowedToJobStop: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performJobStop();
         expect(fakeService.performJobStop).toHaveBeenCalledWith(expectedIds, jasmine.any(Function), jasmine.any(Function));
      });

      it('deselects all rows in table after service performs a successful job stop', ()=>{
         let fakeSelectedRow1 = {deselect: ()=>{}, _row: {data: {labourRowId: 1}}};
         let fakeSelectedRow2 = {deselect: ()=>{}, _row: {data: {labourRowId: 1}}};
         let fakeTable = {getSelectedRows: ()=>{return [fakeSelectedRow1, fakeSelectedRow2];}};
         let fakeService = {performJobStop: (ids, successCallback, failureCallback)=>{successCallback();}};
         let spy1 = spyOn(fakeSelectedRow1, 'deselect');
         let spy2 = spyOn(fakeSelectedRow2, 'deselect');
         let controller = new TaskSupervisionController({
            isAllowedToJobStop: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performJobStop();
         expect(spy1).toHaveBeenCalled();
         expect(spy2).toHaveBeenCalled();
      });

      it('performs search after service performs a successful job stop', ()=>{
         let fakeTable = {getSelectedRows: ()=>{return [];}};
         let fakeService = {performJobStop: (ids, successCallback, failureCallback)=>{successCallback();}};
         let controller = new TaskSupervisionController({
            isAllowedToJobStop: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         let spy = spyOn(controller, 'performSearch');
         controller.performJobStop();
         expect(spy).toHaveBeenCalled();
      });

      it('does not call the service to perform job stop when isAllowedToJobStop is false', ()=>{
         spyOn(fakeService, 'performJobStop');
         let fakeTable = { getSelectedRows: ()=>{ return []; } };
         let controller = new TaskSupervisionController({
            isAllowedToJobStop: false,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performJobStop();
         expect(fakeService.performJobStop).not.toHaveBeenCalled();
      });


   });

   describe('performSearch', ()=>{

      it('calls the service to perform search when isAllowedToSearch is true', ()=>{
         let crewsFieldId = 'a';
         let startDateWidgetId = 'b';
         let endDateWidgetId = 'c';
         let showCompleteId = 'd';
         setFixtures(
               '<input id="' + crewsFieldId + '" value="1">' +
               '<input id="' + startDateWidgetId + '_$DATE$" value="1">' +
               '<input id="' + startDateWidgetId + '_$TIME$" value="1">' +
               '<input id="' + endDateWidgetId + '_$DATE$" value="1">' +
               '<input id="' + endDateWidgetId + '_$TIME$" value="1">' +
               '<input id="' + showCompleteId + '" value="1">'
         );

         spyOn(fakeService, 'performSearch');
         let controller = new TaskSupervisionController({
            isAllowedToSearch: true,
            TaskSupervisionService: fakeService,
            crewsFieldId: crewsFieldId,
            startFieldId: startDateWidgetId,
            endFieldId: endDateWidgetId,
            showCompleteId: showCompleteId
         });

         controller.performSearch();
         expect(fakeService.performSearch).toHaveBeenCalled();
      });

      it('does not call the service to perform search when isAllowedToSearch is false', ()=>{
         let crewsFieldId = 'a';
         let startDateWidgetId = 'b';
         let endDateWidgetId = 'c';
         let showCompleteId = 'd';
         setFixtures(
               '<input id="' + crewsFieldId + '" value="1">' +
               '<input id="' + startDateWidgetId + '_$DATE$" value="1">' +
               '<input id="' + startDateWidgetId + '_$TIME$" value="1">' +
               '<input id="' + endDateWidgetId + '_$DATE$" value="1">' +
               '<input id="' + endDateWidgetId + '_$TIME$" value="1">' +
               '<input id="' + showCompleteId + '" value="1">'
         );

         spyOn(fakeService, 'performSearch');
         let controller = new TaskSupervisionController({
            isAllowedToSearch: false,
            TaskSupervisionService: fakeService,
            crewsFieldId: crewsFieldId,
            startFieldId: startDateWidgetId,
            endFieldId: endDateWidgetId,
            showCompleteId: showCompleteId
         });

         controller.performSearch();
         expect(fakeService.performSearch).not.toHaveBeenCalled();
      });

   });

   describe('performUnassign', ()=>{

      it('calls the service to perform unassign when isAllowedToUnassignSelected is true', ()=>{
         spyOn(fakeService, 'performUnassign');
         let fakeTable = { getSelectedRows: ()=>{ return []; } };
         let controller = new TaskSupervisionController({
            isAllowedToUnassignSelected: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performUnassign();
         expect(fakeService.performUnassign).toHaveBeenCalled();
      });

      it('calls the service to perform unassign with selected row ids when isAllowedToUnassignSelected is true', ()=>{
         let selectedRowIds = [
            {_row: {data: {labourRowId: 9}}},
            {_row: {data: {labourRowId: 8}}},
            {_row: {data: {labourRowId: 7}}}
         ];
         let expectedIds = [9,8,7];
         spyOn(fakeService, 'performUnassign');
         let fakeTable = { getSelectedRows: ()=>{ return selectedRowIds; } };
         let controller = new TaskSupervisionController({
            isAllowedToUnassignSelected: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performUnassign();
         expect(fakeService.performUnassign).toHaveBeenCalledWith(expectedIds, jasmine.any(Function), jasmine.any(Function));
      });

      it('deselects all rows in table after service performs a successful unassign', ()=>{
         let fakeSelectedRow1 = {deselect: ()=>{}, _row: {data: {labourRowId: 1}}};
         let fakeSelectedRow2 = {deselect: ()=>{}, _row: {data: {labourRowId: 1}}};
         let fakeTable = {getSelectedRows: ()=>{return [fakeSelectedRow1, fakeSelectedRow2];}};
         let fakeService = {performUnassign: (ids, successCallback, failureCallback)=>{successCallback();}};
         let spy1 = spyOn(fakeSelectedRow1, 'deselect');
         let spy2 = spyOn(fakeSelectedRow2, 'deselect');
         let controller = new TaskSupervisionController({
            isAllowedToUnassignSelected: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performUnassign();
         expect(spy1).toHaveBeenCalled();
         expect(spy2).toHaveBeenCalled();
      });

      it('performs search after service performs a successful job stop', ()=>{
         let fakeTable = {getSelectedRows: ()=>{return [];}};
         let fakeService = {performUnassign: (ids, successCallback, failureCallback)=>{successCallback();}};
         let controller = new TaskSupervisionController({
            isAllowedToUnassignSelected: true,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         let spy = spyOn(controller, 'performSearch');
         controller.performUnassign();
         expect(spy).toHaveBeenCalled();
      });

      it('does not call the service to perform an unassign when isAllowedToUnassignSelected is false', ()=>{
         let spy = spyOn(fakeService, 'performUnassign');
         let fakeTable = { getSelectedRows: ()=>{ return []; } };
         let controller = new TaskSupervisionController({
            isAllowedToUnassignSelected: false,
            TaskSupervisionService: fakeService,
            fakeTable: fakeTable
         });
         controller.performUnassign();
         expect(spy).not.toHaveBeenCalled();
      });


   });

   describe('populateCrewsWidget', ()=>{

      let convertOptionsToArray = ($options)=>{
         let result = [];
         $options.each( (index, option) => {
            result.push({text: option.text, value: option.value});
         });
         return result;
      };

      it('adds provided crews as options to crews widget', ()=>{
         let crewsFieldId = 'id1';
         setFixtures('<select id="' + crewsFieldId + '"></select>');
         let crews = [
            {label: 'a', id: '1'},
            {label: 'b', id: '2'},
            {label: 'c', id: '3'}
         ];
         let controller = new TaskSupervisionController({
            crewsFieldId: crewsFieldId
         });
         controller.populateCrewsWidget(crews);

         let optionsInfo = convertOptionsToArray($('#'+crewsFieldId).find('option'));
         expect(optionsInfo.length).toEqual(3);
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'a', value: '1'}));
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'b', value: '2'}));
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'c', value: '3'}));
      });

      it('removes existing options prior to adding provided crews to crews widget', ()=>{
         let crewsFieldId = 'id1';
         setFixtures(
               '<select id="' + crewsFieldId + '">' +
               '<option text="hello" id="9"></option>' +
               '<option text="world" id="8"></option>' +
               '</select>'
         );
         let crews = [
            {label: 'a', id: '1'},
            {label: 'b', id: '2'},
            {label: 'c', id: '3'}
         ];
         let controller = new TaskSupervisionController({
            crewsFieldId: crewsFieldId
         });
         controller.populateCrewsWidget(crews);

         let optionsInfo = convertOptionsToArray($('#'+crewsFieldId).find('option'));
         expect(optionsInfo.length).toEqual(3);
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'a', value: '1'}));
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'b', value: '2'}));
         expect(optionsInfo).toContain(jasmine.objectContaining({text: 'c', value: '3'}));
      });

      it('sorts provided crews alphanumerically by label before adding them', ()=>{
         let crewsFieldId = 'id1';
         setFixtures('<select id="' + crewsFieldId + '"></select>');
         let crews = [
            {label: 'c', id: '3'},
            {label: 'a', id: '1'},
            {label: 'b', id: '2'}
         ];
         let controller = new TaskSupervisionController({
            crewsFieldId: crewsFieldId
         });
         controller.populateCrewsWidget(crews);

         let optionsInfo = convertOptionsToArray($('#'+crewsFieldId).find('option'));
         expect(optionsInfo.length).toEqual(3);
         expect(optionsInfo[0]).toEqual({text: 'a', value: '1'});
         expect(optionsInfo[1]).toEqual({text: 'b', value: '2'});
         expect(optionsInfo[2]).toEqual({text: 'c', value: '3'});
      });

      it('selects the first option', ()=>{
         let crewsFieldId = 'id1';
         setFixtures('<select id="' + crewsFieldId + '"></select>');
         let crews = [
            {label: 'c', id: '3'},
            {label: 'a', id: '1'},
            {label: 'b', id: '2'}
         ];
         let controller = new TaskSupervisionController({
            crewsFieldId: crewsFieldId
         });
         controller.populateCrewsWidget(crews);
         expect($('#'+crewsFieldId).prop('selectedIndex')).toEqual(0);
      });

      it('does not add options when no crews provided', ()=>{
         let crewsFieldId = 'id1';
         setFixtures('<select id="' + crewsFieldId + '"></select>');
         let crews = [];
         let controller = new TaskSupervisionController({
            crewsFieldId: crewsFieldId
         });
         controller.populateCrewsWidget(crews);
         let optionsInfo = convertOptionsToArray($('#'+crewsFieldId).find('option'));
         expect(optionsInfo.length).toEqual(0);
      });

   });

   describe('validateHours', ()=>{

      it('returns true when the value has no separator but less than 7 characters', ()=>{
         let value = '123456';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value has no separator but is 7 characters', ()=>{
         let value = '1234567';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is only zero', ()=>{
         let value = '0';
         expect(controller.validateHours({}, value)).toEqual(true);
      });


      it('returns true when the value is in decimal format but is less than 7 characters', ()=>{
         let value = '123.45';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in decimal format but is 7 characters', ()=>{
         let value = '123.456';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in decimal format with no integer', ()=>{
         let value = '.123456';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in decimal format with no fraction', ()=>{
         let value = '123.';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in decimal format with only separator', ()=>{
         let value = '.';
         expect(controller.validateHours({}, value)).toEqual(true);
      });


      it('returns true when the value is in total hours and minutes format but less than 7 characters', ()=>{
         let value = '123:45';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in total hours and minutes format but is 7 characters', ()=>{
         let value = '123:456';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in total hours and minutes format with no hours', ()=>{
         let value = ':123456';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in total hours and minutes format with no minutes', ()=>{
         let value = '123:';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in total hours and minutes format with only separator', ()=>{
         let value = ':';
         expect(controller.validateHours({}, value)).toEqual(true);
      });

      it('returns true when the value is in total hours and minutes format and is zero', ()=>{
         let value = '0:0';
         expect(controller.validateHours({}, value)).toEqual(true);
      });


      it('returns false when the value is undefined', ()=>{
         let value = undefined;
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value has more than 7 characters', ()=>{
         let value = '12345678';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value is in decimal format and has more than 7 characters', ()=>{
         let value = '123.4567';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value is in total hours and minutes format and has more than 7 characters', ()=>{
         let value = '123:4567';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value contains non-numeric and is less then 7 characters', ()=>{
         let value = '1a3';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value is a blank string', ()=>{
         let value = '';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

      it('returns false when the value contains more than one separator', ()=>{
         let value = '1.2:3';
         expect(controller.validateHours({}, value)).toEqual(false);
      });

   });

});
