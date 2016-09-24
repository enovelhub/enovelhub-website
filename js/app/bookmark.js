define(function(require) {
    var $ = require('jquery')
    return {
        setLastRead: function(author, name, index) {
            if (!author || !name) {
                return
            }
            localStorage.setItem("bookmark-lastread", JSON.stringify({
                'author': author,
                'name': name,
                "index": index,
            }))
        },
        getLastRead: function() {
            var ret = localStorage.getItem("bookmark-lastread")
            return JSON.parse(ret)
        },
        save: function(book) {
            if (!book || !book.author || !book.title) {
                return
            }
            var author = book.author
            var name = book.title
            localStorage.setItem('bookmark-book-{author}-{name}'
                .replace(/{author}/g, author)
                .replace(/{name}/g, name), JSON.stringify(book)
            )
        },
        load: function(author, name) {
            var ret = localStorage.getItem(
                'bookmark-book-{author}-{name}'
                .replace(/{author}/g, author)
                .replace(/{name}/g, name))
            return JSON.parse(ret)
        },
        loadLastRead: function() {
            bookattr = this.getLastRead()
            if (!bookattr || !bookattr.author || !bookattr.name) {
                return null
            }
            return this.load(bookattr.author, bookattr.name)
        },
        clear: function() {
            for (i = 0; i < localStorage.length; i++) {
                key = localStorage.key(i)
                if (key.startsWith("bookmark-")) {
                    localStorage.removeItem(key)
                }
            }
        }
    }
})
