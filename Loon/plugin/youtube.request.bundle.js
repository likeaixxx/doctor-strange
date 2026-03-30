const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
async () => {
  // 创建空数据
  let body = {};
  if ($request.method == "GET") {
    // 主机判断
    if (url.hostname == "www.youtube.com" || url.hostname == "m.youtube.com") {
      // 路径判断
      if (url.pathname == "/api/timedtext") {
        url.searchParams.set("subtype", "Translate"); // 翻译字幕
      }
    }
  }
  $request.url = url.toString();
  Console.info(`$request.url: ${$request.url}`);
  done($request);
};