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
require(['jquery', 'vue', 'app/page', 'app/sidenav', 'app/navbar',
		'app/bookmark'
	],
	function($, Vue, page, sidenav, navbar, bookmark) {
		Vue.component('enovelhub-page', page)
		Vue.component('enovelhub-sidenav', sidenav)
		Vue.component('enovelhub-navbar', navbar)

		var app = new Vue({
			el: '#app',
			ready: function() {
				var self = this
				var book = bookmark.loadLastRead()
				if (book) {
					self.loadBookPages(book, bookmark.getLastRead().index)
				} else {
					$.get('testdata.json', function(book) {
						self.loadBookPages(book, 0)
					})
				}

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
			methods: {
				loadBookPages: function(book, lastReadIndex) {
					var self = this
					bookmark.save(book)
					bookmark.setLastRead(book.author, book.title, 0)

					self.book.author = book.author
					self.book.title = book.title
					self.book.content = new Array(book.content.length)
					var updateContent = function(index, length) {
						if (index == length) {
							self.$broadcast('navbar-progress', 100)
							self.$emit('select-page', lastReadIndex)
							self.autoUpdatePageIndex()
							return
						}

						self.book.content.$set(index, book.content[index])
						Vue.nextTick(function() {
							self.$broadcast('navbar-progress', index / length * 100)
							setTimeout(function() {
								updateContent(index + 1, length)
							}, 0)
						})
					}
					updateContent(0, book.content.length)
				},
				clearCache: function() {
					bookmark.clear()
				},
				autoUpdatePageIndex: function() {
					var self = this
					var updateIndex = function(index) {
						self.$broadcast('sidenav-index', index)
					}
					var autoUpdatePageIndex = function() {
						var docScrollTop = $(document).scrollTop()
						var min = Number.MAX_SAFE_INTEGER;
						var id = ""

						var pages = $('.{appName}-page'
							.replace(/{appName}/g, self.$root.appName)
						).each(function() {
							var v = $(this).offset().top + $(this).height() - docScrollTop
							if (v > 0 && Math.abs(v) < min) {
								min = v
								id = $(this).attr('id')
							}
						})

						index = id.replace(/.*-page-/g, "") - 0
						updateIndex(index)
						bookmark.setLastRead(bookmark.getLastRead().author,
							bookmark.getLastRead().name, index)

						setTimeout(function() {
							autoUpdatePageIndex()
						}, 500)
					}

					autoUpdatePageIndex()
				}
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
				<span :style="css.title" @click="clearCache()">{{ book.title }}</span>
			</slot>
		</enovelhub-navbar>
		<enovelhub-sidenav :titles="titles"></enovelhub-sidenav>
		<template v-for="page in book.content">
			<enovelhub-page :num="$index" :page="page"></enovelhub-page>
		</template>
		`,
		})

	})
