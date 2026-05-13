(function () {
  const req = $request;

  console.log(`[force-effort-max] hit url=${req.url}`);
  console.log(`[force-effort-max] method=${req.method}`);

  if (req.method !== "POST") {
    console.log("[force-effort-max] skip: not POST");
    $done({});
    return;
  }

  let pathname = "";

  try {
    pathname = new URL(req.url).pathname;
  } catch (e) {
    console.log(`[force-effort-max] skip: bad url ${e}`);
    $done({});
    return;
  }

  if (!pathname.startsWith("/v1/messages")) {
    console.log(`[force-effort-max] skip: path=${pathname}`);
    $done({});
    return;
  }

  const headers = req.headers || {};
  const UserAgent = headers["User-Agent"] || headers["user-agent"] || "";
  if (!UserAgent.toLowerCase().includes("claude")) {
    console.log("[force-effort-max] skip: no calude user-agent");
    $done({});
    return;
  }
  
  const contentType = headers["Content-Type"] || headers["content-type"] || "";

  console.log(`[force-effort-max] content-type=${contentType}`);

  if (!String(contentType).toLowerCase().includes("application/json")) {
    console.log("[force-effort-max] skip: not json");
    $done({});
    return;
  }

  if (!req.body) {
    console.log("[force-effort-max] skip: empty body");
    $done({});
    return;
  }

  let data;

  try {
    data = JSON.parse(req.body);
  } catch (e) {
    console.log(`[force-effort-max] skip: json parse failed ${e}`);
    $done({});
    return;
  }

  const model = String(data.model || "")
    .trim()
    .toLowerCase();

  console.log(`[force-effort-max] model=${model}`);

  if (!model.endsWith("-xhigh")) {
    console.log("[force-effort-max] skip: model not xhigh");
    $done({});
    return;
  }

  data.model = model.replace(/-xhigh$/, "");
  console.log(`[force-effort-max] replace ${model} to ${data.model}`);

  if (
    !data.output_config ||
    typeof data.output_config !== "object" ||
    Array.isArray(data.output_config)
  ) {
    data.output_config = {};
  }

  const old = data.output_config.effort;

  if (old !== "max") {
    data.output_config.effort = "max";

    const body = JSON.stringify(data);

    console.log(
      `[force-effort-max] changed output_config.effort: ${JSON.stringify(old)} -> max`,
    );

    $done({
      body,
    });
    return;
  }

  console.log("[force-effort-max] already max");
  $done({});
})();
