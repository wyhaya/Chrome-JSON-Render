

(() => {

    class Render {

        constructor(option) {
            this.render(option.el, option.data)
        }

        render(tagView, data) {

            let ul = this.createTag('ul', '')

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


    document.onreadystatechange = () => {

        const pre = document.querySelector('pre')

        if (document.readyState !== 'complete' || !pre) {
            return
        }
        
        if (pre.parentNode !== document.body || pre.innerHTML === '') {
            return
        }

        try {
            document.querySelector('body').innerHTML = `
                <div id='chrome_json_render'> 
                    <p>{</p> 
                    <div></div> 
                    <p>}</p>
                </div>
            `
            new Render({
                el: document.querySelector('#chrome_json_render div'),
                data: JSON.parse(pre.innerHTML)
            })

        } catch (eve) {
            return false
        }

    }

})()


