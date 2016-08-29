define(function(require) {
    var Vue = require('vue')
    var $ = require('jquery')
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
        computed: {
            prefix: function() {
                return this.$root.appName
            },
        },
        methods: {
            show: function(index) {
                this.$dispatch('select-page', index)
                this.$emit('sidenav-index', index)
            },
        },
        events: {
            "show-sidenav": function() {
                this.isShow = true
            },
            "hide-sidenav": function() {
                this.isShow = false
            },
            "sidenav-index": function(index) {
                index = new Number(index)
                if (isNaN(index)) {
                    console.error(
                        'sidenav event except a Number'
                    )
                    return
                }
                var oldIndex = $(
                    '.{appName}-sidenav ul li[now]'
                    .replace(/{appName}/g, this.$root.appName)
                ).attr('index')
                if (oldIndex == index) {
                    return
                }

                $('.{appName}-sidenav ul li[index][now]'
                    .replace(/{appName}/g, this.$root.appName)
                ).removeAttr('now')

                $('.{appName}-sidenav ul li[index={index}]'
                    .replace(/{appName}/g, this.$root.appName)
                    .replace(/{index}/g, index)
                ).attr('now', "now")

                var sidenav = '.{appName}-sidenav'
                    .replace(/{appName}/g, this.$root.appName)

                $(sidenav).scrollTop(
                    $(sidenav).scrollTop() +
                    $(sidenav + ' ul > li[now]').offset()
                    .top -
                    $(sidenav).offset().top -
                    $(sidenav).height() / 4
                )
            },
        },
        template: `
                <div class="{{ prefix }}-sidenav" v-show="isShow"">
                    <span class="title">Indexs</span>
                    <ul>
                        <li v-for="title in titles"
                            @click="show($index)"
                            :index="$index">
                            {{ title }}
                        </li>
                    </ul>
                </div>
                `,
    })
})
