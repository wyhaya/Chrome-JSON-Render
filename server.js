

require('http').createServer((req, res) => {

    let data = {
        code: 1100,
        data: {
            menu: {
                page: 18,
                desc: 'This is a menu',
                data: ['首页', '发现', '联系我们', '关于我们']
            },
            success: true,
            random: Math.random(),
            nav: {
                hello: {
                    world: '1d5a4sds5'
                },
                key: 'This is a text'
            },
            isload: false
        },
        time: Date.now(),
        message: '请求成功'
    }

    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    })

    res.write(JSON.stringify(data))

    res.end()

}).listen(1234)


