
    ; (async () => {

        let [{ region, status }] = await Promise.all([testDisneyPlus()])
        await Promise.all([check_youtube_premium(), check_netflix()])
            .then((result) => {
                console.log(result)
                let disney_result = ""
                if (status == STATUS_COMING) {
                    //console.log(1)
                    disney_result = "Disney+: 即将登陆~" + region.toUpperCase()
                } else if (status == STATUS_AVAILABLE) {
                    //console.log(2)
                    console.log(region)
                    disney_result = "Disney+: 已解锁，区域: " + region.toUpperCase()
                    // console.log(result["Disney"])
                } else if (status == STATUS_NOT_AVAILABLE) {
                    //console.log(3)
                    disney_result = "Disney+: 未支持 🚫 "
                } else if (status == STATUS_TIMEOUT) {
                    disney_result = "Disney+: 检测超时 🚦"
                }
                result.push(disney_result)
                console.log(result)
                let content = result.join('\n')
                console.log(content)

                panel_result['content'] = content
            })
            .finally(() => {
                $done(panel_result)
            })
    })()
