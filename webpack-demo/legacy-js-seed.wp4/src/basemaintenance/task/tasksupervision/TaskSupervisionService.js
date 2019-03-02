import $ from 'jquery';

export default class TaskSupervisionService {

   constructor() {
      this.errorMsgPrefix = 'Error code =  ';
   }

   getCrewsForUser(userId) {

      if ( ! userId ) {
         throw new Error('userId is mandatory');
      }

      const crewListRestEndpoint = '/maintenix/rest/crews';
      const args = {'userId': userId};

      return new Promise((resolve, reject) => {
         $.ajax({
            url : crewListRestEndpoint,
            type: "GET",
            data: args,
            success: (crewResponseList, textStatus, jqXHR) => {
               resolve(crewResponseList);
            },
            error: (jqXHR, textStatus, errorThrown) => {
               let message = this.errorMsgPrefix + jqXHR.status;
               reject(message);
            }
         });
      });
   }

   getDefaultStartAndEndDates(userId){
      if ( ! userId ) {
         throw new Error('userId is mandatory');
      }
      const currentDateTimeRestEndpoint = '/maintenix/rest/datetime/getCurrent';
      const args = {'userId': userId};

      return new Promise((resolve, reject) => {
         $.ajax({
            url : currentDateTimeRestEndpoint,
            type: "GET",
            data: args,
            success: (response, textStatus, jqXHR) => {
               let defaultStart = new Date(
                     response.startYear,
                     response.startMonth - 1,
                     response.startDayOfMonth,
                     response.startHourInDay,
                     response.startMinute
               );
               let defaultEnd = new Date(
                     response.endYear,
                     response.endMonth - 1,
                     response.endDayOfMonth,
                     response.endHourInDay,
                     response.endMinute
               );

               let defaultStartEndValues = {};

               defaultStartEndValues.startDate = this.formatDate(defaultStart);
               defaultStartEndValues.startTime = this.formatTime(defaultStart);
               defaultStartEndValues.startTimeZone = response.startTimezone;
               try {
                  this.validateDateFormat(defaultStartEndValues.startDate);
               } catch (error) {
                  reject('default startDate failed validation: ' + error.message);
               }
               try {
                  this.validateTimeFormat(defaultStartEndValues.startTime);
               } catch (error) {
                  reject('default startTime failed validation: ' + error.message);
               }

               defaultStartEndValues.endDate = this.formatDate(defaultEnd);
               defaultStartEndValues.endTime = this.formatTime(defaultEnd);
               defaultStartEndValues.endTimeZone = response.endTimezone;
               try {
                  this.validateDateFormat(defaultStartEndValues.endDate);
               } catch (error) {
                  reject('default endDate failed validation: ' + error.message);
               }
               try {
                  this.validateTimeFormat(defaultStartEndValues.endTime);
               } catch (error) {
                  reject('default endTime failed validation: ' + error.message);
               }

               resolve(defaultStartEndValues);
            },
            error: (jqXHR, textStatus, errorThrown) => {
               let message = this.errorMsgPrefix + jqXHR.status;
               reject(message);
            }
         });
      });
   }

   performSearch(args, sucessHandler, failureHandler) {

      // The crewId is mandatory,
      // if not provided then an empty data set is returned to the success handler.
      if ( !args.crewId ) {
         sucessHandler([]);
         return;
      }

      let excludeComplete = ((args.showCompleteTasks == true) ? false : true);

      let searchData = {
         onlyWorkscoped: true,
         onlyContainingLabour: true,
         assignedToCrewId: args.crewId,
         minScheduledStartDateTime: args.startDateTime,
         maxScheduledStartDateTime: args.endDateTime,
         excludeCompleted: excludeComplete,

         taskKeyEncryptionName: args.taskKeyEncryptionName,
         workpackageKeyEncryptionName: args.workpackageKeyEncryptionName,
         workLocationKeyEncryptionName: args.workLocationKeyEncryptionName,
         aircraftKeyEncryptionName: args.aircraftKeyEncryptionName,
         labourKeyEncryptionName: args.labourKeyEncryptionName
      };
      let listCrewTaskLabourEndpoint = '/maintenix/rest/tasks';
      $.ajax({
         url : listCrewTaskLabourEndpoint,
         data: searchData,
         type: "GET",
         success: (response, textStatus, jqXHR) => {
            // The response is a json list of objects generated from:
            //    com.mxi.mx.web.rest.task.TasksResponse
            sucessHandler(response);
         },
         error: (jqXHR, textStatus, errorThrown) => {
            let message = this.errorMsgPrefix + jqXHR.status;
            failureHandler(message);
         }
      });
   }

