define(["text!../template/search.html"], function (html) {

    var body = document.body;

    // Load the HTML
    var template = document.createElement("body");
    template.innerHTML = html;

    // Search
    var search = template.querySelector("#search");
    var input = template.querySelector("input");
    var button = template.querySelector("button");

    // Routes
    var list = template.querySelector("#list");
    var title = list.querySelector("h2");
    var ul = list.querySelector("ul");
    var routeItem = ul.querySelector("a");
    var error = list.querySelector("h4");

    // Map
    var mapSpan = template.querySelector(".mapSpan");
    var map = template.querySelector("#map");

    function appendMap() {
        body.appendChild(map);
    }

    function appendSearch() {
        // Test before if the element is on DOM
        if (!document.querySelector("#search")) {
            body.appendChild(search);
        }
    }

    // Append list on DOM
    function appendRoutes() {
        // Test before if the element is on DOM
        if (!document.querySelector("#list")) {
            body.appendChild(list);
        }
    }

    function getMapId() {
        return map.id;
    }

    function getQuery() {
        return input.value;
    }

    function onForm(type, callback) {
        if (type === "click") {
            button.addEventListener(type, callback);
        } else if (type === "keydown") {
            input.addEventListener(type, callback);
        }
    }

    function onMap(callback) {
        mapSpan.addEventListener("click", callback);
    }

    function onRoutes(type, callback) {
        list.addEventListener(type, callback);
    }

    function removeMap() {
        map.remove();
    }

    function removeRoutes() {
        list.remove();
    }

    function removeSearch() {
        search.remove();
    }

    function renderRoutes(routes, query) {
        // Clear the stops before
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        if (!routes.length) {
            list.insertBefore(error, ul);
        } else {
            error.remove();
        }
        // Use fragment to avoid touching the DOM on each iteration.
        // This prevents the browser reflow, improving the app performance.
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var a = routeItem.cloneNode(true);
            a.textContent = route.shortName + " | " + route.longName;
            a.href = "#query=" + query + "&details=" + route.id;
            fragment.appendChild(a);
        }
        ul.appendChild(fragment);
    }

    function setInput(text) {
        input.value = text;
    }

    function setTitle(text) {
        title.textContent = "Routes for " + text;
    }

    var view = {
        appendMap: appendMap,
        appendRoutes: appendRoutes,
        appendSearch: appendSearch,
        getMapId: getMapId,
        getQuery: getQuery,
        onForm: onForm,
        onMap: onMap,
        onRoutes: onRoutes,
        removeMap: removeMap,
        removeRoutes: removeRoutes,
        removeSearch: removeSearch,
        renderRoutes: renderRoutes,
        setInput: setInput,
        setTitle: setTitle
    };

    return view;
});
