describe("GoogleSpreadsheetWrapper", function() {

  it("gets spreadsheet data from TW Event Spreadsheet", function() {
    var googleSpreadsheetWrapper = new GoogleSpreadsheetWrapper();
    var query = jasmine.createSpyObj('query', ['setQuery', 'send']);

    googleSpreadsheetWrapper.getNYEvents(query);

    expect(query.setQuery).toHaveBeenCalledWith('select * where B=\'NYC\'');
    expect(query.send).toHaveBeenCalledWith(googleSpreadsheetWrapper.processQueryResponse);
  });

  it("filters the response's data table", function() {
    var googleSpreadsheetWrapper = new GoogleSpreadsheetWrapper();
    spyOn(googleSpreadsheetWrapper, "filterByCloseDates");
    var fakeResponse = {};
    var fakeDataTable = {};
    fakeResponse.getDataTable = jasmine.createSpy('getDataTable').andReturn(fakeDataTable);

    googleSpreadsheetWrapper.processQueryResponse(fakeResponse);

    expect(googleSpreadsheetWrapper.filterByCloseDates).toHaveBeenCalledWith(fakeDataTable);
  });

  it("filters the data table by specifying the start and end dates", function() {
    google.load("visualization", "1");
    waitsFor(function() {
      return google.visualization !== undefined;
    });
    console.log(google.visualization.Query);

    var googleSpreadsheetWrapper = new GoogleSpreadsheetWrapper();
    var fakeDataTable = new google.visualization.DataTable();
    spyOn(fakeDataTable, "getFilteredRows");

    googleSpreadsheetWrapper.filterByCloseDates(fakeDataTable);

    expect(fakeDataTable.getFilteredRows).toHaveBeenCalledWith({column: 2, minValue: jasmine.any(Date), maxValue: jasmine.any(Date)});
  });

});
