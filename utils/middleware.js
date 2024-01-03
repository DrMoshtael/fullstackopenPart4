const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.message === 'CastError') {
        return response
        .status(400)
        .send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response
        .status(400)
        .json({ error: error.message})
    }

    next(error)
}

module.exports = {
    errorHandler,
    requestLogger
}