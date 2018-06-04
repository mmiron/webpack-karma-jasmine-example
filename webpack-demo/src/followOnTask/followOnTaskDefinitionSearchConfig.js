/* global $ */
/**
 * It contains all configurations for the type ahead search widget
 */
export default class FollowOnTaskDefinitionSearchConfig {

   constructor(data) {
      if (!data || !(data instanceof Array)) {
         throw new Error("The response data suppose to be in array form");
      }

      this.data = data;

      // The name of the dataset.
      // This will be appended to the class name of the filtered result <div>.
      this.name = 'followOnTaskDefnSearch';

      // The max number of suggestions to be displayed.
      this.limit = 50;

      // The minimum character length needed before suggestions start getting rendered.
      this.minLength = 1;
   }

   // Define how the result is displayed in the dropdown.
   // It will display the result in the format of: task code - configslot code - task name
   displayFollowOn(query, suggestionObj) {
      if (suggestionObj) {
         return suggestionObj.code + " - " + suggestionObj.configSlotCode + " - " + suggestionObj.name;
      }
   }
}
