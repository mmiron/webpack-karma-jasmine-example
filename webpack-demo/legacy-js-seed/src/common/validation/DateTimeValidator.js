export default class DateTimeValidator {

   constructor() {
   }

   
   static validateHours(value) {
      // This is based on the NUMBER(9,5) constraint for
      // sched_labour_role.sched_hr and sched_labour_role.actual_hr
      let split = value.split('.');
      if ( split.length > 0 ) {
         if ( split[0].length > 4 ) {
            return false;
         }
         if ( split.length == 2 ) {
            if ( split[1].length > 5 ) {
               return false;
            }
         } else if (split.length > 2 ) {
            return false;
         }
      }
      return true;
   }

  
   //
   // private methods
   //

   static validateDateFormat(dateStr) {
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

   static validateTimeFormat(timeStr) {
      if( ! timeStr ){
         throw new Error('timeStr is mandatory.');
      }
      if (typeof timeStr !== 'string')  {
         throw new Error('timeStr is not a string.');
      }

      // regex example: hh:mm
      const timeFormat = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;
      const matchArray = timeStr.match(timeFormat);

      if( matchArray == null ) {
          throw new Error('timeStr has invalid format.');
      }

      return true;
   }

}