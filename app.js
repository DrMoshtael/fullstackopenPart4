const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app