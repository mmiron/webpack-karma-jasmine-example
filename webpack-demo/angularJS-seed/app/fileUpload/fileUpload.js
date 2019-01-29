'use strict';

/* global angular */
var app = angular.module('myApp');
app.controller('FileUploadCtrl', function($scope, Upload) {
    $scope.name = "fileUploadComponent";

    $scope.$watch('file', uploadHandler);

    function clearErrors() {
        console.log("clear errors");
    }

    function uploadHandler() {
        var file = $scope.file;
        if (!file) {
            return;
        }
        
        var displayEl = $("#display");

        clearErrors();
        
        Upload.upload({
            url: 'api/upload',
            file: file
        }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            displayEl[0].innerHTML = 'progress: ' + progressPercentage + '% ' + evt.config.file.name;
        }).success(function(data, status, headers, config) {
            displayEl[0].innerHTML = 'file ' + config.file.name + 'uploaded. Response: ' + data;
        }).error(function(data, status, headers, config) {
            displayEl[0].innerHTML = 'error status: ' + status;
        });
    };
});
