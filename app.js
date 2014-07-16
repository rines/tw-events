var eventsApp = angular.module("eventsApp", []);
eventsApp.controller("EventsController", function($scope, $timeout) {
  $scope.events = "asdf";
  var query = new google.visualization.Query('https://spreadsheets.google.com/a/thoughtworks.com/tq?key=0AooMU9lnV1TodDRpanJjTXZfdm9TbWI0SmI4cV9qeVE');

  var today = function(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };

  query.setQuery('select * where B=\'NY\'');
  query.send(function(res) {
    var events = res.getDataTable();
    var i = 0;
    window.e = events;
    $scope.onTimeout = function() {
      if (i == events.getNumberOfRows()) {
        i = 0;
      }
      $scope.currentEvent = events.getValue(i++, 4);
      $scope.$apply();
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
  });

});

