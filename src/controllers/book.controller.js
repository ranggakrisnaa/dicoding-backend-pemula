const { getAllBooks, addBook, updateBook, deleteBook, getBookById } = require("../services/book.service");
const Boom = require('@hapi/boom');

module.exports = {
    addBook: async (request, h) => {
        try {
            const data = await addBook(request.payload)

            return h.response({ status: "success", message: "Buku berhasil ditambahkan", data: { bookId: data.id } }).code(201);
        } catch (error) {
            throw error
        }
    },
    getAllBooks: async (request, h) => {
        const { name, reading, finished } = request.query
        try {
            const data = await getAllBooks(name, reading, finished)

            return h.response({ status: "success", data: { books: data } }).code(200);
        } catch (error) {
            throw error
        }
    },
    getBookById: async (request, h) => {
        const { bookId } = request.params
        try {
            const data = await getBookById(bookId)

            return h.response({ status: "success", data: { book: data } }).code(200);
        } catch (error) {
            throw error
        }
    },
    updateBook: async (request, h) => {
        const { bookId } = request.params
        try {
            await updateBook(request.payload, bookId)

            return h.response({ status: "success", message: "Buku berhasil diperbarui" }).code(200);
        } catch (error) {
            throw error
        }
    },
    deleteBook: async (request, h) => {
        const { bookId } = request.params
        try {
            await deleteBook(bookId)

            return h.response({ status: "success", message: "Buku berhasil dihapus" }).code(200);
        } catch (error) {
            throw error
        }
    }
}