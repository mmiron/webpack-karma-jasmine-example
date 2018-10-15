/* global DOCUMENT_API_URL, Blob */
import "./template.scss"

class ImportTaskDefnController {
    static get $inject() {
        return [`$log`, `$scope`, `$timeout`, `UserService`, `ToastService`, `$translate`, `moment`, `$q`, `$http`, `FileSaver`, `TaskDefinitionConstraintsService`, `TaskDefnConfigService`]
    }
    constructor($log, $scope, $timeout, Upload, UserService, ToastService, $translate, moment, $q, $http, FileSaver, TaskDefinitionConstraintsService, TaskDefnConfigService) {
        this.$log = $log
        this.$scope = $scope
        this.$timeout = $timeout
        this.$q = $q
        this.$http = $http
        this.FileSaver = FileSaver
        this.moment = moment
        this.UserService = UserService
        this.TaskDefinitionConstraintsService = TaskDefinitionConstraintsService
        this.taskDefnConfigService = TaskDefnConfigService
        this.ToastService = ToastService
        this.$translate = $translate

        this.$scope.loading = false
        this.$scope.file = null
        this.$scope.constraints_message = null
        this.$scope.errors = null

        this.$scope.$watch(`invalidFile`, () => {
            this.$log.info(`invalidFile`)
        })

        this.$scope.$watch(`dropFile`, () => {
            this.$scope.file = this.$scope.dropFile
            this.$scope.invalidFile = null
            this.$scope.errors = null
        })

        this.$scope.$watch(`selectFile`, () => {
            this.$scope.file = this.$scope.selectFile
            this.$scope.invalidFile = null
            this.$scope.errors = null
        })

        this.setTaskDefinitionConstraintsMessage()
    }

    setTaskDefinitionConstraintsMessage() {
        this.TaskDefinitionConstraintsService.getStats().then(rs => {
            this.$scope.constraints_message = this.$translate.instant(`upload_file.task_defn.constraints_info`, {
                record_count: rs.recordCount,
                file_name: `task-definition-constraints.xlsx`,
                update_date: rs.lastUpdateDt
            })
        }, err => {
            this.error = err
        })
    }

    cancelFile() {
        this.$scope.file = null
    }

    canShowUploadButton() {
        return $scope.file != null && $scope.file != ''
    }
    
    // start refactoring
    /**
     * if valid filename and no errors on filename object
     *  - Clear error content, enable loading indicator, 
     *  - attempt to upload filename
     *      - on success; log response, clear file info, clear errors and reload task dfn constraints message
     *      - on failure; log response, show error to user via toast service
     *      - always; disable loading
     **/
    upload(file) {
        let deferred = q.defer()
        if (file && !file.$error) {
            this.clearErrors();
            this.enableLoading();
            return this.TaskDefnConfigService.upload(file)
                .then(rs => {
                    this.$log.info(rs);

                    this.clearFile();
                    this.clearErrors(); // this.$scope.errors = rs.data.errors
                    this.setTaskDefinitionConstraintsMessage(); // setTaskDefinitionConstraintsMessage()
                    deferred.resolve();
                }).catch((err, errMsg) => {
                    this.$log.info(err);
                    this.ToastService.showError(errMsg, true);
                    deferred.reject();
                }).finally(() => {
                    this.disableLoading();
                });
        }

        return deferred.promise;
    }

    disableLoading() {
        this.$scope.loading = false;
    }

    enableLoading() {
        this.$scope.loading = true;
    }

    clearFile() {
        this.$scope.file = null;
    }

    clearErrors() {
        this.$scope.errors = null;
    }

    // end refactoring

    uploadNewFile(newFile) {
        this.$scope.file = newFile
        this.$scope.invalidFile = null
        this.$scope.errors = null
    }

    downloadTaskDefnConstraints() {
        return this.UserService.getCurrentUser().then(user => {
            let fileName = `task-definition-constraints-` + this.moment().format(`YYYY-MM-DD_HH-mm-ss`) + `.xlsx`
            let defered = this.$q.defer()
            let url = DOCUMENT_API_URL + `/api/documents/taskdefinition?userId=` + user.id
            let saver = this.FileSaver
            let xhr = new XMLHttpRequest()
            xhr.open(`GET`, url, true)
            xhr.setRequestHeader(`Content-type`, `application/json`)
            xhr.responseType = `blob`
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var contentType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
                        var blob = new Blob([xhr.response], { type: contentType })
                        saver.saveAs(blob, fileName)
                        defered.resolve(xhr.response)
                    }
                    else {
                        defered.reject(xhr.response)
                    }
                }
            }
            xhr.send()

            return defered.promise
        })
    }

    downloadTaskDefnConstraintsSimple() {
        return this.UserService.getCurrentUser().then(user => {
            let url = DOCUMENT_API_URL + `/api/documents/taskdefinition?userId=` + user.id
            window.open(url, `_blank`)
        })
    }
}

export const importTaskDefnConstraints = {
    template: require(`./template.html`),
    controller: ImportTaskDefnController,
    controllerAs: `importTaskDefnCtrl`
}