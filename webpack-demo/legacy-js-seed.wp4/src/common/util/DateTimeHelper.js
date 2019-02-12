export default class DateTimeHelper {

   constructor() {}

   static addHours(date, hours) {
      return new Date(date.getTime() + (hours * 60 * 60 * 1000));
   }

   static formatDate(date) {
      let str =
         ((date.getDate() < 10) ? '0' : '') + date.getDate() + '-' +
         this.getMonthShortStr(date.getMonth() + 1) + '-' +
         date.getFullYear();
      return str;
   }

   static formatTime(date) {
      let str =
         ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' +
         ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes();
      return str;
   }

   // Converts a time in the format hh:mm into its corresponding decimal value
   static convertTimeToDecimal(time) {
      let hoursMinutes = time.split(/[.:]/);
      let hours = parseInt(hoursMinutes[0], 10);
      let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
   }

   static getMonthShortStr(month) {
      if (month === 1) return 'JAN';
      else if (month === 2) return 'FEB';
      else if (month === 3) return 'MAR';
      else if (month === 4) return 'APR';
      else if (month === 5) return 'MAY';
      else if (month === 6) return 'JUN';
      else if (month === 7) return 'JUL';
      else if (month === 8) return 'AUG';
      else if (month === 9) return 'SEP';
      else if (month === 10) return 'OCT';
      else if (month === 11) return 'NOV';
      else if (month === 12) return 'DEC';
      else return "";
   }

}
