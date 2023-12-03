async function img2obj(parameters, cb) {
    if (!pifuhd_api) {
        throw "pifuhd_api is not set";
    }

    // XXX: deep copy, recurse
    let transformInput = (obj) => {
        for (let prop in obj) {
            if (obj[prop] instanceof p5.Image) {
                obj[prop].loadPixels();
                obj[prop] = obj[prop].canvas.toDataURL();
            }
        }
    };
    transformInput(parameters);

    let options = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    options.body = JSON.stringify(parameters);

    let res;
    try {
        res = await fetch(pifuhd_api + "v1/img2obj", options);
    } catch (e) {
        console.error(
            "There was an error communicating to the PIFuHD API. Is it offline?"
        );
        console.error(pifuhd_api + "v1/img2obj");
    }

    let data;
    if (res && res.ok) {
        data = await res.json();
    } else if (res && !res.ok) {
        let message =
            "The PIFuHD API returned an error with response code " + res.status;
        try {
            let error = await res.json();
            if (error && error.detail) {
                message += ": " + error.detail;
            }
        } catch (e) { }
        console.error(message);
    }

    if (typeof cb == "function") {
        cb(data, parameters);
    }
    return data;
}
