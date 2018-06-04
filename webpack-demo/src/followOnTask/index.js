import FollowOnTaskDefinitionSearchController from './followOnTaskDefinitionSearchController.js';

let controller = 
    new FollowOnTaskDefinitionSearchController('followOnTaskSearchQuery', 
        'idButtonOk', 
        'idTypeaheadNotFoundMessage',
        'idFieldFollowOnTaskDefnUuid',
        'idfollowOnTaskDefinitionRestAPI');
controller.initialize();
