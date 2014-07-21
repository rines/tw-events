describe("Events Controller", function() {

  it("gets events from google spreadsheet wrapper", function() {
    var scope = {};
    var googleSpreadsheetWrapper = new GoogleSpreadsheetWrapper();
    spyOn(googleSpreadsheetWrapper, "getNYEvents");

    var eventsController = new EventsController(scope, function() {}, googleSpreadsheetWrapper);

    expect(googleSpreadsheetWrapper.getNYEvents).toHaveBeenCalledWith(eventsController.setScopeEvents);
  });

  it("sets a timeout to switch the current event on the scope", function() {
    var scope = {};
    var googleSpreadsheetWrapper = {
      getNYEvents: function(){}
    };
    var timeout = jasmine.createSpy();

    var eventsController = new EventsController(scope, timeout, googleSpreadsheetWrapper);

    expect(timeout).toHaveBeenCalledWith(eventsController.changeCurrentEvent, jasmine.any(Number));
  });
});
