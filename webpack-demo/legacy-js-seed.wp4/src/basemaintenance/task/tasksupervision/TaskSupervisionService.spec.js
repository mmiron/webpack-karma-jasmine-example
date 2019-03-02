/* global expect, jasmine, beforeAll, afterAll, spyOn, fail */
import $ from 'jquery';
import TaskSupervisionService from './TaskSupervisionService';

describe('TaskSupervisionService', function() {

   const service = new TaskSupervisionService();

   beforeAll(() => {
      jasmine.Ajax.install();
   });

   afterAll(() => {
      jasmine.Ajax.uninstall();
   });

   describe('getCrewsForUser', function() {

      const userId = 'user';

      it('will make an ajax call to the correct url', (done) => {
         spyOn($, 'ajax').and.callFake((ajax) => {
            return ajax.success();
         });

         service.getCrewsForUser(userId).then(function(response) {
            expect($.ajax.calls.mostRecent().args[0].url).toBe('/maintenix/rest/crews');
            done();
         });
      });

      it('will make an ajax call with the correct type', (done) => {
         spyOn($, 'ajax').and.callFake((ajax) => {
            return ajax.success();
         });

         service.getCrewsForUser(userId).then(function(response) {
            expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET');
            // expect($.ajax.calls.mostRecent().args[0].url).toBe('/maintenix/rest/crews');
            done();
         });
      });

   //    it('will make an ajax call with the correct data', (done) => {
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success();
   //       });
   //       service.getCrewsForUser(userId).then(function(response) {
   //          let expectedData = { 'userId': userId };
   //          expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //          done();
   //       });
   //    });

   //    it('calls the promise success handler when the ajax call is successful', (done) => {
   //       let crewList = [{ crew: 1 }, { crew: 2 }];
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(crewList);
   //       });
   //       let promise = service.getCrewsForUser(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(crewList);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let promise = service.getCrewsForUser(userId);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('returns an error when the user id is not provided', () => {
   //       expect(() => { service.getCrewsForUser(undefined); }).toThrowError();
   //    });

   //    it('returns an error when the user id is blank', () => {
   //       expect(() => { service.getCrewsForUser(''); }).toThrowError();
   //    });

   // });

   // describe('getDefaultStartAndEndDates', function() {

   //    const userId = 'user';
   //    let goodResponse;
   //    let goodExpectedResult;

   //    beforeEach(() => {
   //       goodResponse = {
   //          startYear: 2018,
   //          startMonth: 3,
   //          startDayOfMonth: 17,
   //          startHourInDay: 11,
   //          startMinute: 0,
   //          startTimezone: 'EST',
   //          endYear: 2018,
   //          endMonth: 3,
   //          endDayOfMonth: 18,
   //          endHourInDay: 2,
   //          endMinute: 0,
   //          endTimezone: 'EST'
   //       };
   //       goodExpectedResult = {
   //          startDate: '17-MAR-2018',
   //          startTime: '11:00',
   //          startTimeZone: 'EST',
   //          endDate: '18-MAR-2018',
   //          endTime: '02:00',
   //          endTimeZone: 'EST'
   //       };
   //    });

   //    it('will make an ajax call to the correct url', (done) => {
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(goodResponse);
   //       });

   //       service.getDefaultStartAndEndDates(userId).then(function(response) {
   //          expect(jasmine.Ajax.requests.mostRecent().url).toBe('/maintenix/rest/datetime/getCurrent?userId=user');
   //          done();
   //       });
   //    });

   //    it('will make an ajax call with the correct type', (done) => {
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(goodResponse);
   //       });

   //       service.getDefaultStartAndEndDates(userId).then((response) => {
   //          expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET');
   //          done();
   //       });
   //    });

   //    it('will make an ajax call with the correct data', (done) => {
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(goodResponse);
   //       });

   //       service.getDefaultStartAndEndDates(userId).then((response) => {
   //          let expectedData = { 'userId': userId };
   //          expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //          done();
   //       });
   //    });

   //    it('calls the promise success handler when the ajax call is successful', (done) => {
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(goodResponse);
   //       });
   //       service.getDefaultStartAndEndDates(userId).then((response) => {
   //          (result) => {
   //             expect(result).toEqual(goodExpectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          };
   //       });
   //    });

   //    it('converts the start month number to start month name', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.startDayOfMonth = 17;
   //       response.startMonth = 1;
   //       response.startYear = 2018;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.startDate = '17-JAN-2018';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });

   //       service.getDefaultStartAndEndDates(userId).then((response) => {
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          };
   //       });
   //    });

   //    it('pads the start day when the start day is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.startDayOfMonth = 2;
   //       response.startMonth = 3;
   //       response.startYear = 2018;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.startDate = '02-MAR-2018';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('pads the start hours when the start hour is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.startHourInDay = 1;
   //       response.startMinute = 30;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.startTime = '01:30';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('pads the start minutes when the start minute is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.startHourInDay = 11;
   //       response.startMinute = 3;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.startTime = '11:03';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('converts the end month number to end month name', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.endDayOfMonth = 17;
   //       response.endMonth = 1;
   //       response.endYear = 2018;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.endDate = '17-JAN-2018';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('pads the end day when the end day is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.endDayOfMonth = 2;
   //       response.endMonth = 3;
   //       response.endYear = 2018;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.endDate = '02-MAR-2018';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('pads the end hours when the end hour is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.endHourInDay = 1;
   //       response.endMinute = 30;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.endTime = '01:30';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('pads the end minutes when the end minute is a single digit', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.endHourInDay = 11;
   //       response.endMinute = 3;
   //       let expectedResult = JSON.parse(JSON.stringify(goodExpectedResult));
   //       expectedResult.endTime = '11:03';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       promise.then(
   //          (result) => {
   //             expect(result).toEqual(expectedResult);
   //             done();
   //          },
   //          (errorMessage) => {
   //             fail('unexpected failure method called');
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call returns invalid start date', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.startYear = 'hello';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       let expectedMessage = 'default startDate failed validation: dateStr has invalid format.';
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call returns no start date', (done) => {
   //       let response = {
   //          startHourInDay: 11,
   //          startMinute: 0,
   //          endYear: 2018,
   //          endMonth: 3,
   //          endDayOfMonth: 18,
   //          endHourInDay: 2,
   //          endMinute: 0,
   //          endTimezone: 'EST'
   //       };
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       let expectedMessage = 'default startDate failed validation: dateStr has invalid format.';
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call returns invalid end date', (done) => {
   //       let response = JSON.parse(JSON.stringify(goodResponse));
   //       response.endDayOfMonth = 'hello';

   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       let expectedMessage = 'default endDate failed validation: dateStr has invalid format.';
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('calls the promise failure handler when the ajax call returns no end date', (done) => {
   //       let response = {
   //          startYear: 2018,
   //          startMonth: 3,
   //          startDayOfMonth: 17,
   //          startHourInDay: 11,
   //          startMinute: 0,
   //          startTimezone: 'EST',
   //          endHourInDay: 2,
   //          endMinute: 0,
   //          endTimezone: 'EST'
   //       };
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let promise = service.getDefaultStartAndEndDates(userId);
   //       let expectedMessage = 'default endDate failed validation: dateStr has invalid format.';
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   //    it('returns an error when the user id is not provided', () => {
   //       expect(() => { service.getDefaultStartAndEndDates(undefined); }).toThrowError();
   //    });

   //    it('returns an error when the user id is blank', () => {
   //       expect(() => { service.getDefaultStartAndEndDates(''); }).toThrowError();
   //    });

   // });

   // describe('performJobStop', function() {

   //    const args = 'args';
   //    const successHandler = () => {};
   //    const failureHandler = () => {};

   //    it('will make an ajax call to the correct url', () => {
   //       service.performJobStop(args, successHandler, failureHandler);
   //       expect(jasmine.Ajax.requests.mostRecent().url).toContain('/maintenix/rest/labour/stopByProxy');
   //    });

   //    it('will make an ajax call with the correct type', () => {
   //       spyOn($, 'ajax');
   //       service.performJobStop(args, successHandler, failureHandler);
   //       expect($.ajax.calls.mostRecent().args[0].type).toEqual('PUT');
   //    });

   //    it('will make an ajax call with the correct data', () => {
   //       spyOn($, 'ajax');
   //       service.performJobStop(args, successHandler, failureHandler);
   //       let expectedData = JSON.stringify({ ids: args });
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('calls the success handler when the ajax call is successful', (done) => {
   //       let response = 'response';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let fakeSuccessHandler = jasmine.createSpy(() => {});
   //       service.performJobStop(args, fakeSuccessHandler, failureHandler);
   //       expect(fakeSuccessHandler).toHaveBeenCalledWith(response);
   //       done();
   //    });

   //    it('calls the failure handler when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let fakeFailureHandler = jasmine.createSpy(() => {});
   //       service.performJobStop(args, successHandler, fakeFailureHandler);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       expect(fakeFailureHandler).toHaveBeenCalledWith(expectedMessage);
   //       done();
   //    });

   // });

   // describe('performSearch', function() {

   //    const args = {
   //       crewId: 'id1'
   //    };
   //    const successHandler = () => {};
   //    const failureHandler = () => {};

   //    it('will make an ajax call to the correct url', () => {
   //       service.performSearch(args, successHandler, failureHandler);
   //       expect(jasmine.Ajax.requests.mostRecent().url).toContain('/maintenix/rest/tasks');
   //    });

   //    it('will make an ajax call with the correct type', () => {
   //       spyOn($, 'ajax');
   //       service.performSearch(args, successHandler, failureHandler);
   //       expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET');
   //    });

   //    it('will make an ajax call with the correct data', () => {
   //       let args = {
   //          crewId: 'id1',
   //          showCompleteTasks: true,
   //          startDateTime: 'hello',
   //          endDateTime: 'world',
   //          taskKeyEncryptionName: 'a',
   //          workpackageKeyEncryptionName: 'b',
   //          workLocationKeyEncryptionName: 'c',
   //          aircraftKeyEncryptionName: 'd',
   //          labourKeyEncryptionName: 'e'
   //       };
   //       let expectedData = {
   //          onlyWorkscoped: true,
   //          onlyContainingLabour: true,
   //          assignedToCrewId: args.crewId,
   //          minScheduledStartDateTime: args.startDateTime,
   //          maxScheduledStartDateTime: args.endDateTime,
   //          excludeCompleted: false,
   //          taskKeyEncryptionName: args.taskKeyEncryptionName,
   //          workpackageKeyEncryptionName: args.workpackageKeyEncryptionName,
   //          workLocationKeyEncryptionName: args.workLocationKeyEncryptionName,
   //          aircraftKeyEncryptionName: args.aircraftKeyEncryptionName,
   //          labourKeyEncryptionName: args.labourKeyEncryptionName
   //       };
   //       spyOn($, 'ajax');
   //       service.performSearch(args, successHandler, failureHandler);
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('will make an ajax call with the excludeCompleted being the opposite of the provided showCompleteTasks', () => {
   //       let args = {
   //          showCompleteTasks: true,

   //          crewId: 'id1',
   //          startDateTime: 'hello',
   //          endDateTime: 'world',
   //          taskKeyEncryptionName: 'a',
   //          workpackageKeyEncryptionName: 'b',
   //          workLocationKeyEncryptionName: 'c',
   //          aircraftKeyEncryptionName: 'd',
   //          labourKeyEncryptionName: 'e'
   //       };
   //       let expectedData = {
   //          excludeCompleted: (!args.showCompleteTasks),

   //          onlyWorkscoped: true,
   //          onlyContainingLabour: true,
   //          assignedToCrewId: args.crewId,
   //          minScheduledStartDateTime: args.startDateTime,
   //          maxScheduledStartDateTime: args.endDateTime,
   //          taskKeyEncryptionName: args.taskKeyEncryptionName,
   //          workpackageKeyEncryptionName: args.workpackageKeyEncryptionName,
   //          workLocationKeyEncryptionName: args.workLocationKeyEncryptionName,
   //          aircraftKeyEncryptionName: args.aircraftKeyEncryptionName,
   //          labourKeyEncryptionName: args.labourKeyEncryptionName
   //       };
   //       spyOn($, 'ajax');
   //       service.performSearch(args, successHandler, failureHandler);
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('calls the success handler when the ajax call is successful', (done) => {
   //       let response = 'response';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let fakeSuccessHandler = jasmine.createSpy(() => {});
   //       service.performSearch(args, fakeSuccessHandler, failureHandler);
   //       expect(fakeSuccessHandler).toHaveBeenCalledWith(response);
   //       done();
   //    });

   //    it('calls the failure handler when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let fakeFailureHandler = jasmine.createSpy(() => {});
   //       service.performSearch(args, successHandler, fakeFailureHandler);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       expect(fakeFailureHandler).toHaveBeenCalledWith(expectedMessage);
   //       done();
   //    });

   //    it('calls the success handler with an empty array when the crew id is not provided', () => {
   //       let args = {
   //          showCompleteTasks: true,
   //          startDateTime: 'hello',
   //          endDateTime: 'world',
   //          taskKeyEncryptionName: 'a',
   //          workpackageKeyEncryptionName: 'b',
   //          workLocationKeyEncryptionName: 'c',
   //          aircraftKeyEncryptionName: 'd',
   //          labourKeyEncryptionName: 'e'
   //       };
   //       let fakeSuccessHandler = jasmine.createSpy(() => {});
   //       service.performSearch(args, fakeSuccessHandler, failureHandler);
   //       expect(fakeSuccessHandler).toHaveBeenCalledWith([]);
   //    });

   //    it('calls the success handler with an empty array when the user id is blank', () => {
   //       let args = {
   //          crewId: '',
   //          showCompleteTasks: true,
   //          startDateTime: 'hello',
   //          endDateTime: 'world',
   //          taskKeyEncryptionName: 'a',
   //          workpackageKeyEncryptionName: 'b',
   //          workLocationKeyEncryptionName: 'c',
   //          aircraftKeyEncryptionName: 'd',
   //          labourKeyEncryptionName: 'e'
   //       };
   //       let fakeSuccessHandler = jasmine.createSpy(() => {});
   //       service.performSearch(args, fakeSuccessHandler, failureHandler);
   //       expect(fakeSuccessHandler).toHaveBeenCalledWith([]);
   //    });

   // });

   // describe('performUnassign', function() {

   //    const args = 'args';
   //    const successHandler = () => {};
   //    const failureHandler = () => {};

   //    it('will make an ajax call to the correct url', () => {
   //       service.performUnassign(args, successHandler, failureHandler);
   //       expect(jasmine.Ajax.requests.mostRecent().url).toContain('/maintenix/rest/labour/unassign');
   //    });

   //    it('will make an ajax call with the correct type', () => {
   //       spyOn($, 'ajax');
   //       service.performUnassign(args, successHandler, failureHandler);
   //       expect($.ajax.calls.mostRecent().args[0].type).toEqual('PUT');
   //    });

   //    it('will make an ajax call with the correct data', () => {
   //       spyOn($, 'ajax');
   //       service.performUnassign(args, successHandler, failureHandler);
   //       let expectedData = JSON.stringify({ ids: args });
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('calls the success handler when the ajax call is successful', (done) => {
   //       let response = 'response';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          return ajax.success(response);
   //       });
   //       let fakeSuccessHandler = jasmine.createSpy(() => {});
   //       service.performUnassign(args, fakeSuccessHandler, failureHandler);
   //       expect(fakeSuccessHandler).toHaveBeenCalledWith(response);
   //       done();
   //    });

   //    it('calls the failure handler when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let fakeFailureHandler = jasmine.createSpy(() => {});
   //       service.performUnassign(args, successHandler, fakeFailureHandler);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       expect(fakeFailureHandler).toHaveBeenCalledWith(expectedMessage);
   //       done();
   //    });

   // });

   // describe('updateActualHours', function() {

   //    const taskId = 'taskId';
   //    const labourRowId = 'labourRowId';
   //    const newValue = 'newValue';

   //    it('will make an ajax call to the correct url', () => {
   //       service.updateActualHours(taskId, labourRowId, newValue);
   //       let expectedUrl = '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId;
   //       expect(jasmine.Ajax.requests.mostRecent().url).toContain(expectedUrl);
   //    });

   //    it('will make an ajax call with the correct type', () => {
   //       spyOn($, 'ajax');
   //       service.updateActualHours(taskId, labourRowId, newValue);
   //       expect($.ajax.calls.mostRecent().args[0].type).toEqual('PUT');
   //    });

   //    it('will make an ajax call with the correct data', () => {
   //       spyOn($, 'ajax');
   //       service.updateActualHours(taskId, labourRowId, newValue);
   //       let expectedData = JSON.stringify({ actualHours: newValue });
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('throws an error when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let promise = service.updateActualHours(taskId, labourRowId, newValue);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   // });

   // describe('updateScheduledHours', function() {

   //    const taskId = 'taskId';
   //    const labourRowId = 'labourRowId';
   //    const newValue = 'newValue';

   //    it('will make an ajax call to the correct url', () => {
   //       service.updateScheduledHours(taskId, labourRowId, newValue);
   //       let expectedUrl = '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId;
   //       expect(jasmine.Ajax.requests.mostRecent().url).toContain(expectedUrl);
   //    });

   //    it('will make an ajax call with the correct type', () => {
   //       spyOn($, 'ajax');
   //       service.updateScheduledHours(taskId, labourRowId, newValue);
   //       expect($.ajax.calls.mostRecent().args[0].type).toEqual('PUT');
   //    });

   //    it('will make an ajax call with the correct data', () => {
   //       spyOn($, 'ajax');
   //       service.updateScheduledHours(taskId, labourRowId, newValue);
   //       let expectedData = JSON.stringify({ scheduledHours: newValue });
   //       expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
   //    });

   //    it('throws an error when the ajax call is unsuccessful', (done) => {
   //       let errorMessage = 'errorMessage';
   //       spyOn($, 'ajax').and.callFake((ajax) => {
   //          let jqXHR = { status: errorMessage };
   //          return ajax.error(jqXHR);
   //       });
   //       let promise = service.updateScheduledHours(taskId, labourRowId, newValue);
   //       let expectedMessage = 'Error code =  ' + errorMessage;
   //       promise.then(
   //          (result) => {
   //             fail('unexpected success method called');
   //             done();
   //          },
   //          (message) => {
   //             expect(message).toEqual(expectedMessage);
   //             done();
   //          }
   //       );
   //    });

   });

});
