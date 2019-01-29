/** TESTING **/
/* global inject */
// describe('File Upload Component', function() {
//     var AppCtrl, scope, httpBackend;

//     beforeEach(module('myApp'));

//     beforeEach(inject(function($controller, $rootScope, $httpBackend) {

//         scope = $rootScope.$new();
//         httpBackend = $httpBackend;
//         AppCtrl = $controller('fileUpload', { $scope: scope });

//     }));

//     it('should send file to backend for processing', function() {
//         var mockFile = {
//             file: [
//                 { "name": "file.bin", "size": 1018, "type": "application/binary" }
//             ]
//         };
        
//         httpBackend.when(
//                 'POST',
//                 'http://localhost:3000/fileupload')
//             .respond(200, {
//                 config: {
//                     data: { file: { name: 'a name' } }
//                 },
//                 data: {}
//             });

//         scope.upload(mockFile);

//         httpBackend.flush();
//     });

// });

/* global expect */

'use strict';

import CustomFileUpload from './fileUpload.js';

describe('fileUpload Test', function() {
   
   console.log("name: ", CustomFileUpload.name());
   
   
   it("has a name", function() {
      expect(CustomFileUpload.name()).toBe("CustomFileUploadClass");
   });

   // it('test upload', function() {
   //    let customFileUpload = new CustomFileUpload();
   //    expect(customFileUpload.name()).toBe('CustomFileUploadClass');
   // });

});
