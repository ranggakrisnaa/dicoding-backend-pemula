const { addBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/book.controller')

module.exports =
    bookRoutes = [
        {
            method: 'POST',
            path: '/books',
            handler: addBook
        },
        {
            method: 'GET',
            path: '/books',
            handler: getAllBooks
        },
        {
            method: 'GET',
            path: '/books/{bookId}',
            handler: getBookById
        },
        {
            method: 'PUT',
            path: '/books/{bookId}',
            handler: updateBook
        },
        {
            method: 'DELETE',
            path: '/books/{bookId}',
            handler: deleteBook
        },
    ]
