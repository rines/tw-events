function GoogleSpreadsheetWrapper() {
  var _this = this;

  this.getNYEvents = function(query) {
    query.setQuery('select * where B=\'NYC\'');
    query.send(_this.processQueryResponse);
  };

  this.processQueryResponse = function(response) {
    _this.filterByCloseDates(response.getDataTable());
  };

  this.filterByCloseDates = function(dataTable) {
    dataTable.getFilteredRows({column: 2, minValue: new Date(), maxValue: new Date()});
  };

  return this;
}
