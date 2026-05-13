/*
Force output_config.effort=max for models ending with -xhigh
Surge MITM script
*/

(function () {
    const req = $request;

    if (req.method !== "POST") {
        $done({});
        return;
    }

    const url = req.url || "";
    let path = "";

    try {
        path = new URL(url).pathname;
    } catch (_) {
        $done({});
        return;
    }

    if (!path.startsWith("/v1/messages")) {
        $done({});
        return;
    }

    const headers = req.headers || {};
    const contentType =
        headers["Content-Type"] ||
        headers["content-type"] ||
        "";

    if (!String(contentType).toLowerCase().includes("application/json")) {
        $done({});
        return;
    }

    if (!req.body) {
        $done({});
        return;
    }

    let data;

    try {
        data = JSON.parse(req.body);
    } catch (_) {
        $done({});
        return;
    }

    const model = String(data.model || "").trim().toLowerCase();

    if (!model.endsWith("-xhigh")) {
        $done({});
        return;
    }

    if (!data.output_config || typeof data.output_config !== "object" || Array.isArray(data.output_config)) {
        data.output_config = {};
    }

    const old = data.output_config.effort;

    if (old !== "max") {
        data.output_config.effort = "max";

        console.log(`forced output_config.effort=max for model=${model}, old=${JSON.stringify(old)}`);

        $done({
            body: JSON.stringify(data)
        });
        return;
    }

    $done({});
})();
