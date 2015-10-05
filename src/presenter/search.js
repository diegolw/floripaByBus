define(["../model/routes", "../view/search"], function (routes, view) {
    console.log("Search module loaded");

    // It allows us to navigate through the history without request it again.
    // As this variable is utilized by details and search presenters, this value
    // could be exported to a helper. In case of the application get bigger,
    // we could utilize its module to others presenters.
    var lastHash = "";

    var showingMap = false;

    function submitForm() {
        var query = view.getQuery();
        // Formats the street in a way that the API understands
        if (showingMap) {
            var splitted = query.split(".");
            var size = splitted.length;
            query = splitted[size - 1];
            // Takes the opportunity to remove the map
            toggleMap();
        }
        lastHash = "#query=" + query;
        window.history.pushState(null, "Search", lastHash);
        search(query);
    }

    function enterHandler(event) {
        if (event.which == 13 || event.keyCode == 13) {
            submitForm();
        }
    }

    view.onForm("click", submitForm);
    view.onForm("keydown", enterHandler);

    // Callback executed when the AJAX finishes
    function success(query) {
        view.setTitle(query);
        var values = routes.getRoutes();
        view.renderRoutes(values, query);
        view.appendRoutes();
    }

    function search(query) {
        console.log("[search] Query: " + query);
        routes.fetch(query, success.bind(this, query));
    }

    // It allows the client to access the search results using only the
    // browser address bar
    function navigate(event) {
        var hash = location.hash;
        console.log("[search] Popstate: " + hash);

        // If there's no hash, it means you are on the home screen
        if (!hash) {
            view.appendSearch();
            view.removeRoutes();
            return;
        }
        // If there's more than one argument, it means that this hash is not
        // applicable here. Clean the mess that you did! =P
        if (hash.split("&").length > 1) {
            view.removeSearch();
            view.removeRoutes();
            return;
        }
        // Get query string
        var indexOfEqual = location.hash.indexOf("=");
        var query = hash.substring(indexOfEqual + 1, hash.length);

        // Tell him what he is looking for
        view.setTitle(query);
        view.appendSearch();

        // If last hash is the same, it's not necessary request it again.
        // Just show it!
        if (lastHash === hash) {
            view.appendRoutes();
        } else {
            search(query);
        }
        // Save it!
        lastHash = hash;
    }

    function applyAddress(component, mapId) {
        var loc = $(component).locationpicker(mapId).location;
        var address = loc.addressComponents;
        view.setInput(address.addressLine1);
    }

    function toggleMap() {
        if (showingMap) {
            view.removeMap();
            showingMap = false;
            return;
        }
        view.removeRoutes();
        view.appendMap();

        // Location picker stuffs
        var mapId = view.getMapId();
        $("#" + mapId).locationpicker({
            // ArcTouch Floripa location
            location: {latitude: -27.596, longitude: -48.521},
            radius: 300,
            onchanged: function () {
                applyAddress(this, mapId);
            },
            oninitialized: function (component) {
                applyAddress(component, mapId);
            }
        });
        showingMap = true;
    }

    // It triggered when the map icon is pressed
    view.onMap(toggleMap);

    // It allows the independent modules navigation of the single page app,
    // without browser refresh.
    window.addEventListener("popstate", navigate);

    // It guarantees the application initialization by any route
    navigate();
});
