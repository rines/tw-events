var eventsApp = angular.module("eventsApp", ["googleAPI"]);
eventsApp.controller("EventsController", ['$scope', '$timeout', 'googleSpreadsheetWrapper', EventsController]);

function EventsController($scope, $timeout, googleSpreadsheetWrapper) {

  var SWITCH_DELAY = 4000;

  var _this = this;
  var currentEventIndex = 0;
  var getNextEvent = function() {
    if (currentEventIndex == $scope.events.length) {
      currentEventIndex = 0;
    }
    return $scope.events[currentEventIndex++];
  };
  var fromToday = function(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };

  $scope.minDate = fromToday(-1);
  $scope.maxDate = fromToday(5);

  this.setScopeEvents = function(events) {
    $scope.events = events;
    _this.changeCurrentEvent();
  };
  this.changeCurrentEvent = function() {
    $scope.currentEvent = getNextEvent();
    $timeout(_this.changeCurrentEvent, SWITCH_DELAY);
  };

  googleSpreadsheetWrapper.getNYEvents($scope.minDate, $scope.maxDate, this.setScopeEvents);
}
