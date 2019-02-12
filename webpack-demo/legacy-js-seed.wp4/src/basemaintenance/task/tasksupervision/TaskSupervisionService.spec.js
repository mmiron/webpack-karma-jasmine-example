import $ from 'jquery';
import TaskSupervisionService from './TaskSupervisionService';

describe('TaskSupervisionService.js', ()=>{

   describe('getCrewsForUser', ()=>{

      const service = new TaskSupervisionService();

      const userId = 'user';
      const successHandler = function(){};
      const failureHandler = function(){};

      beforeEach(function() {
         jasmine.Ajax.install();
       });

      afterEach(function() {
         jasmine.Ajax.uninstall();
       });
	   

	   /** 
	   
      it('throws an error when user is not provided', ()=>{
         let undefinedUserId;
         expect(() => service.getCrewsForUser(undefinedUserId, successHandler, failureHandler ))
            .toThrowError('userId is mandatory');
      });

      it('throws an error when user is blank string', ()=>{
         const blankUserId = '';
         expect(() => service.getCrewsForUser(blankUserId, successHandler, failureHandler ))
            .toThrowError('userId is mandatory');
      });

      it('throws an error when success handler is not provided', ()=>{
         let undefinedSuccessHandler;
         expect(() => service.getCrewsForUser(userId, undefinedSuccessHandler, failureHandler ))
            .toThrowError('successHandler is mandatory');
      });

      it('throws an error when success handler is not a function', ()=>{
         const nonFunctionSuccessHandler = 'hello';
         expect(() => service.getCrewsForUser(userId, nonFunctionSuccessHandler, failureHandler ))
            .toThrowError('successHandler must be a function');
      });

      it('throws an error when failure handler is not provided', ()=>{
         let undefinedFailureHandler;
         expect(() => service.getCrewsForUser(userId, successHandler, undefinedFailureHandler ))
            .toThrowError('failureHandler is mandatory');
      });

      it('throws an error when failure handler is not a function', ()=>{
         const nonFunctionFailureHandler = 'hello';
         expect(() => service.getCrewsForUser(userId, successHandler, nonFunctionFailureHandler ))
            .toThrowError('failureHandler must be a function');
      });

      it('will make an ajax call to the correct url', ()=>{
         spyOn($, 'ajax');
         service.getCrewsForUser(userId, successHandler, failureHandler );
         expect($.ajax.calls.mostRecent().args[0].url).toEqual('/maintenix/rest/crew/list');
      });

      it('will make an ajax call with the correct type', ()=>{
         spyOn($, 'ajax');
         service.getCrewsForUser(userId, successHandler, failureHandler );
         expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET');
      });

      it('will make an ajax call with the correct data', ()=>{
         spyOn($, 'ajax');
         service.getCrewsForUser(userId, successHandler, failureHandler );
         let expectedData = {'userId': userId};
         expect($.ajax.calls.mostRecent().args[0].data).toEqual(expectedData);
      });
	  **/

      it('will call the success handler when the ajax call is successful', ()=>{
         spyOn($, 'ajax').and.callFake( function(ajx) {
            ajx.success({});
         });
		 
         /** const spySuccessHandler = jasmine.createSpy('spySuccessHandler');
         service.getCrewsForUser(userId, spySuccessHandler, failureHandler );
         expect(spySuccessHandler).toHaveBeenCalled(); **/
		 
		 
		 /**
		var spySuccessHandler = jasmine.createSpy('success222');
		var spyFailureHandler = jasmine.createSpy('failure');
		jasmine.Ajax.withMock(function() {
			service.getCrewsForUser(userId, spySuccessHandler, spyFailureHandler );
			expect(spySuccessHandler).toHaveBeenCalled();
		}); **/
      });
/**
      it('will call the error handler when the ajax call is unsuccessful', ()=>{
         spyOn($, 'ajax').and.callFake( function(ajx) {
            ajx.error({});
         });
         const spyFailureHandler = jasmine.createSpy('spyFailureHandler');
         service.getCrewsForUser(userId, successHandler, spyFailureHandler );
         expect(spyFailureHandler).toHaveBeenCalled();
      });
**/

//      it('will call the success handler with empty list when user belongs to no crews', ()=>{
//
//         //
//         // the following test does exercise the behaviour but does not really have anything to
//         // do with the list being returned, the ajax call simply calls the success handler with
//         // whatever data it is provided... see test below as proof
//         //
//         // I think this and the behaviours below are all actually behaviours of the endpoint
//         // and not this service
//         //
//         // so instead of this test, maybe we should just be writing a test to "expect" that the
//         // successHandler function is called when the ajax call is successful
//         // (already written above)
//         //
//
//         const expectedResult = 'expected';
//
//         spyOn($, 'ajax').and.callFake( (e) => {
//            return e.success( expectedResult, 'fake textStatus', 'fake jqXHR' );
//         });
//
//         let actualResult;
//         const userId = 'user';
//         const successHandler = function(data){ actualResult = data; };
//         const failureHandler = function(){};
//
//         service.getCrewsForUser(userId, successHandler, failureHandler );
//
//         expect(actualResult).toEqual(expectedResult);
//
//      });
//
//
//
//      it('will call the success handler with the list of crews to which user belongs when the user belongs to all crews', ()=>{
//
//      });
//
//      it('will call the success handler with the list of crews to which user belongs when the user belongs to some crews', ()=>{
//
//      });
//
//      it('will call the failure handler with Error msg when rest End Point is not accessible', ()=>{
//
//      });

   });

});