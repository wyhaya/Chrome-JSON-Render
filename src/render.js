

(() => {

    'use strict'

    class Render {

        constructor(obj) {
            this.render(obj.el, obj.data)
        }

        // get
        getJson(url, option = {}) {
            return fetch(url, option).then((res) => {
                return res.json()
            })
        }

        // renderHtml
        render(tagView, data) {

            var ul = this.createTag('ul', '')
            for (let x in data) {
                if (typeof data[x] != "object") {

                    ul.appendChild(
                        this.createTag('li',
                            this.createStrTag('key', x + ' ：') + this.createValTag(data[x])
                        )
                    )

                } else {

                    let li = this.createTag('li', this.createStrTag('key', x + ' ：'))
                    li = this.render(li, data[x])
                    ul.appendChild(li)

                }
            }
            tagView.appendChild(ul)
            return tagView
        }


        createTag(tagName, content) {
            let tag = document.createElement(tagName)
            tag.innerHTML = content
            return tag
        }


        createStrTag(className, content) {
            content = content || ''
            let str = '<span class="' + className + '">' + content + '</span>'
            return str
        }


        createValTag(val) {

            let className = ''

            switch (typeof val) {
                case 'string': {
                    className = 'string'
                    val = '"' + val + '"'
                    break
                }
                case 'boolean': {
                    val = val.toString()
                    className = 'boolean'
                    break
                }
                case 'number': {
                    className = 'number'
                }
            }

            return this.createStrTag(className, val)

        }

    }


    document.onreadystatechange = function () {

        document.readyState === 'complete' && renderHtml()

    }

    let renderHtml = function () {

        // JSON code
        const jsonStr = document.querySelector('pre') ? document.querySelector('pre').innerHTML : ''


        try {
            JSON.parse(jsonStr)
        } catch (eve) {
            return false
        }

        // html
        document.querySelector('body').innerHTML = `
            <div id='chrome_json_render'> 
                <p>{</p> 
                    <div></div> 
                <p>}</p>
            </div>
        `

        new Render({
            el: document.querySelector('#chrome_json_render div'),
            data: JSON.parse(jsonStr)
        })

    }

})()

