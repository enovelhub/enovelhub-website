requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app',
		jquery: 'jquery-3.1.0.min',
		vue: 'vue.min',
		css: 'css.min',
		cssroot: '../../css'
	},
})
require(['vue', 'app/page', 'app/sidenav'], function(Vue, page, sidenav) {
	Vue.component('enovelhub-page', page)
	Vue.component('enovelhub-sidenav', sidenav)
	new Vue({
		el: '#app',
		data: {
			appName: 'enovelhub',
			content: [{
				title: 'this is title 0',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 1',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 2',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 3',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 4',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 5',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 6',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 7',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 8',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 9',
				content: ['line 0', 'line 1', 'line 2']
			}]
		},
		computed: {
			titles: function() {
				var titles = new Array()
				for (i = 0; i < this.content.length; i++) {
					titles[i] = this.content[i].title
				}

				return titles
			},
		},
		events: {
			'select-page': function(index) {
				location.href = '#' + this.appName + '-page-' + index
			},
			'show-sidenav': function() {
				this.$broadcast('show-sidenav')
			}
		},
		template: `
		<enovelhub-sidenav :titles="titles"></enovelhub-sidenav>
		<template v-for="page in content">
			<enovelhub-page :num="$index" :page="page"></enovelhub-page>
		</template>
		`,
	})
})
