var eventsApp = angular.module("eventsApp", ["googleAPI"]);
eventsApp.controller("EventsController", ['$scope', '$timeout', 'googleSpreadsheetWrapper', EventsController]);

function EventsController($scope, $timeout, googleSpreadsheetWrapper) {
  var SWITCH_DELAY = 1000;

  var _this = this;
  var currentEventIndex = 0;
  var getNextEvent = function() {
    if (currentEventIndex == $scope.events.length) {
      currentEventIndex = 0;
    }
    return $scope.events[currentEventIndex++];
  };

  this.setScopeEvents = function(events) {
    $scope.events = events;
    _this.changeCurrentEvent();
  };
  this.changeCurrentEvent = function() {
    $scope.currentEvent = getNextEvent();
    $timeout(_this.changeCurrentEvent, SWITCH_DELAY);
  };

  googleSpreadsheetWrapper.getNYEvents(this.setScopeEvents);
}
