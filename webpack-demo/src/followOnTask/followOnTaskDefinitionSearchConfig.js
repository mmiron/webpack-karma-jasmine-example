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
}
