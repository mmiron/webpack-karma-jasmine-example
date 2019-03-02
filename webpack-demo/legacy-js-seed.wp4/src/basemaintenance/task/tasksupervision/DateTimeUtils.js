export default class DateTimeUtils {

   /*
    * Converts the provided hours in decimal format into the string representation of the hours duration.
    * The duration has the following format hhh:MM (hhh = total hours, MM = minutes within the hour).
    * E.g. '100.5' => '100:30' or 100.5 => '100:30'
    */
   static decimalHoursToDuration(hours) {
      if ( typeof hours == 'string' && hours == '' ) {
         return '';
      }
      let decimalHours = Number(hours);
      if (isNaN(decimalHours)) {
         return undefined;
      }
      decimalHours = Math.abs(decimalHours);
      let minutes = Math.round(decimalHours * 60);
      let minute = minutes % 60;
      if( minute < 10 ) {
         minute = "0" + minute;
      }
      let hour = Math.floor( minutes / 60);
      let sign = (hours < 0) ? '-' : '';

      return sign + hour + ":" + minute;
   }

   /*
    * Converts the provided string representation of a duration into the string representation of decimal hours.
    * The duration may be in either of the following formats:
    *  - "hhh:mmm" = string containing total hours and total minutes
    *  - "decimal" - string representation of a decimal
    *  E.g. '100:30' -> '100.5'
    */
   static durationToHoursDecimal(durationStr) {
      if ( typeof durationStr != 'string' || durationStr === '' ) {
         return undefined;
      }
      let split = durationStr.split(/[.:]/);
      if (split.length > 2) {
         return undefined;
      }
      let totalHours = Number(split[0]);
      let totalMinutes = (split.length > 1) ? Number(split[1]) : 0;
      if (isNaN(totalHours) || isNaN(totalMinutes)) {
         return undefined;
      }
      let hours = totalHours + (totalMinutes / 60);
      return hours;
   }
}