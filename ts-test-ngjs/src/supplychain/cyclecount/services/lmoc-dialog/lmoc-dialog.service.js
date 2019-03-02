/**
 * Service for creating various dialogs.
 * Error, info and warning dialogs contain an OK button and a close (x) button.
 * The service returns a promise which is resolved by the OK button and
 * rejected by the close button. (Use Promise.finally() to execute a single
 * callback function for both buttons)
 *
 * The confirm dialog has an additional cancel button which also rejects the
 * returned promise.
 *
 * All public methods take the following input parameters:
 *
 * @param aDialogParams (optional) = {
 *     title: string, Title above the dialog box
 *     message: string, Message displayed in the dialog box
 *     ok: string, Text on the OK/positive button
 *     cancel: string, text on the cancel/negative button
 *     parent: jQLite (default=angular.element(document.body)), DOM element that
 *         the dialog will be appended to.
 *         In order to prevent a dialog from staying open when a DOM element
 *         is destroyed it should be attached to that element.
 *     preserveOnStateChange: boolean(default=false),
 *         A flag that indicates that the dialog should remain open when
 *         ui-router's state changes. This is false by default so that a dialog
 *         is not left open when the user changes view using the browser's back
 *         button.
 *  }
 *
 */

import './lmoc-dialog.css'
import template from './lmoc-dialog.html'
import _ from 'lodash'

export default class lmocDialogService {
	// Inject dependencies
	static get $inject() {
		return [
                '$compile',
		        '$mdDialog',
                '$q',
                '$rootScope',
                '$sce',
                '$timeout',
		        '$translate'
		        ];
	}

	constructor($compile, $mdDialog, $q, $rootScope, $sce, $timeout, $translate){
        this.$compile = $compile;
		this.$mdDialog = $mdDialog;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$sce = $sce;
        this.$timeout = $timeout;
		this.$translate = $translate;
	}

    showConfirm(aDialogParams) {
        let style = {
            toolbar: 'md-primary',
            button: ''
        };

        // Specify the default title
        if (_.isEmpty(aDialogParams.title)) {
            aDialogParams.title = this.$translate.instant('LMOC_COMMON.TITLE.CONFIRM');
        }

        // default the buttons to YES and NO instead of Ok and Cancel
        aDialogParams.cancel = _.get(aDialogParams, 'cancel', this.$translate.instant('LMOC_COMMON.LABEL.NO'));
        aDialogParams.ok = _.get(aDialogParams, 'ok', this.$translate.instant('LMOC_COMMON.LABEL.YES'));

        return this._show(aDialogParams, style);
    }

    showError(aDialogParams) {
        let style = {
            toolbar: 'md-warn md-hue-1',
            button: ''
        };

        // Specify the default title
        if (_.isEmpty(aDialogParams.title)) {
            aDialogParams.title = this.$translate.instant('LMOC_COMMON.TITLE.ERROR');
        }

        return this._show(aDialogParams, style);
    }

    showInfo(aDialogParams) {
        let style = {
            toolbar: 'md-primary',
            button: ''
        };

        // Specify the default title
        if (_.isEmpty(aDialogParams.title)) {
            aDialogParams.title = this.$translate.instant('LMOC_COMMON.TITLE.INFO');
        }

        return this._show(aDialogParams, style);
    }
    showSuccess(aDialogParams) {
        let style = {
            toolbar: 'md-accent md-hue-3',
            button: ''
        };

        // Specify the default title
        if (_.isEmpty(aDialogParams.title)) {
            aDialogParams.title = this.$translate.instant('LMOC_COMMON.TITLE.SUCCESS');
        }

        return this._show(aDialogParams, style);
    }


    showWarning(aDialogParams) {
        let style = {
            toolbar: 'md-accent',
            button: ''
        };

        // Specify the default title
        if (_.isEmpty(aDialogParams.title)) {
            aDialogParams.title = this.$translate.instant('LMOC_COMMON.TITLE.WARNING');
        }

        return this._show(aDialogParams, style);
    }



    /**
     * Reads in a template and scope in order to compile them. If no template is provided,
     * it will return a rejected promise.
     * @param {String} aTemplate
     * @param {Object} aScope
     *
     * @returns {Promise}
     */
    _getProcessedTemplate(aTemplate, aScope) {
        let svc = this;

        // Return default error message if no dialog content is provided
        if (_.isNil(aTemplate)) {
            return svc.$q.reject();
        }

        let lContent = aTemplate;
        let lScope = svc.$rootScope.$new();

        // Only use the scope provided if it isn't null
        if (!_.isNil(aScope)) {
            angular.extend(lScope, aScope);
        }

        // Create an angular jqlite element around the content and then compile it
        let lElement = angular.element(lContent);
        let lCompiledContent = svc.$compile(lElement)(lScope);

        // Fetch the outerHTML of the compiled content within a $timeout function
        // so that all compilation is completed and ensure the contents are trusted
        // since we are using ng-html-bind in the generic template.
        return svc.$timeout(() => {
            lContent = lCompiledContent[0].outerHTML;
            return lContent;
        })
        .finally(() => {
            lScope.$destroy();
        });
    }

    /**
     * Assembles dialog parameter data in order to invoke the $mdDialog service.
     *
     * It will always favour a provided template over a message. If no template is available,
     * it will attempt to use a provided message.
     * @param {Object} aDialogParams
     * @param {Object} aStyle
     */
    _show(aDialogParams, aStyle) {
        let svc = this;
        let parent = _.get(aDialogParams,'parent', angular.element(document.body));
        let simpleMessage = _.get(aDialogParams, 'message', svc.$translate.instant('LMOC_COMMON.MESSAGE.AN_ERROR_OCCURRED'));
        let contentTemplate = _.get(aDialogParams, 'template', null);
        let scope = _.get(aDialogParams, 'scope', null);
        let lDialogParams = {
                title: _.get(aDialogParams,'title',
                    svc.$translate.instant('LMOC_COMMON.TITLE.ERROR')),
                message: svc.$sce.trustAsHtml(simpleMessage),
                okLabel: _.get(aDialogParams, 'ok', svc.$translate.instant('LMOC_COMMON.LABEL.OK')),
                cancelLabel: _.get(aDialogParams, 'cancel'),
                allowCancel: !_.isNil(_.get(aDialogParams, 'cancel')),
                preserveOnStateChange: _.get(aDialogParams, 'preserveOnStateChange', false),
                style: aStyle
            };

        if(_.isNil(contentTemplate)){
            return svc.$mdDialog.show({
                controller: DialogController,
                controllerAs: '$ctrl',
                parent: parent,
                template: template,
                locals: lDialogParams,
                bindToController: true
            });
        } else {
            return this._getProcessedTemplate(contentTemplate, scope)
            .then((compiledTemplate) => {
                 lDialogParams.message = svc.$sce.trustAsHtml(compiledTemplate);

                 return svc.$mdDialog.show({
                    controller: DialogController,
                    controllerAs: '$ctrl',
                    parent: parent,
                    template: template,
                    locals: lDialogParams,
                    bindToController: true
                });
            });
        }
    }

}

class DialogController {

    static get $inject() {
        return ['$mdDialog','$rootScope'];
    }

    constructor($mdDialog, $rootScope) {
        let self = this;
        self.$mdDialog = $mdDialog;
        self.$rootScope = $rootScope;

        if (!self.preserveOnStateChange) {
            self.$rootScope.$on('$locationChangeSuccess', function(event, toState) {
                self.$mdDialog.cancel();
            });
        }
    }

    close() {
        this.$mdDialog.hide();
    }

    cancel() {
        this.$mdDialog.cancel();
    }

}
