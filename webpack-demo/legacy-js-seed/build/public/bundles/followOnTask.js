(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],[function(t,e){t.exports=jQuery},,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(t,i.key,i)}}return function(e,n,i){if(n)t(e.prototype,n);if(i)t(e,i);return e}}();var o=n(0);var a=r(o);function r(t){return t&&t.__esModule?t:{default:t}}function l(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var u=function(){function t(){l(this,t)}i(t,null,[{key:"sortTaskDefinitions",value:function t(e){if(!e||!(e instanceof Array)){throw new Error("taskDefinitions expected to be an Array")}return e.sort(function(t,e){var n=t.code>e.code?1:t.code<e.code?-1:0;if(n==0){n=t.configSlotCode>e.configSlotCode?1:t.configSlotCode<e.configSlotCode?-1:0}if(n==0){n=t.name>e.name?1:t.name<e.name?-1:0}return n})}},{key:"getFollowOnTaskDefinitions",value:function t(e){var n=this;return new Promise(function(t,i){return a.default.ajax({type:"GET",url:e,success:function e(i){var o=n.sortTaskDefinitions(i);t(o)},error:function e(n){t([])}})})}}]);return t}();e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});function i(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var o=function t(e){i(this,t);if(!e||!(e instanceof Array)){throw new Error("The response data suppose to be in array form")}this.data=e;this.name="followOnTaskDefnSearch";this.limit=50;this.minLength=1};e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(t,i.key,i)}}return function(e,n,i){if(n)t(e.prototype,n);if(i)t(e,i);return e}}();var o=n(0);var a=f(o);var r=n(5);var l=f(r);var u=n(4);var s=f(u);function f(t){return t&&t.__esModule?t:{default:t}}function c(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var d=function(){function t(e,n,i,o,r){c(this,t);var l=this;this.notFoundMsgEl=(0,a.default)("#"+i);this.okBtnEl=(0,a.default)("#"+n);this.typeAheadSearchInputEl=(0,a.default)("#"+e);this.followOnTaskDefnUuidOuputEl=(0,a.default)("#"+o);var u=(0,a.default)("#"+r);if(!this.notFoundMsgEl.length>0){throw new Error("Not found message element required")}if(!this.okBtnEl.length>0){throw new Error("Ok button element required")}if(!this.typeAheadSearchInputEl.length>0){throw new Error("Typeahead input element required")}if(!this.followOnTaskDefnUuidOuputEl.length>0){throw new Error("Output followOn task definition UUI input element required")}if(!u.length>0){throw new Error("REST api url element is required")}this.apiUrl=u.val();this.selectedOption="";this.typeAheadSearchInputEl.keydown(function(){setTimeout(function(){if(l.typeAheadSearchInputEl.val()!=l.selectedOption){l.disableOkBtn();l.clearSelectedTaskDefinition()}})});this.initialize=this.initialize.bind(this)}i(t,[{key:"setSelectedTaskDefinition",value:function t(e){if(e){this.typeAheadSearchInputEl.val(this.displayFollowOn(null,e));this.selectedOption=this.typeAheadSearchInputEl.val();this.followOnTaskDefnUuidOuputEl.attr("value",e.id)}}},{key:"clearSelectedTaskDefinition",value:function t(){this.followOnTaskDefnUuidOuputEl.attr("value","")}},{key:"initialize",value:function t(){var e=this;this.disableOkBtn();try{s.default.getFollowOnTaskDefinitions(this.apiUrl).then(function(t){return e.configureTypeAhead(t)});this.typeAheadSearchInputEl.focus()}catch(t){throw new Error("Error while trying to fetch task definitions.",t)}}},{key:"configureTypeAhead",value:function t(e){var n=this;var i=new l.default(e);a.default.typeahead({input:n.typeAheadSearchInputEl,highlight:true,name:i.name,limit:i.limit,minLength:i.minLength,display:["code","configSlotCode","name"],emptyTemplate:'<div class="mx-typeahead-msg-notfound">'+n.notFoundMsgEl.val()+"</div>",template:n.displayFollowOn,source:{data:i.data},callback:{onClick:function t(e,i,o,a){a.preventDefault();n.enableOkBtn();n.setSelectedTaskDefinition(o);this.hideLayout()}}})}},{key:"displayFollowOn",value:function t(e,n){if(n){return n.code+" - "+n.configSlotCode+" - "+n.name}}},{key:"enableOkBtn",value:function t(){if(this.okBtnEl){if(this.okBtnEl.attr("originOnClickEvent")){this.okBtnEl.attr("onclick",this.okBtnEl.attr("originOnClickEvent"))}if(this.okBtnEl.attr("originTitle")){this.okBtnEl.attr("title",this.okBtnEl.attr("originTitle"))}this.okBtnEl.removeClass("disabled");this.okBtnEl.removeAttr("disabled");this.okBtnEl.removeAttr("originOnClickEvent");this.okBtnEl.removeAttr("originTitle")}}},{key:"disableOkBtn",value:function t(){if(this.okBtnEl){if(!this.okBtnEl.attr("originOnClickEvent")){this.okBtnEl.attr("originOnClickEvent",this.okBtnEl.attr("onclick"))}if(!this.okBtnEl.attr("originTitle")){this.okBtnEl.attr("originTitle",this.okBtnEl.attr("title"))}this.okBtnEl.addClass("disabled");this.okBtnEl.attr("disabled","disabled");this.okBtnEl.attr("onclick",false);this.okBtnEl.attr("title","")}}}]);return t}();e.default=d},function(t,e,n){"use strict";var i=n(6);var o=a(i);function a(t){return t&&t.__esModule?t:{default:t}}var r=new o.default("idInputTypeaheadFollowOnTaskSearch","idButtonOk","idTypeaheadNotFoundMessage","idFieldFollowOnTaskDefnUuid","idfollowOnTaskDefinitionRestAPI");r.initialize()}],[[7,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZm9sbG93T25UYXNrL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mb2xsb3dPblRhc2svZm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9sbG93T25UYXNrL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mb2xsb3dPblRhc2svaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImpRdWVyeSIsIl9qcXVlcnkiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UiLCJ0YXNrRGVmaW5pdGlvbnMiLCJBcnJheSIsIkVycm9yIiwic29ydCIsImEiLCJiIiwiY29tcGFyZVJlc3VsdCIsImNvZGUiLCJjb25maWdTbG90Q29kZSIsIm5hbWUiLCJhcGlVcmwiLCJzY29wZSIsInRoaXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl9qcXVlcnkyIiwiZGVmYXVsdCIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsInRhc2tEZWZpbml0aW9uc1Jlc3BvbnNlIiwic29ydGVkVGFza0RlZmluaXRpb25zIiwiZXJyb3IiLCJlcnIiLCJGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29uZmlnIiwiZGF0YSIsIl9jbGFzc0NhbGxDaGVjayIsImxpbWl0IiwibWluTGVuZ3RoIiwiX2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWciLCJfZm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UiLCJGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciIsInR5cGVBaGVhZElkIiwib2tCdXR0b25JZCIsIm5vdEZvdW5kTXNnSWQiLCJmb2xsb3dPblRhc2tEZWZuVXVpZE91cHV0SWQiLCJhcGlVcmxJZCIsIm5vdEZvdW5kTXNnRWwiLCJva0J0bkVsIiwidHlwZUFoZWFkU2VhcmNoSW5wdXRFbCIsImZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbCIsImFwaVVybEVsIiwibGVuZ3RoIiwidmFsIiwic2VsZWN0ZWRPcHRpb24iLCJrZXlkb3duIiwic2V0VGltZW91dCIsImluaXRpYWxpemUiLCJiaW5kIiwic3VnZ2VzdGlvbiIsImRpc3BsYXlGb2xsb3dPbiIsImF0dHIiLCJpZCIsIl90aGlzIiwiZGlzYWJsZU9rQnRuIiwiY29uZmlndXJlVHlwZUFoZWFkIiwiZm9jdXMiLCJjb25maWciLCIkIiwiaW5wdXQiLCJoaWdobGlnaHQiLCJkaXNwbGF5IiwiZW1wdHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwic291cmNlIiwiY2FsbGJhY2siLCJvbkNsaWNrIiwidHlwZUFoZWFkSW5wdXRFbCIsInNlbGVjdGlvbkVsIiwic2VsZWN0ZWRSZWNvcmQiLCJldmVudCIsImhpZGVMYXlvdXQiLCJxdWVyeSIsInN1Z2dlc3Rpb25PYmoiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHIiLCJhZGRDbGFzcyIsIl9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciIsImNvbnRyb2xsZXIiXSwibWFwcGluZ3MiOiI2RUFBQUEsRUFBQUMsUUFBQUMsK1ZDQUEsSUFBQUMsRUFBQUMsRUFBQSxxS0FLcUJDLDBGQUVTQyxHQUN4QixJQUFJQSxLQUFzQkEsYUFBMUJDLE9BQTZELENBQzFELE1BQU0sSUFBQUMsTUFBTiwyQ0FHSCxPQUFPRixFQUFBRyxLQUFxQixTQUFBQyxFQUFBQyxHQUN6QixJQUFJQyxFQUFpQkYsT0FBU0MsRUFBVkUsS0FBQSxFQUEwQkgsT0FBU0MsRUFBVkUsTUFBQSxFQUE3QyxFQUVBLEdBQUlELEdBQUosRUFBd0IsQ0FDckJBLEVBQWlCRixpQkFBbUJDLEVBQXBCRyxlQUFBLEVBQThDSixpQkFBbUJDLEVBQXBCRyxnQkFBQSxFQUE3REYsRUFHSCxHQUFJQSxHQUFKLEVBQXdCLENBQ3JCQSxFQUFpQkYsT0FBU0MsRUFBVkksS0FBQSxFQUEwQkwsT0FBU0MsRUFBVkksTUFBQSxFQUF6Q0gsRUFFSCxPQUFBQSx5REFJNEJJLEdBQy9CLElBQUlDLEVBQUpDLEtBQ0EsT0FBTyxJQUFBQyxRQUFZLFNBQUFDLEVBQUFDLEdBQ2hCLE9BQU9DLEVBQUFDLFFBQUFDLE1BQ0pDLEtBRFcsTUFFWEMsSUFGV1YsRUFHWFcsUUFBUyxTQUFBQSxFQUFBQyxHQUVOLElBQUlDLEVBQXdCWixzQkFBNUJXLEdBQ0FSLE1BRUhVLE1BQU8sU0FBQUEsRUFBQUMsR0FFSlgscUNBbENNZix1TENEQTJCLEVBRWxCLFNBQUFBLEVBQUFDLEdBQWtCQyxFQUFBaEIsS0FBQWMsR0FDZixJQUFJQyxLQUFXQSxhQUFmMUIsT0FBdUMsQ0FDcEMsTUFBTSxJQUFBQyxNQUFOLGlEQUdIVSxLQUFBZSxPQUlBZixLQUFBSCxLQUFBLHlCQUdBRyxLQUFBaUIsTUFBQSxHQUdBakIsS0FBQWtCLFVBQUEsYUFqQmVKLHVWQ0pyQixJQUFBN0IsRUFBQUMsRUFBQSxjQUlBLElBQUFpQyxFQUFBakMsRUFBQSxjQUNBLElBQUFrQyxFQUFBbEMsRUFBQSxxS0FLcUJtQyxhQUVsQixTQUFBQSxFQUFBQyxFQUFBQyxFQUFBQyxFQUFBQyxFQUFBQyxHQUEyRlYsRUFBQWhCLEtBQUFxQixHQUN4RixJQUFJdEIsRUFBSkMsS0FDQUEsS0FBQTJCLGVBQXFCLEVBQUF2QixFQUFBQyxTQUFFLElBQXZCbUIsR0FDQXhCLEtBQUE0QixTQUFlLEVBQUF4QixFQUFBQyxTQUFFLElBQWpCa0IsR0FDQXZCLEtBQUE2Qix3QkFBOEIsRUFBQXpCLEVBQUFDLFNBQUUsSUFBaENpQixHQUNBdEIsS0FBQThCLDZCQUFtQyxFQUFBMUIsRUFBQUMsU0FBRSxJQUFyQ29CLEdBQ0EsSUFBSU0sR0FBVyxFQUFBM0IsRUFBQUMsU0FBRSxJQUFqQnFCLEdBRUEsSUFBSzFCLEtBQUEyQixjQUFESyxPQUFKLEVBQW9DLENBQ2pDLE1BQU0sSUFBQTFDLE1BQU4sc0NBR0gsSUFBS1UsS0FBQTRCLFFBQURJLE9BQUosRUFBOEIsQ0FDM0IsTUFBTSxJQUFBMUMsTUFBTiw4QkFHSCxJQUFLVSxLQUFBNkIsdUJBQURHLE9BQUosRUFBNkMsQ0FDMUMsTUFBTSxJQUFBMUMsTUFBTixvQ0FHSCxJQUFLVSxLQUFBOEIsNEJBQURFLE9BQUosRUFBa0QsQ0FDL0MsTUFBTSxJQUFBMUMsTUFBTiw4REFHSCxJQUFLeUMsRUFBREMsT0FBSixFQUEwQixDQUN2QixNQUFNLElBQUExQyxNQUFOLG9DQUdIVSxLQUFBRixPQUFjaUMsRUFBZEUsTUFDQWpDLEtBQUFrQyxlQUFBLEdBRUFsQyxLQUFBNkIsdUJBQUFNLFFBQW9DLFdBQ2pDQyxXQUNHLFdBQ0csR0FBSXJDLGdDQUFzQ0EsRUFBMUNtQyxlQUFnRSxDQUM3RG5DLGlCQUNBQSxxQ0FNWkMsS0FBQXFDLFdBQWtCckMsS0FBQXFDLFdBQUFDLEtBQWxCdEMsNkRBT3VCdUMsR0FDdkIsR0FBQUEsRUFBZ0IsQ0FDYnZDLEtBQUE2Qix1QkFBQUksSUFBZ0NqQyxLQUFBd0MsZ0JBQUEsS0FBaENELElBQ0F2QyxLQUFBa0MsZUFBc0JsQyxLQUFBNkIsdUJBQXRCSSxNQUNBakMsS0FBQThCLDRCQUFBVyxLQUFBLFFBQStDRixFQUEvQ0csNkRBUUgxQyxLQUFBOEIsNEJBQUFXLEtBQUEsbURBTVUsSUFBQUUsRUFBQTNDLEtBQ1ZBLEtBQUE0QyxlQUVBLElBQ0d6RCxxQ0FDR2EsS0FESGIsYUFDcUIsU0FBQUMsR0FBQSxPQUFxQnVELEVBQUFFLG1CQUFyQnpELEtBSXJCWSxLQUFBNkIsdUJBQUFpQixRQUVILE1BQUFsQyxHQUNHLE1BQU0sSUFBQXRCLE1BQUEsZ0RBQU5zQixpREFPYXhCLEdBQ2hCLElBQUlXLEVBQUpDLEtBQ0EsSUFBSStDLEVBQVMsSUFBSWpDLEVBQUpULFFBQWJqQixHQUNBNEQscUJBQ0dDLE1BQU9sRCxFQURFOEIsdUJBRVRxQixVQUZTLEtBR1RyRCxLQUFNa0QsRUFIR2xELEtBSVRvQixNQUFPOEIsRUFKRTlCLE1BS1RDLFVBQVc2QixFQUxGN0IsVUFNVGlDLFNBQVMsd0JBTkEsUUFPVEMsY0FBZSwwQ0FBNENyRCxnQkFBNUNrQyxNQVBOLFNBUVRvQixTQUFVdEQsRUFSRHlDLGdCQVNUYyxRQUNHdkMsS0FBTWdDLEVBQU9oQyxNQUVoQndDLFVBQ0dDLFFBQVMsU0FBQUEsRUFBQUMsRUFBQUMsRUFBQUMsRUFBQUMsR0FDTkEsbUJBQ0E3RCxnQkFHQUEsK0JBQ0FDLEtBQUE2RCwyREFRSUMsRUFBT0MsR0FDcEIsR0FBQUEsRUFBbUIsQ0FDaEIsT0FBT0EsYUFBNkJBLEVBQTdCQSxxQkFBb0VBLEVBQTNFbEUsOENBUUgsR0FBSUcsS0FBSjRCLFFBQWtCLENBQ2YsR0FBSTVCLEtBQUE0QixRQUFBYSxLQUFKLHNCQUE2QyxDQUMxQ3pDLEtBQUE0QixRQUFBYSxLQUFBLFVBQTZCekMsS0FBQTRCLFFBQUFhLEtBQTdCLHVCQUdILEdBQUl6QyxLQUFBNEIsUUFBQWEsS0FBSixlQUFzQyxDQUNuQ3pDLEtBQUE0QixRQUFBYSxLQUFBLFFBQTJCekMsS0FBQTRCLFFBQUFhLEtBQTNCLGdCQUdIekMsS0FBQTRCLFFBQUFvQyxZQUFBLFlBQ0FoRSxLQUFBNEIsUUFBQXFDLFdBQUEsWUFDQWpFLEtBQUE0QixRQUFBcUMsV0FBQSxzQkFDQWpFLEtBQUE0QixRQUFBcUMsV0FBQSx5REFRSCxHQUFJakUsS0FBSjRCLFFBQWtCLENBRWYsSUFBSzVCLEtBQUE0QixRQUFBYSxLQUFMLHNCQUE4QyxDQUMzQ3pDLEtBQUE0QixRQUFBYSxLQUFBLHFCQUF3Q3pDLEtBQUE0QixRQUFBYSxLQUF4QyxZQUdILElBQUt6QyxLQUFBNEIsUUFBQWEsS0FBTCxlQUF1QyxDQUNwQ3pDLEtBQUE0QixRQUFBYSxLQUFBLGNBQWlDekMsS0FBQTRCLFFBQUFhLEtBQWpDLFVBR0h6QyxLQUFBNEIsUUFBQXNDLFNBQUEsWUFDQWxFLEtBQUE0QixRQUFBYSxLQUFBLHVCQUNBekMsS0FBQTRCLFFBQUFhLEtBQUEsaUJBQ0F6QyxLQUFBNEIsUUFBQWEsS0FBQSx1Q0FqS1lwQixnQ0NWckIsSUFBQThDLEVBQUFqRixFQUFBLGlFQUVBLElBQUlrRixFQUNBLElBQUkvQyxFQUFKaEIsUUFBQSw2R0FESixtQ0FNQStEIiwiZmlsZSI6InB1YmxpYy9idW5kbGVzL2ZvbGxvd09uVGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG4vKipcclxuICogVGhlIHNlcnZpY2UgbGF5ZXIsIGl0IHNlbmRzIFJFU1QgQVBJIGNhbGwgYW5kIHBhc3MgdGhlIHJlc3BvbnNlIGRhdGEgdG8gY29udHJvbGxlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2Uge1xyXG5cclxuICAgc3RhdGljIHNvcnRUYXNrRGVmaW5pdGlvbnModGFza0RlZmluaXRpb25zKSB7XHJcbiAgICAgIGlmICghdGFza0RlZmluaXRpb25zIHx8ICEodGFza0RlZmluaXRpb25zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2tEZWZpbml0aW9ucyBleHBlY3RlZCB0byBiZSBhbiBBcnJheVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRhc2tEZWZpbml0aW9ucy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgbGV0IGNvbXBhcmVSZXN1bHQgPSAoYS5jb2RlID4gYi5jb2RlKSA/IDEgOiAoKGEuY29kZSA8IGIuY29kZSkgPyAtMSA6IDApO1xyXG5cclxuICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb21wYXJlUmVzdWx0ID0gKGEuY29uZmlnU2xvdENvZGUgPiBiLmNvbmZpZ1Nsb3RDb2RlKSA/IDEgOiAoKGEuY29uZmlnU2xvdENvZGUgPCBiLmNvbmZpZ1Nsb3RDb2RlKSA/IC0xIDogMCk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgY29tcGFyZVJlc3VsdCA9IChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYS5uYW1lIDwgYi5uYW1lKSA/IC0xIDogMCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIGNvbXBhcmVSZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICBzdGF0aWMgZ2V0Rm9sbG93T25UYXNrRGVmaW5pdGlvbnMoYXBpVXJsKSB7XHJcbiAgICAgIGxldCBzY29wZSA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYXBpVXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbih0YXNrRGVmaW5pdGlvbnNSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAvLyBuaWNlIHRvIGhhdmU6IHBvc3RQcm9jZXNzb3IgaG9va1xyXG4gICAgICAgICAgICAgICBsZXQgc29ydGVkVGFza0RlZmluaXRpb25zID0gc2NvcGUuc29ydFRhc2tEZWZpbml0aW9ucyh0YXNrRGVmaW5pdGlvbnNSZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgIHJlc29sdmUoc29ydGVkVGFza0RlZmluaXRpb25zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAvLyBpZiBlcnJvciBoYXBwZW5zIHdpdGggdGhlIEFQSSBjYWxsLCBpbml0aWFsaXplIHRoZSB3aWRnZXQgd2l0aCBhbiBlbXB0eSBhcnJheS5cclxuICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcblxyXG59XHJcbiIsIi8qIGdsb2JhbCAkICovXHJcbi8qKlxyXG4gKiBJdCBjb250YWlucyBhbGwgY29uZmlndXJhdGlvbnMgZm9yIHRoZSB0eXBlIGFoZWFkIHNlYXJjaCB3aWRnZXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcge1xyXG5cclxuICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICBpZiAoIWRhdGEgfHwgIShkYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSByZXNwb25zZSBkYXRhIHN1cHBvc2UgdG8gYmUgaW4gYXJyYXkgZm9ybVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0LlxyXG4gICAgICAvLyBUaGlzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGZpbHRlcmVkIHJlc3VsdCA8ZGl2Pi5cclxuICAgICAgdGhpcy5uYW1lID0gJ2ZvbGxvd09uVGFza0RlZm5TZWFyY2gnO1xyXG5cclxuICAgICAgLy8gVGhlIG1heCBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAgICB0aGlzLmxpbWl0ID0gNTA7XHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBjaGFyYWN0ZXIgbGVuZ3RoIG5lZWRlZCBiZWZvcmUgc3VnZ2VzdGlvbnMgc3RhcnQgZ2V0dGluZyByZW5kZXJlZC5cclxuICAgICAgdGhpcy5taW5MZW5ndGggPSAxO1xyXG4gICB9XHJcbn1cclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuLy8gaW1wb3J0IFR5cGVhaGVhZCBmcm9tIFwidHlwZWFoZWFkLmpzXCI7XHJcbi8vIGltcG9ydCBCbG9vZGhvdW5kIGZyb20gXCJibG9vZGhvdW5kLWpzXCI7XHJcblxyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbmZpZyBmcm9tICcuL2ZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcuanMnO1xyXG5pbXBvcnQgRm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaFNlcnZpY2UgZnJvbSAnLi9mb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoU2VydmljZS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyB1aSBpbnRlcmFjdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlciB7XHJcblxyXG4gICBjb25zdHJ1Y3Rvcih0eXBlQWhlYWRJZCwgb2tCdXR0b25JZCwgbm90Rm91bmRNc2dJZCwgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkLCBhcGlVcmxJZCkge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICB0aGlzLm5vdEZvdW5kTXNnRWwgPSAkKFwiI1wiICsgbm90Rm91bmRNc2dJZCk7XHJcbiAgICAgIHRoaXMub2tCdG5FbCA9ICQoJyMnICsgb2tCdXR0b25JZCk7XHJcbiAgICAgIHRoaXMudHlwZUFoZWFkU2VhcmNoSW5wdXRFbCA9ICQoJyMnICsgdHlwZUFoZWFkSWQpO1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbCA9ICQoJyMnICsgZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dElkKTtcclxuICAgICAgbGV0IGFwaVVybEVsID0gJChcIiNcIiArIGFwaVVybElkKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5ub3RGb3VuZE1zZ0VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGZvdW5kIG1lc3NhZ2UgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLm9rQnRuRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPayBidXR0b24gZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUeXBlYWhlYWQgaW5wdXQgZWxlbWVudCByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk91dHB1dCBmb2xsb3dPbiB0YXNrIGRlZmluaXRpb24gVVVJIGlucHV0IGVsZW1lbnQgcmVxdWlyZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXBpVXJsRWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSRVNUIGFwaSB1cmwgZWxlbWVudCBpcyByZXF1aXJlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hcGlVcmwgPSBhcGlVcmxFbC52YWwoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9ICcnO1xyXG5cclxuICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICBpZiAoc2NvcGUudHlwZUFoZWFkU2VhcmNoSW5wdXRFbC52YWwoKSAhPSBzY29wZS5zZWxlY3RlZE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICBzY29wZS5kaXNhYmxlT2tCdG4oKTtcclxuICAgICAgICAgICAgICAgICAgc2NvcGUuY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gYmluZCBzaWJsaW5nIG1ldGhvZHMgdG8gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSA9IHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldCB0aGUgaWQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIHRhc2sgZGVmaW5pdGlvbiB0byBvdXIgaHRtbCBpbnB1dCBlbGVtZW50XHJcbiAgICAqL1xyXG4gICBzZXRTZWxlY3RlZFRhc2tEZWZpbml0aW9uKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgaWYgKHN1Z2dlc3Rpb24pIHtcclxuICAgICAgICAgdGhpcy50eXBlQWhlYWRTZWFyY2hJbnB1dEVsLnZhbCh0aGlzLmRpc3BsYXlGb2xsb3dPbihudWxsLCBzdWdnZXN0aW9uKSk7XHJcbiAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwudmFsKCk7XHJcbiAgICAgICAgIHRoaXMuZm9sbG93T25UYXNrRGVmblV1aWRPdXB1dEVsLmF0dHIoJ3ZhbHVlJywgc3VnZ2VzdGlvbi5pZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGNsZWFyIGFueSBzZWxlY3RlZCB0YXNrIGRlZmluaXRpb24gdmFsdWUgaW4gb3VyIGh0bWwgaW5wdXQgZWxlbWVudFxyXG4gICAgKi9cclxuICAgY2xlYXJTZWxlY3RlZFRhc2tEZWZpbml0aW9uKCkge1xyXG4gICAgICB0aGlzLmZvbGxvd09uVGFza0RlZm5VdWlkT3VwdXRFbC5hdHRyKCd2YWx1ZScsICcnKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIHNldHVwIFVJIGVsZW1lbnRzLCBmZXRjaCB0YXNrIGRlZmluaXRpb25zIGFuZCBjb25maWd1cmUgdHlwZSBhaGVhZFxyXG4gICAgKi9cclxuICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlT2tCdG4oKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgIEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hTZXJ2aWNlLmdldEZvbGxvd09uVGFza0RlZmluaXRpb25zKFxyXG4gICAgICAgICAgICB0aGlzLmFwaVVybCkudGhlbigodGFza0RlZmluaXRpb25zKSA9PiB0aGlzLmNvbmZpZ3VyZVR5cGVBaGVhZCh0YXNrRGVmaW5pdGlvbnMpKTtcclxuXHJcbiAgICAgICAgIC8vIG9uY2UgdGhlIHR5cGVhaGVhZCBpbnB1dCBpcyBpbml0aWFsaXplZCwgdGhlIHR5cGUgZmllbGQgd2lsbCBsb3N0IGZvY3VzLCBoYXZlIHRvXHJcbiAgICAgICAgIC8vIG1hbnVhbGx5IGZvY3VzIGl0IGFnYWluLlxyXG4gICAgICAgICB0aGlzLnR5cGVBaGVhZFNlYXJjaElucHV0RWwuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRhc2sgZGVmaW5pdGlvbnMuXCIsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogY29uZmlndXJlIHR5cGUgYWhlYWQgd2l0aCBkYXRhIHNvdXJjZSBhbmQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxyXG4gICAgKi9cclxuICAgY29uZmlndXJlVHlwZUFoZWFkKHRhc2tEZWZpbml0aW9ucykge1xyXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzO1xyXG4gICAgICBsZXQgY29uZmlnID0gbmV3IEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb25maWcodGFza0RlZmluaXRpb25zKTtcclxuICAgICAgJC50eXBlYWhlYWQoe1xyXG4gICAgICAgICBpbnB1dDogc2NvcGUudHlwZUFoZWFkU2VhcmNoSW5wdXRFbCxcclxuICAgICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcclxuICAgICAgICAgbGltaXQ6IGNvbmZpZy5saW1pdCxcclxuICAgICAgICAgbWluTGVuZ3RoOiBjb25maWcubWluTGVuZ3RoLFxyXG4gICAgICAgICBkaXNwbGF5OiBbXCJjb2RlXCIsIFwiY29uZmlnU2xvdENvZGVcIiwgXCJuYW1lXCJdLFxyXG4gICAgICAgICBlbXB0eVRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm14LXR5cGVhaGVhZC1tc2ctbm90Zm91bmRcIj4nICsgc2NvcGUubm90Rm91bmRNc2dFbC52YWwoKSArICc8L2Rpdj4nLFxyXG4gICAgICAgICB0ZW1wbGF0ZTogc2NvcGUuZGlzcGxheUZvbGxvd09uLCAvLyBcIjxzcGFuPnt7Y29kZX19IC0ge3tjb25maWdTbG90Q29kZX19IC0ge3tuYW1lfX08L3NwYW4+XCJcclxuICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBjYWxsYmFjazoge1xyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbih0eXBlQWhlYWRJbnB1dEVsLCBzZWxlY3Rpb25FbCwgc2VsZWN0ZWRSZWNvcmQsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgIHNjb3BlLmVuYWJsZU9rQnRuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAvLyBzYXZlIHVzZXIgc2VsZWN0aW9uIGZyb20gdGhlIHNlYXJjaCByZXN1bHQuXHJcbiAgICAgICAgICAgICAgIHNjb3BlLnNldFNlbGVjdGVkVGFza0RlZmluaXRpb24oc2VsZWN0ZWRSZWNvcmQpO1xyXG4gICAgICAgICAgICAgICB0aGlzLmhpZGVMYXlvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgLy8gRGVmaW5lIGhvdyB0aGUgcmVzdWx0IGlzIGRpc3BsYXllZCBpbiB0aGUgZHJvcGRvd24uXHJcbiAgIC8vIEl0IHdpbGwgZGlzcGxheSB0aGUgcmVzdWx0IGluIHRoZSBmb3JtYXQgb2Y6IHRhc2sgY29kZSAtIGNvbmZpZ3Nsb3QgY29kZSAtIHRhc2sgbmFtZVxyXG4gICBkaXNwbGF5Rm9sbG93T24ocXVlcnksIHN1Z2dlc3Rpb25PYmopIHtcclxuICAgICAgaWYgKHN1Z2dlc3Rpb25PYmopIHtcclxuICAgICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25PYmouY29kZSArIFwiIC0gXCIgKyBzdWdnZXN0aW9uT2JqLmNvbmZpZ1Nsb3RDb2RlICsgXCIgLSBcIiArIHN1Z2dlc3Rpb25PYmoubmFtZTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogV3JhcHBlciB0byBlbmFibGUgb3VyIE9LIGJ1dHRvblxyXG4gICAgKi9cclxuICAgZW5hYmxlT2tCdG4oKSB7XHJcbiAgICAgIGlmICh0aGlzLm9rQnRuRWwpIHtcclxuICAgICAgICAgaWYgKHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5PbkNsaWNrRXZlbnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cignb25jbGljaycsIHRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5PbkNsaWNrRXZlbnQnKSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICh0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luVGl0bGUnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cigndGl0bGUnLCB0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luVGl0bGUnKSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5yZW1vdmVBdHRyKCdvcmlnaW5PbkNsaWNrRXZlbnQnKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLnJlbW92ZUF0dHIoJ29yaWdpblRpdGxlJyk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFdyYXBwZXIgdG8gZGlzYWJsZSBvdXIgT0sgYnV0dG9uXHJcbiAgICAqL1xyXG4gICBkaXNhYmxlT2tCdG4oKSB7XHJcbiAgICAgIGlmICh0aGlzLm9rQnRuRWwpIHtcclxuICAgICAgICAgLy8gc3RvcmUgdGhlIGJ1dHRvbiBvbmNsaWNrIGhhbmRsZXIgYW5kIHRpdGxlIGZvciBmdXR1cmUgcmVzdG9yZVxyXG4gICAgICAgICBpZiAoIXRoaXMub2tCdG5FbC5hdHRyKCdvcmlnaW5PbkNsaWNrRXZlbnQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cignb3JpZ2luT25DbGlja0V2ZW50JywgdGhpcy5va0J0bkVsLmF0dHIoJ29uY2xpY2snKSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICghdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpblRpdGxlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ29yaWdpblRpdGxlJywgdGhpcy5va0J0bkVsLmF0dHIoJ3RpdGxlJykpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB0aGlzLm9rQnRuRWwuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgIHRoaXMub2tCdG5FbC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICB0aGlzLm9rQnRuRWwuYXR0cignb25jbGljaycsIGZhbHNlKTtcclxuICAgICAgICAgdGhpcy5va0J0bkVsLmF0dHIoJ3RpdGxlJywgJycpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEZvbGxvd09uVGFza0RlZmluaXRpb25TZWFyY2hDb250cm9sbGVyIGZyb20gJy4vZm9sbG93T25UYXNrRGVmaW5pdGlvblNlYXJjaENvbnRyb2xsZXIuanMnO1xuXG5sZXQgY29udHJvbGxlciA9IFxuICAgIG5ldyBGb2xsb3dPblRhc2tEZWZpbml0aW9uU2VhcmNoQ29udHJvbGxlcignaWRJbnB1dFR5cGVhaGVhZEZvbGxvd09uVGFza1NlYXJjaCcsIFxuICAgICAgICAnaWRCdXR0b25PaycsIFxuICAgICAgICAnaWRUeXBlYWhlYWROb3RGb3VuZE1lc3NhZ2UnLFxuICAgICAgICAnaWRGaWVsZEZvbGxvd09uVGFza0RlZm5VdWlkJyxcbiAgICAgICAgJ2lkZm9sbG93T25UYXNrRGVmaW5pdGlvblJlc3RBUEknKTtcbmNvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==