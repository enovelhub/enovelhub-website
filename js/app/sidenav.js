define(function(require) {
    var Vue = require('vue')
    require('css!cssroot/app/sidenav.css')

    return Vue.extend({
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
            titles: {
                type: Array,
                validator: function(titles) {
                    if (titles.length == 0) {
                        return false
                    }
                    return true
                },
            }
        },
        propsData: {
            isShow: true,
        },
        computed: {
            prefix: function() {
                return this.$root.appName
            },
        },
        methods: {
            show: function(index) {
                this.$dispatch('select-page', index)
            },
        },
        events: {
            "show-sidenav": function() {
                this.isShow = true
            },
            "hide-sidenav": function() {
                this.isShow = false
            },
        },
        template: `
        <div class="{{ prefix }}-sidenav" v-show="isShow">
            <span class="title">Indexs</span>
            <ul v-for="title in titles">
                <li @click="show($index)">
                    {{ title }}
                </li>
            </ul>
        </div>
        `,
    })
})
