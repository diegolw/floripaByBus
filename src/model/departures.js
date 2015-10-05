define(["../helper/connector"], function (connector) {

    // This module fetches the departures information

    var path = "findDeparturesByRouteId/run";
    var departures = [];

    function getDepartures() {
        return departures;
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
            departures = response.rows;
            callback();
        });
    }

    var model = {
        getDepartures: getDepartures,
        fetch: fetch
    };

    return model;
});
