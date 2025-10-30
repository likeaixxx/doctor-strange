
; (async () => {
    let headers = $response.headers;
    headers["X-Surge-Mock-Type"] = "surge modify reposne header"

    let content = $response.content
    console.log(content)

    $done({ headers });
})()
