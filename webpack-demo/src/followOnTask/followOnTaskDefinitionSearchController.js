import $ from 'jquery';

import FollowOnTaskDefinitionSearchConfig from './followOnTaskDefinitionSearchConfig.js';
import FollowOnTaskDefinitionSearchService from './followOnTaskDefinitionSearchService.js';

/**
 * The button controller that handles ui interactions.
 */
export default class FollowOnTaskDefinitionSearchController {

   constructor(typeAheadId, okButtonId, notFoundMsgId, followOnTaskDefnUuidOuputId, apiUrlId) {
      let scope = this;
      this.notFoundMsgEl = $("#" + notFoundMsgId);
      this.okBtnEl = $('#' + okButtonId);
      this.typeAheadSearchInputEl = $('#' + typeAheadId);
      this.followOnTaskDefnUuidOuputEl = $('#' + followOnTaskDefnUuidOuputId);
      let apiUrlEl = $("#" + apiUrlId);

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

      // save user selection from the search result.
      this.typeAheadSearchInputEl.on('typeahead:selected', function(evt, suggestion) {
         scope.enableOkBtn();
         this.setSelectedTaskDefinition(suggestion);
      });

      this.typeAheadSearchInputEl.keydown(function() {
         setTimeout(
            function() {
               if (scope.typeAheadSearchInputEl.val() != scope.selectedOption) {
                  scope.disableOkBtn();
                  scope.clearSelectedTaskDefinition();
               }
            });
      });

      // bind sibling methods to class instance.
      this.initialize = this.initialize.bind(this);
      this.configureTypeAhead = this.configureTypeAhead.bind(this);
   }

   /**
    * set the id value of the selected task definition to our html input element
    */
   setSelectedTaskDefinition(suggestion) {
      this.selectedOption = this.typeAheadSearchInputEl.val();
      this.followOnTaskDefnUuidOuputEl.attr('value', suggestion.id);
   }

   /**
    * clear any selected task definition value in our html input element
    */
   clearSelectedTaskDefinition() {
      this.followOnTaskDefnUuidOuputEl.attr('value', '');
   }

   /**
    * setup UI elements, fetch task definitions and configure type ahead
    */
   initialize() {
      this.disableOkBtn();

      try {
         FollowOnTaskDefinitionSearchService.getFollowOnTaskDefinitions(
            this.apiUrl).then(this.configureTypeAhead);

         // once the typeahead input is initialized, the type field will lost focus, have to
         // manually focus it again.
         this.typeAheadSearchInputEl.focus();
      }
      catch (error) {
         throw new Error("Error while trying to fetch task definitions.", error);
      }
   }

   /**
    * configure type ahead with data source and default configuration.
    */
      configureTypeAhead(taskDefinitions) {
      let scope = this;
      let config = new FollowOnTaskDefinitionSearchConfig(taskDefinitions);
      $.typeahead({
         debug: true,
         input: scope.typeAheadSearchInputEl,
         highlight: true,
         name: config.name,
         limit: config.limit,
         source: {
            data: config.data,
         },
         minLength: config.minLength,
         display: ["code", "configSlotCode", "name"],
         emptyTemplate: '<div class="mx-typeahead-msg-notfound">' + scope.notFoundMsgEl.val() + '</div>',
         template: config.displayFollowOn // "<span>{{code}} - {{configSlotCode}} - {{name}}</span>"
      });
   }

   /**
    * Wrapper to enable our OK button
    */
   enableOkBtn() {
      if (this.okBtnEl) {
         if (this.okBtnEl.attr('originOnClickEvent')) {
            this.okBtnEl.attr('onclick', this.okBtnEl.attr('originOnClickEvent'));
         }

         if (this.okBtnEl.attr('originTitle')) {
            this.okBtnEl.attr('title', this.okBtnEl.attr('originTitle'));
         }

         this.okBtnEl.removeClass('disabled');
         this.okBtnEl.removeAttr('originOnClickEvent');
         this.okBtnEl.removeAttr('originTitle');
      }
   }

   /**
    * Wrapper to disable our OK button
    */
   disableOkBtn() {
      if (this.okBtnEl) {
         // store the button onclick handler and title for future restore
         if (!this.okBtnEl.attr('originOnClickEvent')) {
            this.okBtnEl.attr('originOnClickEvent', this.okBtnEl.attr('onclick'));
         }

         if (!this.okBtnEl.attr('originTitle')) {
            this.okBtnEl.attr('originTitle', this.okBtnEl.attr('title'));
         }

         this.okBtnEl.addClass('disabled');
         this.okBtnEl.attr('onclick', false);
         this.okBtnEl.attr('title', '');
      }
   }

}
