define(["../model/stops", "../model/departures", "../view/details"],
function (stops, departures, view) {
    console.log("Details module loaded");

    // It allows us to navigate through the history without request it again
    var lastHash = "";

    // In case of the user back to the search view before the result has come
    var canceledFetch = false;

    // Callback executed when the AJAX finishes
    function successStops() {
        if (canceledFetch) {
            return;
        }
        var values = stops.getStops();
        view.renderStops(values);
        view.appendStops();
    }

    // Callback executed when the AJAX finishes
    function successDepartures() {
        if (canceledFetch) {
            return;
        }
        var values = departures.getDepartures();
        view.renderDepartures(values);
        view.appendDepartures();
    }

    // Loads details (stops and departures) fetching them by id
    function load(id) {
        console.log("[details] Load id: " + id);
        canceledFetch = false;
        stops.fetch(id, successStops);
        departures.fetch(id, successDepartures);
    }

    // When back button is pressed
    view.on("click", function () {
        canceledFetch = true;
        window.history.back();
    });

    function navigate() {
        var hash = location.hash;
        console.log("[details] Popstate: " + hash);

        // If is not the details view, it means that this hash is not
        // applicable here. So, clean the mess that you did! =P
        if (hash.indexOf("details") === -1) {
            canceledFetch = true;
            view.removeStops();
            view.removeDepartures();
            return;
        }
        var args = hash.split("&");
        var query = args[0];

        // Get query string to set the title
        var indexOfEqual = query.indexOf("=");
        var title = query.substring(indexOfEqual + 1, query.length);
        view.setTitle(title);

        // Get the details id
        var details = args[1];
        indexOfEqual = details.indexOf("=");
        var id = details.substring(indexOfEqual + 1, hash.length);

        // If last hash is the same, it's not necessary request it again.
        // Just show it!
        if (lastHash === hash) {
            view.appendStops();
            view.appendDepartures();
        } else {
            load(id);
        }
        // Save it!
        lastHash = hash;
    }

    // It allows the independent modules navigation of the single page app,
    // without browser refresh.
    window.addEventListener("popstate", navigate);

    // It guarantees the application initialization by any route
    navigate();
});
