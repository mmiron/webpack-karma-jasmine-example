/**
 * Component to manage the template for LMOC web pages. Provides customisation for the mx.header component.
 */
import lmocHeaderTemplate from './lmoc-header.html';
import aboutTemplateHtml from './about-template-dialog.html';



/**
 * The methods of this controller are bound to the mx.header component bindings.
 */
class LmocHeaderController {

    // Inject services into the controller
    static get $inject() {
        return [
            '$http',
            '$translate'
        ];
    }

    // Define the controller
    constructor($http,
          $translate
    ) {
        let ctrl = this;

        ctrl.$http = $http;
        ctrl.$translate = $translate;
//        ctrl.lmocDialogService = lmocDialogService;
//       ctrl.restService = restService;

        ctrl.appName = document.querySelector('html').getAttribute('ng-app');

//        ctrl.helpMap = {
//            'phoneUpDeferral': 'enduser/Line_Maintenance_and_MOC/PUD/c_about_the_phone_up_deferral_process.html',
//            'deferralReference': 'enduser/Line_Maintenance_and_MOC/Deferral_Reference_Config/c_deferral_reference_configuration.html',
//            'selectReference': 'enduser/Line_Maintenance_and_MOC/Faults/Fault_references/c_fault_references.html',
//            'pendingReferenceApprovals': 'enduser/Line_Maintenance_and_MOC/maintenance_execution/Request_Auth_Fault_Deferral/t_seeing_all_pending_deferral_requests.html',
//            'oilRecording': 'enduser/Line_Maintenance_and_MOC/SingleScreenOil/t_Record_oil_uptake.html'
//        };

        ctrl.labels = {
            about: 'MX_HEADER.LABEL.ABOUT',
            signout: 'MX_HEADER.LABEL.SIGN_OUT',
            help: 'MX_HEADER.LABEL.HELP'
        };

        ctrl.user = {
            firstname: '',
            lastname: ''
        };

        ctrl.menuItems = [];

    }

    $onInit() {

    }

    clickMenuItem(link) {

    }

    clickHelp() {
        let ctrl = this;

        let helpUrl = '/help-viewer/help/content/en/Operator/';
        helpUrl += ctrl.helpMap[ctrl.appName];

        window.open(helpUrl, "");
    }

    clickAbout() {
        let ctrl = this;


    }

    clickLogout() {
        window.location = '/maintenix/logout';
    }
}

// Return the component contract
export default {
    template: lmocHeaderTemplate,
    controller: LmocHeaderController
};

//angular.module('cycleCountApp.main').component('lmocHeader', {
//  template: '/maintenix/js/supplychain/cyclecount/components/lmoc-header/lmoc-header.html',
//  controller: LmocHeaderController
//});
