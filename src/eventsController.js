var eventsApp = angular.module("eventsApp", []);
eventsApp.controller("EventsController", ['$scope', '$timeout', EventsController]);

function EventsController($scope, $timeout, googleSpreadsheetWrapper) {
  this.setScopeEvents = function(events) {
    $scope.events = events;
  };
  this.changeCurrentEvent = function() {};

  googleSpreadsheetWrapper.getNYEvents(this.setScopeEvents);

  $timeout(this.changeCurrentEvent, 0)
}

  /*
  getNYEvents();

  function getNYEvents() {
    var query = new google.visualization.Query('https://spreadsheets.google.com/a/thoughtworks.com/tq?key=0AooMU9lnV1TodDRpanJjTXZfdm9TbWI0SmI4cV9qeVE');
    var today = function(offset) {
      var date = new Date();
      date.setDate(date.getDate() + offset);
      return date;
    };
    query.setQuery('select * where B=\'NY\'');
    query.send(processNYEvents);
  };

  function processNYEvents(res) {
    var today = function(offset) {
       var date = new Date();
       date.setDate(date.getDate() + offset);
       return date;
    }
    var events = res.getDataTable();
    var filteredEvents = filterEvents(events, today(-1), today(6));
    window.events = events;
    window.filteredEvents = filteredEvents;

    var i = 0;
    $scope.onTimeout = function() {
      if (i == filteredEvents.length) {
        i = 0;
      }
      $scope.currentEvent = filteredEvents[i++];
      $scope.$apply();
      $timeout($scope.onTimeout,1000);
    }

    $timeout($scope.onTimeout,1000);

  }

  function filterEvents(events, startDate, endDate) {
    var eventIndices = events.getFilteredRows([{column: 2, minValue: startDate, maxValue: endDate}]);
    var eventRows = [];
    console.log('indices: ' + eventIndices);

    var rowToEvent = function(events, rowIndex) {
      event = {};
      event.date = events.getValue(rowIndex, 2);
      event.time = events.getValue(rowIndex, 3);
      event.title = events.getValue(rowIndex, 4);
      event.link = events.getValue(rowIndex, 5);
      return event;
    }

    for (var i = 0; i < eventIndices.length; i++) {
      eventRows.push(rowToEvent(events, eventIndices[i]));
    }
    return eventRows;
  }
 */
