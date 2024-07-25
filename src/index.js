const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();
const port = 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'https://localhost:3000',
}));

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello, world'
    });
})

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});