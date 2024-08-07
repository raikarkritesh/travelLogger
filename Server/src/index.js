const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();
const port = process.env.PORT || 1337;
mongoose.connect(process.env.DATABASE_URL);

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

//home page
app.get('/', (req, res) =>{
    res.json({
        message: 'Hello, world'
    });
})

//Data post and source page
app.use('/api/logs', logs)

//Not Found Error Handler
app.use(middlewares.notFound);

//Error Handler for other Errors
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});