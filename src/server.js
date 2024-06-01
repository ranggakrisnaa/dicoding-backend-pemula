const Hapi = require('@hapi/hapi');
const bookRoutes = require('./routes/book.route')
const errorHandler = require('./middlewares/errhandler.middleware');

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.response({ success: true, statusCode: 200, message: 'Hello World!' }).code(200);
        }
    });
    server.route(bookRoutes)
    server.ext('onPreResponse', errorHandler);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();