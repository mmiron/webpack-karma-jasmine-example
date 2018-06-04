/* global expect */
import FollowOnTaskDefinitionSearchConfig from './followOnTaskDefinitionSearchConfig.js';

describe('FollowOnTaskDefinitionSearchConfig followOnTask/followOnTaskDefinitionSearchConfig.js', function() {

   it('throws exception on empty data parameter', function() {
      expect(function() {
         let config = new FollowOnTaskDefinitionSearchConfig();
      }).toThrowError("The response data suppose to be in array form");
   });
   
   it('throws exception with a object type data parameter instead of array', function() {
      expect(function() {
         let data = {};
         let config = new FollowOnTaskDefinitionSearchConfig(data);
      }).toThrowError("The response data suppose to be in array form");
   });
   
   it('creates a valid config object', function() {
      let data = [];
      let config = new FollowOnTaskDefinitionSearchConfig(data);
      
      expect(config.name).toBe('followOnTaskDefnSearch');
      expect(config.limit).toBe(50);
      expect(config.minLength).toBe(1);
   });
   
   it('returns a properly constructed display value', function() {
      let data = [{
         code: 5,
         configSlotCode : 3,
         name: 'test'
      }];
      let config = new FollowOnTaskDefinitionSearchConfig(data);
      
      expect(config.displayFollowOn(null, data[0])).toBe("5 - 3 - test"); 
   });

});
