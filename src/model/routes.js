define(["../helper/connector"], function (connector) {

    // This module fetches the routes by the stop name

    var pathRoutes = "findRoutesByStopName/run";
    var routes = [];

    function getRoutes() {
        return routes;
    }

    function fetch(query, callback) {
        var data = {
            "params": {
                "stopName": "%" + query + "%"
            }
        };
        connector.get(pathRoutes, data, function (response) {
            // I do this assignment because I understand that only the model
            // has to know the property "rows". And allow its access through
            // an API to the consumer.
            routes = response.rows;
            callback();
        });
    }

    var model = {
        getRoutes: getRoutes,
        fetch: fetch
    };

    return model;
});
