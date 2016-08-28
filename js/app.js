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
require(['jquery', 'vue', 'app/page', 'app/sidenav', 'app/navbar'],
	function($, Vue, page, sidenav, navbar) {
		Vue.component('enovelhub-page', page)
		Vue.component('enovelhub-sidenav', sidenav)
		Vue.component('enovelhub-navbar', navbar)

		var app = new Vue({
			el: '#app',
			ready: function() {
				this.$broadcast('navbar-progress', 80)
				$.get('testdata.json', function(data) {
					app.book = data
					app.$broadcast('navbar-progress', 100)

				})
			},
			data: {
				appName: 'enovelhub',
				book: {
					author: "author",
					title: "book title",
					content: [{
						title: 'chapter title',
						content: ['content 0', 'line 1', 'line 2']
					}],
				},
				css: {
					author: {
						float: 'right',
						fontSize: 'small',
						marginRight: '2rem',
						textAlign: 'center',
					},
					index: {
						float: 'left',
						marginLeft: '2rem',
						textAlign: 'center',
					},
					title: {
						float: 'right',
						textAlign: 'center',
						marginRight: '2rem',
					}
				},
			},
			computed: {
				titles: function() {
					var titles = new Array()
					for (i = 0; i < this.book.content.length; i++) {
						titles[i] = this.book.content[i].title
					}
					return titles
				},
			},
			events: {
				'select-page': function(index) {
					var selector = '#{appName}-page-{index}'
						.replace(/{appName}/g, this.$root.appName)
						.replace(/{index}/g, index)
					$('html,body').animate({
						scrollTop: $(selector).offset().top - 100
					}, 500)
					this.$broadcast('navbar-progress', 100)
					this.$broadcast('hide-sidenav')
				},
				'show-sidenav': function() {
					this.$broadcast('show-sidenav')
				}
			},
			template: `
		<enovelhub-navbar>
			<slot>
				<span :style="css.index" @click="this.$emit('show-sidenav')">Index</span>
				<span :style="css.author">by.{{ book.author }}</span>
				<span :style="css.title">{{ book.title }}</span>
			</slot>
		</enovelhub-navbar>
		<enovelhub-sidenav :titles="titles"></enovelhub-sidenav>
		<template v-for="page in book.content">
			<enovelhub-page :num="$index" :page="page"></enovelhub-page>
		</template>
		`,
		})

	})
