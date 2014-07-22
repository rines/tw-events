var googleAPI = angular.module("googleAPI", []);
googleAPI.service('googleSpreadsheetWrapper', GoogleSpreadsheetWrapper);

function GoogleSpreadsheetWrapper() {
  var SPREADSHEET_URL = 'https://spreadsheets.google.com/a/thoughtworks.com/tq?key=0AooMU9lnV1TodDRpanJjTXZfdm9TbWI0SmI4cV9qeVE';
  var DATE_COLUMN = 2;
  var TIME_COLUMN = 3;
  var TITLE_COLUMN = 4;

  var _this = this;
  var callback;

  var fromToday = function(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };

  this.getNYEvents = function(callback) {
    this.callback = callback;
    var query = new google.visualization.Query(SPREADSHEET_URL);
    query.setQuery('select * where B=\'NYC\'');
    query.send(_this.processQueryResponse);
  };

  this.processQueryResponse = function(response) {
    var events = _this.filterByCloseDates(response.getDataTable());
    _this.callback && _this.callback(events);
  };

  this.filterByCloseDates = function(dataTable) {
    var indices = dataTable.getFilteredRows([{
      column: DATE_COLUMN,
      minValue: fromToday(-1),
      maxValue: fromToday(6)
    }]);
    var filteredEvents = [];
    for (var i in indices) {
      var row = indices[i];
      filteredEvents.push({
        date: dataTable.getValue(row, DATE_COLUMN),
        time: dataTable.getValue(row, TIME_COLUMN),
        title: dataTable.getValue(row, TITLE_COLUMN)
      });
    }
    return filteredEvents;
  };
}
