const { nanoid } = require("nanoid")
const storage = require("../storage/storage")
const Boom = require('@hapi/boom');

module.exports = {
    addBook: async (reqPayload) => {
        let finished = false

        if (!reqPayload.name) throw Boom.badRequest('Gagal menambahkan buku. Mohon isi nama buku')
        if (reqPayload.readPage > reqPayload.pageCount) throw Boom.badRequest('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')
        if (reqPayload.readPage === reqPayload.pageCount) finished = true

        const payload = {
            id: nanoid(),
            insertedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            finished,
            ...reqPayload
        }

        storage.push(payload)
        return payload
    },
    getAllBooks: async (name, reading, finished) => {
        let findIndex = null
        if (name)
            findIndex = storage.findIndex(book => book.name === name.toLowerCase()) || []
        if (reading) {
            if (reading = 1)
                findIndex = storage.findIndex(book => book.reading === true) || []
            findIndex = storage.findIndex(book => book.reading === false) || []
        }
        if (finished) {
            if (finished = 1)
                findIndex = storage.findIndex(book => book.finished === true) || []
            findIndex = storage.findIndex(book => book.finished === false) || []
        }

        console.log(findIndex);

        return storage[findIndex] || storage.map(data => { return { id: data.id, name: data.name, publisher: data.publisher } })
    },
    getBookById: async (id) => {
        const index = storage.findIndex(book => book.id === id);
        if (index === -1) throw Boom.notFound('Buku tidak ditemukan')

        return storage[index]
    },
    updateBook: async (reqPayload, id) => {
        if (!reqPayload.name) throw Boom.badRequest('Gagal memperbarui buku. Mohon isi nama buku')
        if (reqPayload.readPage > reqPayload.pageCount) throw Boom.badRequest('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')

        const index = storage.findIndex(book => book.id === id);
        if (index === -1) throw Boom.notFound('Gagal memperbarui buku. Id tidak ditemukan')
        const updatedBook = {
            id: storage[index].id,
            insertedAt: storage[index].insertedAt,
            finished: storage[index].finished,
            updatedAt: new Date().toISOString(),
            ...reqPayload
        };

        storage.splice(index, 1, updatedBook)
        return updatedBook
    },
    deleteBook: async (id) => {
        const index = storage.findIndex(book => book.id === id);
        if (index === -1) throw Boom.notFound('Buku gagal dihapus. Id tidak ditemukan');

        return storage.splice(index, 1)
    }
}