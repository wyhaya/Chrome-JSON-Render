

'use strict'

const http = require('http')

const server = http.createServer(function (request, response) {

    let data = {
        code: 1100,
        data: {
            list: [15, 158, 3, 5, 7],
            data: {
                'menu': 'Hi~ Hi~ Hi~',
                'txt': 'hello'
            },
            page: 18,
            suc: true,
            nav: {
                hello: {
                    world: '1d5a4sds5'
                },
                key: 'This is a text'
            },
            obj: [],
            isload: false
        },
        msg: '请求成功'
    }

    for (let i = 0; i < 3; i++) {
        data.data.obj.push({
            number: Math.random(),
        })
    }

    response.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    })

    response.write(JSON.stringify(data))

    response.end()

})

server.listen(1234, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('listen is : 1234')
    }
})

