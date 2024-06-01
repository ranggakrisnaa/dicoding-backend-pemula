const errorHandler = (request, h) => {
    const response = request.response;
    if (response.isBoom) {
        const { output } = response;
        const { statusCode, payload } = output;

        let message = 'An error occurred';
        let code = statusCode || 500;

        if (payload.message) {
            message = payload.message;
        }

        return h.response({
            status: "fail",
            message: message,
        }).code(code);
    }

    return h.continue;
};

module.exports = errorHandler;