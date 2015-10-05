define(["../helper/connector"], function (connector) {

    // This module fetches the stops information

    var path = "findStopsByRouteId/run";
    var stops = [];

    function getStops() {
        return stops;
    }

    function fetch(id, callback) {
        var data = {
            "params": {
                "routeId": id
            }
        };
        connector.get(path, data, function (response) {
            // I do this assignment because I understand that only the model
            // has to know the property "rows". And allow its access through
            // an API to the consumer.
            stops = response.rows;
            callback();
        });
    }

    var model = {
        getStops: getStops,
        fetch: fetch
    };

    return model;
});
