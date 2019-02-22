import FollowOnTaskDefinitionSearchController from './followOnTaskDefinitionSearchController.js';

let controller =
    new FollowOnTaskDefinitionSearchController('idInputTypeaheadFollowOnTaskSearch',
        'idButtonOk',
        'idTypeaheadNotFoundMessage',
        'idFieldFollowOnTaskDefnUuid',
        'idfollowOnTaskDefinitionRestAPI');
controller.initialize();
