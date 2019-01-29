import TaskSupervisionController from './TaskSupervisionController';

let controllerParms = {
   userId: document.getElementById('idUser').value,
   crewsFieldId: 'idCrewList',
   startFieldId: 'idStartDateTime',
};

let controller = new TaskSupervisionController(controllerParms);
controller.init();