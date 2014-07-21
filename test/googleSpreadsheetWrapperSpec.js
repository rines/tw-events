describe("GoogleSpreadsheetWrapper", function() {
  var googleSpreadsheetWrapper;

  beforeEach(function() {
    googleSpreadsheetWrapper = new GoogleSpreadsheetWrapper();
  });

  it("gets spreadsheet data from TW Event Spreadsheet", function() {
    var SPREADSHEET_URL = 'https://spreadsheets.google.com/a/thoughtworks.com/tq?key=0AooMU9lnV1TodDRpanJjTXZfdm9TbWI0SmI4cV9qeVE';
    var query = {
      setQuery: function() {},
      send: function() {}
    };
    google.visualization = {Query: function(url) {
      return query;
    }};
    spyOn(query, "setQuery");
    spyOn(query, "send");
    spyOn(google.visualization, 'Query').andCallThrough();

    googleSpreadsheetWrapper.getNYEvents();

    expect(google.visualization.Query).toHaveBeenCalledWith(SPREADSHEET_URL);
    expect(query.setQuery).toHaveBeenCalledWith('select * where B=\'NYC\'');
    expect(query.send).toHaveBeenCalledWith(googleSpreadsheetWrapper.processQueryResponse);
  });

  it("filters the response's data table", function() {
    spyOn(googleSpreadsheetWrapper, "filterByCloseDates");
    var fakeResponse = {};
    var fakeDataTable = {};
    fakeResponse.getDataTable = jasmine.createSpy('getDataTable').andReturn(fakeDataTable);

    googleSpreadsheetWrapper.processQueryResponse(fakeResponse);

    expect(googleSpreadsheetWrapper.filterByCloseDates).toHaveBeenCalledWith(fakeDataTable);
  });

  it("filters the data table by specifying the start and end dates", function() {
    var fakeDataTable = {getFilteredRows: function() {}};
    spyOn(fakeDataTable, "getFilteredRows");

    googleSpreadsheetWrapper.filterByCloseDates(fakeDataTable);

    expect(fakeDataTable.getFilteredRows).toHaveBeenCalledWith({column: 2, minValue: jasmine.any(Date), maxValue: jasmine.any(Date)});
  });

  it("gets data from the dataTable and returns an event", function() {
    var fakeDataTable = {
      getFilteredRows: function() { return [0] },
      getValue: function(rowIndex, columnIndex) {
        return "value at " + rowIndex + ", " + columnIndex;
      }
    };

    var filteredEvents = googleSpreadsheetWrapper.filterByCloseDates(fakeDataTable);

    expect(filteredEvents[0].date).toEqual("value at 0, 2");
    expect(filteredEvents[0].time).toEqual("value at 0, 3");
    expect(filteredEvents[0].title).toEqual("value at 0, 4");
  });

  it("it passes events to callback upon successful retrieval and filtering", function() {
    var callback = jasmine.createSpy();
    var events = ["an event", "another event"];
    spyOn(googleSpreadsheetWrapper, 'filterByCloseDates').andReturn(events);

    googleSpreadsheetWrapper.getNYEvents(callback);
    googleSpreadsheetWrapper.processQueryResponse({getDataTable: function() {}});

    expect(callback).toHaveBeenCalledWith(events);
  });
});
