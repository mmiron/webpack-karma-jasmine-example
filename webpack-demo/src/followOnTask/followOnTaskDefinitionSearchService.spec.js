/* global expect, jasmine, beforeAll, spyOn, $ */
import FollowOnTaskDefinitionSearchService from './followOnTaskDefinitionSearchService.js';

describe('FollowOnTaskDefinitionSearchService followOnTask/followOnTaskDefinitionSearchService.js', function() {
   let service;
   let url = "https://www.google.com";
   let taskDefinitionResponse = [{
      code: 3,
      configSlotCode: 3,
      name: "Third"
   }, {
      code: 2,
      configSlotCode: 2,
      name: "Second"
   }, {
      code: 1,
      configSlotCode: 1,
      name: "First"
   }];

   beforeAll(function() {
      this.service = FollowOnTaskDefinitionSearchService;
   });

   it('Sorts task definitions', function() {
      let sortedData = this.service.sortTaskDefinitions(taskDefinitionResponse);

      expect(sortedData[0].code).toBe(1);
      expect(sortedData[1].code).toBe(2);
      expect(sortedData[2].code).toBe(3);
   });

   it('Fetches task definitions with error for invalid response', function() {
      jasmine.Ajax.install();

      spyOn($, 'ajax').and.callFake(function(e) {
         let invalidResponse = {};
         return e.success(invalidResponse);
      });

      expect(function() {
         this.service.getFollowOnTaskDefinitions(url);
      }).toThrow();

      jasmine.Ajax.uninstall();

   });

   it('Fetches task definitions successfully', function() {
      jasmine.Ajax.install();

      spyOn($, 'ajax').and.callFake(function(e) {
         return e.success(taskDefinitionResponse);
      });

      this.service.getFollowOnTaskDefinitions(url).then(function(fakeData) {
         expect(fakeData).toEqual(taskDefinitionResponse);
      });

      jasmine.Ajax.uninstall();

   });

});
