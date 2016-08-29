define(function(require) {
    require('css!cssroot/app/navbar')
    var Vue = require('vue')
    var $ = require('jquery')

    return Vue.extend({
        events: {
            'navbar-progress': function(progress) {
                progress = new Number(progress)
                if (isNaN(progress)) {
                    console.error(
                        'navbar-progress event except a Number(0~100)'
                    )
                    progress = 0
                }

                progress = progress < 0 ? 0 : progress
                progress = progress > 100 ? 100 : progress
                var progressBar =
                    $('.{appName}-navbar .progress'
                        .replace(/{appName}/g, this.$root.appName)
                    )

                progressBar.width("{progress}%"
                    .replace(/{progress}/g, progress))
                if (progress == 100) {
                    setTimeout(function() {
                        progressBar.width(0)
                    }, 500)
                }
            }
        },
        template: `
        <div class="{{ this.$root.appName }}-navbar">
            <div class="navbar-content">
                <slot></slot>
            </div>
            <div class="progress"></div>
        </div>
        <div style="margin-top:5rem;"></div>
        `,
    })
})
