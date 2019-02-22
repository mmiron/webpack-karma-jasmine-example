/* global expect, jasmine, spyOn, $, setFixtures */
/**
 * Create Follow-on Task Search Test Suite
 **/
 
import $ from 'jquery';
import FollowOnTaskDefinitionSearchController from './followOnTaskDefinitionSearchController.js';

describe('FollowOnTaskDefinitionSearchController followOnTask/followOnTaskDefinitionSearchController.js', function() {
   let restApiUrl = "/someRestApi";

   function getGoodController() {
      return new FollowOnTaskDefinitionSearchController('followOnTaskSearchQuery',
         'idButtonOk',
         'idTypeaheadNotFoundMessage',
         'idFieldFollowOnTaskDefnUuid',
         'idfollowOnTaskDefinitionRestAPI');
   }

   function setUpHTMLFixture() {
      setFixtures(
         '<form id="form-typeahead-test" name="form-typeahead-test">' +
         '  <div class="typeahead__container">' +
         '     <div class="typeahead__field">' +
         '        <span class="typeahead__query">' +
         '          <input class= "js-typeahead-test" id="followOnTaskSearchQuery" name="followOnTaskSearchQuery">' +
         '        </span>' +
         '     </div>' +
         '  </div>' +
         '  <button id="idButtonOk" title="mytitle">Ok</button>' +
         '  <input type="hidden" name="aFollowOnTaskDefinitionUuid" id="idFieldFollowOnTaskDefnUuid">' +
         '  <input type="hidden" id="idTypeaheadNotFoundMessage" value="web.msg.MSG_NO_MATCHING_FOLLOWON_TASK_DEFINITIONS">' +
         '  <input type="hidden" id="idfollowOnTaskDefinitionRestAPI" value="' + restApiUrl + '"' +
         '</form>');
   }

   beforeEach(function() {
      jasmine.Ajax.install();
      setUpHTMLFixture();
      this.okButtonEl = $('#idButtonOk');
      this.fieldFollowOnTaskDefnUuidEl = $('#idFieldFollowOnTaskDefnUuid');
   });

   afterEach(function() {
      jasmine.Ajax.uninstall();
   });

   it("Should have a button with OK label", function() {
      expect(this.okButtonEl).toHaveText("Ok");
   });

   it("Should throw error indicating missing typeaheadId", function() {

      expect(function() {
         new FollowOnTaskDefinitionSearchController('FAKE_followOnTaskSearchQuery',
            'FAKE_idButtonOk',
            'FAKE_idTypeaheadNotFoundMessage',
            'FAKE_idFieldFollowOnTaskDefnUuid',
            'FAKE_idfollowOnTaskDefinitionRestAPI');
      }).toThrow();
   });

   it("Should have Ok button enabled", function() {
      let controller = getGoodController();
      controller.enableOkBtn();
      expect(this.okButtonEl).not.toHaveClass('disabled');
   });

   it("Should have Ok button disabled", function() {
      let controller = getGoodController();
      controller.disableOkBtn();
      expect(this.okButtonEl).toHaveClass('disabled');
   });


   it('returns a properly constructed display value', function() {
      let data = [{
         code: 5,
         configSlotCode: 3,
         name: 'test'
      }];

      let controller = getGoodController();
      expect(controller.displayFollowOn(null, data[0])).toBe("5 - 3 - test");
   });

   it("Should set and clear selected task definition of output element", function() {
      let controller = getGoodController();
      controller.setSelectedTaskDefinition({ id: 'someValue' });
      expect(this.fieldFollowOnTaskDefnUuidEl.attr('value')).toBe('someValue');

      controller.clearSelectedTaskDefinition();
      expect(this.fieldFollowOnTaskDefnUuidEl.attr('value')).toBe('');
   });

   it('Fetches task definitions successfully', function(done) {
      let controller = getGoodController();
      let responseTaskDefinitions = [
         { "id": "A6AAE18B638740B29B2F34D51CF2CCD5", "configSlotCode": "BOM123", "name": "ReqWithImpact1", "code": "NC14992-REQ1" },
         { "id": "A6AAE18B638740B29B2F34D51CF2CCD6", "configSlotCode": "BOM123", "name": "ReqWithImpact2", "code": "NC14992-REQ2" },
         { "id": "A6AAE18B638740B29B2F34D51CF2CCD7", "configSlotCode": "BOM123", "name": "ReqWithImpact3", "code": "NC14992-REQ3" },
         { "id": "A6AAE18B638740B29B2F34D51CF2CCD8", "configSlotCode": "BOM123", "name": "ReqWithImpact4", "code": "NC14992-REQ4" },
         { "id": "A6AAE18B638740B29B2F34D51CF2CCD9", "configSlotCode": "BOM123", "name": "ReqWithImpact5", "code": "NC14992-REQ5" },
         { "id": "A6AAE18B638740B29B2F34D51CF2CCE3", "configSlotCode": "BOM123", "name": "ReqWithImpact6", "code": "NC14992-REQ6" },
      ];

      spyOn($, 'ajax').and.callFake(function(e) {
         return e.success(responseTaskDefinitions);
      });

      let okButtonEl = $('#idButtonOk');
      let nativeEl = $("#followOnTaskSearchQuery");

      // initialize controller
      try {
      controller.initialize().then(function() {
         // check to see if ajax was done with proper url
         expect($.ajax.calls.mostRecent().args[0].url).toEqual(restApiUrl);

         // check if ok button was disabled
         expect(okButtonEl).toHaveClass('disabled');

         // check if focus was given to component
         expect(nativeEl).toBeFocused();
         done();
      });
      } catch (e) {
         console.error("error: ", e);
      }

   });

});
