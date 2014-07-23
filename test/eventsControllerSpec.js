describe("Events Controller", function() {
  var events;
  var eventsController;
  var scope;
  var googleSpreadsheetWrapper;
  var timeout;

  beforeEach(function() {
    events = ["Event 1", "Event 2"];
    scope = {};
    googleSpreadsheetWrapper = jasmine.createSpyObj('googleSpreadsheetWrapper ', ['getNYEvents']);
    timeout = jasmine.createSpy();

    eventsController = new EventsController(scope, timeout, googleSpreadsheetWrapper);
  });

  it("gets events from external google spreadsheet", function() {
    expect(googleSpreadsheetWrapper.getNYEvents).toHaveBeenCalledWith(jasmine.any(Date), jasmine.any(Date), eventsController.setScopeEvents);
  });

  it("assigns events from external google spreadsheet to events on the scope", function() {
    var events = ["an awesome event"];

    eventsController.setScopeEvents(events);

    expect(scope.events).toBe(events);
  });

  it("assigns first event to the current event on scope when events are set", function() {

    eventsController.setScopeEvents(events);

    expect(scope.currentEvent).toEqual("Event 1");
  });

  it("sets a recursive timeout that switches the current event on the scope", function() {
    spyOn(eventsController, 'changeCurrentEvent').andCallThrough();

    eventsController.setScopeEvents(events);

    expect(eventsController.changeCurrentEvent).toHaveBeenCalled();
    expect(timeout).toHaveBeenCalledWith(eventsController.changeCurrentEvent, jasmine.any(Number));
  });

  it("periodically switches the current event on the scope", function() {

    eventsController.setScopeEvents(events);
    eventsController.changeCurrentEvent();

    expect(timeout.callCount).toEqual(2);
    expect(scope.currentEvent).toEqual("Event 2");
  });

  it("switches the current event on the scope to the first event after switching to the last event", function() {

    eventsController.setScopeEvents(events);
    eventsController.changeCurrentEvent();
    eventsController.changeCurrentEvent();

    expect(timeout.callCount).toEqual(3);
    expect(scope.currentEvent).toEqual("Event 1");
  });

  it("provides an array of dates to be displayed", function() {
    scope.minDate = new Date("6/30/2014");
    scope.maxDate = new Date("7/6/2014");

    expect(scope.getDatesToDisplay()).toEqual([30, 1, 2, 3, 4, 5, 6]);
  });
});
