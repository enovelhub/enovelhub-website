define(function(require) {
    require('css!cssroot/app/page')
    var Vue = require('vue')

    return Vue.extend({
        props: {
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
            prefix: function() {
                return this.$root.appName
            },
        },
        template: `
        <div id="{{ prefix }}-page-{{ num }}" class="{{ prefix }}-page">
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
