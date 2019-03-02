/* global expect */
import DateTimeUtils from './DateTimeUtils';

describe('DateTimeUtils', function() {

   describe('.decimalHoursToDuration', function() {

      it('returns duration when hours is integer and fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(1.25) ).toEqual('1:15');
      });

      it('returns duration when hours is only integer', function() {
         expect( DateTimeUtils.decimalHoursToDuration(2) ).toEqual('2:00');
      });

      it('returns duration when hours is only fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(.5) ).toEqual('0:30');
      });

      it('returns duration when hours is zero integer and fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(0.75) ).toEqual('0:45');
      });

      it('returns duration when hours is integer and zero fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(3.0) ).toEqual('3:00');
      });

      it('returns duration when hours is zero integer and zero fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(0.0) ).toEqual('0:00');
      });

      it('returns duration when hours is only zero integer', function() {
         expect( DateTimeUtils.decimalHoursToDuration(0) ).toEqual('0:00');
      });

      it('returns duration when hours is the string representation of a decimal', function() {
         expect( DateTimeUtils.decimalHoursToDuration('4.5') ).toEqual('4:30');
      });

      it('returns duration when hours is the string representation of zero', function() {
         expect( DateTimeUtils.decimalHoursToDuration('0') ).toEqual('0:00');
      });

      it('returns duration when hours is negative integer and fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(-5.75) ).toEqual('-5:45');
      });

      it('returns duration when hours is only negative integer', function() {
         expect( DateTimeUtils.decimalHoursToDuration(-6) ).toEqual('-6:00');
      });

      it('returns duration when hours is only negative fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(-.5) ).toEqual('-0:30');
      });

      it('returns duration when hours is only zero integer and fractional', function() {
         expect( DateTimeUtils.decimalHoursToDuration(-0.75) ).toEqual('-0:45');
      });

      it('returns duration when minutes of duration is single digit', function() {
         expect( DateTimeUtils.decimalHoursToDuration(0.1) ).toEqual('0:06');
      });

      it('returns duration when minutes of duration includes seconds', function() {
         expect( DateTimeUtils.decimalHoursToDuration(1.33333) ).toEqual('1:20');
      });


      it('returns empty string when hours is an empty string', function() {
         expect( DateTimeUtils.decimalHoursToDuration('') ).toEqual('');
      });

      it('returns undefined when hours undefined', function() {
         expect( DateTimeUtils.decimalHoursToDuration(undefined) ).toEqual(undefined);
      });

      it('returns undefined when hours is a non-decimal string', function() {
         expect( DateTimeUtils.decimalHoursToDuration('hello') ).toEqual(undefined);
      });

      it('returns undefined when hours is a function', function() {
         expect( DateTimeUtils.decimalHoursToDuration( ()=>{} ) ).toEqual(undefined);
      });

   });

   describe('.durationToHoursDecimal', function() {

      it('returns decimal when duration is total hours and total minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100:150') ).toEqual(102.5);
      });

      it('returns decimal when duration is total hours and zero minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100:0') ).toEqual(100);
      });

      it('returns decimal when duration is only total hours and colon separator', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100:') ).toEqual(100);
      });

      it('returns decimal when duration is only total hours', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100') ).toEqual(100);
      });

      it('returns decimal when duration is only zero hours', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0') ).toEqual(0);
      });

      it('returns decimal when duration is only minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0:150') ).toEqual(2.5);
      });

      it('returns decimal when duration is zero minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0:0') ).toEqual(0);
      });

      it('returns decimal when duration is only separator', function() {
         expect( DateTimeUtils.durationToHoursDecimal(':') ).toEqual(0);
      });


      it('returns decimal when duration is string decimal', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100.150') ).toEqual(102.5);
      });

      it('returns decimal when duration is string decimal with zero hours and minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0.150') ).toEqual(2.5);
      });

      it('returns decimal when duration is string decimal with only minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('.150') ).toEqual(2.5);
      });

      it('returns decimal when duration is string decimal with hours and zero minutes', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100.0') ).toEqual(100);
      });

      it('returns decimal when duration is string decimal with hours and decimal separator', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100.') ).toEqual(100);
      });

      it('returns decimal when duration is string decimal with only hours', function() {
         expect( DateTimeUtils.durationToHoursDecimal('100') ).toEqual(100);
      });

      it('returns decimal when duration is string decimal with only separator', function() {
         expect( DateTimeUtils.durationToHoursDecimal('.') ).toEqual(0);
      });


      it('returns undefined when duration is empty string', function() {
         expect( DateTimeUtils.durationToHoursDecimal('') ).toEqual(undefined);
      });

      it('returns undefined when duration is undefined', function() {
         expect( DateTimeUtils.durationToHoursDecimal(undefined) ).toEqual(undefined);
      });

      it('returns undefined when duration is a function', function() {
         expect( DateTimeUtils.durationToHoursDecimal( ()=>{}) ).toEqual(undefined);
      });

      it('returns undefined when duration contains total hours with non-numeric', function() {
         expect( DateTimeUtils.durationToHoursDecimal('a:0') ).toEqual(undefined);
      });

      it('returns undefined when duration contains total minutes with non-numeric', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0:a') ).toEqual(undefined);
      });

      it('returns undefined when duration contains decimal hours with non-numeric', function() {
         expect( DateTimeUtils.durationToHoursDecimal('a.0') ).toEqual(undefined);
      });

      it('returns undefined when duration contains decimal minutes with non-numeric', function() {
         expect( DateTimeUtils.durationToHoursDecimal('0.a') ).toEqual(undefined);
      });

      it('returns undefined when duration is non-numeric', function() {
         expect( DateTimeUtils.durationToHoursDecimal('a') ).toEqual(undefined);
      });

      it('returns undefined when duration has multiple time separators', function() {
         expect( DateTimeUtils.durationToHoursDecimal('1:2:3') ).toEqual(undefined);
      });

      it('returns undefined when duration has multiple decimal separators', function() {
         expect( DateTimeUtils.durationToHoursDecimal('1.2.3') ).toEqual(undefined);
      });

      it('returns undefined when duration has multiple separators', function() {
         expect( DateTimeUtils.durationToHoursDecimal('1:2.3') ).toEqual(undefined);
      });

   });
});