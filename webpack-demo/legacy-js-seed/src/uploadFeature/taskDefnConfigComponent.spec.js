"use strict"

import 'jasmine-ajax'
import 'angular'
import 'angular-mocks'
import '../../../index'

// describe ("test", function() {
//     it("should pass", function() {
//         expect(true == true);        docker 
//     })
// });


describe(`Controller: ImportTaskDefnController`, () => {
    let $componentController, controller, scope, q, $http, $httpBackend

    beforeEach(() => {
        angular.mock.module(`app`)
    })

    beforeEach(inject((_$rootScope_, _$q_) => {
        scope = _$rootScope_.$new()
        q = _$q_

    }))

    beforeEach(inject($injector => {
        $componentController = $injector.get(`$componentController`)
        controller = $componentController(`importTaskDefnConstraints`)

        //spyOn(controller.TaskDefinitionConstraint
        // const urlbase=`$$http://staging.line.maintenix.aero/api`
        $http = $injector.get(`$http`)
        $httpBackend = $injector.get(`$httpBackend`)
        // $httpBackend.when(`GET`,urlbase+`/tasks/taskdefinition/constraints/stats`).respond(200)
        // $httpBackend.when(`GET`,urlbase+`/documents/taskdefinition`).respond(200)
        // scope.selectFile = { name: `file.xlsx`, date: `` }
        // scope.$digest()
    }))



    it(`should cancel upload files`, () => {
        //controller.$scope.file= `test.xlsx`
        //expect(controller.$scope.file).toBe(`test.xlsx`)

        controller.cancelFile()
        expect(controller.$scope.file).toBe(null)
    })

    it(`should upload new files`, () => {
        //controller.$scope.file= `test.xlsx`
        //expect(controller.$scope.file).toBe(`test.xlsx`)
        let newFile = `testFile`
        controller.uploadNewFile(newFile)
        expect(controller.$scope.file).toBe(newFile)
        expect(controller.$scope.invalidFile).toBe(null)
    })

    it(`should upload files`, () => {

        // controller.$scope = { 
        //     fileName : {
        //         name : `back`,
        //         $error : null
        //     }, 
        //     loading : false
        // }

        // let file = { name: `back`, $error: null }
        let mockFile = {
            data: `asas`,
            method: `POST`,
            url: `http://localhost/someResource/upload`,
            file: [
                { name: `File 1`, body: `abcd121212` }
            ]
        }
        //spyOn(controller, `upload`)
        // spyOn(controller, `upload`).and.callFake(() =>{
        //     let deferred = q.defer()
        //     deferred.resolve(controller.$scope)
        //     return deferred.promise
        // },
        // controller.upload().then(()=>{
        // expect(controller.setTaskDefinitionConstraintsMessage).toHaveBeenCalled()
        // done()
        // }))
        //let file = `upload.xlsx`
        spyOn(controller, `upload`)
        spyOn(controller, `setTaskDefinitionConstraintsMessage`)
        //let fileName = ``
        // controller.upload(file)
        // expect(controller.setTaskDefinitionConstraintsMessage).toHaveBeenCalled()
        // //})
        jasmine.Ajax.install()
        spyOn($, `ajax`).and.callFake(function (e) {
            return e.success()
        })

        //$httpBackend.when(mockFile.method, mockFile.url).respond(200)

        controller.upload(mockFile).then(() => {
            expect(controller.setTaskDefinitionConstraintsMessage).toHaveBeenCalled()
            done()
        }).catch((err, errMsg) => {
            expect(true != false)
        })

        jasmine.Ajax.uninstall()

    })


    it(`should set TaskDefinitionConstraintsMessage`, () => {

        expect(controller.TaskDefinitionConstraintsService).toBeDefined()

        let data = {
            record_count: 5,
            file_name: `task-definition-constraints.xlsx`,
            update_date: `1001`
        }
        spyOn(controller.$scope, `constraints_message`).and.callFake(() =>{
            let deferred = q.defer()
            deferred.resolve(data)
            return deferred.promise
        },
        controller.setTaskDefinitionConstraintsMessage().then(() => {
            expect(controller.$scope.constraints_message.record_count).toBe(5)
            done()
        }))
    })



})