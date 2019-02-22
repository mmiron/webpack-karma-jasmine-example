/* global $, expect, spyOn, jasmine, setFixtures */
import $ from 'jquery';
import TaskSupervisionController from './TaskSupervisionController';

describe('TaskSupervisionController', function() {

   describe('initCrewsWidget', function() {

      const testCrewList = [
         { id: '1', code: 'crew1', description: 'crew one' },
         { id: '2', code: 'crew2', description: 'crew two' },
         { id: '3', code: 'crew3', description: 'crew three' }
      ];
      const testCrewListOfOne = [
         { id: '1', code: 'crew1', description: 'crew one' }
      ];

      const testCurrentDateTimeResponse = {
         startYear: '2019',
         startMonth: '01',
         startDayOfMonth: '01',
         startHourInDay: '12',
         startHourInDay: '00',
         startMinute: '00',
         endYear: '2019',
         endMonth: '02',
         endDayOfMonth: '01',
         endHourInDay: '12',
         endMinute: '00',
         startTimezone: "EST"
      };

      let validParms;
      let fakeService;

      beforeEach(function() {
         jasmine.Ajax.install();
         this.validParms = {
            userId: 'userId',
            crewsFieldId: 'crewsFieldId',
            startFieldId: 'idStartDateTime',
            endFieldId: 'idEndDateTime',
            showCompleteId: 'idShowComplete',
            searchButtonId: 'idSearchButton',
            searchResultsId: 'idSearchResults',
            isAllowedToSearch: 'true'
         };

         setFixtures(
            '<select id="' + this.validParms.crewsFieldId + '"></select>' +
            '<input id="' + this.validParms.showCompleteId + '" type="checkbox"/>' +
            '<button id="' + this.validParms.searchButtonId + '" />' +
            '<div id="' + this.validParms.searchResultsId + '" />' +
            '<div id="' + this.validParms.startFieldId + '" />' +
            '<div id="' + this.validParms.startFieldId + '_$DATE$" />' +
            '<div id="' + this.validParms.startFieldId + '_$TIME$" />' +
            '<div id="' + this.validParms.startFieldId + '_$TIMEZONE_DISPLAY$" />' +
            '<div id="' + this.validParms.startFieldId + '_SelectBtn" />' +
            '<div id="' + this.validParms.endFieldId + '" />' +
            '<div id="' + this.validParms.endFieldId + '_$DATE$" />' +
            '<div id="' + this.validParms.endFieldId + '_$TIME$" />' +
            '<div id="' + this.validParms.endFieldId + '_$TIMEZONE_DISPLAY$" />' +
            '<div id="' + this.validParms.endFieldId + '_SelectBtn" />'
         );
      });

      afterEach(function() {
         jasmine.Ajax.uninstall();
      });

      it('Throws error when user id not provided.', function() {
         let parms = this.validParms;
         parms.userId = undefined;
         expect(function() {
            let controller = new TaskSupervisionController(parms);
            controller.initCrewsWidget();
         }).toThrowError('userId is mandatory');
      });

      it('Throws error when user id is blank.', function() {
         let parms = this.validParms;
         parms.userId = undefined;
         expect(function() {
            let controller = new TaskSupervisionController(parms);
         }).toThrowError('userId is mandatory');
      });


      it('Throws error when crew field id not provided.', function() {
         let parms = this.validParms;
         parms.crewsFieldId = undefined;
         expect(function() {
            let controller = new TaskSupervisionController(parms);
         }).toThrowError('crewsFieldId is mandatory');
      });

      it('Throws error when crew field id is blank.', function() {
         let parms = this.validParms;
         parms.crewsFieldId = '';
         expect(function() {
            let controller = new TaskSupervisionController(parms);
         }).toThrowError('crewsFieldId is mandatory');
      });

      it('Throws error when crew field id does not identify a select element.', function() {
         let parms = this.validParms;
         parms.crewsFieldId = 'non-existing-id';
         expect(function() {
            let controller = new TaskSupervisionController(parms);
         }).toThrowError('crewsFieldId must be a SELECT element');
      });

      it('Throws error when crew field id identifies a non-select element.', function() {
         setFixtures('<input id="crewsFieldId"></input>');
         let parms = this.validParms;
         parms.crewsFieldId = 'crewsFieldId';
         expect(function() {
            let controller = new TaskSupervisionController(parms);
         }).toThrowError('crewsFieldId must be a SELECT element');
      });

      it('Fetch of crew list is returned', function(done) {
         // Arrange 
         setFixtures('<select id="' + this.validParms.crewsFieldId + '"></select>');
         let controller = new TaskSupervisionController(this.validParms);

         spyOn($, 'ajax').and.callFake(function(e) {
            return e.success(testCrewList);
         });

         // Act
         controller.initCrewsWidget().then(function(response) {
            // Assert
            expect(response).toBe(testCrewList);
            done();
         });
      });

      it('Populates Crew dropdown when provided list of crews.', function(done) {
         // Arrange 
         this.validParms.isAllowedToSearch = 'false';
         let controller = new TaskSupervisionController(this.validParms);

         spyOn($, 'ajax').and.callFake(function(request) {
            if (request.url === '/maintenix/rest/crews') {
               return request.success(testCrewList);
            }
            else if (request.url === '/maintenix/rest/datetime/getCurrent') {
               return request.success(testCurrentDateTimeResponse);
            }
            else {
               console.warn("Unsupported url: ", request.url);
            }
         });

         let crewsFieldSelectEl = document.getElementById(this.validParms.crewsFieldId);
         let selectOptions = crewsFieldSelectEl.options;

         // Act
         controller.init().then(function(response) {
            // Assert
            expect(selectOptions.length).toBe(testCrewList.length);
            /**
            for (var i = 0; i < selectOptions.length; i++) {
               let expectedText = testCrewList[i].code + " (" + testCrewList[i].description + ")";
               console.warn("selectOptions: ", selectOptions[i].text, testCrewList[i].id, expectedText);
               // expect(selectOptions[i].text).toBe(expectedText);
               // expect(selectOptions[i].value).toBe(testCrewList[i].id);
            } **/

            // expect(crewsFieldSelectEl.selectedIndex).toBe(0);			 			 
            done();
         });
      });

      /**	
      it('Clears crew dropdown prior to populating it with provided list of crews.', function() {
         // Arrange
         setFixtures( 
               '<select id="' + this.validParms.crewsFieldId + '">' +
               '   <option id="10">crew10</option>'+
               '   <option id="20">crew20</option>'+
               '</select>'
         );

         let fakeService = new TaskSupervisionService();
         spyOn(fakeService, 'getCrewsForUser').and.callFake( function(userId, sucessHandler, failureHandler) {
            sucessHandler(testCrewList);
         });

         let parms = this.validParms;
         parms.TaskSupervisionService = fakeService;
         let controller = new TaskSupervisionController(parms);

         // Act
         controller.initCrewsWidget();

         // Assert
         let select = document.getElementById(this.validParms.crewsFieldId);
         let selectOptions = select.options;
         expect(selectOptions.length).toBe(3);
         for (var i=0; i<selectOptions.length; i++) {
            let expectedText = testCrewList[i].code + " (" + testCrewList[i].description +")";
            expect(selectOptions[i].text).toBe(expectedText);
            expect(selectOptions[i].value).toBe(testCrewList[i].id);
         }
         expect(select.selectedIndex).toBe(0);		 
      });
**/
      /**
            it('Populates Crew dropdown when provided list of a single crew.', function() {
               // Arrange
               let fakeService = new TaskSupervisionService();
               spyOn(fakeService, 'getCrewsForUser').and.callFake( function(userId, sucessHandler, failureHandler) {
                  sucessHandler(testCrewListOfOne);
               });

               let parms = this.validParms;
               parms.TaskSupervisionService = fakeService;
               let controller = new TaskSupervisionController(parms);

               // Act
               controller.initCrewsWidget();

               // Assert
               let select = document.getElementById(this.validParms.crewsFieldId);
               let selectOptions = select.options;
               expect(selectOptions.length).toBe(1);

               let expectedText = testCrewListOfOne[0].code + " (" + testCrewListOfOne[0].description +")";
               expect(selectOptions[0].text).toBe(expectedText);
               expect(selectOptions[0].value).toBe(testCrewListOfOne[0].id);
               expect(select.selectedIndex).toBe(0);
            });

            it('Does not populate Crew dropdown when provided no list of crews.', function() {
               // Arrange
               let crews = undefined;
               let fakeService = new TaskSupervisionService();
               spyOn(fakeService, 'getCrewsForUser').and.callFake( function(userId, sucessHandler, failureHandler) {
                  sucessHandler(crews);
               });

               let parms = this.validParms;
               parms.TaskSupervisionService = fakeService;
               let controller = new TaskSupervisionController(parms);

               // Act
               controller.initCrewsWidget();

               // Assert
               let select = document.getElementById(this.validParms.crewsFieldId);
               let selectOptions = select.options;
               expect(selectOptions.length).toBe(0);
               expect(select.selectedIndex).toBe(-1);
            });

            it('Does not populate Crew dropdown when provided empty list of crews.', function() {
               // Arrange
               let crews = [];
               let fakeService = new TaskSupervisionService();
               spyOn(fakeService, 'getCrewsForUser').and.callFake( function(userId, sucessHandler, failureHandler) {
                  sucessHandler(crews);
               });

               let parms = this.validParms;
               parms.TaskSupervisionService = fakeService;
               let controller = new TaskSupervisionController(parms);

               // Act
               controller.initCrewsWidget();

               // Assert
               let select = document.getElementById(this.validParms.crewsFieldId);
               let selectOptions = select.options;
               expect(selectOptions.length).toBe(0);
               expect(select.selectedIndex).toBe(-1);
            });

            it('Throws error when unable to get crews for user.', function() {
               // Arrange
               let errorMessage = 'errorMessage';
               let fakeService = new TaskSupervisionService();
               spyOn(fakeService, 'getCrewsForUser').and.callFake( function(userId, sucessHandler, failureHandler) {
                  failureHandler(errorMessage);
               });

               let parms = this.validParms;
               parms.TaskSupervisionService = fakeService;
               let controller = new TaskSupervisionController(parms);

               // Act and Assert
               expect(function() {
                  controller.initCrewsWidget();
               }).toThrowError(errorMessage);
            });
      	  **/
   });

});
