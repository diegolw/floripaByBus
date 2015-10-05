define([], function () {

    // API authentication
    var USERNAME = "WKD4N7YMA1uiM8V";
    var PASSWORD = "DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68";
    var URL = "https://api.appglu.com/v1/queries/";

    // I've created this new method called GET, because I understand that
    // thinking on RESTful, the more correct would be GET instead POST.
    // That's because the POST verb is most-often utilized to create new
    // resources. While GET method is used to read (or retrieve) a
    // representation of a resource.
    function get(path, data, success) {
        $.ajax({
            type: "POST",
            url: URL + path,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD),
                "X-AppGlu-Environment": "staging",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success: success
        });
    }

    var connector = {
        get: get
    };

    return connector;
});
