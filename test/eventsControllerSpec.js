describe("Events Controller", function() {

  it("gets events from google spreadsheet wrapper", function() {
    var scope = {};
    var googleSpreadsheetWrapper = jasmine.createSpyObj('GSW', ['getNYEvents']);
    var timeout = jasmine.createSpy();

    var eventsController = new EventsController(scope, timeout, googleSpreadsheetWrapper);

    expect(googleSpreadsheetWrapper.getNYEvents).toHaveBeenCalledWith(eventsController.setScopeEvents);
  });

  it("sets a timeout to switch the current event on the scope", function() {
    var scope = {};
    var googleSpreadsheetWrapper = jasmine.createSpyObj('GSW', ['getNYEvents']);
    var timeout = jasmine.createSpy();

    var eventsController = new EventsController(scope, timeout, googleSpreadsheetWrapper);

    expect(timeout).toHaveBeenCalledWith(eventsController.changeCurrentEvent, jasmine.any(Number));
  });
});