   performJobStop(args, sucessHandler, failureHandler) {
      let data = { ids: args };
      let labourEndpoint = '/maintenix/rest/labour/stopByProxy';
      $.ajax({
         url : labourEndpoint,
         type: "PUT",
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: (response, textStatus, jqXHR) => {
            sucessHandler(response);
         },
         error: (jqXHR, textStatus, errorThrown) => {
            let message = 'Error code =  ' + jqXHR.status;
            failureHandler(message);
         }
      });
   }

   performUnassign(args, sucessHandler, failureHandler) {
      let data = { ids: args };
      let labourEndpoint = '/maintenix/rest/labour/unassign';
      $.ajax({
         url : labourEndpoint,
         type: "PUT",
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: (response, textStatus, jqXHR) => {
            sucessHandler(response);
         },
         error: (jqXHR, textStatus, errorThrown) => {
            let message = 'Error code =  ' + jqXHR.status;
            failureHandler(message);
         }
      });
   }

   updateScheduledHours(taskId, labourRowId, newValue) {
      let data = {
            scheduledHours: newValue
      };
      return new Promise((resolve, reject) => {
         $.ajax({
            url : '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: (jqXHR, textStatus, errorThrown) => {
               let message = this.errorMsgPrefix + jqXHR.status;
               reject(message);
            }
         });
      });
   }

   updateActualHours(taskId, labourRowId, newValue) {
      let data = {
            actualHours: newValue
      };
      return new Promise((resolve, reject) => {
         $.ajax({
            url : '/maintenix/rest/tasks/' + taskId + '/labours/' + labourRowId,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: (jqXHR, textStatus, errorThrown) => {
               let message = this.errorMsgPrefix + jqXHR.status;
               reject(message);
            }
         });
      });
   }

   //
   // private methods
   //

   validateDateFormat(dateStr) {
      if( ! dateStr ) {
         throw new Error('dateStr is mandatory.');
      }
      if (typeof dateStr !== 'string')  {
         throw new Error('dateStr is not a string');
      }

      // regex example: dd-MMM-yyyy
      const dateFormat = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/;
      const matchArray = dateStr.match(dateFormat);

      if( matchArray == null ) {
          throw new Error('dateStr has invalid format.');
      }

      return true;
  }

   validateTimeFormat(timeStr) {
      if ( ! timeStr ){
         throw new Error('timeStr is mandatory.');
      }
      if (typeof timeStr !== 'string')  {
         throw new Error('timeStr is not a string.');
      }

      // regex example: hh:mm
      const timeFormat = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
      const matchArray = timeStr.match(timeFormat);

      if (matchArray == null) {
          throw new Error('timeStr has invalid format.');
      }

      return true;
   }

   formatDate(date) {
      let str =
         ((date.getDate() < 10) ? '0' : '') + date.getDate() + '-' +
         this.getMonthShortStr(date.getMonth() + 1) + '-' +
         date.getFullYear();
      return str;
   }

   formatTime(date) {
      let str =
         ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' +
         ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes();
      return str;
   }

   getMonthShortStr(month) {
      if (month === 1) return 'JAN';
      if (month === 2) return 'FEB';
      if (month === 3) return 'MAR';
      if (month === 4) return 'APR';
      if (month === 5) return 'MAY';
      if (month === 6) return 'JUN';
      if (month === 7) return 'JUL';
      if (month === 8) return 'AUG';
      if (month === 9) return 'SEP';
      if (month === 10) return 'OCT';
      if (month === 11) return 'NOV';
      if (month === 12) return 'DEC';
      return "";
   }

}