define(function(require) {
    var Vue = require('vue')
    require('css!cssroot/app/page')

    return Vue.extend({
        props: {
            prefix: {
                type: String,
                required: true,
            },
            num: {
                type: Number,
                require: true,
            },
            page: {
                type: Object,
                required: true,
                validator: function(page) {
                    if (page.title && page.content) {
                        if (!page.title instanceof String) {
                            return false
                        }
                        if (!page.content instanceof Array) {
                            return false
                        }
                        if (page.content.length == 0) {
                            return false
                        }

                        return true
                    }
                    return false
                }
            }
        },
        computed: {
            cssId: function() {
                return '#' + this.prefix + '-' + this.num
            }
        },
        template: `
        <div id="{{ prefix }}-{{ num }}" class="{{ prefix }}">
            <div class="chapter">
                    <div class="title">{{ page.title }}</div>
                    <div class="content">
                        <p v-for="line in page.content">{{ line }}</p>
                    </div>
            </div>
        </div>
        `,
    })
})
