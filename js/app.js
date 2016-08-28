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
require(['vue', 'app/page'], function(Vue, page) {
	Vue.component('enovelhub-page', page)
	new Vue({
		el: '#app',
		data: {
			content: [{
				title: 'this is title 0',
				content: ['line 0', 'line 1', 'line 2']
			}, {
				title: 'this is title 0',
				content: ['line 0', 'line 1', 'line 2']
			}]
		},
		template: `
		<template v-for="page in content">
			<enovelhub-page prefix="enovelhub-page" :num="$index" :page="page"></enovelhub-page>
		</template>
		`,
	})
})
