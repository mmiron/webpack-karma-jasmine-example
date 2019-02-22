import $ from 'jquery';

/**
 * The service layer, it sends REST API call and pass the response data to controller
 */
export default class FollowOnTaskDefinitionSearchService {

   static sortTaskDefinitions(taskDefinitions) {
      if (!taskDefinitions || !(taskDefinitions instanceof Array)) {
         console.error("taskDefinitions expected to be an Array");
         throw new Error("taskDefinitions expected to be an Array");
      }

      return taskDefinitions.sort(function(a, b) {
         let compareResult = (a.code > b.code) ? 1 : ((a.code < b.code) ? -1 : 0);

         if (compareResult == 0) {
            compareResult = (a.configSlotCode > b.configSlotCode) ? 1 : ((a.configSlotCode < b.configSlotCode) ? -1 : 0);
         }

         if (compareResult == 0) {
            compareResult = (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0);
         }
         return compareResult;
      });
   }

   static getFollowOnTaskDefinitions(apiUrl) {
      let scope = this;
      return new Promise(function(resolve, reject) {
         return $.ajax({
            type: "GET",
            url: apiUrl,
            success: function(taskDefinitionsResponse) {
               // nice to have: postProcessor hook
               console.log("back from ajax");
               let sortedTaskDefinitions = scope.sortTaskDefinitions(taskDefinitionsResponse);
               console.log("back from sortedTaskDefinitions... resolving");
               return resolve(sortedTaskDefinitions);
            },
            error: function(err) {
               // if error happens with the API call, initialize the widget with an empty array.
               resolve([]);
            }
         });
      });
   }

}
