define(["text!../template/details.html"], function (html) {

    var body = document.body;

    // Load the HTML
    var template = document.createElement("body");
    template.innerHTML = html;

    // Itinerary
    var title = template.querySelector("h2");
    var streets = template.querySelector("#streets");
    var list = streets.querySelector("ul");
    var itemList = list.querySelector("span");

    // Timetable
    var timetable = template.querySelector("#timetable");
    var titleTime = timetable.querySelector("h2");
    var table = timetable.querySelector("table");
    var tbody = table.querySelector("tbody");

    // Back buttom
    var button = template.querySelector("button");

    function appendDepartures() {
        // Test before if the element is on DOM
        if (!body.querySelector("#timetable")) {
            body.appendChild(timetable);
        }
    }

    function appendStops() {
        // Test before if the element is on DOM
        if (!body.querySelector("#streets")) {
            body.insertBefore(streets, body.firstChild);
        }
    }

    function on(type, callback) {
        button.addEventListener(type, callback);
    }

    function weekday(departure, rows, fragment) {
        var tr = document.createElement("tr");
        createAppendTd(departure, tr);
        fragment.appendChild(tr);
    }

    function saturday(departure, rows, fragment, i) {
        var row = fragment.children[i - rows];
        createAppendTd(departure, row);
    }

    function sunday(departure, rows, fragment, i, cols) {
        var row = fragment.children[i - rows - cols];
        createAppendTd(departure, row);
    }

    function createAppendTd(departure, target) {
        var td = document.createElement("td");
        td.textContent = departure.time;
        target.appendChild(td);
    }

    function renderDepartures(departures) {
        // Clear the stops before
        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }
        // The same idea that "renderStops" method
        var fragment = document.createDocumentFragment();
        var rows = 0;
        var cols = 0;
        // Only one iteration is enough!
        for (var i = 0; i < departures.length; i++) {
            var departure = departures[i];
            if (departure.calendar === "WEEKDAY") {
                weekday(departure, rows, fragment);
                rows++;
            } else if (departure.calendar === "SATURDAY") {
                saturday(departure, rows, fragment, i);
                cols++;
            } else {
                sunday(departure, rows, fragment, i, cols);
            }
        }
        tbody.appendChild(fragment);
    }

    function renderStops(stops) {
        // Clear the stops before
        while (list.firstChild) {
            list.firstChild.remove();
        }
        // Use fragment to avoid touching the DOM on each iteration.
        // This prevents the browser reflow, improving the app performance.
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < stops.length; i++) {
            var stop = stops[i];
            var span = itemList.cloneNode(true);
            span.textContent = stop.name;
            fragment.appendChild(span);
        }
        // And now we may touch the DOM. Only once! =)
        list.appendChild(fragment);
    }

    function removeDepartures() {
        timetable.remove();
    }

    function removeStops() {
        streets.remove();
    }

    function setTitle(name) {
        title.textContent = "Routes for " + name;
    }

    var view = {
        appendDepartures: appendDepartures,
        appendStops: appendStops,
        on: on,
        removeDepartures: removeDepartures,
        removeStops: removeStops,
        renderDepartures: renderDepartures,
        renderStops: renderStops,
        setTitle: setTitle
    };

    return view;
});
