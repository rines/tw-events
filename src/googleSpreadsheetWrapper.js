function GoogleSpreadsheetWrapper() {
  var _this = this;
  var callback;

  var fromToday = function(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };

  this.getNYEvents = function(callback) {
    this.callback = callback;
    var query = new google.visualization.Query('https://spreadsheets.google.com/a/thoughtworks.com/tq?key=0AooMU9lnV1TodDRpanJjTXZfdm9TbWI0SmI4cV9qeVE');
    query.setQuery('select * where B=\'NYC\'');
    query.send(_this.processQueryResponse);
  };

  this.processQueryResponse = function(response) {
    var events = _this.filterByCloseDates(response.getDataTable());
    this.callback && this.callback(events);
  };

  this.filterByCloseDates = function(dataTable) {
    var indices = dataTable.getFilteredRows({
      column: 2,
      minValue: fromToday(-1),
      maxValue: fromToday(6)
    });
    var filteredEvents = [];
    for (var i in indices) {
      var row = indices[i];
      filteredEvents.push({
        date: dataTable.getValue(row, 2),
        time: dataTable.getValue(row, 3),
        title: dataTable.getValue(row, 4)
      });
    }
    return filteredEvents;
  };

  return this;
}
