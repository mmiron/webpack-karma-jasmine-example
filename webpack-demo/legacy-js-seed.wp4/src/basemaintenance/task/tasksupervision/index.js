import TaskSupervisionController from './TaskSupervisionController';

let controllerParms = {
   user: document.getElementById('idUser').value,

   isAllowedToSearch: (document.getElementById('idIsAllowedToSearch').value === 'true'),
   isAllowedToJobStop: (document.getElementById('idIsAllowedToJobStop').value === 'true'),
   isAllowedToUnassignSelected: (document.getElementById('idIsAllowedToUnassignSelected').value === 'true'),
   isAllowedToEditSchedledHours: (document.getElementById('idIsAllowedToEditSchedledHours').value === 'true'),
   isAllowedToEditActualHours: (document.getElementById('idIsAllowedToEditActualHours').value === 'true'),

   crewsFieldId: 'idCrewList',
   startFieldId: 'idStartDateTime',
   endFieldId: 'idEndDateTime',
   showCompleteId: 'idShowComplete',
   searchButtonId: 'idSearchButton',
   jobStopButtonId: 'idJobStopButton',
   unassignButtonId: 'idUnassignSelectedButton',
   searchResultsId: 'idSearchResults',
   noSearchResultsMessage: document.getElementById('idNoSearchResultsMessage').value,
   unassignedLabel: document.getElementById('idUnassignedLabel').value,
   laborRowElaspedHoursThreshold: document.getElementById('idlaborRowElaspedHoursThreshold').value,

   contextPath: document.getElementById('idContextPath').value,
   trackerImagePath: document.getElementById('idTrackerImagePath').value,
   currentUrlHash: document.getElementById('idCurrentUrlHash').value,
   taskDetailsPagePath: document.getElementById('idTaskDetailsPagePath').value,
   taskDetailsPageTaskParm: document.getElementById('idTaskDetailsPageTaskParm').value,
   inventoryDetailsPagePath: document.getElementById('idInventoryDetailsPagePath').value,
   inventoryDetailsPageParm: document.getElementById('idInventoryDetailsPageParm').value,
   checkDetailsPagePath: document.getElementById('idCheckDetailsPagePath').value,
   checkDetailsPageParm: document.getElementById('idCheckDetailsPageParm').value,
   labourDetailsPagePath: document.getElementById('idLabourDetailsPagePath').value,
   labourDetailsPageParm: document.getElementById('idLabourDetailsPageParm').value

};

let controller = new TaskSupervisionController(controllerParms);
controller.init();